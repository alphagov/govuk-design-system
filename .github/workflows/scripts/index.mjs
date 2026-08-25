import { existsSync, readFileSync } from 'fs'

import outdent from 'outdent'

export function getFilesFromDiff(pattern, status) {
  const changes = processDiffTxt()
  const files = changes.filter(
    (change) => change.fileName.match(pattern) && change.status === status
  )

  return files.length ? files.map((change) => change.fileName).join(',') : false
}

export function getFileSiblings(files, parentDir, child, sibling) {
  const childFiles = files.filter(
    (file) =>
      file.endsWith(child) &&
      existsSync(`${parentDir}/${getFileDirectory(file)}/${sibling}`)
  )

  return childFiles.length
    ? childFiles
        .map((file) => [
          file,
          files.find(
            (subfile) => subfile === `${getFileDirectory(file)}/${sibling}`
          )
        ])
        .join(',')
    : false
}

export async function prepareCommentBody(intro = '', files = [], outro = '') {
  let commentBody = ''

  if (intro) {
    commentBody = `${intro}`
  }

  if (files.length) {
    let filesList = ''

    for (const file of files.split(',')) {
      if (file[1]) {
        filesList = `${filesList}
        - ${file[0]}`
      }
    }

    commentBody = `${commentBody}

    ${filesList}`

    if (outro) {
      commentBody = `${commentBody}

      ${outro}`
    }

    return commentBody
  }
}

export async function comment(
  { github, context },
  issueNumber,
  marker,
  bodyText
) {
  const { issues } = github.rest

  /**
   * GitHub issue REST API parameters
   */
  const parameters = {
    issue_number: issueNumber,
    owner: context.repo.owner,
    repo: context.repo.repo
  }

  /**
   * GitHub issue comment body
   */
  const body = outdent`
  <!-- ${marker} -->
  ${bodyText}
  `

  /**
   * Find GitHub issue comment with marker `<!-- Example -->`
   */
  const comment = await getComment({ github, context }, issueNumber, marker)

  /**
   * Update GitHub issue comment (or create new)
   */
  await (comment?.id
    ? issues.updateComment({ ...parameters, body, comment_id: comment.id })
    : issues.createComment({ ...parameters, body }))
}

function processDiffTxt() {
  return readFileSync('./diff.txt', 'utf8')
    .split('\n')
    .filter((change) => change.trim())
    .map((change) => {
      const [status, fileName] = change.split('\t')
      return {
        fileName,
        status
      }
    })
}

function getFileDirectory(file) {
  const dir = file.split('/')
  dir.pop()
  return dir.join('/')
}

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
