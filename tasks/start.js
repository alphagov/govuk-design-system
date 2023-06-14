const path = require('path')

const { paths } = require('../config') // specify paths to main working directories
const metalsmith = require('../lib/metalsmith') // configured static site generator
const browsersync = require('../lib/metalsmith-browser-sync') // setup synchronised browser testing

// setup synchronised browser testing
metalsmith.use(browsersync({
  ghostMode: false, // Ghost mode tries to check the same input across examples.
  open: false, // When making changes to the server, we don't want multiple windows opening.
  server: paths.public, // server directory
  files: [
    path.join(paths.source, '**/*'),
    path.join(paths.views, '**/*'),
    path.join(path.dirname(require.resolve('govuk-frontend/package.json')), '**/*')
  ] // files to watch
}))

// build to destination directory
metalsmith.build(function (err, files) {
  if (err) { throw err }
})
