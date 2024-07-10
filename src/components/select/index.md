---
title: Select
description: Help users select an item from a list
section: Components
aliases: drop down menu, list box, drop down list, combo box, pop-up menu
backlogIssueId: 60
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affect this component

To use the ‘Select' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [use the select without relying on 'click and drag' movements (if you choose to add functionality to select multiple options)](/components/select/#wcag-avoid-dragging-multiple-options)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/wcag-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

{{ example({ group: "components", item: "select", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

The select component should only be used as a last resort in public-facing services because research shows that some users find selects very difficult to use.

## When not to use this component

The select component allows users to choose an option from a long list. Before using the select component, try asking users questions which will allow you to present them with fewer options.

Asking questions means you’re less likely to need to use the select component, and can consider using a different solution, such as [radios](/components/radios/).

## How it works

If you use the component for settings, you can make an option pre-selected by default when users first see it.

If you use the component for questions, you should not pre-select any of the options in case it influences users' answers.

There are 2 ways to use the select component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "select", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Select with hint

You can add hint text to help the user understand the options and choose one of them.

{{ example({ group: "components", item: "select", example: "with-hint", html: true, nunjucks: true, open: false }) }}

### Error messages

Display an error message if the user has not selected an option.

Style error messages as shown in the example:

{{ example({ group: "components", item: "select", example: "error", html: true, nunjucks: true, open: false }) }}

### Avoid adding functionality to allow selecting multiple options

The select component does not support selecting multiple options, [as there’s a history of poor usability and assistive technology support for `<select multiple>`](https://www.24a11y.com/2019/select-your-poison/). If you need to ask the user to pick more than one item from a list, it’s almost always better to use another method, such as a list of checkboxes.

<div class="app-wcag-22" id="wcag-avoid-dragging-multiple-options" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Any input that’s designed to let a user select multiple options must offer a way to do so without relying on ‘click and drag’ movements or keyboard and mouse combination actions. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html">2.5.7 Dragging movements</a>.</p>
</div>

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
