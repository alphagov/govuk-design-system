const lunr = require('lunr')

module.exports = function lunrPlugin () {
  return (files, metalsmith, done) => {
    const outputPath = 'search-index.json'

    const documents = Object.keys(files).map(path => {
      return {
        path: path,
        title: files[path].title
      }
    })

    // The search index only contains what's needed to match and identify a
    // document, but won't give us back anything other than the document's
    // identifier (`ref`).
    //
    // This store then allows us to lookup the information about the document
    // that we can use to present the result.
    let store = {}

    const index = lunr(function () {
      this.ref('path')
      this.field('title')

      documents.forEach(doc => {
        store[doc.path] = {
          title: doc.title
        }
        this.add(doc)
      })
    })

    // Add search index to metalsmith's file object, so that it will write
    // the file out as part of its build
    files[outputPath] = {
      contents: JSON.stringify({
        index,
        store
      })
    }

    done()
  }
}
