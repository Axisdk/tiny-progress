import {defineConfig} from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import angularEslint from '@angular-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'
import templateParser from '@angular-eslint/template-parser'
import angularTemplate from '@angular-eslint/eslint-plugin-template'
import unusedImports from 'eslint-plugin-unused-imports' // <- обязательно импортируем

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist', 'build', 'temp.js', 'config/*'],

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:prettier/recommended'
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@angular-eslint': angularEslint,
      'unused-imports': unusedImports,  // <- через объект
      prettier,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      'prettier/prettier': 'off',

      'unused-imports/no-unused-imports': 'error',       // <- правила плагина
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@angular-eslint/directive-selector': ['error', {type: 'attribute', style: 'camelCase'}],
      '@angular-eslint/component-selector': ['error', {type: 'element', prefix: 'app', style: 'kebab-case'}],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'protected-readonly-field',
            'readonly-field',
            'public-instance-field',
            'private-field',
            'protected-field',
            'public-field',
            'private-get',
            'protected-get',
            'public-get',
            'private-set',
            'protected-set',
            'public-set',
            'constructor',
            'private-method',
            'protected-method',
            'public-method',
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
  {
    files: ['src/**/*.html'],
    languageOptions: {parser: templateParser},
    plugins: {'@angular-eslint/template': angularTemplate},
    rules: {
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-nested-tags': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {'@angular-eslint/template': angularTemplate},
    processor: '@angular-eslint/template/extract-inline-html',
  },
])
