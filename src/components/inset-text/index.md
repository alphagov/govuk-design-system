---
title: Inset text
description: Use the inset text component to differentiate a block of text from the content that surrounds it
section: Components
aliases: highlighted text, callout
backlogIssueId: 136
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({ group: "components", item: "inset-text", example: "default", html: true, nunjucks: true, rails: true, size: "s", loading: "eager" }) }}

## When to use this component

Use the inset text component to differentiate a block of text from the content that surrounds it, for example:

- quotes
- examples
- additional information about the page

## When not to use this component

Some users do not notice inset text if it’s used on complex pages or near to other visually prominent elements. For this reason, avoid using inset text as a way of highlighting very important information that users need to see.

If you need to draw attention to very important content, like legal information, use the [warning text component](/components/warning-text/) instead.

## How it works

Use inset text very sparingly - it’s less effective if it’s overused.

There are 2 ways to use the inset text component. You can use HTML or, if you’re using Nunjucks or the GOV.UK Prototype Kit, you can use the Nunjucks macro.

{{ example({ group: "components", item: "inset-text", example: "default", html: true, nunjucks: true, rails: true, open: false, size: "s", titleSuffix: "second" }) }}
