---
title: Lists
description: Use lists to make blocks of text easier to read, and to break information into manageable chunks.
section: Styles
backlogIssueId: 64
theme: Typography
layout: layout-pane.njk
showPageNav: true
order: 7
---

{% from "_example.njk" import example %}

Use lists to make blocks of text easier to read, and to break information into manageable chunks.

{{ example({ group: "styles", item: "lists", example: "default", html: true, open: true, size: "s" }) }}

## Bulleted lists

Introduce bulleted lists with a lead-in line ending in a colon. Start each item with a lowercase letter, and do not use a full stop at the end.

{{ example({ group: "styles", item: "lists", example: "bulleted", html: true, open: true, size: "s" }) }}

## Numbered lists

Use numbered lists instead of bulleted lists when the order of the items is relevant.

You do not need to use a lead-in line for numbered lists. Items in a numbered list should end in a full stop because each should be a complete sentence.

{{ example({ group: "styles", item: "lists", example: "numbered", html: true, open: true, size: "s" }) }}

## Adding extra spacing between list items

If a list is hard to read because the items run across multiple lines you can add extra spacing.

{{ example({ group: "styles", item: "lists", example: "spaced", html: true, open: true, size: "s" }) }}
