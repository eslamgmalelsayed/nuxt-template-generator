/**
 * Pure helpers shared by the dashboard forms and the server validator, so both
 * derive from the same section schemas (types/schema.ts, sectionSchemas.ts).
 */
import type { Field, LabelText } from '../types/schema'

type Dict = Record<string, unknown>
type Locale = 'en' | 'ar'

/** Resolves a label (string or localized) against the dashboard locale. */
export function resolveLabel(label: LabelText | undefined, locale: Locale = 'en'): string {
  if (!label) return ''
  if (typeof label === 'string') return label
  return label[locale] ?? label.en ?? ''
}

const V_MSG: Record<Locale, { required: (l: string) => string; min: (l: string) => string }> = {
  en: {
    required: (l) => `${l} is required`,
    min: (l) => `${l} needs at least one entry`,
  },
  ar: {
    required: (l) => `${l} مطلوب`,
    min: (l) => `${l} يحتاج إلى إدخال واحد على الأقل`,
  },
}

export function emptyLocalized() {
  return { en: '', ar: '' }
}

/** A blank value of the right shape for a field (used when adding array items). */
export function defaultForField(field: Field): unknown {
  if (field.default !== undefined) return field.default
  switch (field.type) {
    case 'text':
    case 'image':
      return ''
    case 'color':
      return '#000000'
    case 'boolean':
      return false
    case 'localized':
    case 'localized-multiline':
      return emptyLocalized()
    case 'number':
      return 0
    case 'icon':
      return 'bolt'
    case 'select':
      return field.options[0]?.value ?? ''
    case 'array':
      return []
    case 'group': {
      const obj: Dict = {}
      for (const f of field.fields) obj[f.key] = defaultForField(f)
      return obj
    }
  }
}

export function isEmptyValue(field: Field, value: unknown): boolean {
  switch (field.type) {
    case 'text':
    case 'image':
    case 'icon':
    case 'select':
    case 'color':
      return value == null || value === ''
    case 'number':
      return value == null
    case 'boolean':
      // false is a real value; only truly-absent counts as empty
      return value == null
    case 'localized':
    case 'localized-multiline': {
      const v = value as { en?: string; ar?: string } | undefined
      return !v || (!v.en?.trim() && !v.ar?.trim())
    }
    case 'array':
      return !Array.isArray(value) || value.length === 0
    case 'group':
      return value == null || field.fields.every((f) => isEmptyValue(f, (value as Dict)[f.key]))
  }
}

/**
 * Returns a deep clone of `data` with optional empty fields pruned, so we don't
 * persist blank localized objects (which section components treat as "present"
 * and would render as empty elements).
 */
export function cleanData(fields: Field[], data: Dict): Dict {
  const out: Dict = {}
  for (const field of fields) {
    const value = data?.[field.key]

    if (field.type === 'group') {
      const cleaned = cleanData(field.fields, (value as Dict) ?? {})
      if (field.optional && isEmptyValue(field, cleaned)) continue
      out[field.key] = cleaned
      continue
    }

    if (field.type === 'array') {
      const items = Array.isArray(value) ? value : []
      const cleaned = items.map((item) =>
        field.item.type === 'group' ? cleanData(field.item.fields, item as Dict) : item,
      )
      if (field.optional && cleaned.length === 0) continue
      out[field.key] = cleaned
      continue
    }

    if (field.optional && isEmptyValue(field, value)) continue
    out[field.key] = value
  }
  return out
}

/** Collects human-readable (localized) errors for required-but-empty fields. */
export function validateFields(
  fields: Field[],
  data: Dict,
  locale: Locale = 'en',
  path = '',
): string[] {
  const errors: string[] = []
  const msg = V_MSG[locale] ?? V_MSG.en

  for (const field of fields) {
    const value = data?.[field.key]
    const base = resolveLabel(field.label, locale) || field.key
    const label = path ? `${path} › ${base}` : base

    if (field.type === 'group') {
      if (!field.optional && isEmptyValue(field, value)) {
        errors.push(msg.required(label))
      } else if (value) {
        errors.push(...validateFields(field.fields, value as Dict, locale, label))
      }
      continue
    }

    if (field.type === 'array') {
      const items = Array.isArray(value) ? value : []
      if (!field.optional && items.length === 0) {
        errors.push(msg.min(label))
      }
      items.forEach((item, i) => {
        if (field.item.type === 'group') {
          errors.push(
            ...validateFields(field.item.fields, item as Dict, locale, `${label} #${i + 1}`),
          )
        } else if (!field.item.optional && isEmptyValue(field.item, item)) {
          errors.push(msg.required(`${label} #${i + 1}`))
        }
      })
      continue
    }

    if (!field.optional && isEmptyValue(field, value)) {
      errors.push(msg.required(label))
    }
  }
  return errors
}
