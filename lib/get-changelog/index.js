const { readFileSync } = require('fs')
const { resolve } = require('path')

const { load } = require('js-yaml')

const { DesignSystemMarked } = require('../marked')

// Custom Marked instance
const marked = new DesignSystemMarked()

function getChangelogJson(componentName) {
  const changelogFilePath = resolve(
    __dirname,
    `../../src/components/${componentName}/history.yml`
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
    entry.releaseUrl = `https://github.com/alphagov/govuk-frontend/releases/tag/${entry.version}`
  } else {
    // If no version is specified, assume this was a guidance only change
    entry.isGuidanceOnly = true
  }

  return entry
}

function renderDescriptionsAsMarkdown(entry) {
  if (entry.description) {
    entry.description = marked.parse(entry.description)
  }
  return entry
}

function getChangelog(componentName) {
  const entries = getChangelogJson(componentName)
    .map((entry) => addReleaseDetails(entry))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))

  const entriesFormatted = structuredClone(entries).map(
    renderDescriptionsAsMarkdown
  )

  return entriesFormatted
}

module.exports = getChangelog
