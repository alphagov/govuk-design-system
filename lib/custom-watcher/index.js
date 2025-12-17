// lib/custom-watcher/index.js
const crypto = require('crypto')

class FileTracker {
  constructor() {
    this.lastHashes = new Map()
    this.isFirstBuild = true
  }

  updateMetadata(files, metalsmith) {
    if (this.isFirstBuild) {
      // First build - compute hashes for all files
      for (const [path, file] of Object.entries(files)) {
        if (file.contents) {
          const hash = crypto
            .createHash('md5')
            .update(file.contents)
            .digest('hex')
          this.lastHashes.set(path, hash)
        }
      }
      metalsmith.metadata().changedFiles = null
      console.log(
        `[FileTracker] First build - tracking ${this.lastHashes.size} files`
      )
      this.isFirstBuild = false
    } else {
      // Find changed files
      const changed = []
      const currentHashes = new Map()

      for (const [path, file] of Object.entries(files)) {
        if (file.contents) {
          const hash = crypto
            .createHash('md5')
            .update(file.contents)
            .digest('hex')
          currentHashes.set(path, hash)

          if (
            !this.lastHashes.has(path) ||
            this.lastHashes.get(path) !== hash
          ) {
            changed.push(path)
          }
        }
      }

      this.lastHashes = currentHashes
      metalsmith.metadata().changedFiles = changed.length > 0 ? changed : null
      console.log(
        `[FileTracker] Detected ${changed.length} changed files:`,
        changed
      )
    }
  }
}

module.exports = new FileTracker()
