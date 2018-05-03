'use strict'

require('dotenv').config()

const fs = require('fs')
const path = require('path')

// query GitHub to get backlog
const GithubGraphQLApi = require('node-github-graphql')
const github = new GithubGraphQLApi({
  token: process.env.GITHUB_API_TOKEN_DS
})

// returns the contents as string
exports.getData = callback => {
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
  `, null, (res, error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    fs.writeFileSync(path.join(__dirname, '/../data/backlog.json'), JSON.stringify(res, null, 2))
    callback()
  })
}
