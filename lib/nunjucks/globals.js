const { readFileSync } = require('fs')
const { join } = require('path')

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
 * This helper function takes a path of a *.erb file and
 * returns the Rails syntax inside that file without markdown data
 *
 * @param {string} path - Path to ERb file
 * @returns {string} ERb code for the file
 */
exports.getRubyOnRailsCode = (path) => {
  const { content } = matter(readFileSync(path, 'utf-8'))

  return content
}

/**
 * This helper function takes an component name and returns
 * a URL for the full documentation for that Rails helper.
 *
 * @param {string} componentName - Name of component
 * @returns {string} URL - Link to documentation page
 */
exports.getRailsLink = (componentName) => {
  const links = {
    accordion: 'https://govuk-components.netlify.app/components/accordion/',
    'back-link': 'https://govuk-components.netlify.app/components/back-link/',
    breadcrumb: 'https://govuk-components.netlify.app/components/breadcrumbs/',
    'character-count':
      'https://govuk-form-builder.netlify.app/form-elements/textarea/',
    checkboxes:
      'https://govuk-form-builder.netlify.app/form-elements/checkboxes/',
    'cookie-banner':
      'https://govuk-components.netlify.app/components/cookie-banner/',
    'date-input':
      'https://govuk-form-builder.netlify.app/form-elements/date-input/',
    details: 'https://govuk-components.netlify.app/components/details/',
    'error-message':
      'https://govuk-form-builder.netlify.app/introduction/error-handling/',
    'error-summary':
      'https://govuk-form-builder.netlify.app/introduction/error-handling/',
    'exit-this-page':
      'https://govuk-components.netlify.app/components/exit-this-page/',
    fieldset:
      'https://govuk-form-builder.netlify.app/building-blocks/fieldsets/',
    'file-upload':
      'https://govuk-form-builder.netlify.app/form-elements/file-upload/',
    footer: 'https://govuk-components.netlify.app/components/footer/',
    header: 'https://govuk-components.netlify.app/components/header/',
    'inset-text': 'https://govuk-components.netlify.app/components/inset-text/',
    'notification-banner':
      'https://govuk-components.netlify.app/components/notification-banner/',
    pagination: 'https://govuk-components.netlify.app/components/pagination/',
    panel: 'https://govuk-components.netlify.app/components/panel/',
    'phase-banner':
      'https://govuk-components.netlify.app/components/phase-banner/',
    radios: 'https://govuk-form-builder.netlify.app/form-elements/radios/',
    select: 'https://govuk-form-builder.netlify.app/form-elements/select/',
    'skip-link': 'https://govuk-components.netlify.app/helpers/skip-link/',
    'summary-list':
      'https://govuk-components.netlify.app/components/summary-list/',
    table: 'https://govuk-components.netlify.app/components/table/',
    tabs: 'https://govuk-components.netlify.app/components/tabs/',
    tag: 'https://govuk-components.netlify.app/components/tag/',
    'task-list': 'https://govuk-components.netlify.app/components/task-list/',
    'text-input':
      'https://govuk-form-builder.netlify.app/form-elements/text-input/',
    textarea: 'https://govuk-form-builder.netlify.app/form-elements/textarea/',
    'warning-text':
      'https://govuk-components.netlify.app/components/warning-text/'
  }

  const fallbackLink = 'https://govuk-components.netlify.app/'

  return links[componentName] || fallbackLink
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

exports.getMacroOptions = getMacroOptions
