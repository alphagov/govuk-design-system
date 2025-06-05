const { createHash } = require('crypto')
const { lstat, mkdir, rm, writeFile } = require('fs/promises')
const { join, resolve } = require('path')

const { root } = require('../../config/paths.js')

module.exports = function metalsmithCache(name, pattern, plugin) {
  return async function (files, metalsmith, done) {
    try {
      // Find matching files
      const matches = metalsmith.match(pattern)

      const hash = createHash('md5')
      matches.sort()
      // Hash using filenames and contents of files
      matches.forEach((filename) => {
        hash.update(filename).update(files[filename].contents)
      })
      const hashValue = hash.digest('hex')

      // Get the cache marker file name
      const cachePath = resolve(__dirname, root, `.cache/${name}`)
      const cacheFile = join(cachePath, `metalsmith-cache-${name}-${hashValue}`)

      // If the cache file exists, skip the plugin
      if (
        await lstat(cacheFile)
          .then(() => true)
          .catch(() => false)
      ) {
        return done()
      }

      await rm(cachePath, { recursive: true, force: true })
      await mkdir(cachePath, { recursive: true })
      await writeFile(cacheFile, '')

      // Run plugin, then write marker
      await new Promise((resolve, reject) => {
        plugin(files, metalsmith, (err) => (err ? reject(err) : resolve()))
      })

      done()
    } catch (err) {
      console.log(`Error in metalsmith-cache plugin ${name}:`, err)
      done(err)
    }
  }
}
