import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import esX from "eslint-plugin-es-x";
import globals from "globals";

export default defineConfig([
  {
    languageOptions: {
      globals: {},
      parserOptions: {}
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaVersion: latest
      }
    },
    extends: [esX.configs["flat/restrict-to-es2015"], prettier],
    rules: {
      'es-x/no-class-fields': 'off',
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
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param': 'error'
    },
  }
]);
