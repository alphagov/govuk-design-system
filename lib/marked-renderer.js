const { marked } = require('marked')

/** A custom renderer that avoids wrapping `<img>` tags in `<p>` tags */
class DesignSystemRenderer extends marked.Renderer {
  paragraph (text) {
    return text.trim().startsWith('<img')
      ? super.html(`${text}\n`)
      : super.paragraph(text)
  }
}

module.exports = DesignSystemRenderer
