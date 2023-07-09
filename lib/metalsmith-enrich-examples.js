const { sep, join, dirname } = require('path')

const slash = require('slash')
const slugger = require('slugger') // generate slugs from titles

const fileHelper = require('./file-helper.js')

/**
 * Plugin that enriches and remaps `file.examples` with custom computed properties
 * @example
 * const files = {}
 * // before
 * files['components/accordion/index.md'] = {
 *   examples: {
 *     default: {
 *       nunjucks: true,
 *       html: true,
 *       titleSuffix: 'Extra',
 *       example: 'default'
 *     }
 *   }
 * }
 *
 * enrichExamples(files, metalsmith)
 *
 * // after
 * files['components/accordion/index.md'].examples.default === {
 *   nunjucks: '<nunjucks source of matching example>',
 *   html: '<html rendering of the component>',
 *   title: 'Accordion Extra',
 *   titleSuffix: 'Extra',
 *   url: `components/accordion/default/index.njk`,
 *   example: 'default',
 *   id: 'accordion-extra-example'
 * }
 */
module.exports = function enrichExamples (files, metalsmith) {
  const debug = metalsmith.debug('metalsmith-enrich-examples')
  Object.entries(files).forEach(([parentPath, file]) => {
    if (!file.examples) return

    // allow omitting group, item in file frontmatter and infer them from dir structure
    // dirname(parentPath) === ':group/:item'
    const defaults = {
      group: dirname(parentPath).split(sep).slice(-2)[0],
      item: dirname(parentPath).split(sep).slice(-1)[0],
      displayExample: true,
      html: false,
      nunjucks: false
    }

    // for each example, transform frontmatter examples input objects into example specs objects
    // ready for input to the nunjucks example macro
    Object.keys(file.examples).forEach(name => {
      debug.info('Computing metadata for examples.%s at "%s"', name, parentPath)
      const ex = file.examples[name] = { ...defaults, ...file.examples[name] }
      const { group, item, example, customCode, open, id, html, nunjucks } = ex

      const path = join(group, item, example, `${customCode ? 'code' : 'index'}.njk`)
      const url = '/' + slash(join(group, item, example, 'index.html'))
      const exampleFile = files[path]

      if (!exampleFile) {
        debug.error('Skipping example "examples.%s", file "%s" not found.', example, path)
        return
      }

      // Omit any `{% extends "foo.njk" %}` nunjucks code, because we extend
      // templates that only exist within the Design System – it's not useful to
      // include this in the code we expect others to copy.
      if (nunjucks) ex.nunjucks = exampleFile.contents.toString().replace(/{%\s*extends\s*\S*\s*%}\s+/, '')
      if (html) ex.html = fileHelper.getHTMLCode(path, exampleFile)

      // eslint missreads the ternaries below as 'no-unneeded-ternary'
      const suffix = ex.titleSuffix ? ` ${ex.titleSuffix}` : ''
      ex.title = `${exampleFile.title}${suffix}`
      ex.url = url

      ex.id = slugger(id || `${ex.title} example`)
      ex.id += open ? '-open' : ''
    })
  })
}
