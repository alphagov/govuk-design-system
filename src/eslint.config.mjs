import { defineConfig } from 'eslint/config'
import globals from 'globals'
import esX from 'eslint-plugin-es-x'
import jsdoc from 'eslint-plugin-jsdoc'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['javascripts/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: { ecmaVersion: 'latest' }
    },
    ignores: ['**/*.test.mjs'],
    extends: [
      esX.configs['restrict-to-es2015'],
      jsdoc.configs['flat/recommended-typescript-flavor'],
      prettier
    ],
    rules: {
      // Babel transpiles ES2020 class fields
      'es-x/no-class-fields': 'off',
      'es-x/no-class-static-fields': 'off',

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

      // Maintain new line after description
      'jsdoc/tag-lines': [
        'warn',
        'never',
        {
          startLines: 1
        }
      ]
    }
  }
])
