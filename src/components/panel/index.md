---
title: Panel
description: The panel component is a visible container used on confirmation or results pages
section: Components
aliases: confirmation box, results box, reference number, application complete, application number
backlogIssueId: 55
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The panel component is a visible container used on confirmation or results pages to highlight important content.
{{ example({ group: "components", item: "panel", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use the panel component to display important information when a transaction has been&nbsp; completed.

In most cases, the panel component is used on [confirmation pages](/patterns/confirmation-pages/), to tell the user they have successfully completed the transaction.

## When not to use this component

Never use the panel component to highlight important information within body content.

## How it works

There are 2 ways to use the panel component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "panel", example: "default", html: true, nunjucks: true, open: false, size: "m", titleSuffix: "second" }) }}

### How to write panel text

Keep your panel text brief, as it's only meant for a high-level explanation of what has happened. For example, 'Application complete'.

Aim to use short words and phrases to make sure highlighted information is easy to read at different screen sizes. For example, shorter amounts of information is less likely to wrap around the panel, which can happen when using the zoom function on mobiles.

If you need to give detailed information, or more context, use the description text under the heading text.
