---
title: Addressing accessibility issues in your service
description: What you can do when you encounter an accessibility issue before reporting it to us.
section: Accessibility
layout: layout-pane.njk
showPageNav: true
order: 2
---

We're always looking to improve the accessibility of the Design System.

To decide the best way to address an accessibility issue, you should:

1. Gather relevant information.
2. Try to reproduce the issue.
3. Check if it's a known issue.

Accessibility issues in your service can happen for different reasons. These could include:

- an issue in the GOV.UK Design System
- an issue with the service due to changes made to components
- an issue with an assistive technology
- a false positive from an accessibility checker
- a misunderstood result from a user research session

## Gather information

First, gather all relevant information and any useful context.

If the issue came from a user or auditor, include which software the user was using, specifically:

- which type of assistive technology (if any) and its version
- which operating system and its version
- which browser and its version
- the page on which the issue appeared

Or if the issue came from an accessibility testing tool, include:

- which tool it was
- its version
- the page on which the issue appeared

Add anything else that's important to reproduce the issue.

## Reproduce the issue in your service

Try to reproduce the issue in your own service, ideally using the same set of technologies as reported.

If you do not know the set of technologies used, at least test with standard tools. If the issue came from someone using assistive tech, test with the [combinations mentioned in the Service Manual](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies). If the issue was from an accessibility testing tool, test with [the most common testing tools](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility#automated-testing).

If you cannot test with all the relevant technologies, you can test with a single set of technologies that you do have available.

If you cannot reproduce it at this point, you can test in other combinations of browsers and assistive tech or testing tools.

If you still cannot reproduce the issue, investigating it will be very difficult. However, if you’re sure it's a valid issue, it’s still worth sharing it with us.

## Reproduce the issue on the GOV.UK Design System website

If you can reproduce it in your own service, try to reproduce it on the GOV.UK Design System website. Open the examples on the component’s page and test it with the same set of technologies.

If you cannot reproduce it here, this probably means there's an issue with changes you've made to the component or how the component is used in your service. In this case, you'll have to fix this yourself.

Make sure you're using the latest version of GOV.UK Frontend. It's possible the issue was fixed in a previous version and updating to the latest version might fix it in your service.

## Check if it's a known issue

If you can reproduce it on our website, check that it’s not an issue we already know about.

We track accessibility-related issues in a few different places:

- the list of [issues in the GOV.UK Frontend repo](https://github.com/alphagov/govuk-frontend/issues)
- discussions for each component in our [community backlog](https://github.com/alphagov/govuk-design-system/discussions/categories/published-in-the-gov-uk-design-system)
- our list of [known issues flagged by validators or automated testing tools](https://github.com/orgs/alphagov/projects/37/views/1), if the issue came from an accessibility checking tool
- our list of [reported vendor bugs](https://github.com/orgs/alphagov/projects/34), if the issue came from an assistive technology or browser

## Report the issue

If the issue already exists but you have more information, you can add a comment to it. Any new information can help us better understand the issue.

If the issue does not exist, you can [create a new issue](https://github.com/alphagov/govuk-frontend/issues/new?template=bug-report.md).
