const commands = {
  eslint: 'npm run lint:js:cli -- --fix',
  prettier: 'npm run lint:prettier:cli -- --write',
  stylelint: 'npm run lint:scss:cli -- --fix --allow-empty-input'
}

module.exports = {
  '*.{cjs,js,mjs}': [commands.eslint, commands.prettier],
  '*.{json,yaml,yml}': commands.prettier,
  '*.md': [commands.eslint, commands.stylelint, commands.prettier],
  '*.scss': [commands.stylelint, commands.prettier]
}
