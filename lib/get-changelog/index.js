const { readFileSync } = require('fs')
const { parse, resolve, sep } = require('path')

const { globSync } = require('glob')
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

function getAllChangelogsJson() {
  const files = globSync(resolve(__dirname, `../../src/**/**/changelog.yml`))
  let entries = []

  files.forEach((file) => {
    const source = readFileSync(file, 'utf-8')
    let data = load(source)

    // Extract group and item name from file path so we can add them to each
    // entry, so we know where the entry originates from
    const pathParts = parse(file).dir.split(sep)
    data = data.map((entry) => {
      return { item: pathParts.at(-1), group: pathParts.at(-2), ...entry }
    })

    entries = entries.concat(data)
  })

  // console.log(entries)

  return entries
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

function getChangelog({ group, item, limit }) {
  let entries =
    group && item ? getChangelogJson(group, item) : getAllChangelogsJson()

  entries = entries
    .map((entry) => addReleaseDetails(entry))
    // Sort from most recent to least recent
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const entriesFormatted = structuredClone(entries).map(
    renderDescriptionsAsMarkdown
  )

  // Truncate to the last n entries
  if (limit) {
    return entriesFormatted.slice(0, limit)
  }

  return entriesFormatted
}

module.exports = getChangelog
