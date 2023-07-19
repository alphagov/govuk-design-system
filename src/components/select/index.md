---
title: Select
description: Help users select an item from a list
section: Components
aliases: drop down menu, list box, drop down list, combo box, pop-up menu
backlogIssueId: 60
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({group: "components", item: "select", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

The select component should only be used as a last resort in public-facing services because research shows that some users find selects very difficult to use.

## When not to use this component

The select component allows users to choose an option from a long list. Before using the select component, try asking users questions which will allow you to present them with fewer options.

Asking questions means you’re less likely to need to use the select component, and can consider using a different solution, such as [radios](/components/radios/).

## How it works

If you use the component for settings, you can make an option pre-selected by default when users first see it.

If you use the component for questions, you should not pre-select any of the options in case it influences users' answers.

There are 2 ways to use the select component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk),  you can use the Nunjucks macro.

{{ example({group: "components", item: "select", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second"}) }}

### Select with hint

You can add hint text to help the user understand the options and choose one of them.

{{ example({group: "components", item: "select", example: "with-hint", html: true, nunjucks: true, open: false}) }}

## Research on this component

User research has shown that some users struggle with selects.

### Known issues and gaps

Research shows that users can struggle with selects, particularly when users have:
  - been unable to close the select
  - tried to type into the select
  - confused focused items with selected items
  - tried to pinch zoom select options on smaller devices
  - not understood that they can scroll down to see more items, or how to

 For more detail watch this video with [examples of users struggling with selects](https://www.youtube.com/watch?v=CUkMCQR4TpY).

 This blog shows [an example where a text input is used over a select](https://designnotes.blog.gov.uk/2013/12/05/asking-for-a-date-of-birth/) for asking a user for a date.
