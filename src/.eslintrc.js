module.exports = {
  overrides: [
    {
      files: [
        '**/*.{cjs,js,mjs}'
      ],
      env: {
        browser: true
      },
      rules: {
        'no-var': 'off',
        'object-shorthand': 'off',
        'quote-props': 'off'
      }
    }
  ]
}
