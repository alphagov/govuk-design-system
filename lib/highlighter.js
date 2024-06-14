const hljs = require('highlight.js')

hljs.registerLanguage('erb', require('highlight.js/lib/languages/erb'))

// Highlight Nunjucks as JavaScript
hljs.registerLanguage('njk', require('highlight.js/lib/languages/javascript'))

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
