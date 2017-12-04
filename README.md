# GOV.UK Design System

---
:warning: **This project is still in early development, and is not yet ready
for production use.**

---

**One place for service teams to find styles, components and patterns for
designing government services.**

## Run locally

Make sure you have [Node.js](https://nodejs.org/en/) installed.

### Clone repository
```
git clone git@github.com:alphagov/govuk-design-system.git # or clone your own fork
```

### Install dependencies
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

## Run tests

We are using [RSpec][rspec] for our unit and integration tests. You can run the
tests from command line by running:

```
bundle exec rspec
```

[rspec]: https://relishapp.com/rspec

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

When changes are pushed to GitHub [Travis][travis] will:

- run the tests
- lint the Sass stylesheets in `source/stylesheets`
- run the `middleman build` command to ensure that the site can be generated

If any of these fail, this will be reported in the GitHub status checks
interface.

[travis]: https://travis-ci.org/alphagov/govuk-design-system
