const markdown = require('@metalsmith/markdown')
const lunr = require('lunr')
const metalsmith = require('metalsmith')

const extractPageHeadings = require('../extract-page-headings/index.js')

const plugin = require('./index.js')

describe('metalsmith-lunr-index plugin', () => {
  let searchIndex
  let documentStore

  beforeAll((done) => {
    metalsmith('lib/metalsmith-lunr-index/fixtures')
      .use(extractPageHeadings())
      .use(markdown())
      .use(plugin())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        const searchIndexContents = files['search-index.json'].contents
        const { index, store } = JSON.parse(searchIndexContents)
        documentStore = store

        searchIndex = lunr.Index.load(index)

        done()
      })
  })

  describe('the generated document store', () => {
    it('only contains HTML files', () => {
      const paths = Object.keys(documentStore)

      expect(paths).not.toContain('image.jpg')
    })

    it('does not contain files that are not in any section', () => {
      const paths = Object.keys(documentStore)

      expect(paths).not.toContain('example.html')
    })

    it('does not contain files that are not in included sections', () => {
      const paths = Object.keys(documentStore)

      expect(paths).not.toContain('about-larry.html')
    })

    it('contains the permalink to the document', () => {
      const entry = Object.values(documentStore)
        .find(({ title }) => title === 'Checkboxes')

      expect(entry.permalink).toEqual('checkboxes.html')
    })

    it('contains the section that the document is in', () => {
      const entry = Object.values(documentStore)
        .find(({ title }) => title === 'Checkboxes')

      expect(entry.section).toEqual('Components')
    })

    it('uses a custom permalink if in document metadata', () => {
      const entry = Object.values(documentStore)
        .find(({ title }) => title === 'With Permalink')

      expect(entry.permalink).toEqual('/with-permalink/')
    })

    it('contains the page and heading level 2 entry', () => {
      const entry = Object.values(documentStore)
        .find(({ title }) => title === 'Heading level 2')

      expect(entry.permalink).toEqual('with-page-headings.html/#heading-level-2')
    })

    it('does not contain headings from documents in excluded sections', () => {
      const paths = Object.keys(documentStore)
        .filter(path => path.startsWith('about-larry.html'))

      expect(paths).toHaveLength(0)
    })
  })

  describe('the generated index', () => {
    it('can be used to search for files in the site', () => {
      const searchResults = searchIndex.search('radios')
      const pathsFromSearchResults = searchResults.map(result => result.ref)

      expect(pathsFromSearchResults).toEqual(['radios.html'])
    })

    it('stores the title of the page in the metadata', () => {
      const searchResults = searchIndex.search('radios')
      const resultRef = searchResults[0].ref

      expect(documentStore[resultRef].title).toEqual('Radios')
    })

    it('stores the aliases of the page in the metadata', () => {
      const searchResults = searchIndex.search('radios')
      const resultRef = searchResults[0].ref

      expect(documentStore[resultRef].aliases).toEqual('radio buttons, option buttons')
    })

    it('stores the page heading of the page in the metadata', () => {
      const searchResults = searchIndex.search('heading')
      const resultRef = searchResults[0].ref

      expect(documentStore[resultRef].title).toEqual('Heading level 2')
    })

    it('does not store page headings from pages in excluded sections', () => {
      const searchResults = searchIndex.search('career')

      expect(searchResults).toHaveLength(0)
    })

    it('stores the aliases for the page heading of the page in the metadata', () => {
      const searchResults = searchIndex.search('two')
      const resultRef = searchResults[0].ref

      expect(documentStore[resultRef].title).toEqual('Heading level 2')
    })
  })
})
