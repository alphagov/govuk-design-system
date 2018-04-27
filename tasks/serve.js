require('dotenv').config()

const fs = require('fs')

const browsersync = require('metalsmith-browser-sync') // setup synchronised browser testing

const paths = require('../config/paths.json') // specify paths to main working directories

// query GitHub to get backlog
const GithubGraphQLApi = require('node-github-graphql')
const github = new GithubGraphQLApi({
  token: process.env.GITHUB_API_TOKEN_DS
})

// get backlog data

github.query(`
query {
  repository(owner:"alphagov", name:"govuk-design-system-backlog") {
    project(number:1){
      name,
      columns(first:4){
        nodes{
          name,
          cards(first:100){
            edges{
              node{
                note,
                content{
					        ... on Issue {
						        title,
                    url,
                    lastEditedAt,
                    bodyHTML
    				      }
                }
              }
            }
          }
        }
      }
    }
  }
}
`, null, (res, err) => {
 	fs.writeFileSync('data/backlog.json', JSON.stringify(res, null, 2))

  const metalsmith = require('../lib/metalsmith') // configured static site generator

	// setup synchronised browser testing
	metalsmith.use(browsersync({
	  server: paths.public, // server directory
	  files: [paths.source + '**/*', paths.views + '**/*'] // files to watch
	}))

	// build to destination directory
	metalsmith.build(function (err, files) {
	  if (err) { throw err }
	})

})
