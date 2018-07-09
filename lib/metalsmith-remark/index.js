var basename = require('path').basename
var debug = require('debug')('metalsmith-markdown')
var dirname = require('path').dirname
var extname = require('path').extname

const merge = require('deepmerge')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const raw = require('rehype-raw')
const sanitize = require('rehype-sanitize')
const format = require('rehype-format')
const html = require('rehype-stringify')

const addClasses = require('./add-classes.js')

const githubSchema = require('hast-util-sanitize/lib/github')
const defaultSchema = merge(githubSchema, {
  // This extension relies on being able to add custom classes to elements.
  attributes: { '*': [ 'className' ] }
})

function renderMarkdown (body, options) {
  options = options || {}
  // https://github.com/syntax-tree/mdast
  let classNames = options.classNames || {}
  let sanitizeSchema = merge(defaultSchema, options.sanitizeSchema || {})
  let rehypePlugins = options.rehypePlugins || []
  let remarkPlugins = options.remarkPlugins || []

  // Parse markdown into a markdown remark AST
  return unified()
          .use(markdown)
          .use(addClasses, { classNames })
          .use(remarkPlugins)
          .use(remark2rehype, { allowDangerousHTML: true })
          .use(raw)
          .use(rehypePlugins)
          // .use(sanitize, sanitizeSchema)
          .use(format)
          .use(html)
          .processSync(body)
          .toString()
}

/**
 * Expose `plugin`.
 */
module.exports = plugin

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */
function plugin (options) {
  options = options || {}
  var keys = options.keys || []

  return function (files, metalsmith, done) {
    setImmediate(done)
    Object.keys(files).forEach(function (file) {
      debug('checking file: %s', file)
      if (!isMarkdownFile(file)) return
      var data = files[file]
      var dir = dirname(file)
      var html = basename(file, extname(file)) + '.html'
      if (dir !== '.') {
        html = dir + '/' + html
      }

      debug('converting file: %s', file)
      var str = renderMarkdown(data.contents.toString(), options)
      data.contents = Buffer.from(str)
      keys.forEach(function (key) {
        data[key] = renderMarkdown(data[key], options)
      })

      delete files[file]
      files[html] = data
    })
  }
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */
function isMarkdownFile (file) {
  return /\.md|\.markdown/.test(extname(file))
}
