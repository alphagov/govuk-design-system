const { gfmHeadingId } = require('marked-gfm-heading-id')
const { markedHighlight } = require('marked-highlight')
const { markedSmartypants } = require('marked-smartypants')
const { smartypantsu } = require('smartypants')

// Highlight.js code syntax highlighter
const highlight = require('../highlighter.js')

// Extension: Heading ID attributes
exports.headingIds = gfmHeadingId()

// Extension: Code syntax highlighter
exports.highlight = markedHighlight({ highlight })

// Extension: Code syntax highlighter
exports.smartyPants = {
  ...markedSmartypants(),

  // Use UTF-8 characters not HTML entities
  hooks: {
    postprocess(html) {
      return smartypantsu(html, 'qe') // Quotes, ellipses, but not dashes
    }
  }
}
