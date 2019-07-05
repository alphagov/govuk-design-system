const metalsmith = require('../lib/metalsmith') // configured static site generator

// set task variable for metalsmith
process.task = 'build'

// build to destination directory
metalsmith.build(function (err, files) {
  if (err) { throw err }
})
