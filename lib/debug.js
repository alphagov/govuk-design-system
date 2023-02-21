// Debug metalsmith plugin
// displays site metadata and page information in the console

// files: array containing information about every page
// metalsmith: object containing global information such as meta data
// done: function which must be called when the plugin has finished working

module.exports = function () {
  return function (files, metalsmith, done) {
    console.log('\nMETADATA:')
    console.log(metalsmith.metadata())

    for (const f in files) {
      console.log('\nFILE:')
      console.log(files[f])
    }
    done()
  }
}
