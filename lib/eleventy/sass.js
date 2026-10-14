const { mkdir, writeFile } = require('fs/promises')
const { basename, join } = require('path')

const autoprefixer = require('autoprefixer')
const { glob } = require('glob')
const postcss = require('postcss')
const { compile, NodePackageImporter } = require('sass')

const { paths } = require('../../config')

/**
 * Match the metalsmith options
 */
const sassOptions = {
  quietDeps: true,
  sourceMapIncludeSources: true,
  importers: [new NodePackageImporter()],
  loadPaths: [join(paths.source, 'stylesheets')]
}

/**
 * Compile the Sass entrypoints in src/stylesheets to CSS in 11ty's output
 * directory
 *
 * This is a bit weird, since we don't really want to duplicate sass, but
 * the "11ty" way would involve having the files within the 11ty folders.
 *
 * So a bit of extra faff to keep the single source of truth. When 11ty has
 * fully replaced metalsmith, we could simplify this and make it more "11ty".
 *
 * @param {string} outputDir - 11ty output directory (e.g. 'build-11ty')
 * @returns {Promise<string[]>} Written CSS file paths
 */
async function compileStylesheets(outputDir) {
  const entrypoints = await glob('*.scss', {
    cwd: join(paths.source, 'stylesheets')
  })

  const written = []

  for (const entrypoint of entrypoints) {
    const inputPath = join(paths.source, 'stylesheets', entrypoint)
    const name = basename(entrypoint, '.scss')

    // Compile Sass to CSS
    const result = compile(inputPath, {
      ...sassOptions,
      sourceMap: true
    })

    // Add vendor prefixes
    const processed = await postcss([
      autoprefixer({ env: 'stylesheets' })
    ]).process(result.css, {
      from: `stylesheets/${name}.css`,
      to: `stylesheets/${name}.css`,
      map: { prev: result.sourceMap, inline: false, annotation: false }
    })

    const cssPath = join(outputDir, 'stylesheets', `${name}.css`)

    await mkdir(join(outputDir, 'stylesheets'), { recursive: true })

    // Append the source map annotation, matching the Metalsmith output
    await writeFile(
      cssPath,
      `${processed.css}\n/*# sourceMappingURL=${name}.css.map */`
    )
    await writeFile(`${cssPath}.map`, processed.map.toString())

    written.push(cssPath)
  }

  return written
}

module.exports = { compileStylesheets, sassOptions }
