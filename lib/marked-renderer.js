const { marked } = require('marked')

/**
 * Custom markdown renderer
 */
class DesignSystemRenderer extends marked.Renderer {
  /**
   * Ensure code blocks can be focused and scrolled
   * with the keyboard via `tabindex="0"`
   */
  code (code, language, isEscaped) {
    return super.code(code, language, isEscaped)
      .replace('<code', '<code tabindex="0"')
  }

  /**
   * Avoid wrapping `<img>` image tags in `<p>` paragraphs
   */
  paragraph (text) {
    return text.trim().startsWith('<img')
      ? super.html(`${text}\n`)
      : super.paragraph(text)
  }
}

module.exports = DesignSystemRenderer
