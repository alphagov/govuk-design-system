const githubBacklog = require('../lib/github-backlog') // get backlog data from GitHubAPI

githubBacklog.getData(() => {

  const browsersync = require('metalsmith-browser-sync') // setup synchronised browser testing
  const metalsmith = require('../lib/metalsmith') // configured static site generator
  const paths = require('../config/paths.json') // specify paths to main working directories

  // setup synchronised browser testing
  metalsmith.use(browsersync({
    server: paths.public, // server directory
    files: [
      paths.source + '**/*',
      paths.views + '**/*',
      'node_modules/@govuk-frontend/**/*'
    ] // files to watch
  }))

  // build to destination directory
  metalsmith.build(function (err, files) {
    if (err) { throw err }
  })
})
