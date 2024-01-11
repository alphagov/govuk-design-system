---
title: Header
description: The GOV.UK header shows users that they are on GOV.UK and which service they are using
section: Components
backlogIssueId: 97
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

The GOV.UK header shows users that they are on GOV.UK and which service they are using.

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affects this component

To use the ‘Header' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [see all page content when interacting with a dropdown menu](/components/header/#wcag-do-not-cover-content)
- [find help links in a consistent place on each page](/components/header/#wcag-consistent-help-links)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

{{ example({ group: "components", item: "header", example: "default", id: "default-1", html: true, nunjucks: true, open: false, loading: "eager" }) }}

If you use the page template, you'll also get the header without having to add it, as it's included by default. However, if you want to customise the default header, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

## When to use this component

You must use the GOV.UK header at the top of every page if your service is being hosted on one of these domains:

- gov.uk/myservice
- myservice.service.gov.uk
- myblog.blog.gov.uk

## When not to use this component

You must not use the GOV.UK header if your service is not being hosted on one of the above domains.

## How it works

### Default header

Use the default header if your service has 5 pages or fewer.

{{ example({ group: "components", item: "header", example: "default", titleSuffix: "second", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Header with service name

Use the header with a service name if your service is more than 5 pages long - this can help users understand which service they are using.

{{ example({ group: "components", item: "header", example: "with-service-name", html: true, nunjucks: true, open: false }) }}

### Header with service name and navigation

Use the header with navigation if you need to include basic navigation, contact or account management links.

<div class="app-wcag-22" id="wcag-do-not-cover-content" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Do not make header elements, like dropdown menus, ‘sticky’ to the top of the page by using `position: fixed` or any other method. In other words, avoid any implementations that cause menus to sit on top of page content.</p>
  <p>This is to make sure it does not hide or obscure any content which has a focus applied and comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html">2.4.11 Focus not Obscured (minimum)</a>.</p>
</div>

In November 2021, [the GOV.UK homepage introduced a menu bar](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) that avoids obscuring content by shifting the page down.

{{ example({group: "components", item: "header", example: "with-service-name-and-navigation", html: true, nunjucks: true, open: false, size: "s"}) }}

<div class="app-wcag-22" id="wcag-consistent-help-links" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>You can add a link to a ‘help’ page in your service’s header. If you do, the link must be positioned consistently within the header, and must always link to the same place.</p>
  <p>For example, a header link to “Get help with this service” must go to the same place as similar header links elsewhere in your service. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">3.2.6 Consistent Help</a>.</p>
</div>
