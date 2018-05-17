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

    var columns = res.data.repository.project.columns.nodes
    var inProgress = columns[3].cards.edges.map(edge => {
      edge.column = 'In progress'
      return edge
    })
    var toDo = columns[2].cards.edges.map(edge => {
      edge.column = 'To do'
      return edge
    })
    var proposed = columns[1].cards.edges.map(edge => {
      edge.column = 'Proposed'
      return edge
    })
    var backlogOutput =
      inProgress
        .concat(toDo)
        .concat(proposed)
        .sort((a, b) => {
          if (!a.node.content || !b.node.content) {
            return -1;
          }

          var nameA = a.node.content.title;
          var nameB = b.node.content.title;
          if (nameA < nameB) {
           return -1;
          }
          if (nameA > nameB) {
           return 1;
          }

          return 0;

        })

    fs.writeFileSync(path.join(__dirname, '/../data/backlog.json'), JSON.stringify(backlogOutput, null, 2))
    callback()
  })
}
