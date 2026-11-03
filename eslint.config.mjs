import { fileURLToPath } from 'url'

import JsConfigs from '@eslint/js'
import MarkdownPlugin from '@eslint/markdown'
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config'
import PrettierConfig from 'eslint-config-prettier'
import ESXPlugin from 'eslint-plugin-es-x'
import { configs as ImportXConfigs } from 'eslint-plugin-import-x'
import { configs as JsdocConfigs } from 'eslint-plugin-jsdoc'
import NodePlugin from 'eslint-plugin-n'
import PromisePlugin from 'eslint-plugin-promise'
import globals from 'globals'

const gitignorePath = [fileURLToPath(new URL('.gitignore', import.meta.url))]

export default defineConfig([
  globalIgnores([
    // Enable dotfile linting
    '!.*'
  ]),
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  {
    extends: [
      ImportXConfigs['flat/recommended'],
      JsdocConfigs['flat/recommended-typescript-flavor'],
      // We use a mix of Common and Modules so use this config to avoid clashing
      // import styles. This config merges the module and cjs recommended configs,
      // which themselves import the node plugin's recommended config.
      NodePlugin.configs['flat/mixed-esm-and-cjs'],
      PromisePlugin.configs['flat/recommended'],
      JsConfigs.configs.recommended
    ],
    files: [
      '**/*.{cjs,js,mjs}',

      // Check markdown `*.md` contains valid code blocks
      // https://github.com/eslint/eslint-plugin-markdown#advanced-configuration
      '**/*.md/*.{cjs,js,mjs}'
    ],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest' }
    },
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

      'no-unused-vars': ['error', { args: 'none' }],
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
    // Specifically target our client js
    files: ['src/javascripts/**/*.mjs'],
    ignores: ['**/*.test.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: { ecmaVersion: 'latest' }
    },
    extends: [
      // Peg at ES2015 to adhere to our browser support model for client js
      ESXPlugin.configs['restrict-to-es2015'],
      JsdocConfigs['flat/recommended-typescript-flavor']
    ],
    rules: {
      // Babel transpiles ES2020 class fields
      'es-x/no-class-fields': 'off',

      // JSDoc blocks are mandatory in source code
      'jsdoc/require-jsdoc': [
        'error',
        {
          enableFixer: false,
          require: {
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionExpression: true,
            MethodDefinition: true
          }
        }
      ],

      // JSDoc @param required in (mandatory) blocks but
      // @param description is necessary in source code
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param': 'error'
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
    extends: [MarkdownPlugin.configs.recommended],
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
  },
  {
    extends: [PrettierConfig]
  }
])
