# GOV.UK Design System

This repository contains the code for the GOV.UK Design System website. To find the code we provide for reuse by services, go to the [govuk-frontend repository](https://github.com/alphagov/govuk-frontend).

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

We are using the tool [stylelint][stylelint] to lint the Sass files in
`source/stylesheets`. You can run the linter from command line by running:

```
npm run lint
```

[stylelint]: https://github.com/stylelint/stylelint

## GOV.UK Frontend packages

Design System consumes the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) package via [NPM](https://www.npmjs.com/).
This is defined in the [package.json](package.json) file.

---

## Continuous integration

When changes are pushed to GitHub, [Github Actions][github-actions] will:

- run the tests
- lint the Sass stylesheets in `source/stylesheets`
- run the `npm run build` command to ensure that the site can be generated

If any of these fail, this will be reported in the GitHub status checks
interface.

[github-actions]: https://github.com/alphagov/govuk-design-system/actions

## Deployment

- [How the Design System is deployed to production](docs/deployment/production.md)
- [How branch and PR previews are deployed](docs/deployment/previews.md)

## Security

GDS is an advocate of responsible vulnerability disclosure. If you’ve found a vulnerability, we would like to know so we can fix it.

To learn how to report a security vulnerability, [see our security policy](https://github.com/alphagov/govuk-design-system/security/policy).

## Contributing

The govuk-design-system repository is public and we welcome contributions from anyone.

Contributors to alphagov repositories are expected to follow the [Contributor Covenant Code of Conduct](https://github.com/alphagov/.github/blob/main/CODE_OF_CONDUCT.md#contributor-covenant-code-of-conduct). Contributors working within government are also expected to follow the [Civil Service code](https://www.gov.uk/government/publications/civil-service-code/the-civil-service-code).

We're unable to monitor activity on this repository outside of our office hours (10am to 4pm, UK time). To get a faster response at other times, you can [report abuse or spam to GitHub](https://docs.github.com/en/communities/maintaining-your-safety-on-github/reporting-abuse-or-spam).
