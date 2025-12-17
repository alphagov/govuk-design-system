function trackModifications() {
  const modifiedFiles = new Set()

  return {
    // Plugin to run at the start - record which files we're going to modify
    recordChanges: (files, metalsmith, done) => {
      const changedFiles = metalsmith.metadata().changedFiles

      if (changedFiles) {
        // Mark these files as modified
        changedFiles.forEach((f) => modifiedFiles.add(f))

        // Also mark any transformed versions (md -> html)
        changedFiles.forEach((f) => {
          if (f.endsWith('.md')) {
            modifiedFiles.add(f.replace(/\.md$/, '.html'))
          }
        })
      } else {
        // First build - all files will be written
        modifiedFiles.clear()
      }

      done()
    },

    // Plugin to run at the end - remove unmodified files from output
    filterOutput: (files, metalsmith, done) => {
      const changedFiles = metalsmith.metadata().changedFiles

      if (!changedFiles) {
        // First build - write everything
        return done()
      }

      // Remove files that weren't modified from the files object
      // so they don't get written to disk
      Object.keys(files).forEach((filepath) => {
        if (!modifiedFiles.has(filepath)) {
          delete files[filepath]
        }
      })

      console.log(
        `[TrackModifications] Writing ${Object.keys(files).length} modified files`
      )
      modifiedFiles.clear()

      done()
    }
  }
}

module.exports = trackModifications
