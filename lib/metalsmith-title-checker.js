/**
 * Metalsmith plugin to check each page has a unique title.
 * Which is required to make sure users of assistive technologies can navigate easily.
 *
 * @return {Function}
 */

module.exports = function titleChecker () {
  return (files, metalsmith, done) => {
    const filesWithoutTitles =
      Object
        .keys(files)
        // Filter files that are Nunjucks, which have frontmatter.
        .filter(filename => filename.endsWith('.njk'))
        // Filter out files that do not have titles.
        .filter(filename => {
          var data = files[filename]
          return !data.title
        })

    if (filesWithoutTitles.length) {
      throw Error(
        `The following file(s) do not have titles:\n\n` +
        filesWithoutTitles.map(file => `"${file}"`).join(',\n')
      )
    }
    done()
  }
}
