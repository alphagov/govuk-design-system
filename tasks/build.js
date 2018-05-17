const githubBacklog = require('../lib/github-backlog') // get backlog data from GitHubAPI

githubBacklog.getData(() => {
  // build to destination directory
  const metalsmith = require('../lib/metalsmith') // configured static site generator

  metalsmith.build(function (err, files) {
    if (err) { throw err }
  })
})
