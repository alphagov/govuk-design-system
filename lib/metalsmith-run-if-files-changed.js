const { statSync } = require('fs')
const { join } = require('path')

const { globSync } = require('glob')

function getLatestMtime(baseDir, patterns) {
  const files = patterns.flatMap((pattern) =>
    globSync(pattern, {
      cwd: baseDir,
      nodir: true
    })
  )

  return files.reduce((max, file) => {
    const mtime = statSync(join(baseDir, file)).mtimeMs
    return Math.max(max, mtime)
  }, 0)
}

function runIfFilesChanged(plugin, options) {
  const patterns = options?.patterns ?? []
  const resolveBaseDir = options?.resolveBaseDir

  let lastMtime = 0

  return (files, metalsmith, done) => {
    if (metalsmith.watch() && patterns.length > 0) {
      const baseDir = resolveBaseDir
        ? resolveBaseDir(metalsmith)
        : metalsmith.source()
      const mtime = getLatestMtime(baseDir, patterns)

      if (mtime <= lastMtime) {
        return done()
      }

      lastMtime = mtime
    }

    return plugin(files, metalsmith, done)
  }
}

module.exports = runIfFilesChanged
