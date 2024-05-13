const markdown = require('@metalsmith/markdown')
const { getHeadingList } = require('marked-gfm-heading-id')

const { DesignSystemMarked } = require('./../marked/index.js') // Markdown renderer
const { slugify } = require('./../nunjucks/filters')

const marked = new DesignSystemMarked()
/**
 * Metalsmith markdown plugin
 *
 * Renders markdown and extracts headings from markdown
 * and assigns to 'headings' variable of each file.
 *
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
module.exports = () => (files, metalsmith, done) =>
  markdown({
    render(source, opts, context) {
      const { headings = [] } = files[context.path]

      const overrides = Object.fromEntries(
        headings.map((heading) => [slugify(heading.text), heading])
      )

      const parsedMarkdown = marked.parse(source)

      files[context.path].headings = [
        ...(getHeadingList() || []).map(({ text, id, level }) => ({
          depth: level,
          text,
          url: id,
          ignoreInPageNav: false,
          ignoreInSearch: false,
          ...overrides[id]
        }))
      ]

      return parsedMarkdown
    }
  })(files, metalsmith, done)
