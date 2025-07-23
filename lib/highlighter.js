const hljs = require('highlight.js')

// Highlight Nunjucks as JavaScript
hljs.registerLanguage('njk', require('highlight.js/lib/languages/django'))

/**
 * Format code with syntax highlighting
 *
 * @param {string} code - Code in plain text
 * @param {string} [language] - Code programming language
 * @returns {string} Code with syntax highlighting
 */
function highlight(code, language) {
  return hljs.highlight(code.trim(), { language: language || 'plaintext' })
    .value
}

module.exports = highlight
