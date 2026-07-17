const nunjucks = require('nunjucks')
const outdent = require('outdent')

const { DesignSystemMarked } = require('../marked')

const { parse } = new DesignSystemMarked()

// Based on the guidance: https://mozilla.github.io/nunjucks/api.html#custom-tags
exports.markdown = {
  tags: ['markdown'],

  parse: function (parser, nodes) {
    // Get the tag's name and then move to the next symbol
    const tagName = parser.nextToken().value

    // Parse any potential arguments
    // Second argument is set to `true` to allow for no parentheses
    const args = parser.parseSignature(null, true)

    // If the tag has arguments then throw an error since it doesnt support any
    if (args.children.length > 0) {
      throw new Error(`${tagName} tag does not support arguments.`)
    }

    // Move past the tag name symbol onto the body content
    parser.advanceAfterBlockEnd(tagName)

    // Get the Markdown inside the tag
    const body = parser.parseUntilBlocks(`end${tagName}`)

    // Move past the tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtension(this, 'render', args, [body])
  },

  render: function (context, body) {
    const markdown = body()
    // Parse the markdown and turn into HTML
    const html = parse(outdent.string(markdown))
    // Mark the HTML as safe to render
    return new nunjucks.runtime.SafeString(html)
  }
}
