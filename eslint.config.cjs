import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
import n from "eslint-plugin-n";
import promise from "eslint-plugin-promise";
import globals from "globals";
import markdown from "eslint-plugin-markdown";

export default defineConfig([
  {
    languageOptions: {
      globals: {},
      parserOptions: {}
    },
    extends: [prettier],
  },
  {
    files: [
        '**/*.{cjs,js,mjs}',

        // Check markdown `*.md` contains valid code blocks
        // https://github.com/eslint/eslint-plugin-markdown#advanced-configuration
        '**/*.md/*.{cjs,js,mjs}'
      ],
    languageOptions: {
      globals: {},
      parserOptions: {
        ecmaVersion: latest
      }
    },
    extends: [importX.configs["flat/recommended"], jsdoc.configs["flat/recommended-typescript-flavor"], n.configs["flat/recommended"], promise.configs["flat/recommended"], js.configs.recommended, prettier],
    rules: {
      'import-x/order': [
          'error',
          {
            alphabetize: { order: 'asc' },
            'newlines-between': 'always'
          }
        ],
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/check-line-alignment': [
          'warn',
          'never',
          {
            wrapIndent: '  '
          }
        ],
      'jsdoc/check-tag-names': [
          'warn',
          {
            definedTags: ['jest-environment']
          }
        ],
      'jsdoc/require-hyphen-before-param-description': 'warn',
      'jsdoc/tag-lines': [
          'warn',
          'never',
          {
            startLines: 1
          }
        ],
      'no-useless-concat': 'error',
      'prefer-template': 'error',
      'no-redeclare': ['error', { builtinGlobals: false }],
      "no-unused-vars": ["error", {"caughtErrors":"none","args":"none"}]
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {},
      parserOptions: {}
    },
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
    },
  },
  {
    files: ['**/*.test.{cjs,js,mjs}'],
    languageOptions: {
      globals: {
        page: readonly,
        browser: readonly,
        jestPuppeteer: readonly,
        ...globals.jest,
        ...globals.browser
      },
      parserOptions: {}
    },
  },
  {
    files: ['**/*.md'],
    languageOptions: {
      globals: {},
      parserOptions: {}
    },
    extends: [markdown.configs["flat/recommended-legacy"]],
  },
  {
    files: ['**/*.md/*.{cjs,js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {}
    },
  }
]);
