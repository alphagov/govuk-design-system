const metalsmith = require('../lib/metalsmith') // configured static site generator

// build to destination directory
metalsmith.build(function (err, files) {
  if (err) {
    throw err
  }
})
