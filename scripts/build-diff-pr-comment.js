const fs = require('fs')

const DIFF_TYPES = [
  { key: 'html', label: 'HTML', marker: '<!-- build-diff-html -->' },
  { key: 'css', label: 'CSS', marker: '<!-- build-diff-css -->' },
  { key: 'js', label: 'JavaScript', marker: '<!-- build-diff-js -->' }
]

function readText(filePath) {
  if (!fs.existsSync(filePath)) return ''
  return fs.readFileSync(filePath, 'utf8').trim()
}

function buildCommentBody({ marker, label, raw, maxChars }) {
  const content = (raw || '').trim()

  if (!content) {
    return [marker, `## ${label} build diff`, '', 'No changes detected.'].join(
      '\n'
    )
  }

  const text =
    content.length > maxChars
      ? `${content.slice(0, maxChars)}\n\n... output truncated`
      : content

  return [
    marker,
    `## ${label} build diff`,
    '',
    '<details>',
    '<summary>Show diff</summary>',
    '',
    '```diff',
    text,
    '```',
    '</details>'
  ].join('\n')
}

async function addBuildDiffComment({
  github,
  context,
  htmlDiffPath = 'build-html.diff',
  cssDiffPath = 'build-css.diff',
  jsDiffPath = 'build-js.diff',
  maxChars = 20000
}) {
  const split = {
    html: readText(htmlDiffPath),
    css: readText(cssDiffPath),
    js: readText(jsDiffPath)
  }
  const { owner, repo } = context.repo
  const issueNumber = context.issue.number

  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number: issueNumber,
    per_page: 100
  })

  for (const type of DIFF_TYPES) {
    const body = buildCommentBody({
      marker: type.marker,
      label: type.label,
      raw: split[type.key],
      maxChars
    })

    const existing = comments.find(
      (comment) => comment.body && comment.body.includes(type.marker)
    )

    if (existing) {
      await github.rest.issues.updateComment({
        owner,
        repo,
        comment_id: existing.id,
        body
      })
      continue
    }

    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body
    })
  }
}

module.exports = {
  addBuildDiffComment
}
