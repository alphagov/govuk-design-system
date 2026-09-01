const {
  getChangelogData,
  getAllChangelogsData,
  validateChangelogData,
  addReleaseDetails
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
      }
    })

    it('throws an error for non-existent groups', () => {
      expect(() => getChangelogData('groceries', 'text-input')).toThrow()
    })

    it('throws an error for non-existent items', () => {
      expect(() => getChangelogData('components', 'shopping-list')).toThrow()
    })
  })

  describe('getAllChangelogsData', () => {
    it('returns data in JS object format', () => {
      const data = getAllChangelogsData()

      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThanOrEqual(1)
    })

    it('returns data with the required keys', () => {
      const data = getAllChangelogsData()

      for (const item of data) {
        expect(item).toHaveProperty('date')
        expect(item).toHaveProperty('description')
        expect(item).toHaveProperty('group')
        expect(item).toHaveProperty('item')
      }
    })
  })

  describe('validateChangelogData', () => {
    it('throws an error if a changelog is empty', () => {
      const changelog = []

      expect(() => validateChangelogData(changelog)).toThrow(
        'minItems: must NOT have fewer than 1 items'
      )
    })

    it('throws an error if `date` property is missing', () => {
      const changelog = [
        {
          description: 'Fixed margerine being labelled as butter.'
        }
      ]

      expect(() => validateChangelogData(changelog)).toThrow(
        "required: must have required property 'date'"
      )
    })

    it("throws an error if `date` isn't in YYYY-MM-DD format", () => {
      const changelogEntry = {
        description: 'Added cranberry juice.'
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
          date: '2023-10-21'
        }
      ]

      expect(() => validateChangelogData(changelog)).toThrow(
        "required: must have required property 'description'"
      )
    })

    it("throws an error if `version` isn't in semver format", () => {
      const changelogEntry = {
        date: '2019-06-21',
        description: 'Removed expired milk.'
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
          isVegan: false
        }
      ]

      expect(() => validateChangelogData(changelog)).toThrow(
        'additionalProperties: must NOT have additional properties'
      )
    })

    describe('single changelog', () => {
      it('returns nothing for a valid single changelog', () => {
        const errors = validateChangelogData(
          [
            {
              date: '2026-07-15',
              description: 'Introduced butter component.',
              version: '1.23.4'
            }
          ],
          false
        )

        expect(errors).toStrictEqual([])
      })
    })

    describe('combined changelog', () => {
      it('returns nothing for a valid combined changelog', () => {
        const errors = validateChangelogData(
          [
            {
              date: '2025-09-22',
              description: 'Added lime flavour.',
              version: '1.23.4',
              group: 'preserves',
              item: 'marmalade'
            }
          ],
          true
        )

        expect(errors).toStrictEqual([])
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

    it('converts `description` content from Markdown to HTML', () => {
      const entry = addReleaseDetails({
        date: '2024-03-31',
        description: 'Added guidance to **not** put sambal in your eyes.'
      })

      expect(entry.description.trim()).toBe(
        '<p>Added guidance to <strong>not</strong> put sambal in your eyes.</p>'
      )
    })
  })
})
