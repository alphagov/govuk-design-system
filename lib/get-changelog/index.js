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
 * Get a changelog
 *
 * Reads in the changelog.yml file for a specific component or pattern,
 * converting it into a JS data structure and returning it.
 *
 * @param {string} group - The slug of a group (typically 'components'
 *   or 'patterns'). Required if `item` is set.
 * @param {string} item - The slug of a item (typically a component or pattern
 *   name like 'password-input' or 'addresses). Required if `group` is set.
 * @returns {Array} - Changelog entries.
 */
function getChangelogData(group, item) {
  if (!group || !item) {
    throw new Error('`group` and `item` parameters are required.')
  }

  const changelogFilePath = resolve(
    __dirname,
    `../../src/${group}/${item}/changelog.yml`
  )

  try {
    const source = readFileSync(changelogFilePath, 'utf8')
    let changelogEntries = load(source)

    // Add group and item name to the entry for later use
    changelogEntries = changelogEntries.map((entry) => {
      return {
        group,
        item,
        ...entry
      }
    })

    return changelogEntries
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Get combined changelog
 *
 * Scans the `src` directory for all `changelog.yml` files, converts them to JS
 * data, and concatenates them together.
 *
 * @returns {Array} - Changelog entries.
 */
function getCombinedChangelogData() {
  let changelogEntries = []

  const files = globSync(resolve(__dirname, `../../src/**/**/changelog.yml`))

  files.forEach((file) => {
    const source = readFileSync(file, 'utf8')
    let log = load(source)

    // Extract group and item name from file path so we can add them to each
    // entry, so we know where the entry originates from
    const pathParts = parse(file).dir.split(sep)
    log = log.map((entry) => {
      return {
        group: pathParts.at(-2),
        item: pathParts.at(-1),
        ...entry
      }
    })

    changelogEntries = changelogEntries.concat(log)
  })

  return changelogEntries
}

/**
 * Validates changelogs against the given schema using AJV.
 *
 * @param {Array} data - The changelog data.
 * @returns {Array} - This array is populated with any errors found in
 *   validation, or is empty if none are found.
 */
function validateChangelogData(data) {
  const schema = {
    type: 'array',
    minItems: 1,
    items: {
      type: 'object',
      properties: {
        date: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
        version: { type: 'string', pattern: '^[0-9]+.[0-9]+.[0-9]+$' },
        description: { type: 'string' },
        group: { type: 'string' },
        item: { type: 'string' }
      },
      required: ['date', 'description', 'group', 'item'],
      additionalProperties: false
    }
  }

  const validate = ajv.compile(schema)
  const isValid = validate(data)

  if (!isValid) {
    validate.errors.forEach((error) => {
      throw new Error(`${error.keyword}: ${error.message}`)
    })
  }

  return []
}

/**
 * Adds supplementary information about releases to changelog entries that
 * include a `version`.
 *
 * @param {object} entry - A singular changelog entry.
 * @returns {object} - The modified changelog entry.
 */
function addReleaseDetails(entry) {
  if (entry.version) {
    // If an entry is specified, add a link to the Frontend release on GitHub
    entry.releaseUrl = `https://github.com/alphagov/govuk-frontend/releases/tag/v${entry.version}`
  }

  return entry
}

/**
 * Converts descriptions from Markdown to HTML.
 *
 * @param {object} entry - A singular changelog entry.
 * @returns {object} - The modified changelog entry.
 */
function convertDescriptionsToHTML(entry) {
  if (entry.description) {
    entry.description = marked.parse(entry.description)
  }

  return entry
}

/**
 * Sort changelog
 *
 * Sorts entries in reverse chronological order (from most recent to least
 * recent) according to the `date` property. We don't need to do anything
 * special, as YYYY-MM-DD formatted dates can also be sorted alphabetically.
 *
 * @param {Array} changelog - The array of changelog items
 * @returns {Array} - The sorted array
 */
function sortChangelog(changelog) {
  return changelog.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  )
}

/**
 * Truncate changelog
 *
 * Cuts off the array after the first N entries.
 *
 * @param {Array} changelog - The array of changelog items
 * @param {number} limit - How many items to return before cutting off the rest
 * @returns {Array} - The truncated array
 */
function truncateChangelog(changelog, limit) {
  return changelog.slice(0, limit)
}

/**
 * Entry function to retrieve changelogs.
 *
 * If `group` and `item` are set, it will retrieve the changelog for a specific
 * component or pattern. Otherwise, it will return a combined changelog of all
 * changelogs on the site.
 *
 * Entries are then validated against a schema, and sorted in reverse
 * chronological order. The array may be truncated if `limit` is set.
 *
 * @param {object} params - Parameters object
 * @param {string} [params.group] - The group the item belongs to.
 *   If used, `item` is also required.
 * @param {string} [params.item] - The item to fetch the changelog for.
 *   If used, `group` is also required.
 * @param {boolean} [params.combinedChangelog] - If true, gets the combined
 *   changelog instead, ignoring `group` and `item` parameters.
 * @param {number} [params.limit] - Limits the number of entries returned
 * @returns {Array} - Changelog entries.
 */
function getChangelog({ group, item, combinedChangelog, limit }) {
  const data = combinedChangelog
    ? getCombinedChangelogData()
    : getChangelogData(group, item)

  // Validate the data
  validateChangelogData(data)

  // Clone the data so we don't manipulate it directly
  let changelog = structuredClone(data)

  // Format descriptions and add other metadata
  changelog = changelog.map(addReleaseDetails).map(convertDescriptionsToHTML)

  // Sort changelog entries
  changelog = sortChangelog(changelog)

  // If `limit` is set, chop off the items after N amount
  if (limit) {
    changelog = truncateChangelog(changelog, limit)
  }

  return changelog
}

module.exports = {
  getChangelogData,
  getCombinedChangelogData,
  validateChangelogData,
  addReleaseDetails,
  convertDescriptionsToHTML,
  sortChangelog,
  truncateChangelog,
  getChangelog
}
