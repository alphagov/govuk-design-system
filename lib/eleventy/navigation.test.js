const { buildNavigation } = require('./navigation.js')

// Minimal navigation config matching config/navigation.js shape
const config = {
  sections: [
    { label: 'Get started', url: 'get-started' },
    { label: 'Components', url: 'components' }
  ],
  subpages: [{ label: 'History', url: 'history', pageTitle: 'Change history' }]
}

/**
 * Build a mock 11ty collectionApi from a list of { url, data } pages
 *
 * @param {Array<{ url: string; data: object }>} pages - Mock pages
 * @returns {{ getAll: () => Array<{ url: string; data: object }> }} Mock collection API
 */
function mockCollectionApi(pages) {
  return {
    getAll: () => pages.map(({ url, data }) => ({ url, data }))
  }
}

describe('buildNavigation', () => {
  it('groups section children into items by URL directory', () => {
    const collection = buildNavigation(config)(
      mockCollectionApi([
        {
          url: '/components/breadcrumbs/',
          data: { title: 'Breadcrumbs', layout: 'layout-pane.njk' }
        },
        {
          url: '/components/checkboxes/',
          data: { title: 'Checkboxes', layout: 'layout-pane.njk' }
        }
      ])
    )

    const components = collection.find(
      (section) => section.url === 'components'
    )

    expect(components.items).toEqual([
      expect.objectContaining({
        url: 'components/breadcrumbs',
        label: 'Breadcrumbs'
      }),
      expect.objectContaining({
        url: 'components/checkboxes',
        label: 'Checkboxes'
      })
    ])
  })

  it('sorts items by order, falling back to label', () => {
    const collection = buildNavigation(config)(
      mockCollectionApi([
        { url: '/components/zeta/', data: { title: 'Zeta' } },
        { url: '/components/alpha/', data: { title: 'Alpha' } },
        { url: '/components/first/', data: { title: 'First', order: 1 } }
      ])
    )

    const components = collection.find(
      (section) => section.url === 'components'
    )

    expect(components.items.map((item) => item.label)).toEqual([
      'First',
      'Alpha',
      'Zeta'
    ])
  })

  it('excludes deeper-nested pages and ignored pages from items', () => {
    const collection = buildNavigation(config)(
      mockCollectionApi([
        { url: '/components/breadcrumbs/', data: { title: 'Breadcrumbs' } },
        // Nested two levels deep — should not be a direct item
        {
          url: '/components/breadcrumbs/history/',
          data: { title: 'History' }
        },
        // Marked ignoreInSitemap — should be excluded
        {
          url: '/components/hidden/',
          data: { title: 'Hidden', ignoreInSitemap: true }
        }
      ])
    )

    const components = collection.find(
      (section) => section.url === 'components'
    )

    expect(components.items.map((item) => item.url)).toEqual([
      'components/breadcrumbs'
    ])
  })

  it('attaches existing subpages to their parent item', () => {
    const collection = buildNavigation(config)(
      mockCollectionApi([
        { url: '/components/breadcrumbs/', data: { title: 'Breadcrumbs' } },
        {
          url: '/components/breadcrumbs/history/',
          data: { title: 'Change history' }
        }
      ])
    )

    const components = collection.find(
      (section) => section.url === 'components'
    )

    expect(components.items[0].subpages).toEqual([
      expect.objectContaining({ url: 'history', label: 'History' })
    ])
  })

  it('defaults status to Stable and parses aliases', () => {
    const collection = buildNavigation(config)(
      mockCollectionApi([
        {
          url: '/components/breadcrumbs/',
          data: {
            title: 'Breadcrumbs',
            aliases: 'navigation path, cookie crumb'
          }
        }
      ])
    )

    const components = collection.find(
      (section) => section.url === 'components'
    )

    expect(components.items[0]).toMatchObject({
      status: 'Stable',
      aliases: ['navigation path', 'cookie crumb']
    })
  })

  it('leaves sections without children without an items array', () => {
    const collection = buildNavigation(config)(
      mockCollectionApi([
        { url: '/components/breadcrumbs/', data: { title: 'Breadcrumbs' } }
      ])
    )

    const getStarted = collection.find(
      (section) => section.url === 'get-started'
    )

    expect(getStarted.items).toBeUndefined()
  })
})
