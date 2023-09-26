---
title: Details
description: Make a page easier to scan by letting users reveal more detailed information only if they need it
section: Components
aliases: reveal, progressive disclosure, hidden text, show and hide, ShowyHideyThing
backlogIssueId: 44
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Make a page easier to scan by letting users reveal more detailed information only if they need it.

{{ example({ group: "components", item: "details", example: "default", html: true, nunjucks: true, open: false, size: "s", loading: "eager" }) }}

## When to use this component

Use the details component to make a page easier to scan when it contains information that only some users will need.

## When not to use this component

Do not use the details component to hide information that the majority of your users will need.

## Decide between using details, accordions and tabs

Details, [accordions](/components/accordion/), and [tabs](/components/tabs/) all hide sections of content which a user can choose to reveal.

Use the details component instead of tabs or an accordion if you only have 1 section of content.

The details component is less visually prominent than tabs and accordions, so tends to work better for content which is not as important to users.

## How it works

The details component is a short link that shows more detailed help text when a user clicks on it.

There are 2 ways to use the details component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "details", example: "default", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second" }) }}

### Write clear link text

Make the link text short and descriptive so users can quickly work out if they need to click on it.

## Research on this component

There is [evidence that some users avoid clicking the link to show more details](https://github.com/alphagov/govuk-design-system-backlog/issues/44#issuecomment-629122091), as they think it will take them away from the page.

There are [concerns that some users of voice assist software will not be able to interact with the component](https://github.com/alphagov/govuk-design-system-backlog/issues/44#issuecomment-628082040). Some software might require the user to specifically refer to the link to show more details as a button in order to interact with it.
