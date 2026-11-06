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
  ...xoConfig({
    space: true,
    semicolon: false,
    prettier: 'compat'
  }),
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
      // We have some instances of external API params that aren't camel case.
      // Needs more thorough unpicking.
      camelcase: 'off',
      // Triggered once when we import iframe-resizer for example-page js. We
      // may not be able to do anything about this.
      'import-x/no-unassigned-import': 'off',
      // Requires a broader refactoring of a lot of tests and tooling js
      'new-cap': 'off',
      // Only triggered in mobile navigation section test. Requires us to
      // refactor that test, moving the await and the expects out of the loop.
      'no-await-in-loop': 'off',
      // Lots of tricky-to-unpick instances of shadowing, especially in our
      // metalsmith tooling which might just be how metalsmith is supposed to be
      // used. Fixed a couple of instances anyway.
      'no-shadow': 'off',
      // A few tricky regex errors that aren't easily resolvable across the repo.
      'regexp/no-super-linear-backtracking': 'off',
      'regexp/no-super-linear-move': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'regexp/prefer-named-capture-group': 'off',

      'unicorn/class-reference-in-static-methods': 'off',
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/consistent-class-member-order': 'off',
      'unicorn/consistent-conditional-object-spread': 'off',
      'unicorn/default-export-style': 'off',
      'unicorn/dom-node-dataset': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/logical-assignment-operators': 'off',
      'unicorn/max-nested-calls': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/new-for-builtins': 'off',
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
      'unicorn/no-for-loop': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/no-immediate-mutation': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-typeof-undefined': 'off',
      'unicorn/no-unnecessary-parameters': 'off',
      'unicorn/no-unsafe-string-replacement': 'off',
      'unicorn/no-useless-else': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/operator-assignment': 'off',
      'unicorn/prefer-add-event-listener': 'off',
      'unicorn/prefer-array-flat-map': 'off',
      'unicorn/prefer-array-some': 'off',
      'unicorn/prefer-boolean-return': 'off',
      'unicorn/prefer-classlist-toggle': 'off',
      'unicorn/prefer-combined-guards': 'off',
      'unicorn/prefer-continue': 'off',
      'unicorn/prefer-date-now': 'off',
      'unicorn/prefer-default-parameters': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-dom-node-html-methods': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      'unicorn/prefer-early-return': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-location-assign': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-native-coercion-functions': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-scoped-selector': 'off',
      'unicorn/prefer-set-has': 'off',
      'unicorn/prefer-simple-condition-first': 'off',
      'unicorn/prefer-simple-sort-comparator': 'off',
      'unicorn/prefer-split-limit': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-string-slice': 'off',
      'unicorn/prefer-structured-clone': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-toggle-attribute': 'off',
      'unicorn/prefer-unary-minus': 'off',
      'unicorn/require-array-sort-compare': 'off',
      'unicorn/require-css-escape': 'off',
      'unicorn/single-line-block-comment-style': 'off',
      'unicorn/text-encoding-identifier-case': 'off',
      'unicorn/throw-new-error': 'off',
      'max-nested-callbacks': 'off',
      'max-params': 'off',
      'no-warning-comments': 'off',

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

      // Can't use Object.hasOwn as this is only available in ES2022
      'prefer-object-has-own': 'off',

      // RegExp 'v' flag is only available in ES2024
      'require-unicode-regexp': 'off'
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
