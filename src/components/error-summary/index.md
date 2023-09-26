---
title: Error summary
description: Use an error summary when there is a validation error
section: Components
aliases:
backlogIssueId: 46
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use this component at the top of a page to summarise any errors a user has made.

When a user makes an error, you must show both an error summary and an [error message](/components/error-message/) next to each answer that contains an error.

{{ example({ group: "components", item: "error-summary", example: "default", html: true, nunjucks: true, open: false, size: "s", loading: "eager" }) }}

## When to use this component

Always show an error summary when there is a validation error, even if there’s only one.

## How it works

You must:

- move keyboard focus to the error summary
- include the heading ‘There is a problem’
- link to each of the answers that have validation errors
- make sure the error messages in the error summary are worded the same as those which appear next to the inputs with errors

As well as showing an error summary, follow the [validation pattern](/patterns/validation/) - for example, by adding ‘Error: ’ to the beginning of the page `<title>` so screen readers read it out as soon as possible.

And make your [error messages](/components/error-message/#be-clear-and-concise) clear and concise.

There are 2 ways to use the error summary component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "error-summary", example: "default", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second" }) }}

### Linking from the error summary to each answer

You must link the errors in the error summary to the answer they relate to.

For questions that require a user to answer using a single field, like a file upload, select, textarea, text input or character count, link to the field.

{{ example({ group: "components", item: "error-summary", example: "linking", html: true, nunjucks: true, open: false, size: "s" }) }}

When a user has to enter their answer into multiple fields, such as the day, month and year fields in the date input component, link to the first field that contains an error.

If you do not know which field contains an error, link to the first field.

{{ example({ group: "components", item: "error-summary", example: "linking-multiple-fields", html: true, nunjucks: true, open: false, size: "s" }) }}

For questions that require a user to select one or more options from a list using radios or checkboxes, link to the first radio or checkbox.

{{ example({ group: "components", item: "error-summary", example: "linking-checkboxes-radios", html: true, nunjucks: true, open: false, size: "s" }) }}

### Where to put the error summary

Put the error summary at the top of the `main` container. If your page includes breadcrumbs or a back link, place it below these, but above the `<h1>`.

{{ example({ group: "components", item: "error-summary", example: "full-page-example", html: true, nunjucks: true, open: false, size: "s" }) }}
