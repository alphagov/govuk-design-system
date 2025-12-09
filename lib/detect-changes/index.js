const crypto = require('crypto')
const { existsSync, readFileSync, mkdirSync, writeFileSync } = require('fs')
const { join } = require('path')

const CACHE_DIR = '.cache'
const CACHE_FILE = join(CACHE_DIR, 'file-hashes.json')

function detectChanges() {
  let previousHashes = loadCache()

  return (files, metalsmith, done) => {
    if (!metalsmith.watch()) {
      return done()
    }

    const currentHashes = {}
    const changedFiles = []

    // Compute hashes for metalsmith files
    for (const [filePath, file] of Object.entries(files)) {
      const hash = hashFile(file)
      currentHashes[filePath] = hash

      const previousHash = previousHashes[filePath]
      if (previousHash !== hash) {
        changedFiles.push(filePath)
      }
    }

    metalsmith.metadata().changedFiles = changedFiles

    // Log changes
    const totalFiles = Object.keys(files).length

    console.log(
      `\n[detect-changes] Changes detected: ${changedFiles.length} of ${totalFiles} files`
    )
    if (changedFiles.length > 0) {
      changedFiles.forEach((f) => console.log(`    ~ ${f}`))
    }

    previousHashes = currentHashes
    saveCache(currentHashes)
    done()
  }
}

function hashFile(file) {
  if (!file) return null

  const hash = crypto.createHash('sha256')

  if (file.contents) {
    hash.update(file.contents)
  }

  return hash.digest('hex')
}

function loadCache() {
  try {
    if (existsSync(CACHE_FILE)) {
      return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'))
    }
  } catch (error) {
    console.warn('[detect-changes] Failed to load cache:', error.message)
  }
  return {}
}

function saveCache(hashes) {
  try {
    if (!existsSync(CACHE_DIR)) {
      mkdirSync(CACHE_DIR, { recursive: true })
    }
    writeFileSync(CACHE_FILE, JSON.stringify(hashes, null, 2))
  } catch (error) {
    console.warn('[detect-changes] Failed to save cache:', error.message)
  }
}

module.exports = detectChanges
