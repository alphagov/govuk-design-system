const crypto = require('crypto')

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
}

module.exports = new FileTracker()
