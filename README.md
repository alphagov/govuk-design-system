# GOV.UK Design System 🌏🚀🌙

---
:warning: **This project is still in early development, and is not yet ready
for production use.**

---

**One place for service teams to find styles, components and patterns for
designing government services.**

## Run locally

You'll need [Git](https://help.github.com/articles/set-up-git/) and [Node.js](https://nodejs.org/en/) installed to get this project running.

Note: You will need the [active LTS (Long-term support)](https://github.com/nodejs/Release#release-schedule) Node.js version for this project (as specified in [.nvmrc](./.nvmrc))

### Fork repository (optional)
If you're an external contributor make sure to [fork this project first](https://help.github.com/articles/fork-a-repo/)

### Clone repository
```
git clone git@github.com:alphagov/govuk-design-system.git # or clone your own fork

cd govuk-design-system
```

### Using nvm (optional)
If you work across multiple Node.js projects there's a good chance they require different Node.js and npm versions.

To enable this we use [nvm (Node Version Manager)](https://github.com/creationix/nvm) to switch between versions easily.

1. [install nvm](https://github.com/creationix/nvm#installation)
2. Run `nvm install` in the project directory (this will use [.nvmrc](./.nvmrc))

### Install npm dependencies
```
npm install
```

### Start a local server
This will build sources, serve pages and watch for changes.
```
npm start
```

## Build
Build `./src` to `./deploy/public`
```
npm run build
```

## Run the Sass linter

We are using the [sass-lint][sass-lint] plugin to lint the Sass files in
`source/stylesheets`. You can run the linter from command line by running:

```
npm run lint
```

[sass-lint]: https://github.com/juanfran/gulp-scss-lint

## GOV.UK Frontend packages

Design System consumes [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) packages via [NPM](https://www.npmjs.com/).
These are defined in the [package.json](package.json) file.

---------------------
**NOTE:**
For the time being we are consuming private packages. To access private packages, you will first need to log in to NPM with

`npm login`

--------------------

## Automated Checks

We're using [GOV.UK PaaS](https://www.cloud.service.gov.uk/) for automated checks and production deployment.

When changes are pushed to GitHub [Travis][travis] will:

- run the tests
- lint the Sass stylesheets in `source/stylesheets`
- run the `npm run build` command to ensure that the site can be generated

If any of these fail, this will be reported in the GitHub status checks
interface.

[travis]: https://travis-ci.org/alphagov/govuk-design-system

## Automated Deployment
We're using Netlify to automate our deployment for development preview.

### Master deploy
The master branch is published to `govuk-design-system-preview.netlify.com`.

### Branch deploy
When a new branch is pushed to GitHub a preview website will be deployed.
Branch deploys are published to a URL which includes the branch name as a prefix.

For example, if a branch is called `staging`, it will deploy to `staging--govuk-design-system-preview.netlify.com`.

### Deploy preview
When a new pull request is raised a preview website will be deployed.
A deploy generated from a pull request will building the site as it would be if the proposed changes were merged. Deploy Previews are published to a URL which has the prefix `deploy-preview` followed by the identifier number of the pull request.

For example, pull request #137 will automatically trigger a Deploy Preview at `deploy-preview-137--govuk-design-system-preview.netlify.com`. You will also be able to access the deploy preview URL from the govuk-design-system-ci's comment.
