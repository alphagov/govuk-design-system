const markdown = require('@metalsmith/markdown')
const { getHeadingList } = require('marked-gfm-heading-id')

const { DesignSystemMarked } = require('./../marked/index.js') // Markdown renderer
const { slugify } = require('./../nunjucks/filters')

const marked = new DesignSystemMarked()
const renderCache = new Map()

function cloneHeadings(headings) {
  return headings.map((heading) => ({ ...heading }))
}

function getHeadingsKey(headings) {
  return headings.length ? JSON.stringify(headings) : ''
}
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
      const headingsKey = getHeadingsKey(headings)
      const cached = renderCache.get(context.path)

      if (
        cached &&
        cached.source === source &&
        cached.headingsKey === headingsKey
      ) {
        files[context.path].headings = cloneHeadings(cached.headings)
        return cached.html
      }

      const overrides = Object.fromEntries(
        headings.map((heading) => [slugify(heading.text), heading])
      )

      const parsedMarkdown = marked.parse(source)

      const nextHeadings = [
        ...(getHeadingList() || []).map(({ text, id, level }) => ({
          depth: level,
          text,
          url: id,
          ignoreInPageNav: false,
          ignoreInSearch: false,
          ...overrides[id]
        }))
      ]

      files[context.path].headings = nextHeadings

      renderCache.set(context.path, {
        source,
        headingsKey,
        html: parsedMarkdown,
        headings: nextHeadings
      })

      return parsedMarkdown
    }
  })(files, metalsmith, done)
