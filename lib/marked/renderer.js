/**
 * Skip highlighting when no code block language provided
 * (for example, HTML code inside Markdown)
 *
 * @param {TokenCode} token - Marked code token
 */
exports.code = function (token) {
  if (!token.lang) {
    return token.raw
  }

  // Ensure code blocks can be focused and scrolled
  // with the keyboard via `tabindex="0"`
  return `<pre><code tabindex="0" class="language-${token.lang}">${token.text}</code></pre>\n`
}

/**
 * Render single images without `<p>` wrappers
 *
 * @param {TokenText | TokenParagraph} token - Marked paragraph token
 */
exports.image = function (token) {
  const { tokens } = token

  return tokens?.length === 1 && tokens[0].type === 'image'
    ? `${this.parser.parseInline(tokens)}\n`
    : false // Fall back to default renderer
}

/**
 * @typedef {import('marked').Tokens.Code} TokenCode
 * @typedef {import('marked').Tokens.Text} TokenText
 * @typedef {import('marked').Tokens.Paragraph} TokenParagraph
 */
