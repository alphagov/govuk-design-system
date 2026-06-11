---
title: Language selector
description: Help users access content in their native language
section: Components
aliases: language, locale, language selection, language chooser, language navigation, translation navigation
backlogIssueId: 285
layout: layout-pane.njk
---

Content, guidance, examples, etc. would be here as normal.

The quality checks section would be used for experimental components, to show how thoroughly they have been tested and (roughly) what stage of completion they're on.

A reduced set of criteria would be used for patterns and guidance changes.

## Quality checks

{% from "_checklist.njk" import checklist %}

{{ checklist({
  items: [
    {
      title: "Interactive states",
      description: "Includes styles for all applicable interactive states (hover, focus, disabled)."
    },
    {
      title: "Internationalisation support",
      description: "Text can be translated into other languages.",
      status: "completed"
    },
    {
      title: "Keyboard interactivity",
      description: "Controls can be interacted with using only a keyboard (WCAG 2.1.1).",
      status: "completed"
    },
    {
      title: "Use of colour",
      description: "Colour is not the sole way of conveying context (WCAG 1.4.1).",
      status: "completed"
    },
    {
      title: "Accessible contrast for text",
      description: "Text has a contrast ratio of at least 4.5:1 for small text, or 3:1 for large text, against their background colours (WCAG 1.4.3).",
      status: "completed"
    },
    {
      title: "Accessible contrast for UI elements",
      description: "Controls have at least a 3:1 contrast against their background colours, unless the component is inactive (WCAG 1.4.11).",
      status: "not-applicable"
    },
    {
      title: "Screen reader testing",
      description: "Text can be accurately and understandably announced by screen readers.",
      status: "completed"
    },
    {
      title: "Voice control testing",
      description: "Controls can be accurately interacted with by voice control software.",
      status: "completed"
    },
    {
      title: "Usage guidelines",
      description: "Guidance highlighting functionality, best practices and common mistakes has been written and reviewed."
    },
    {
      title: "Nunjucks parameter documentation",
      description: "Documentation of the available Nunjucks parameters has been written and reviewed."
    }
  ]
})}}
