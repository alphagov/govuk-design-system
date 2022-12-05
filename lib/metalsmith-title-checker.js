/**
 * Metalsmith plugin to check each page has a unique title.
 * Which is required to make sure users of assistive technologies can navigate easily.
 *
 * @return {Function}
 */

function groupFilesByTitle (filenames, files) {
  const groupedFiles = {}

  filenames
    .forEach((filename, index) => {
      const { title } = files[filename]
      // If an title exists and is not the current index it means it is a duplicate.
      if (!groupedFiles[title]) {
        groupedFiles[title] = []
      }
      groupedFiles[title].push({
        // Add the filename to the file object for convenience
        __filename: filename,
        ...files[filename]
      })
    })

  return groupedFiles
}

function getDuplicateTitles (groupedFiles) {
  const duplicateGroupedTitles = {}

  for (const title in groupedFiles) {
    const group = groupedFiles[title]

    const groupedWithoutExcludedFiles =
    group
      // Default examples always have a duplicated title,
      // this is OK since the iframes are appended with 'example'.
      .filter(file => !file.__filename.includes('/default/'))
      // Filter out Windows default paths too:
      .filter(file => !file.__filename.includes('\\default\\'))
      // Code examples always have a duplicated title,
      // as it's only used for the code example not the iframe.
      .filter(file => !file.__filename.endsWith('code.njk'))

    if (groupedWithoutExcludedFiles.length > 1) {
      duplicateGroupedTitles[title] = groupedWithoutExcludedFiles
    }
  }

  return duplicateGroupedTitles
}

module.exports = function titleChecker () {
  return (files, metalsmith, done) => {
    const nunjucksFileNames =
      Object
        .keys(files)
        // Filter files that are Nunjucks, which have frontmatter.
        .filter(filename => filename.endsWith('.njk'))

    const groupedFilesByTitle = groupFilesByTitle(nunjucksFileNames, files)
    const filesWithDuplicateTitles = getDuplicateTitles(groupedFilesByTitle)

    if (Object.keys(filesWithDuplicateTitles).length) {
      let duplicateErrorMessage = ''
      for (const title in filesWithDuplicateTitles) {
        const group = filesWithDuplicateTitles[title]
        duplicateErrorMessage += `The title "${title}" is duplicated ${group.length} times in the following file(s):\n`
        duplicateErrorMessage += group.map(file => `- ${file.__filename}`).join('\n')
        duplicateErrorMessage += '\n\n'
      }
      throw Error(duplicateErrorMessage)
    }

    const filesWithoutTitles = nunjucksFileNames.filter(filename => !files[filename].title)

    if (filesWithoutTitles.length) {
      throw Error(
        'The following file(s) do not have titles:\n\n' +
        filesWithoutTitles.map(file => `- ${file}`).join('\n') +
        '\n'
      )
    }
    done()
  }
}
