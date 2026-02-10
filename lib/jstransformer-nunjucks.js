// Based on https://www.npmjs.com/package/jstransformer-nunjucks

'use strict'

const path = require('path')

const nunjucks = require('nunjucks')

let cachedNunjucksEnv = null

function nunjucksEnv(options) {
  // Find the path for which the environment will be created.
  const envpath =
    options.root ||
    options.path ||
    (options.filename ? path.dirname(options.filename) : null)
  const { loaders } = options
  if (cachedNunjucksEnv) {
    return { env: cachedNunjucksEnv, cached: true }
  }

  let env = null
  if (loaders !== undefined) {
    // Loaders are assumed to come configured with their own baseUrl set, so envpath is ignored here
    env = new nunjucks.Environment(loaders, options)
    if (options.express) {
      env.express(options.express)
    }
  } else if (envpath) {
    env = nunjucks.configure(envpath, options)
  } else {
    env = nunjucks.configure(options)
  }

  cachedNunjucksEnv = env

  return { env, cached: false }
}

function withOption(objectOption, callback) {
  const all = objectOption
    ? Object.entries(objectOption).map(([name, value]) => {
        // The else clause is only valid for functions but older releases passed all but string
        const resolved = typeof value === 'string' ? require(value) : value
        return [name, resolved]
      })
    : []
  for (const option of all) {
    callback(option)
  }
}

const transformer = {
  name: 'nunjucks',
  inputFormats: ['njk', 'nunjucks'],
  outputFormat: 'html'
}

transformer.compile = function (source, options) {
  // Prepare the options.
  options = Object.assign({ watch: false }, options)

  const { env, cached } = nunjucksEnv(options)

  if (!cached) {
    // Normalize/ resolve options & add them to nunjucks env
    withOption(options.filters, ([name, filter]) => env.addFilter(name, filter))
    withOption(options.extensions, ([name, ext]) => env.addExtension(name, ext))
    for (const [name, global] of Object.entries(options.globals || {})) {
      env.addGlobal(name, global)
    }
  }

  // Compile the template.
  const template = nunjucks.compile(source, env, options.filename || null, true)

  // Bind the render function as the returning function.
  return template.render.bind(template)
}

module.exports = transformer
