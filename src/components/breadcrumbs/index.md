---
title: Breadcrumbs
description: Help users orientate themselves and navigate pages within a hierarchical structure
section: Components
aliases: navigation path, cookie crumb
backlogIssueId: 33
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.

{{ wcagCallout({
  type: "component",
  introAction: "use",
  name: "Breadcrumbs",
  criteria: [
    {
      text: "make sure users can interact with the Breadcrumbs component",
      anchor: "wcag-interact-breadcrumbs"
    }
  ]
}) }}

{{ example({ group: "components", item: "breadcrumbs", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use the breadcrumbs component when you need to help users understand and move between the multiple levels of a website.

## When not to use this component

Do not use the breadcrumbs component on websites with a flat structure, or to show progress through a linear journey or transaction.

If you’re using other navigational elements on the page, such as a sidebar, consider whether your users need the additional support of breadcrumbs.

## How it works

Always place breadcrumbs at the top of a page, before the `<main>` element. Placing them here means that the 'Skip to main content' link allows the user to skip all navigation links, including breadcrumbs.

The breadcrumbs should start with your 'home' page and end with the parent section of the current page.

{% call wcagNote({id: "wcag-interact-breadcrumbs"}) %}

<p>Make sure no other interactive elements are too close to the Breadcrumbs component. This is to make sure users can easily interact with it. This relates to <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">WCAG 2.2 success criterion 2.5.8 Target size (minimum)</a>.</p>
{% endcall %}

There are 2 ways to use the breadcrumbs component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "breadcrumbs", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Collapsing breadcrumbs on mobile devices

If you have long breadcrumbs you can configure the component to only show the first and last items on mobile devices.

To do this, add a `govuk-breadcrumbs--collapse-on-mobile` class to the outer `<div>` element of the component HTML. Or if you’re using Nunjucks, add `collapseOnMobile: true` to the Nunjucks macro as shown in this example.

{{ example({ group: "components", item: "breadcrumbs", example: "collapse-mobile", html: true, nunjucks: true, open: false }) }}

### Breadcrumbs on dark backgrounds

Use the `govuk-breadcrumbs--inverse` modifier class to show white links and arrows on dark backgrounds – for example, in headers, custom components, and patterns with darker backgrounds.

Make sure all users can see the breadcrumbs – the background colour must have a contrast ratio of at least 4.5:1 with white to [meet WCAG 2.2 success criterion 1.4.3 Contrast (minimum), level AA](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

{{ example({ group: "components", item: "breadcrumbs", example: "inverse", html: true, nunjucks: true, open: false }) }}
