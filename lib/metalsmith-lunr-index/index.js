module.exports = function lunrPlugin () {
  return (files, metalsmith, done) => {
    const outputPath = 'search-index.json'

    let indexData = {}

    // Add search index to metalsmith's file object, so that it will write
    // the file out as part of its build
    files[outputPath] = {
      contents: JSON.stringify(indexData)
    }

    done()
  }
}
