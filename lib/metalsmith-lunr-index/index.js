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

    const index = lunr(function () {
      this.ref('path')
      this.field('title')

      documents.forEach(doc => {
        this.add(doc)
      })
    })

    // Add search index to metalsmith's file object, so that it will write
    // the file out as part of its build
    files[outputPath] = {
      contents: JSON.stringify(index)
    }

    done()
  }
}
