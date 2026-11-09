const metalsmith = require('../lib/metalsmith') // Configured static site generator

// build to destination directory
metalsmith.build((err, files) => {
  if (err) {
    throw err
  }
})
