import { reactive, ref, computed } from 'vue'
import { safeParse, type GenericSchema } from 'valibot'

/**
 * Small accessible form helper built on Valibot.
 *
 * - `values` is reactive and v-model-bound in the template
 * - errors show only for touched fields, or all fields after a submit attempt
 *   ("reward early, punish late")
 * - `firstError` lets the caller move focus to the first invalid field
 *
 * The schema is the single source of truth; error messages come from it
 * (pass localized strings via i18n when building the schema).
 */
export function useForm<T extends Record<string, unknown>>(schema: GenericSchema, initial: T) {
  const values = reactive({ ...initial }) as T
  const errors = reactive<Record<string, string>>({})
  const touched = reactive<Record<string, boolean>>({})
  const submitted = ref(false)

  /** Validate the whole form; display errors only for touched/submitted fields. Returns overall validity. */
  function validate(): boolean {
    const res = safeParse(schema, values)
    const next: Record<string, string> = {}
    if (!res.success) {
      for (const issue of res.issues) {
        const key = issue.path?.[0]?.key as string | undefined
        if (key && !next[key]) next[key] = issue.message
      }
    }
    for (const k of Object.keys(errors)) delete errors[k]
    for (const [k, msg] of Object.entries(next)) {
      if (submitted.value || touched[k]) errors[k] = msg
    }
    return Object.keys(next).length === 0
  }

  const firstError = computed<string | null>(() => Object.keys(errors)[0] ?? null)

  return {
    values,
    errors,
    touched,
    submitted,
    firstError,
    validate,
    onBlur(name: string) {
      touched[name] = true
      validate()
    },
    onInput(name: string) {
      if (submitted.value || touched[name]) validate()
    },
    /** Marks the form submitted, validates, and runs `onValid` when clean. Returns the first invalid field (or null). */
    submit(onValid: () => void): string | null {
      submitted.value = true
      if (validate()) onValid()
      return firstError.value
    },
  }
}
