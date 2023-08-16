const { readFileSync } = require('fs')
const { join, normalize } = require('path')

const matter = require('gray-matter')
const beautify = require('js-beautify')
const nunjucks = require('nunjucks')
const slash = require('slash')

const { paths } = require('../../config')
const getMacroOptions = require('../get-macro-options/index.js')

nunjucks.configure(join(paths.views, 'layouts'))

/**
 * This helper function takes a path of a *.md.njk file and
 * returns the Nunjucks syntax inside that file without markdown data and imports
 */
exports.getNunjucksCode = function (path) {
  const { content } = matter(readFileSync(path, 'utf-8'))

  // Omit any `{% extends "foo.njk" %}` nunjucks code, because we extend
  // templates that only exist within the Design System – it's not useful to
  // include this in the code we expect others to copy.
  return content.replace(/{%\s*extends\s*\S*\s*%}\s+/, '')
}

/**
 * This helper function takes a path of a *.md.njk file and
 * returns the frontmatter as an object
 */
exports.getFrontmatter = function (path) {
  return matter(readFileSync(path, 'utf-8')).data
}

/**
 * Get 'fingerprinted' version of a given asset file
 */
exports.getFingerprint = function (file) {
  file = normalize(file)

  // Skip fingerprints in development for Browsersync inject (without reload)
  if (process.env.NODE_ENV === 'development') {
    return `/${slash(file)}`
  }

  // Grab fingerprint array from the template context
  const filePath = this.lookup('permalink')
  const fingerprints = this.lookup('fingerprints') ?? {}

  // If that fails, and we know the path of the current file, look for a
  // fingerprinted asset relative to the current file (e.g. `../foo.css`)
  //
  // We only know the path of the current file when we're compiling the layout –
  // calls to this function with a relative path will fail if made from the
  // source files themselves.
  if (!fingerprints[file] && filePath) {
    file = join(filePath, file)
  }

  // The thrown error will stop the build, but not provide any useful output,
  // so we have to console.log as well.
  if (!fingerprints[file]) {
    console.log(`Could not find fingerprint for file ${file}`)
    throw new Error(`Could not find fingerprint for file ${file}`)
  }

  // Look for a fingerprinted asset at this path relative to the site root
  return `/${slash(fingerprints[file].path)}`
}

/**
 * This helper function takes a path of a *.md.njk file and
 * returns the HTML rendered by Nunjucks without markdown data
 */
exports.getHTMLCode = function (path) {
  const { content } = matter(readFileSync(path, 'utf-8'))

  let html = ''
  try {
    html = nunjucks.renderString(content).trim()
  } catch (err) {
    if (err) {
      console.log(`Could not get HTML code from ${path}`)
    }
  }

  const options = beautify.html.defaultOptions()

  return beautify.html(html, {
    indent_size: 2,
    // Ensure nested labels in headings are indented properly
    inline: options.inline.filter((tag) => !['label'].includes(tag)),
    // Remove blank lines
    max_preserve_newlines: 0,
    // Ensure attribute wrapping in header SVG is preserved
    wrap_attributes: 'preserve'
  })
}

exports.getMacroOptions = getMacroOptions
