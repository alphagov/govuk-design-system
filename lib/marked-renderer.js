const { marked } = require('marked')

// Temporary fix for silencing deprecation messages till options are removed
// in a future version of `marked`
marked.use({
  mangle: false,
  headerIds: false
})

/**
 * Custom markdown renderer
 */
class DesignSystemRenderer extends marked.Renderer {
  /**
   * Assume HTML when no code block language provided
   * (for example, HTML code inside Markdown)
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
   */
  paragraph (text) {
    return text.trim().startsWith('<img')
      ? super.html(`${text}\n`)
      : super.paragraph(text)
  }
}

module.exports = DesignSystemRenderer
