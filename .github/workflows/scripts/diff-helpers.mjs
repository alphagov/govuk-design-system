import { readFileSync } from 'fs'

export function getDeletedPages() {
  const changes = processDiffTxt()
  const deletedPages = changes.filter(
    (change) =>
      change.file.match(/src\/[a-z-]+\/[a-z-]+\/index\.md/) &&
      change.status === 'D'
  )
  const netlifyChanged = !!changes.find(
    (change) => change.file === 'netlify.toml' && change.status === 'M'
  )

  return deletedPages.length
    ? {
        deletedPages,
        netlifyChanged
      }
    : false
}

function processDiffTxt() {
  return readFileSync('./diff.txt', 'utf8')
    .split('\n')
    .filter((change) => change.trim())
    .map((change) => {
      const [status, file] = change.split('\t')
      return {
        file,
        status
      }
    })
}
