const {
  getChangelogData,
  getCombinedChangelogData,
  validateChangelogData,
  addReleaseDetails,
  convertDescriptionsToHTML,
  sortChangelog,
  truncateChangelog
} = require('./index.js')

describe('get-changelog', () => {
  describe('getChangelogData', () => {
    it('returns data in JS object format', () => {
      const data = getChangelogData('components', 'text-input')

      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThanOrEqual(1)
    })

    it('returns data with the required keys', () => {
      const data = getChangelogData('components', 'text-input')

      for (const item of data) {
        expect(item).toHaveProperty('date')
        expect(item).toHaveProperty('description')
        expect(item).toHaveProperty('group')
        expect(item).toHaveProperty('item')
      }
    })

    it('throws an error if `group` or `item` are omitted', () => {
      expect(() => getChangelogData()).toThrow(
        '`group` and `item` parameters are required.'
      )
    })

    it('throws an error when passed a non-existent `group`', () => {
      expect(() => getChangelogData('groceries', 'text-input')).toThrow()
    })

    it('throws an error when passed a non-existent `item`', () => {
      expect(() => getChangelogData('components', 'shopping-list')).toThrow()
    })
  })

  describe('getCombinedChangelogData', () => {
    it('returns data in JS object format', () => {
      const data = getCombinedChangelogData()

      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThanOrEqual(1)
    })

    it('returns data with the required keys', () => {
      const data = getCombinedChangelogData()

      for (const item of data) {
        expect(item).toHaveProperty('date')
        expect(item).toHaveProperty('description')
        expect(item).toHaveProperty('group')
        expect(item).toHaveProperty('item')
      }
    })
  })

  describe('validateChangelogData', () => {
    it('returns an empty array for a valid changelog', () => {
      const errors = validateChangelogData(
        [
          {
            date: '2025-09-22',
            description: 'Added lime flavour.',
            version: '5.2.0',
            group: 'preserves',
            item: 'marmalade'
          },
          {
            date: '2026-07-15',
            description: 'Introduced butter component.',
            version: '6.4.0',
            group: 'dairy',
            item: 'butter'
          }
        ],
        false
      )

      expect(errors).toStrictEqual([])
    })

    it('throws an error if a changelog is empty', () => {
      const changelog = []

      expect(() => validateChangelogData(changelog)).toThrow(
        'minItems: must NOT have fewer than 1 items'
      )
    })

    it('throws an error if `date` property is missing', () => {
      const changelog = [
        {
          description: 'Fixed margerine being labelled as butter.',
          group: 'spreads',
          item: 'margerine'
        }
      ]

      expect(() => validateChangelogData(changelog)).toThrow(
        "required: must have required property 'date'"
      )
    })

    it("throws an error if `date` isn't in YYYY-MM-DD format", () => {
      const changelogEntry = {
        description: 'Added cranberry juice.',
        group: 'juices',
        item: 'cranberry-juice'
      }

      ;[
        '2026',
        '2026-09',
        '2026-9',
        '2026-09-1',
        '2026-9-01',
        '1st September 2026'
      ].forEach((date) => {
        expect(() =>
          validateChangelogData([{ date, ...changelogEntry }])
        ).toThrow('pattern: must match pattern "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"')
      })
    })

    it('throws an error if `description` property is missing', () => {
      const changelog = [
        {
          date: '2023-10-21',
          group: 'meat',
          item: 'mystery-meat'
        }
      ]

      expect(() => validateChangelogData(changelog)).toThrow(
        "required: must have required property 'description'"
      )
    })

    it("throws an error if `version` isn't in semver format", () => {
      const changelogEntry = {
        date: '2019-06-21',
        description: 'Removed expired milk.',
        group: 'dairy',
        item: 'milk'
      }

      expect(() =>
        validateChangelogData([{ version: 1, ...changelogEntry }])
      ).toThrow('type: must be string')

      ;['2.3', '4..5', '6.7.', '8.9.0-alpha'].forEach((version) => {
        expect(() =>
          validateChangelogData([{ version, ...changelogEntry }])
        ).toThrow('pattern: must match pattern "^[0-9]+.[0-9]+.[0-9]+$"')
      })
    })

    it('throws an error if other properties are included', () => {
      const changelog = [
        {
          date: '2018-05-21',
          description: 'Added Scotch eggs.',
          group: 'snacks',
          item: 'scotch-egg',
          isVegan: false
        }
      ]

      expect(() => validateChangelogData(changelog)).toThrow(
        'additionalProperties: must NOT have additional properties'
      )
    })

    it('throws an error if `group` property is missing', () => {
      const changelog = [
        {
          date: '2022-07-04',
          description: 'Added option to use mozarella cheese.',
          item: 'cheese'
        }
      ]

      expect(() => validateChangelogData(changelog, true)).toThrow(
        "required: must have required property 'group'"
      )
    })

    it('throws an error if `item` property is missing', () => {
      const changelog = [
        {
          date: '2022-07-04',
          description: 'Added option to use mozarella cheese.',
          group: 'dairy'
        }
      ]

      expect(() => validateChangelogData(changelog, true)).toThrow(
        "required: must have required property 'item'"
      )
    })
  })

  describe('addReleaseDetails', () => {
    it('adds a `releaseUrl` for entries with a `version` property', () => {
      const entry = addReleaseDetails({
        date: '2024-02-10',
        description: 'Added sambal belacan.',
        version: '4.2.0'
      })

      expect(entry).toHaveProperty('releaseUrl')
      expect(entry.releaseUrl).toBe(
        'https://github.com/alphagov/govuk-frontend/releases/tag/v4.2.0'
      )
    })

    it('does not add a `releaseUrl` for entries without a `version` property', () => {
      const entry = addReleaseDetails({
        date: '2024-03-30',
        description: 'Added recipe for a sambal-based exfolient.'
      })

      expect(entry).not.toHaveProperty('releaseUrl')
    })
  })

  describe('convertDescriptionsToHTML', () => {
    it('converts `description` content from Markdown to HTML', () => {
      const entry = convertDescriptionsToHTML({
        date: '2024-03-31',
        description: 'Added guidance to **not** put sambal in your eyes.'
      })

      expect(entry.description.trim()).toBe(
        '<p>Added guidance to <strong>not</strong> put sambal in your eyes.</p>'
      )
    })
  })

  describe('sortChangelog', () => {
    it('sorts changelogs in reverse chronological order', () => {
      const data = [
        {
          date: '2050-01-04',
          description: 'Added freshenising nanobots.'
        },
        {
          date: '1913-04-30',
          description: 'Added electric refrigerator.'
        },
        {
          date: '1994-02-19',
          description: 'Removed Freon.'
        }
      ]

      const changelog = sortChangelog(data)
      const dates = changelog.map((entry) => entry.date)

      expect(dates).toStrictEqual(['2050-01-04', '1994-02-19', '1913-04-30'])
    })
  })

  describe('truncateChangelog', () => {
    it('truncates changelogs if `limit` is set', () => {
      const data = [
        {
          date: '2017-05-16',
          description: ''
        },
        {
          date: '2016-07-09',
          description: ''
        },
        {
          date: '2016-06-09',
          description: ''
        }
      ]

      const changelog = truncateChangelog(data, 2)

      expect(changelog).toHaveLength(2)
    })
  })
})
