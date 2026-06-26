---
title: Breadcrumbs
description: Help users orientate themselves and navigate pages within a hierarchical structure
section: Components
aliases: navigation path, cookie crumb
backlogIssueId: 33
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

<div class="app-component-metadata">
    <dl class="app-metadata">
        <dt class="app-metadata-term">Status:</dt>
        <dd class="app-metadata-definition"><a class="govuk-link" href="#">Stable</a></dd>
        <dt class="app-metadata-term">Published</dt>
        <dd class="app-metadata-definition">21 June 2018</dd>
        <dt class="app-metadata-term">Last updated</dt>
        <dd class="app-metadata-definition">1 May 2025</dd>
    </dl>
</div>

The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.

{{ example({ group: "components", item: "breadcrumbs", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use the breadcrumbs component when you need to help users understand and move between the multiple levels of a website.

## When not to use this component

Do not use the breadcrumbs component on websites with a flat structure, or to show progress through a linear journey or transaction.

If you’re using other navigational elements on the page, such as a sidebar, consider whether your users need the additional support of breadcrumbs.

## How it works

Always place breadcrumbs at the top of a page, before the `<main>` element. Placing them here means that the 'Skip to main content' link allows the user to skip all navigation links, including breadcrumbs.

The breadcrumbs should start with your 'home' page and end with the parent section of the current page.

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

## Update history

<div class="app-changelog-table">

| Date        | Version  | Changes                                                                        |
| ----------- | -------- | ------------------------------------------------------------------------------ |
| 21 Jun 2018 | 1.0.0    | Component introduced.                                                          |
| 26 Sep 2018 | 2.1.0    | Allow attributes to be added to child items in Nunjucks macros in breadcrumbs. |
| 29 Jul 2019 | 3.0.0    | Update file paths for v3 of Frontend.                                          |
| 1 Jun 2020  | 3.7.0    | Collapse breadcrumb component on mobile.                                       |
| 6 Jul 2023  | 4.7.0    | Added inverse modifier for breadcrumbs on dark backgrounds.                    |
| 7 Jul 2023  | Guidance | Add documentation and examples for inverse breadcrumbs.                        |
| 11 Jan 2024 | Guidance | Added WCAG 2.2 criteria.                                                       |
| 17 Jun 2024 | 5.4.1    | Update Breadcrumbs to use `nav` and `aria-label`.                              |
| 1 May 2025  | Guidance | Removed WCAG 2.2 notes from back link, breadcrumbs, images.                    |

</div>
