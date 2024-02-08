---
title: Paragraphs
description: Use paragraphs for your core content
section: Styles
theme: Typography
layout: layout-pane.njk
showPageNav: true
order: 5
---

{% from "_example.njk" import example %}

The default paragraph font size is 19px on large screens and 16px on small screens.

{{ example({ group: "styles", item: "paragraphs", example: "body", html: true, open: true }) }}

You can also add classes to create a lead paragraph or smaller body copy to convey hierarchy in your page.

## Lead paragraph

A lead paragraph is an introductory paragraph that you can use at the top of a page to summarise the content. Lead paragraphs use 24px type on desktop and should only be used once per page if needed.

{{ example({ group: "styles", item: "paragraphs", example: "lead", html: true, open: true }) }}

## Body small

You can use the `govuk-body-s` class sparingly to make your paragraph font size smaller: 16px on larger screens and 14px on smaller screens.

The majority of your body copy should use the standard 19px paragraph size.

{{ example({ group: "styles", item: "paragraphs", example: "small", html: true, open: true }) }}