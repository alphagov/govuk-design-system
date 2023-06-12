module.exports = {
  extends: 'standard',
  ignorePatterns: [
    '**/fixtures/build/**',

    // Enable dotfile linting
    '!.*',
    'node_modules',
    'node_modules/.*'
  ],
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:n/recommended',
        'plugin:promise/recommended'
      ],
      files: ['**/*.{cjs,js,mjs}'],
      parserOptions: {
        ecmaVersion: 'latest'
      },
      plugins: [
        'import',
        'n',
        'promise'
      ]
    },
    {
      files: ['**/*.test.{cjs,js,mjs}'],
      env: {
        jest: true
      },
      globals: {
        page: 'readonly',
        browser: 'readonly',
        jestPuppeteer: 'readonly'
      }
    }
  ],
  root: true
}
