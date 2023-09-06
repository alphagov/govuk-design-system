const { Lexer } = require('marked')

const { slugify } = require('../nunjucks/filters')

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

    const { contents, headings = [] } = files[file]
    const extracted = []

    // Heading overrides from frontmatter (e.g. aliases)
    const overrides = Object.fromEntries(
      headings.map((heading) => [slugify(heading.text), heading])
    )

    const lexer = new Lexer()
    const tokens = lexer.lex(contents.toString())

    tokens.forEach((token) => {
      if (token.type !== 'heading') {
        return
      }

      const url = slugify(token.text)
      const heading = overrides[url]

      // Add extracted heading
      extracted.push({
        depth: token.depth,
        text: token.text,
        url: heading?.url ?? url,
        aliases: heading?.aliases,

        // Flags to opt out of default behaviour
        ignoreInPageNav: !!heading?.ignoreInPageNav,
        ignoreInSearch: !!heading?.ignoreInSearch
      })
    })

    // Add extracted headings
    files[file].headings = extracted
  })

  done()
}

module.exports = extractPageHeadings
