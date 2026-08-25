import { readFileSync } from 'fs'

import outdent from 'outdent'

export function getFilesFromDiff(pattern, status) {
  const changes = processDiffTxt()
  const files = changes.filter(
    (change) => change.fileName.match(pattern) && change.status === status
  )

  return files.length
    ? files.map((change) => change.fileName).join(', ')
    : false
}

export function fileHasChanged(fileName, status) {
  const changes = processDiffTxt()

  return !!changes.find(
    (change) => change.fileName === fileName && change.status === status
  )
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
