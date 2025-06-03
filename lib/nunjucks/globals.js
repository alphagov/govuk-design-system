const { readFileSync } = require('fs')
const { join } = require('path')

const matter = require('gray-matter')
const beautify = require('js-beautify')
const nunjucks = require('nunjucks')
const slash = require('slash')

const { paths } = require('../../config')
const getMacroOptions = require('../get-macro-options/index.js')

const { isActive } = require('./filters.js')

nunjucks.configure(join(paths.views, 'layouts'))

// Set rebrand global on by default
exports.govukRebrand = true

/**
 * This helper function takes a path of a *.md.njk file and
 * returns the Nunjucks syntax inside that file without markdown data and imports
 *
 * @param {string} path - Path to Nunjucks file
 * @returns {string} Nunjucks code for the file
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
 *
 * @param {string} path - Path to Nunjucks file
 * @returns {{ [key: string]: unknown }} Frontmatter object
 */
exports.getFrontmatter = function (path) {
  return matter(readFileSync(path, 'utf-8')).data
}

/**
 * Get 'fingerprinted' version of a given asset file
 *
 * @param {string} pathname - URL path to asset
 * @returns {string} URL path to asset with added hash fingerprint
 */
exports.getFingerprint = function (pathname) {
  let file = pathname.replace(/^\/+/, '')

  // Grab fingerprint array from the template context
  const fingerprints = this.lookup('fingerprints') ?? {}
  const canonical = this.lookup('canonical')

  // If that fails, and we know the path of the current file, look for a
  // fingerprinted asset relative to the current file (e.g. `../foo.css`)
  if (!fingerprints[file] && !pathname.startsWith('/') && canonical) {
    const { pathname } = new URL(canonical)

    // Resolve `../` but remove leading slash
    file = join(pathname, file).replace(/^\/+/, '')
  }

  // Skip fingerprints in development for Browsersync inject (without reload)
  if (process.env.NODE_ENV === 'development') {
    return `/${slash(file)}`
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
 *
 * @param {string} path - Path to Nunjucks file
 * @returns {string} HTML rendered by the file
 */
exports.getHTMLCode = function (path) {
  const { content } = matter(readFileSync(path, 'utf-8'))

  let html = ''
  try {
    html = nunjucks.renderString(content).trim()
  } catch (error) {
    console.log(`Could not get HTML code from ${path}`)
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

/**
 * This helper function traverses the navigation object to find an item with a
 * given `url`, and returns the ancestors of that item.
 *
 * NOTE: This is used to assemble breadcrumb navigation, so outputs the result
 * with keys and values used by that component. These differ from those used
 * internally.
 *
 * @param {string} targetUrl - The URL to look for, without leading `/`
 * @returns {AncestorPage[]} Array of ancestor pages to this one
 */
exports.getAncestorPages = function (targetUrl) {
  // Get navigation object from the template context
  const navigationContext = this.lookup('navigation') ?? []

  // Create a stack to store our levels of hierarchy in.
  // The homepage doesn't appear in the `navigation` object,
  // so it needs adding manually
  const ancestors = [{ text: 'Home', href: '/' }]

  // Create a recursive function we can use to navigate the nested objects
  const traverse = function (navItemArray) {
    // Using a for instead of a forEach so that we can break the loop once done.
    for (let i = 0; i < navItemArray.length; i++) {
      const navItem = navItemArray[i]

      // If the target URL and item URL match, it's the current page. It doesn't
      // get added to the stack, but it implies that we've reached our target
      // so there's no reason to continue searching.
      if (targetUrl === navItem.url) {
        break
      }

      // If the target URL *begins* with the current item URL, it's an ancestor
      // of the target page. Add it to the stack and start looking through it's
      // child items.
      if (navItem.items && isActive(navItem, targetUrl)) {
        ancestors.push({ text: navItem.label, href: `/${navItem.url}` })
        traverse(navItem.items)
      }
    }
  }

  // Call the recursive function
  traverse(navigationContext)

  return ancestors
}

exports.getMacroOptions = getMacroOptions

/**
 * @typedef {object} AncestorPage
 * @property {string} href - The URL of the ancestor page
 * @property {string} text - The title of the ancestor page
 */
