---
layout: layout-pane.njk
title: Making labels and legends headings
section: Get started
theme: How to guides
order: 4
description: How to markup and style labels, legends and headings
---
{% from "_example.njk" import example %}

Whenever you design a form, you should start by splitting it across multiple pages with each page containing just one thing, for example:

- one piece of information you’re telling a user
- one decision they have to make
- one question they have to answer

This helps users focus and understand what’s being asked of them.

When you’re asking just one question on a page, you can make the question the page’s heading. Your page heading will then most likely be the same as the `<label>` or `<legend>` for the input.

For example, on a page that only asks users for their postcode, the question ‘What is your postcode’ would be both the page heading and the most logical `<label>` for your text input.

To avoid repetition, one option is to use a visually hidden `<label>` or `<legend>`.

However, this option only removes visual duplication and will not help users of screen readers. They will still hear both the page heading and the visually hidden `<label>` or `<legend>`.

To prevent this, set the contents of the `<label>` or `<legend>` as the page heading (except if you're asking more than one question on the page).

## Labels as page headings

To set the contents of a label as the page heading, you need to put the `<label>` tag inside  the `<h1>` tag. You can either do this in HTML, or by using the Nunjucks macro and setting `isPageHeading: true`.

You then need to apply classes to the `<label>` to make it look like a heading.

{{ example({group: "get-started", item: "labels-legends-headings", example: "label-h1", html: true, nunjucks: true, open: false, loading: "eager"}) }}

## Legends as page headings

To set the contents of a legend as the page heading, you need to put the `<legend>` tag outside the `<h1>` tag. You can either do this in HTML, or by using the Nunjucks macro and setting `isPageHeading: true`.

As with labels, you also need to apply classes to the `<legend>` to make it look like a heading.

{{ example({group: "get-started", item: "labels-legends-headings", example: "legend-h1", html: true, nunjucks: true, open: false}) }}

## Styling options for labels and legends

Instead of styling them as page headings, you can apply other classes to legends and labels to make them larger and bolder than the default.

### Styling labels

{{ example({group: "get-started", item: "labels-legends-headings", example: "label-m-s", html: true, nunjucks: true, open: false}) }}

### Styling legends

{{ example({group: "get-started", item: "labels-legends-headings", example: "legend-m-s", html: true, nunjucks: true, open: false}) }}
