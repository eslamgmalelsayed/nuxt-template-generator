import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

// Flat config covering the whole monorepo (Vue 3 + TS). typescript-eslint
// disables `no-undef`, so Nuxt's auto-imported macros/composables don't error.
// Prettier owns formatting (appended last to turn off conflicting rules).
export default ts.config(
  {
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/.lighthouseci/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: ts.parser },
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // TypeScript + Nuxt auto-imports resolve identifiers; ESLint can't see
      // auto-imported composables/macros or DOM globals, so no-undef is noise.
      'no-undef': 'off',
    },
  },
  prettier,
)
