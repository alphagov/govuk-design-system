const { createHmac } = require('crypto')
const { basename, dirname, join, parse } = require('path')

/**
 * Metalsmith files hasher plugin
 *
 * @param {object} config - Plugin config
 * @param {string[]} config.pattern - File match glob patterns
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const hashAssets = (config) => (files, metalsmith, done) => {
  const hasher = hashAsset(files, metalsmith)

  // Metalsmith file paths
  const paths = Object.keys(files)

  try {
    const entries = metalsmith

      // Hash all paths matching pattern
      .match(config.pattern, paths)
      .map((pathAsset) => [pathAsset, hasher(pathAsset)])

    // Collect fingerprints
    const { fingerprints } = metalsmith.metadata()

    // Replace assets with hashed files
    entries.forEach(([pathAsset, fingerprint]) => {
      const { ext } = parse(pathAsset)

      // Filter assets with source maps
      if (['.css', '.cjs', '.js', '.mjs'].includes(ext)) {
        const pathMap = getSourceMapPath(pathAsset, files[pathAsset].contents)

        // Check asset for source map
        if (pathMap && fingerprints[pathMap]) {
          const hashMap = fingerprints[pathMap].hash

          // Replace source map URL with hashed filename
          files[pathAsset].contents = Buffer.from(
            files[pathAsset].contents.toString()
              .replace(basename(pathMap), basename(fingerprints[pathMap].path))
          )

          // Synchronise file + source map hashes
          fingerprint.path = fingerprint.path.replace(fingerprint.hash, hashMap)
          fingerprint.hash = hashMap

          // Update metadata
          fingerprints[pathAsset] = fingerprint
        }
      }

      // Replace asset with hashed file
      files[fingerprint.path] = files[pathAsset]
      delete files[pathAsset]
    })

    done()
  } catch (error) {
    done(error)
  }
}

/**
 * Metalsmith file hasher
 *
 * @param {import('metalsmith').Files} files - Metalsmith files
 * @param {import('metalsmith')} metalsmith - Metalsmith builder
 */
const hashAsset = (files, metalsmith) => {
  const metadata = metalsmith.metadata()
  const fingerprints = metadata.fingerprints || {}

  // Save to metadata
  metadata.fingerprints ??= fingerprints

  /**
   * File hasher
   *
   * @param {string} pathAsset - File path
   * @returns {{ path: string; hash: string }} Fingerprint object
   */
  return (pathAsset) => {
    fingerprints[pathAsset] = hashPath(pathAsset, files[pathAsset].contents)
    return fingerprints[pathAsset]
  }
}

/**
 * Fingerprint file path
 *
 * @param {string} pathAsset - File path
 * @param {import('crypto').BinaryLike} contents - File contents
 * @returns {{ path: string; hash: string }} Fingerprint object
 */
function hashPath (pathAsset, contents) {
  let { dir, name, ext } = parse(pathAsset)

  // Gather multiple extensions
  // For example 'js' from `*.js.map`
  while (name.includes('.')) {
    const file = parse(name)

    // Update parsed file
    ext = `${file.ext}${ext}`
    name = file.name
  }

  // Generate hash from file name + contents
  const hash = createHmac('md5', name)
    .update(contents)
    .digest('hex')

  // File path hashed
  const path = join(dir, `${name}-${hash}${ext}`)

  return { path, hash }
}

/**
 * Extract source map URL from string
 *
 * @param {string} pathAsset - File path
 * @param {import('crypto').BinaryLike} contents - File contents
 * @returns {string | undefined} Source map URL
 */
function getSourceMapPath (pathAsset, contents) {
  const sourceMappingURL = /# sourceMappingURL=(?<path>.*\.map)/g
    .exec(contents.toString())?.groups?.path

  if (sourceMappingURL) {
    return join(dirname(pathAsset), sourceMappingURL)
  }
}

module.exports = {
  hashAssets,
  hashAsset,
  hashPath
}
