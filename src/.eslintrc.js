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
        ecmaVersion: '2015'
      },
      plugins: ['es-x'],
      rules: {
        'no-var': 'off',
        'object-shorthand': 'off',
        'quote-props': 'off'
      }
    }
  ]
}
