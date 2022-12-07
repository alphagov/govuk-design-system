const fs = require('fs')
const { join, normalize } = require('path')

const matter = require('gray-matter')
const beautify = require('js-beautify')
const nunjucks = require('nunjucks')
const slash = require('slash')

const { paths } = require('../config')

nunjucks.configure(join(paths.views, 'layouts'))

// This helper function takes a path of a file and
// returns the contents as string
exports.getFileContents = path => {
  let fileContents
  try {
    fileContents = fs.readFileSync(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(err.message)
    } else {
      throw err
    }
  }
  return fileContents.toString()
}

// This helper function takes a path of a *.md.njk file and
// returns the Nunjucks syntax inside that file without markdown data and imports
exports.getNunjucksCode = path => {
  const fileContents = this.getFileContents(path)

  const parsedFile = matter(fileContents)

  // Omit any `{% extends "foo.njk" %}` nunjucks code, because we extend
  // templates that only exist within the Design System – it's not useful to
  // include this in the code we expect others to copy.
  return parsedFile.content.replace(
    /{%\s*extends\s*\S*\s*%}\s+/,
    ''
  )
}

// Renders a Nunjucks macro component outside of a template.
exports.renderNunjucksMacro = (macroName, macroPath, options) => {
  const macroOptions = JSON.stringify(options, undefined, 2)

  let macroString = `{%- from "${macroPath}" import ${macroName} -%}`
  macroString += `{{- ${macroName}(${macroOptions}) -}}`

  return nunjucks.renderString(macroString)
}

// This helper function takes a path of a *.md.njk file and
// returns the frontmatter as an object
exports.getFrontmatter = path => {
  const fileContents = this.getFileContents(path)

  const parsedFile = matter(fileContents)
  return parsedFile.data
}

// Get 'fingerprinted' version of a given asset file.
exports.getFingerprint = function (file) {
  file = normalize(file)

  // Skip fingerprints in development for Browsersync inject (without reload)
  if (process.env.NODE_ENV === 'development') {
    return '/' + slash(file)
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
  return '/' + slash(fingerprints[file].path)
}

// This helper function takes a path of a *.md.njk file and
// returns the HTML rendered by Nunjucks without markdown data
exports.getHTMLCode = path => {
  const fileContents = this.getFileContents(path)

  const parsedFile = matter(fileContents)
  const content = parsedFile.content

  let html = ''
  try {
    html = nunjucks.renderString(content).trim()
  } catch (err) {
    if (err) {
      console.log('Could not get HTML code from ' + path)
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
