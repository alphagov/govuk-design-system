# GOV.UK Design System

---
:warning: **This project is still in early development, and is not yet ready
for production use.**

---

**One place for service teams to find styles, components and patterns for
designing government services.**

## Running tests

We are using [RSpec][rspec] for our unit and integration tests. You can run the
tests from command line by running:

```
bundle exec rspec
```

[rspec]: https://relishapp.com/rspec  

## Automated Checks

When changes are pushed to GitHub [Travis][travis] will:

- run the tests
- run the `middleman build` command to ensure that the site can be generated

If any of these fail, this will be reported in the GitHub status checks
interface.

[travis]: https://travis-ci.org/alphagov/govuk-design-system
