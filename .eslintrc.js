module.exports = {
  extends: ['standard', 'prettier'],
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
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'prettier'
      ],
      files: [
        '**/*.{cjs,js,mjs}',

        // Check markdown `*.md` contains valid code blocks
        // https://github.com/eslint/eslint-plugin-markdown#advanced-configuration
        '**/*.md/*.{cjs,js,mjs}'
      ],
      parserOptions: {
        ecmaVersion: 'latest'
      },
      plugins: ['import', 'jsdoc', 'n', 'promise'],
      rules: {
        // Check import or require statements are A-Z ordered
        'import/order': [
          'error',
          {
            alphabetize: { order: 'asc' },
            'newlines-between': 'always'
          }
        ],

        // JSDoc blocks are optional by default
        'jsdoc/require-jsdoc': 'off',

        // Check for valid formatting
        'jsdoc/check-line-alignment': [
          'warn',
          'never',
          {
            wrapIndent: '  '
          }
        ],

        // Add unknown @jest-environment tag name
        'jsdoc/check-tag-names': [
          'warn',
          {
            definedTags: ['jest-environment']
          }
        ],

        // Require hyphens before param description
        // Aligns with TSDoc style: https://tsdoc.org/pages/tags/param/
        'jsdoc/require-hyphen-before-param-description': 'warn',

        // Maintain new line after description
        'jsdoc/tag-lines': [
          'warn',
          'never',
          {
            startLines: 1
          }
        ],

        // Automatically use template strings
        'no-useless-concat': 'error',
        'prefer-template': 'error'
      },
      settings: {
        jsdoc: {
          // Allows us to use type declarations that exist in our dependencies
          mode: 'typescript'
        }
      }
    },
    {
      // Extensions required for ESM import
      files: ['**/*.mjs'],
      rules: {
        'import/extensions': [
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
      }
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
    },
    {
      // Add plugin for markdown `*.md` code blocks
      extends: ['plugin:markdown/recommended'],
      files: ['**/*.md'],
      plugins: ['markdown'],
      processor: 'markdown/markdown'
    },
    {
      // Assume markdown `*.md` JavaScript code blocks use browser globals
      files: ['**/*.md/*.{cjs,js,mjs}'],
      env: {
        browser: true
      }
    }
  ],
  root: true
}
