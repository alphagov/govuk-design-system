const crypto = require('crypto')

const micromatch = require('micromatch')

/**
 * Keeps track of file changes between builds by storing hashes of file contents
 * and updating Metalsmith metadata with a list of changed files.
 */
class FileTracker {
  constructor() {
    this.lastHashes = new Map()
  }

  updateMetadata() {
    return (files, metalsmith) => {
      const changed = []
      const currentHashes = new Map()

      for (const [path, file] of Object.entries(files)) {
        if (!file.contents) continue

        const hash = crypto
          .createHash('md5')
          .update(file.contents)
          .digest('hex')
        currentHashes.set(path, hash)

        if (this.lastHashes.get(path) !== hash) {
          changed.push(path)
        }
      }

      this.lastHashes = currentHashes
      metalsmith.metadata().changedFiles = changed.length > 0 ? changed : null
    }
  }

  filterOutputFiles() {
    return (files, metalsmith, done) => {
      const changedFiles = metalsmith.metadata().changedFiles

      if (!changedFiles) {
        return done()
      }

      Object.keys(files).forEach((path) => {
        if (!changedFiles.includes(path)) {
          delete files[path]
        }
      })

      done()
    }
  }

  runIfPatternMatches(patterns, plugin) {
    return (files, metalsmith, done) => {
      const changedFiles = metalsmith.metadata().changedFiles

      if (changedFiles && micromatch.some(changedFiles, patterns)) {
        return plugin(files, metalsmith, done)
      }

      done()
    }
  }

  runOnMatchedFiles(pattern, plugin, options = {}) {
    return (files, metalsmith, done) => {
      const changedFiles = metalsmith.metadata().changedFiles

      if (!changedFiles) {
        return plugin(options)(files, metalsmith, done)
      }

      const matchedFiles = micromatch(changedFiles, pattern)

      if (matchedFiles.length === 0) {
        return done()
      }

      const modifiedOptions = {
        ...options,
        pattern: matchedFiles
      }

      return plugin(modifiedOptions)(files, metalsmith, done)
    }
  }
}

module.exports = new FileTracker()
