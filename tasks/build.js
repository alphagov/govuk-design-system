const metalsmith = require('../lib/metalsmith') // Configured static site generator

// build to destination directory
metalsmith.build(function (err, files) {
  if (err) {
    throw err
  }
})
