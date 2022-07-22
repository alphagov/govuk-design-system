// A custom renderer that avoids wrapping <img> tags in <p> tags
const { marked } = require('marked')

const markedRenderer = new marked.Renderer()

markedRenderer.paragraph = function (text) {
  if (text.startsWith('<img')) {
    return `${text}\n`
  }
  return `<p>${text}</p>\n`
}

module.exports = markedRenderer
