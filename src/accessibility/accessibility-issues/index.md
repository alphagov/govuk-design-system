---
title: How to deal with accessibility issues 
description: What you can do when you encounter an accessibility issue before reporting it to us.
section: Accessibility
layout: layout-pane.njk
showPageNav: true
order: 2
---

When you encounter an accessibility issue there are a couple of things you can do before reporting it to us. It helps us if you first gather relevant information, try to replicate the issue and check we do not already know about it.

## Where accessibility issues come from

Accessibility issues in your service could be there for different reasons. They could be:

- an issue in the GOV.UK Design System
- an issue with the service due to changes they made to components
- an issue with an assistive technology
- a false positive from an accessibility checker
- a misunderstood result from a user research session

## Gather information

Gather all relevant information first.

If the issue came from a user or auditor, include which software the user was using, specifically:

- which type of assistive technology (if any) and its version
- which operating system and its version
- which browser and its version
- the page on which the issue appeared

Or if the issue came from an accessibility testing tool, include:

- which tool it was
- its version
- the page on which the issue appeared

Add anything else that is important to reproduce the issue.

## Reproduce the issue in your service

Try to reproduce the issue in your own service, ideally with the same tech.

If you do not know the exact tech used, at least test in standard tools. If the issue came from someone using assistive tech, test in the [combinations mentioned in the Service Manual](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies). If the issue was from an accessibility testing tool, test in [the most common testing tools](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility#automated-testing).

If you cannot test in all the relevant tech, you can test in a single set of tech you have available.

If you cannot reproduce it at this point, you can test in other combinations of browsers and assistive tech or testing tools.

If you still cannot reproduce it, not much can be done to fix it. But if you’re sure it's a valid issue, it’s still worth sharing it with us.

## Reproduce the issue on the GOV.UK Design System website

If you can reproduce it in your own service, try to reproduce the issue on the GOV.UK Design System website. Open the component’s page and test it with the same tech.

If you cannot reproduce it, that’s a sign that the issue is with changes you made to the component. You’ll have to fix it yourself in that case.

It's also possible that it used to be an issue with the GOV.UK Design System that has been fixed. In that case, upgrade your version of GOV.UK Frontend first. Then try to reproduce the issue in your upgraded service again.

## Check we do not already know about it

If you can reproduce it on our website, check that it’s not an issue we already know about. You can find that out by:

- searching through issues on the repo for the [GOV.UK Frontend codebase](https://github.com/alphagov/govuk-frontend/issues)
- finding the relevant component in our [community backlog](https://github.com/orgs/alphagov/projects/43/views/2) and search through its page
- if the issue came from an accessibility checking tool, searching through [known issues flagged by validators or automated testing tools](https://github.com/orgs/alphagov/projects/37/views/1)
- searching through [reported vendor bugs](https://github.com/orgs/alphagov/projects/34)

## How to report the issue

If the issue already exists but you have more information, add that to the existing issue.

If the issue does not exist, [create a new one](https://github.com/alphagov/govuk-frontend/issues/new?template=bug-report.md).
