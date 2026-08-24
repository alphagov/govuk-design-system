const { readFileSync } = require('fs')
const { resolve } = require('path')

const { load } = require('js-yaml')

const { DesignSystemMarked } = require('../marked')

// Custom Marked instance
const marked = new DesignSystemMarked()

function getChangelogJson(group, item) {
  const changelogFilePath = resolve(
    __dirname,
    `../../src/${group}/${item}/changelog.yml`
  )
  try {
    const source = readFileSync(changelogFilePath, 'utf-8')
    return load(source)
  } catch (e) {
    console.error(e)
  }
}

function addReleaseDetails(entry) {
  if (entry.version) {
    // If an entry is specified, add a link to the Frontend release on GitHub
    entry.releaseUrl = `https://github.com/alphagov/govuk-frontend/releases/tag/v${entry.version}`
  }

  return entry
}

function renderDescriptionsAsMarkdown(entry) {
  if (entry.description) {
    entry.description = marked.parse(entry.description)
  }
  return entry
}

function getChangelog(group, item) {
  const entries = getChangelogJson(group, item)
    .map((entry) => addReleaseDetails(entry))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))

  const entriesFormatted = structuredClone(entries).map(
    renderDescriptionsAsMarkdown
  )

  return entriesFormatted
}

module.exports = getChangelog
