import { readFileSync } from 'fs'

export function getDeletedPages() {
  const changes = processDiffTxt()
  const deletedPages = changes.filter(
    (change) =>
      change.file.match(/src\/[a-z-]+\/[a-z-]+\/index\.md/) &&
      change.status === 'D'
  )

  return deletedPages.length
    ? deletedPages.map((change) => change.file).join(', ')
    : false
}

export function getNetlifyConfigChanged() {
  const changes = processDiffTxt()

  return !!changes.find(
    (change) => change.file === 'netlify.toml' && change.status === 'M'
  )
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
