import { fileURLToPath } from 'url'

import Js from '@eslint/js'
import Markdown from '@eslint/markdown'
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config'
import PrettierConfig from 'eslint-config-prettier'
import { configs as ImportXConfigs } from 'eslint-plugin-import-x'
import { configs as JsdocConfigs } from 'eslint-plugin-jsdoc'
import Node from 'eslint-plugin-n'
import Promise from 'eslint-plugin-promise'
import globals from 'globals'

const gitignorePath = [fileURLToPath(new URL('.gitignore', import.meta.url))]

export default defineConfig([
  {
    extends: [PrettierConfig]
  },
  globalIgnores([
    // Enable dotfile linting
    '!.*'
  ]),
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  {
    files: [
      '**/*.{cjs,js,mjs}',

      // Check markdown `*.md` contains valid code blocks
      // https://github.com/eslint/eslint-plugin-markdown#advanced-configuration
      '**/*.md/*.{cjs,js,mjs}'
    ],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest' }
    },
    extends: [
      ImportXConfigs['flat/recommended'],
      JsdocConfigs['flat/recommended-typescript-flavor'],
      Node.configs['flat/mixed-esm-and-cjs'],
      Promise.configs['flat/recommended'],
      Js.configs.recommended,
      PrettierConfig
    ],
    rules: {
      // Check import or require statements are A-Z ordered
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          'newlines-between': 'always'
        }
      ],

      // JSDoc blocks are optional by default
      'jsdoc/require-jsdoc': 'off',

      // Check for valid formatting
      'jsdoc/check-line-alignment': [
        'warn',
        'never',
        {
          wrapIndent: '  '
        }
      ],

      // Add unknown @jest-environment tag name
      'jsdoc/check-tag-names': [
        'warn',
        {
          definedTags: ['jest-environment']
        }
      ],

      // Require hyphens before param description
      // Aligns with TSDoc style: https://tsdoc.org/pages/tags/param/
      'jsdoc/require-hyphen-before-param-description': 'warn',

      // Maintain new line after description
      'jsdoc/tag-lines': [
        'warn',
        'never',
        {
          startLines: 1
        }
      ],

      // Automatically use template strings
      'no-useless-concat': 'error',
      'prefer-template': 'error',

      'no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none'
        }
      ],
      'no-redeclare': ['error', { builtinGlobals: false }]
    },
    settings: {
      jsdoc: {
        // Allows us to use type declarations that exist in our dependencies
        mode: 'typescript'
      }
    }
  },
  {
    // Extensions required for ESM import
    files: ['**/*.mjs'],
    rules: {
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
          pattern: {
            cjs: 'always',
            js: 'always',
            mjs: 'always'
          }
        }
      ]
    }
  },
  {
    files: [
      '**/*.test.{cjs,js,mjs}',
      '**/__tests__/**/*.{cjs,js,mjs}',
      '**/jest/**/*.{cjs,js,mjs}'
    ],
    languageOptions: {
      globals: {
        page: 'readonly',
        browser: 'readonly',
        jestPuppeteer: 'readonly',
        ...globals.jest,
        ...globals.browser
      }
    }
  },
  {
    files: ['**/*.md'],
    extends: [Markdown.configs.recommended],
    processor: 'markdown/markdown'
  },
  {
    // Assume markdown `*.md` JavaScript code blocks use browser globals
    files: ['**/*.md/*.{cjs,js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
])
