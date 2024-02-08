---
title: Section break
description: Break up sections of content
section: Styles
theme: Page structure
layout: layout-pane.njk
order: 4
---

{% from "_example.njk" import example %}

You can use the `govuk-section-break` classes on an `<hr>` element to create a thematic break between sections of content. `govuk-section-break` has class-based modifiers for different size margins.

By default `govuk-section-break` is only visible by its margin. You can add the `govuk-section-break--visible` class to make it visible with a separator line.

{{ example({ group: "styles", item: "section-break", example: "section-break", html: true, open: true, size: "m" }) }}
