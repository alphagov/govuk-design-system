/* eslint-env jest */

const metalsmith = require('metalsmith')
const lunr = require('lunr')
const plugin = require('./index.js')

describe('metalsmith-lunr-index plugin', () => {
  let searchIndex
  let documentStore

  beforeAll((done) => {
    metalsmith('lib/metalsmith-lunr-index/fixtures')
      .use(plugin())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        const searchIndexContents = files['search-index.json']['contents']
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

    it('contains the paths to the document', () => {
      const checkboxesDocument = Object.values(documentStore).find(document => {
        return document.title === 'Checkboxes'
      })

      expect(checkboxesDocument.path).toEqual('checkboxes.html')
    })

    it('uses the permalink path if in document metadata', () => {
      const withPermalinkDocument = Object.values(documentStore).find(document => {
        return document.title === 'With Permalink'
      })

      expect(withPermalinkDocument.path).toEqual('/with-permalink/')
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
  })
})
