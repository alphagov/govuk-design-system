const { Lexer } = require('marked')

/**
 * Metalsmith extract headings plugin
 *
 * @param {string[]} config.pattern - File match glob patterns
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const extractPageHeadings = () => (files, metalsmith, done) => {
  Object.keys(files).forEach((file) => {
    if (!file.endsWith('.njk') && !file.endsWith('.md')) {
      return
    }

    const { contents, headingAliases = [] } = files[file]
    const headings = []

    const lexer = new Lexer()
    const tokens = lexer.lex(contents.toString())

    tokens.forEach((token) => {
      if (token.type !== 'heading') {
        return
      }

      // Build search aliases for matching headings
      const aliases = Object.entries(headingAliases)
        .filter((alias) => alias[0] === token.text)
        .map((alias) => alias[1])
        .join()

      // Add extracted heading
      headings.push({
        depth: token.depth,
        text: token.text,
        url: token.text.toLowerCase().replace(/[^\w]+/g, '-'),
        aliases: aliases || null
      })
    })

    // Add extracted headings
    files[file].headings = headings
  })

  done()
}

module.exports = extractPageHeadings
