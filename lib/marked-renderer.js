// A custom renderer that avoids wrapping <img> tags in <p> tags
const { marked } = require('marked')

class DesignSystemRenderer extends marked.Renderer {
  paragraph (text) {
    if (text.startsWith('<img')) {
      return `${text}\n`
    }
    return super.paragraph(text)
  }
}

module.exports = new DesignSystemRenderer()
