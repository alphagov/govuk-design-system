---
title: Breadcrumbs
description: Help users orientate themselves and navigate pages within a hierarchical structure
section: Components
item: breadcrumbs
aliases: navigation path, cookie crumb
backlogIssueId: 33
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affect this component

To use ‘Breadcrumbs' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [interact with breadcrumbs](/components/breadcrumbs/#wcag-interact-breadcrumbs)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/wcag-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

{{ example({ group: "components", item: item, example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use the breadcrumbs component when you need to help users understand and move between the multiple levels of a website.

## When not to use this component

Do not use the breadcrumbs component on websites with a flat structure, or to show progress through a linear journey or transaction.

If you’re using other navigational elements on the page, such as a sidebar, consider whether your users need the additional support of breadcrumbs.

## How it works

Always place breadcrumbs at the top of a page, before the `<main>` element. Placing them here means that the 'Skip to main content' link allows the user to skip all navigation links, including breadcrumbs.

The breadcrumbs should start with your 'home' page and end with the parent section of the current page.

<div class="app-wcag-22" id="wcag-interact-breadcrumbs" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Make sure no other interactive elements are too close to the breadcrumbs. This is to make sure users can easily interact with the breadcrumbs. This relates to WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">2.5.8 Target size (minimum)</a>.</p>
</div>

There are 2 ways to use the breadcrumbs component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: item, example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Collapsing breadcrumbs on mobile devices

If you have long breadcrumbs you can configure the component to only show the first and last items on mobile devices.

To do this, add a `govuk-breadcrumbs--collapse-on-mobile` class to the outer `<div>` element of the component HTML. Or if you’re using Nunjucks, add `collapseOnMobile: true` to the Nunjucks macro as shown in this example.

{{ example({ group: "components", item: item, example: "collapse-mobile", html: true, nunjucks: true, open: false }) }}

### Breadcrumbs on dark backgrounds

Use the `govuk-breadcrumbs--inverse` modifier class to show white links and arrows on dark backgrounds – for example, in headers, custom components, and patterns with darker backgrounds.

Make sure all users can see the breadcrumbs – the background colour [must have a contrast ratio of at least 4.5:1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) with white.

{{ example({ group: "components", item: item, example: "inverse", html: true, nunjucks: true, open: false }) }}
