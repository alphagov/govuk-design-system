module.exports = {
  overrides: [
    {
      files: ['**/*.mjs'],
      excludedFiles: ['**/*.test.mjs'],
      env: {
        browser: true
      },
      extends: ['plugin:es-x/restrict-to-es2015', 'prettier'],
      parserOptions: {
        // Note: Allow ES2015 for import/export syntax
        ecmaVersion: 'latest'
      },
      plugins: ['es-x'],
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
    }
  ]
}
