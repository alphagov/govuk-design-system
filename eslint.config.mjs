import { fileURLToPath } from 'node:url'

import JsConfigs from '@eslint/js'
import MarkdownPlugin from '@eslint/markdown'
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config'
import PrettierConfig from 'eslint-config-prettier'
import xoConfig from 'eslint-config-xo'
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
      ...xoConfig({
        space: true,
        semicolon: false,
        prettier: 'compat'
      })
    ],
    rules: {
      // The rules is stylistic and makes some arrow functions less readable,
      // even with its `as-needed` config, so we'll leave it off and trust
      // human eye
      'arrow-body-style': 'off',
      // `[0-9]` is easier ot understand at a glance than `\d`
      'regexp/prefer-d': 'off',
      // `append()` is just shy of our browser support, only being available in
      // Edge in v17 when our browser support currently extends back to v16
      'unicorn/prefer-dom-node-append': 'off',
      // `getHTML()` and `setHTML()` are still very new and not within the scope
      // of our browser support
      'unicorn/prefer-dom-node-html-methods': 'off',
      // `CSS.escape` isn't supported by Edge 16-18
      'unicorn/require-css-escape': 'off'
    }
  },
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

      // Give unused vars a pass on method arguments
      'no-unused-vars': [
        'error',
        {
          args: 'none'
        }
      ],

      // Retain single line JSDoc typing comments
      'unicorn/single-line-block-comment-style': [
        'error',
        'multiline',
        {
          ignore: ['^@']
        }
      ],

      // We don't want spaced comments for sourcemap URLs as they require a
      // comment format of `//#` without spaces
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          markers: ['#']
        }
      ]
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
      // Babel transpiles ES2020 class and static fields
      'es-x/no-class-fields': 'off',
      'es-x/no-class-static-fields': 'off',

      // Babel transpiles optional catch binding
      'es-x/no-optional-catch-binding': 'off',

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
      'jsdoc/require-param': 'error',

      // As well as conflicting with `es-x/no-global-this`, `window.*` is easier
      // to understand at a glance compared to `globalThis.*`
      'unicorn/prefer-global-this': 'off',

      // `replaceAll()` doesn't meet our browser support
      'unicorn/prefer-string-replace-all': 'off'
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
    },
    rules: {
      // Because of `describe` and `it`, we need to be a bit looser on nesting
      // in tests
      'max-nested-callbacks': 'off'
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
    // Allow anonymous default exports for config files and test fixtures
    files: [
      '**/*.config.{cjs,js,mjs}',
      '**/.*.{cjs,js,mjs}',
      '**/fixtures/**/*.{cjs,js,mjs}'
    ],
    rules: {
      'import-x/no-anonymous-default-export': 'off'
    }
  },
  {
    extends: [PrettierConfig]
  },
  {
    rules: {
      // XO rules that our code breaks and we still need to review
      '@html-eslint/head-order': 'off',
      '@html-eslint/require-meta-description': 'off',
      '@html-eslint/require-meta-viewport': 'off',
      '@html-eslint/require-open-graph-protocol': 'off',
      '@html-eslint/sort-attrs': 'off',
      '@typescript-eslint/no-useless-default-assignment': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      camelcase: 'off',
      'func-names': 'off',
      'guard-for-in': 'off',
      'jsdoc/require-asterisk-prefix': 'off',
      'n/prefer-global/buffer': 'off',
      'n/prefer-global/process': 'off',
      'n/prefer-process-get-builtin-module': 'off',
      'n/prefer-promises/fs': 'off',
      'new-cap': 'off',
      'no-await-in-loop': 'off',
      'no-constructor-return': 'off',
      'no-multi-assign': 'off',
      'no-shadow': 'off',
      null: 'off',
      'package-json/dependency-version-range': 'off',
      'package-json/no-package-manager-engines': 'off',
      'package-json/no-short-flags-in-scripts': 'off',
      'package-json/prefer-engines-range': 'off',
      'package-json/prefer-shorthand': 'off',
      'package-json/prefer-type-module': 'off',
      'package-json/sort-properties': 'off',
      'regexp/no-super-linear-backtracking': 'off',
      'regexp/no-super-linear-move': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'regexp/prefer-named-capture-group': 'off',
      'require-unicode-regexp': 'off',
      'unicorn/better-dom-traversing': 'off',
      'unicorn/class-reference-in-static-methods': 'off',
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/consistent-class-member-order': 'off',
      'unicorn/default-export-style': 'off',
      'unicorn/dom-node-dataset': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/logical-assignment-operators': 'off',
      'unicorn/max-nested-calls': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
      'unicorn/no-computed-property-existence-check': 'off',
      'unicorn/no-declarations-before-early-exit': 'off',
      'unicorn/no-document-cookie': 'off',
      'unicorn/no-duplicate-loops': 'off',
      'unicorn/no-for-each': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-unnecessary-parameters': 'off',
      'unicorn/no-unsafe-string-replacement': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/operator-assignment': 'off',
      'unicorn/prefer-add-event-listener': 'off',
      'unicorn/prefer-array-flat-map': 'off',
      'unicorn/prefer-array-some': 'off',
      'unicorn/prefer-combined-guards': 'off',
      'unicorn/prefer-continue': 'off',
      'unicorn/prefer-default-parameters': 'off',
      'unicorn/prefer-early-return': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-scoped-selector': 'off',
      'unicorn/prefer-simple-condition-first': 'off',
      'unicorn/prefer-simple-sort-comparator': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-string-slice': 'off',
      'unicorn/prefer-structured-clone': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-toggle-attribute': 'off',
      'unicorn/require-array-sort-compare': 'off',
      'unicorn/text-encoding-identifier-case': 'off'
    }
  }
])
