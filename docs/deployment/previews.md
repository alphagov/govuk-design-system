# Branch and PR previews

Branch and PR previews are automatically deployed by [Netlify](https://www.netlify.com/).

## Pull Request previews

Previews of Pull Requests are automatically published to a URL which has the
prefix `deploy-preview` followed by the identifier number of the pull request.

For example, pull request #137 would be deployed to
`deploy-preview-137--govuk-design-system-preview.netlify.com`.

The Netlify bot should comment on each PR shortly after building with a link to
the preview.

## Branch previews

When a new branch is pushed to GitHub a preview website will be deployed.
Branch deploys are published to a URL which includes the branch name as a prefix.

For example, if a branch is called `staging`, it will deploy to `staging--govuk-design-system-preview.netlify.com`.

## Configuration

The Netlify account is tied to the govuk-design-system-ci GitHub user, the
credentials for which can be found in BitWarden.
