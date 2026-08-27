const { readFileSync } = require('fs')
const { parse, resolve, sep } = require('path')

const Ajv = require('ajv')
const { globSync } = require('glob')
const { load } = require('js-yaml')

const { DesignSystemMarked } = require('../marked')

// Custom Marked instance
const marked = new DesignSystemMarked()

// Initialise AJV
const jsonValidator = new Ajv()

function getChangelogJson(group, item) {
  const changelogFilePath = resolve(
    __dirname,
    `../../src/${group}/${item}/changelog.yml`
  )

  try {
    const source = readFileSync(changelogFilePath, 'utf-8')
    let data = load(source)

    data = data.map((entry) => {
      return { fileName: changelogFilePath, ...entry }
    })

    validateChangelogJson(data)

    return data
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
      return {
        fileName: file,
        item: pathParts.at(-1),
        group: pathParts.at(-2),
        ...entry
      }
    })

    validateChangelogJson(data)

    entries = entries.concat(data)
  })

  return entries
}

function validateChangelogJson(data, isGlobalChangelog = false) {
  const requiredGlobalProperties = isGlobalChangelog ? ['item', 'group'] : []

  const schema = {
    type: 'array',
    minItems: 1,
    items: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
        item: { type: 'string' },
        group: { type: 'string' },
        date: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
        version: { type: 'string', pattern: '^[0-9]+.[0-9]+.[0-9]+$' },
        description: { type: 'string' }
      },
      required: [
        'fileName',
        'date',
        'description',
        ...requiredGlobalProperties
      ],
      additionalProperties: false
    }
  }

  const validate = jsonValidator.compile(schema)
  const isValid = validate(data)

  if (!isValid) {
    validate.errors.forEach((error) => {
      throw new Error(error.message, data[0].fileName)
    })
  }

  return []
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

  // Sort from most recent to least recent
  entries = entries.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  )

  // Format descriptions and add other metadata
  const entriesFormatted = structuredClone(entries)
    .map(renderDescriptionsAsMarkdown)
    .map(addReleaseDetails)

  // Truncate to the last n entries
  if (limit) {
    return entriesFormatted.slice(0, limit)
  }

  return entriesFormatted
}

module.exports = getChangelog
