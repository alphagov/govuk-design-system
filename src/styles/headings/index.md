---
title: Headings
description: Use headings to structure content on pages
section: Styles
backlogIssueId: 64
theme: Typography
layout: layout-pane.njk
showPageNav: true
order: 7
---

{% from "_example.njk" import example %}

Write all headings in sentence case.

Use heading tags, such as `<h1>`, `<h2>` and so on, to tag the headings on a page. Apply a heading class, such as `govuk-heading-l`, to style them visually. Style headings consistently to create a clear content structure throughout your service.

For a [question page](/patterns/question-pages/), or pages with long headings, start with `govuk-heading-l` for an `<h1>`, `govuk-heading-m` for an `<h2>` and so on. But change it if your pages feel unbalanced – the heading class you use does not always need to correspond to the heading level.

{{ example({ group: "styles", item: "headings", example: "default", html: true, open: true, size: "m", loading: "eager" }) }}

If your page has lots of long form content, start with `govuk-heading-xl` for an `<h1>`, `govuk-heading-l` for an `<h2>`, and so on.

{{ example({ group: "styles", item: "headings", example: "headings-xl", html: true, open: true, size: "m" }) }}

## Headings with captions

Sometimes you may need to make it clear that a page is part of a larger section or group. To do this, you can use a heading with a caption above it.

{{ example({ group: "styles", item: "headings", example: "captions", html: true, open: true, size: "l" }) }}

If the caption should be considered part of the page heading, you can also nest the caption within the `<h1>`.

{{ example({ group: "styles", item: "headings", example: "captions-inside", html: true, open: true, size: "l" }) }}