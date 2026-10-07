const { dirname } = require('path')

const nunjucks = require('nunjucks')

const { navigation: navConfig } = require('./config')
const { ignoredPaths, migratedPaths } = require('./lib/eleventy/migrated.js')
const { buildNavigation } = require('./lib/eleventy/navigation.js')
const nunjucksOptions = require('./lib/nunjucks/index.js')

module.exports = function (eleventyConfig) {
  // Reuse Metalsmith's Nunjucks environment
  const environment = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(nunjucksOptions.path),
    {
      trimBlocks: nunjucksOptions.trimBlocks,
      lstripBlocks: nunjucksOptions.lstripBlocks
    }
  )

  // Register the shared filters, globals and custom tags
  for (const [name, filter] of Object.entries(nunjucksOptions.filters)) {
    environment.addFilter(name, filter)
  }

  for (const [name, global] of Object.entries(nunjucksOptions.globals)) {
    environment.addGlobal(name, global)
  }

  for (const tag of Object.values(nunjucksOptions.tags)) {
    environment.addExtension(tag.tags[0], tag)
  }

  // Mirror the Metalsmith `env()` metadata helper
  environment.addGlobal('env', (name) => {
    const defaults = {
      CONTEXT: 'production',
      NODE_ENV: 'production'
    }

    return process.env[name] ?? defaults[name]
  })

  eleventyConfig.setLibrary('njk', environment)

  eleventyConfig.addCollection('navigation', buildNavigation(navConfig))

  // Copy page assets (images etc.) referenced by markdown content
  eleventyConfig.addPassthroughCopy(
    'src-11ty/**/*.{png,jpg,jpeg,svg,gif,webp,mp4}'
  )

  eleventyConfig.addGlobalData('eleventyComputed', {
    navigation: (data) => data.collections?.navigation,

    pagePath: (data) => {
      const url = data.page?.url
      return typeof url === 'string' ? url.replace(/^\/+|\/+$/g, '') : ''
    },

    // Root files have permalink: false, which 11ty doesn't like
    permalink: (data) => {
      if (data.permalink === false) {
        return `/${data.page?.fileSlug ?? ''}.html`
      }

      return data.permalink
    }
  })

  // Only build migrated pages.
  for (const ignored of ignoredPaths()) {
    eleventyConfig.ignores.add(`src/${ignored}`)
  }

  // Copy page assets
  for (const migrated of migratedPaths) {
    const dir = dirname(migrated)

    // Only copy assets from subdirectories
    if (dir !== '.') {
      eleventyConfig.addPassthroughCopy(
        `src/${dir}/**/*.{png,jpg,jpeg,svg,gif,webp,mp4}`
      )
    }
  }

  // Only build migrated pages.
  for (const ignored of ignoredPaths()) {
    eleventyConfig.ignores.add(`src/${ignored}`)
  }

  // Copy page assets
  for (const migrated of migratedPaths) {
    const dir = dirname(migrated)

    // Only copy assets from subdirectories
    if (dir !== '.') {
      eleventyConfig.addPassthroughCopy(
        `src/${dir}/**/*.{png,jpg,jpeg,svg,gif,webp,mp4}`
      )
    }
  }

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',

      layouts: '../views/layouts',

      output: 'build-11ty'
    }
  }
}
