// Navigation item sorting function (same collator as the Metalsmith plugin)
const { compare } = new Intl.Collator('en', {
  numeric: true
})

/**
 * Build the navigation tree from 11ty's collection of pages
 *
 * Mirrors the Metalsmith navigation plugin so Metalsmith and 11ty produce the
 * same output. We use the page's URL directory rather than front matter tags,
 * so no content changes are required.
 *
 * @param {object} config - Navigation config ({ sections, subpages })
 * @returns {(collectionApi: object) => NavigationSection[]} Collection factory
 */
function buildNavigation(config) {
  return (collectionApi) => {
    const sections = structuredClone(config.sections)
    const subpages = structuredClone(config.subpages)

    const pages = collectionApi.getAll().map((item) => ({
      url: item.url.replace(/^\/+|\/+$/g, ''),
      data: item.data
    }))

    const byUrl = new Map(pages.map((page) => [page.url, page]))

    for (const section of sections) {
      const items = pages.filter(
        (page) =>
          page.url.startsWith(`${section.url}/`) &&
          page.url.split('/').length === 2 &&
          !page.data.ignoreInSitemap
      )

      for (const item of items) {
        const { data } = item

        const subpagesOfItem = subpages.filter((subpage) =>
          byUrl.has(`${item.url}/${subpage.url}`)
        )

        data.subpages = subpagesOfItem

        section.items ??= []
        section.items.push({
          url: item.url,
          label: data.title,
          order: data.order,
          theme: data.theme,
          subpages: subpagesOfItem,

          status: data.status
            ? typeof data.status === 'string'
              ? data.status
              : data.status?.type
            : 'Stable',

          headings:
            data.headings && data.showPageNav ? data.headings : undefined,

          aliases: data.aliases?.split(',').map((string) => string.trim())
        })
      }

      section.items?.sort((a, b) =>
        a.order || b.order
          ? compare(a.order, b.order)
          : compare(a.label, b.label)
      )
    }

    return sections
  }
}

module.exports = { buildNavigation }
