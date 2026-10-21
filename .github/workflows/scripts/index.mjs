import { existsSync, readFileSync } from 'fs'
import { matchesGlob } from 'path'

import outdent from 'outdent'

/**
 * Returns files from a name status diff that match the passed regex pattern and
 * the specified status letter.
 *
 * See the git diff docs for details on possible status letters:
 * https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---diff-filterACDMRTUXB
 *
 * @param {string} glob - Glob-syntax pattern to find files in the diff list
 * @param {string} status - One of git diff's possible status letters
 * @returns {[string]|false} - Array of matching files or false if none found
 */
export function getFilesFromDiff(glob, status) {
  // Assumes a name status diff text file has already been generated
  const changes = processDiffTxt()

  const files = changes.filter(
    (change) => matchesGlob(change.fileName, glob) && change.status === status
  )

  return files.length ? files.map((change) => change.fileName) : false
}

/**
 * Filter a list of files based on:
 *
 * - if they have a sibling in their file directory
 * - if that sibling is also in the list of changed files or not
 *
 * @param {Array} files - List of files from the diff
 * @param {string} parentDir - Directory of the current action which we use to check
 *   if sibling files exist
 * @param {string} child - file we're checking for
 * @param {string} sibling - sibling we're checking exists against the child file
 * @returns {[string]|false} - Array of matching files or false if none found
 */
export function getFilesWithUnchangedSiblings(
  files,
  parentDir,
  child,
  sibling
) {
  const childFiles = files.filter((file) => {
    // Get the current file's directory without the file itself
    const dir = file.split('/')
    dir.pop()

    // Get the path to the sibling
    const siblingPath = `${dir.join('/')}/${sibling}`

    return (
      file.endsWith(child) &&
      existsSync(`${parentDir}/${siblingPath}`) &&
      !files.find((subfile) => subfile === siblingPath)
    )
  })

  return childFiles.length ? childFiles : false
}

/**
 * Prepare body for posting a github comment
 *
 * @param {string} intro - Start of comment
 * @param {Array} files - List of files which will be converted into a markdown
 *   list after the intro
 * @param {string} outro - End of comment after the list of files
 * @returns {string} - The constructed comment body
 */
export function prepareCommentBody(intro, files, outro) {
  let filesList = ''

  for (const file of files) {
    filesList = outdent`
    ${filesList}
    - ${file}
    `
  }

  return outdent`
  ${intro}
  ${filesList}

  ${outro}
  `
}

/**
 * Post a comment to a PR in github
 *
 * @param {{github: object, context: object}} - - The Github action context object
 * @param {number} issueNumber - Number of PR to post comment to
 * @param {string} marker - The marker to identify the comment
 * @param {string} bodyText - The text of the comment
 */
export async function comment(
  { github, context },
  issueNumber,
  marker,
  bodyText
) {
  const { issues } = github.rest

  // GitHub issue REST API parameters
  const parameters = {
    issue_number: issueNumber,
    owner: context.repo.owner,
    repo: context.repo.repo
  }

  // GitHub issue comment body, including marker
  const body = outdent`
  <!-- ${marker} -->
  ${bodyText}
  `

  // Find GitHub issue comment with marker `<!-- Example -->`
  const comment = await getComment({ github, context }, issueNumber, marker)

  // Update exist GitHub issue comment or create a new one
  await (comment?.id
    ? issues.updateComment({ ...parameters, body, comment_id: comment.id })
    : issues.createComment({ ...parameters, body }))
}

/**
 * Gets a git diff name status output which this function assumes exists in the
 * current filesystem as 'diff.txt' and processes it into a JS map
 *
 * @returns {[{fileName: string, status: string}]} - Processed name status diff into a map
 */
function processDiffTxt() {
  return (
    readFileSync('./diff.txt', 'utf8')
      .trim()
      // Name status diffs are split by linebreaks
      .split('\n')
      // Get rid of stray spaces to avoid pain when processing this map later
      .map((change) => {
        // the status letter and file path are split by a tab character
        const [status, fileName] = change.trim().split(/\s+/)
        return {
          fileName,
          status
        }
      })
  )
}

/**
 *
 * @param {{github: object, context: object}} - - The Github action context object
 * @param {number} issueNumber - Number of PR to post comment to
 * @param {string} marker - The marker to identify the comment
 * @returns {Promise<object | undefined>} GitHub comment, or undefined if no comment found
 */
async function getComment({ github, context }, issueNumber, marker) {
  const { issues } = github.rest

  // Find all GitHub issue comments
  const comments = await github.paginate(issues.listComments, {
    issue_number: issueNumber,
    owner: context.repo.owner,
    repo: context.repo.repo
  })

  // Find first match for marker
  return comments.find(({ body }) => !!body?.includes(marker))
}
