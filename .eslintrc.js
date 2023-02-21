module.exports = {
  extends: 'standard',
  ignorePatterns: [
    '**/fixtures/build/**'
  ],
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
