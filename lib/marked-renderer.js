const { marked } = require('marked')

/**
 * Custom markdown renderer
 */
class DesignSystemRenderer extends marked.Renderer {
  // Explicitly set deprecated properties to false
  constructor () {
    super({
      headerIds: false,
      mangle: false
    })
  }

  /**
   * Assume HTML when no code block language provided
   * (for example, HTML code inside Markdown)
   *
   * @returns {string} Code block
   */
  code (code, language, isEscaped) {
    return !language
      ? super.html(code)
      : super.code(code, language, isEscaped)

        // Ensure code blocks can be focused and scrolled
        // with the keyboard via `tabindex="0"`
        .replace('<code', '<code tabindex="0"')
  }

  /**
   * Avoid wrapping `<img>` image tags in `<p>` paragraphs
   *
   * @returns {string} Paragraph
   */
  paragraph (text) {
    return text.trim().startsWith('<img')
      ? super.html(`${text}\n`)
      : super.paragraph(text)
  }
}

module.exports = DesignSystemRenderer
