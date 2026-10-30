import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    languageOptions: {
      globals: {},
      parserOptions: {}
    },
    rules: {
      'spaced-comment': 'off'
    },
  }
]);
