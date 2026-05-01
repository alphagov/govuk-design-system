---
title: Panel
description: The panel component is a visible container used on confirmation or results pages
section: Components
aliases: confirmation box, results box, reference number, application complete, application number
backlogIssueId: 55
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The Panel component is a visible container used to highlight important content.
{{ example({ group: "components", item: "panel", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use the Panel component to display important information within:

- Confirmation pages, which tell the user they’ve successfully completed the transaction
- Interruption pages, which pause the user journey to give important information

See guidance on [Confirmation pages](/patterns/confirmation-pages/) and [Interruption pages](/patterns/interruption-pages/).

## When not to use this component

Never use the panel component to highlight important information within body content.

## How it works

There are 2 ways to use the panel component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

### Confirmation panel

The confirmation panel is part of a [confirmation page](/patterns/confirmation-pages/) and tells the user the outcome of their journey as a heading. You might also give more detailed information as description text.

{{ example({ group: "components", item: "panel", example: "default", html: true, nunjucks: true, open: false, size: "m", titleSuffix: "second" }) }}

### How to write confirmation panel text

Keep your panel text brief, as it's only meant for a high-level explanation of what has happened. For example, 'Application complete'.

Aim to use short words and phrases to make sure highlighted information is easy to read at different screen sizes. For example, shorter amounts of information is less likely to wrap around the panel, which can happen when using the zoom function on mobiles.

If you need to give detailed information, or more context, use the description text under the heading text.

## Interruption panel

The interruption panel is part of a [interruption page]()/patterns/interruption-pages/) and shows the user important information that they’d miss if shown any other way.

Within the panel is a ‘continue’ button that the user must interact with to resume their journey.

The information itself is usually shown as heading with some description text, possibly a bullet or numbered list.
