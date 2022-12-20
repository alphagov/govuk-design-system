module.exports = {
  extends: 'standard',
  ignorePatterns: [
    '!.*'
  ],
  overrides: [
    {
      files: ['**/*.test.{cjs,js,mjs}'],
      env: {
        jest: true
      }
    }
  ]
}
