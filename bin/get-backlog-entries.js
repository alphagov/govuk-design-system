#! /usr/bin/env node

'use strict'

require('dotenv').config()

const ORG = 'alphagov'
const REPO = 'govuk-design-system-backlog'

// Hardcode column IDs so we don't need to make these requests each time.
// Project ID from running `octokit.projects.listForRepo({ owner, repo })`
// Columns IDs from running `octokit.projects.listColumns({ project_id: 1206077 })`
const COLUMNS = {
  'Proposed': 2000327,
  'To do': 2000328,
  'In progress': 2000329
}

const fs = require('fs')
const path = require('path')

const Octokit = require('@octokit/rest')

const { GITHUB_TOKEN } = process.env
if (!GITHUB_TOKEN) {
  throw new Error('No credentials are set for Github, see README section "Adding credentials"')
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN
})

async function getBacklogEntries () {
  try {
    console.log(`Get issues from ${ORG}/${REPO}...`)
    const listRepoOptions = octokit.issues.listForRepo.endpoint.merge({
      owner: ORG,
      repo: REPO
    })
    const issues = await octokit.paginate(listRepoOptions)

    console.log('Get project cards...')
    const columnKeys = Object.keys(COLUMNS)
    const columnCards = await Promise.all(columnKeys.map(columnKey => {
      const columnCardsOptions = octokit.projects.listCards.endpoint.merge({
        column_id: COLUMNS[columnKey]
      })
      console.log(`Get cards from column ${columnKey}...`)
      return octokit.paginate(columnCardsOptions)
    }))

    const cardsWithColumnName = columnCards.flat().map(card => {
      const splitColumnUrl = card.column_url.split('/')
      const cardKey = parseInt(splitColumnUrl[splitColumnUrl.length - 1], 10)
      card.columnName = columnKeys.find(key => COLUMNS[key] === cardKey)
      return card
    })

    console.log('Merge cards with issues...')
    const cardsWithIssueDetails = (
      cardsWithColumnName
        .filter(card => card.content_url)
        .map(card => {
          card.issue = issues.find(issue => {
            return issue.url === card.content_url
          })
          return card
        })
    )

    console.log('Format entries ready for saving...')
    const formattedBacklogEntries = (
      cardsWithIssueDetails
        .map(card => {
          return {
            url: card.issue.html_url,
            status: card.columnName,
            title: card.issue.title.trim()
          }
        })
        // sort by title
        .sort((cardA, cardB) => {
          // remove special characters for sorting
          const cardATitle = cardA.title.replace(/[^\w\s]/gi, '')
          const cardBTitle = cardB.title.replace(/[^\w\s]/gi, '')
          if (cardATitle > cardBTitle) {
            return 1
          }
          return -1
        })
    )

    const stringifiedEntries = JSON.stringify(formattedBacklogEntries, null, 2)

    fs.writeFile(path.join(__dirname, '../data/backlog-entries.json'), stringifiedEntries, (err) => {
      if (err) {
        throw err
      }
      console.log('Backlog entries successfully saved in data/backlog-entries.json')
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

getBacklogEntries()
