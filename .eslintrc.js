module.exports = {
  extends: 'standard',
  overrides: [
    {
      files: ['**/*.test.{cjs,js,mjs}'],
      env: {
        jest: true
      },
      globals: {
        page: true,
        browser: true
      }
    }
  ]
}
