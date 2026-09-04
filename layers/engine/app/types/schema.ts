/**
 * Editing schema — the declarative descriptor that drives the dashboard forms
 * AND server-side validation from a single source. Parallel to the render
 * registry (SectionRenderer): both are keyed by SectionComponent, one says how
 * to *render* a section, this says how to *edit + validate* its data.
 *
 * Add a new section kind = add a component (render) + a SectionSchema (edit).
 * No bespoke form code.
 */
import type { SectionComponent, Localized } from './template'

/** A UI label — a plain string, or localized { en, ar } resolved by the dashboard. */
export type LabelText = string | Localized

export type FieldType =
  | 'text' // plain single-line string
  | 'localized' // { en, ar } single-line
  | 'localized-multiline' // { en, ar } textarea
  | 'number'
  | 'boolean' // a checkbox
  | 'color' // a hex color string (#rrggbb)
  | 'select' // one of a fixed option set
  | 'icon' // one of the engine's inline icon keys
  | 'image' // an uploaded image path (string)
  | 'array' // repeatable list of `item`
  | 'group' // nested object of `fields`

interface FieldCommon {
  /** property key within the section's data object (empty for array items) */
  key: string
  /** human label shown in the dashboard (string or localized) */
  label?: LabelText
  optional?: boolean
  /** short helper text under the control */
  help?: LabelText
  /** value used when creating this field (e.g. a boolean that defaults true) */
  default?: unknown
}

export interface SimpleField extends FieldCommon {
  type:
    'text' | 'localized' | 'localized-multiline' | 'number' | 'boolean' | 'color' | 'icon' | 'image'
  placeholder?: string
}

export interface SelectField extends FieldCommon {
  type: 'select'
  options: { value: string; label: string }[]
}

export interface ArrayField extends FieldCommon {
  type: 'array'
  /** shape of each element (a group for object items, or a simple field) */
  item: Field
  /** singular label for the add button / item headings, e.g. "Service" */
  itemLabel?: LabelText
  min?: number
  max?: number
}

export interface GroupField extends FieldCommon {
  type: 'group'
  fields: Field[]
}

export type Field = SimpleField | SelectField | ArrayField | GroupField

export interface SectionSchema {
  kind: SectionComponent
  /** label for the section in the dashboard, e.g. "Hero" */
  label: LabelText
  /** selectable layout variants (maps to Section.variant) */
  variants?: { value: string; label: string }[]
  /** the shape of Section.data */
  fields: Field[]
}

export type SectionSchemaRegistry = Partial<Record<SectionComponent, SectionSchema>>

/**
 * The content model a client registers with the (headless) engine dashboard.
 * The engine ships no schemas of its own — the client provides them via
 * app.config, and the dashboard builds its forms + validation from them.
 */
export interface DashboardSchemas {
  sections: SectionSchemaRegistry
  site: Field[]
  theme: Field[]
}

// The engine's dashboard reads these from app.config (client-provided).
declare module 'nuxt/schema' {
  interface AppConfigInput {
    schemas?: DashboardSchemas
  }
  interface AppConfig {
    schemas: DashboardSchemas
  }
}
