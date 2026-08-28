const { readFileSync } = require('fs')
const { parse, resolve, sep } = require('path')

const Ajv = require('ajv')
const { globSync } = require('glob')
const { load } = require('js-yaml')

const { DesignSystemMarked } = require('../marked')

// Custom Marked instance
const marked = new DesignSystemMarked()

// Initialise AJV
const ajv = new Ajv()

/**
 * Gets the changelog.yml file for a specific component or pattern, converts it
 * into a JS data structure, and validates it against the changelog schema.
 *
 * @param {string} group - The slug of the group (typically 'components'
 *   or 'patterns').
 * @param {string} item - The slug of the item (typically a component or pattern
 *   name like 'password-input' or 'addresses).
 * @returns {Array} - Changelog entries.
 */
function getChangelogData(group, item) {
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

    validateChangelogData(data)

    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Scans the design system for all `changelog.yml` files, converts them to JS,
 * validates against changelog schema, and concatenates them together.
 *
 * @returns {Array} - Changelog entries.
 */

function getAllChangelogsData() {
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

    validateChangelogData(data, true)

    entries = entries.concat(data)
  })

  return entries
}

/**
 * Validates changelogs against the given schema using AJV.
 *
 * @param {Array} data - The changelog data.
 * @param {boolean} [isGlobalChangelog] - If this is a global changelog.
 *   Global changelogs have more required properties.
 * @returns {Array} - This array is populated with any errors found in
 *   validation, or is empty if none are found.
 */
function validateChangelogData(data, isGlobalChangelog = false) {
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

  const validate = ajv.compile(schema)
  const isValid = validate(data)

  if (!isValid) {
    validate.errors.forEach((error) => {
      throw new Error(error.message, data[0].fileName)
    })
  }

  return []
}

/**
 * Adds supplementary information and formatting used when rendering changelogs
 * on the website.
 *
 * @param {object} entry - A singular changelog entry.
 * @returns {object} - The modified changelog entry.
 */
function addReleaseDetails(entry) {
  if (entry.version) {
    // If an entry is specified, add a link to the Frontend release on GitHub
    entry.releaseUrl = `https://github.com/alphagov/govuk-frontend/releases/tag/v${entry.version}`
  }

  if (entry.description) {
    // Convert Markdown to HTML
    entry.description = marked.parse(entry.description)
  }

  return entry
}

/**
 * Entry function to retrieve changelogs, sorted from most to least recent.
 *
 * If `group` and `item` are set, it will retrieve the changelog for a specific
 * component or pattern. Otherwise, it will return a combined changelog of all
 * changelogs on the site.
 *
 * @param {object} params - Parameters object
 * @param {string} [params.group] - The group the item belongs to.
 *   If used, `item` is also required.
 * @param {string} [params.item] - The item to fetch the changelog for.
 *   If used, `group` is also required.
 * @param {number} [params.limit] - Limits the number of entries returned
 * @returns {Array} - Changelog entries.
 */
function getChangelog({ group, item, limit }) {
  let entries =
    group && item ? getChangelogData(group, item) : getAllChangelogsData()

  // Sort from most recent to least recent
  entries = entries.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  )

  // Format descriptions and add other metadata
  const entriesFormatted = structuredClone(entries).map(addReleaseDetails)

  // Truncate to the last n entries
  if (limit) {
    return entriesFormatted.slice(0, limit)
  }

  return entriesFormatted
}

module.exports = getChangelog
