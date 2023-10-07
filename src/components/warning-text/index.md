---
title: Warning text
description: Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take
section: Components
aliases: important text, legal text
backlogIssueId: 71
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({group: "components", item: "warning-text", example: "default", html: true, nunjucks: true, rails: true, open: false, loading: "eager" }) }}

## When to use this component

Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might&nbsp;take.

## How it works

There are 3 ways to use the warning text component:

* HTML
* Nunjucks – use this if you are using the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk)
* Ruby on Rails

{{ example({group: "components", item: "warning-text", example: "default", html: true, nunjucks: true, rails: true, open: false, titleSuffix: "second"}) }}

You might need to rewrite the hidden text (‘Warning’ in the example) to make it appropriate for your context.
