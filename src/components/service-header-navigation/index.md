---
title: Service header navigation
description: Service header navigation helps users understand that they’re using your service and lets them navigate your service.
section: Components
aliases: Primary navigation, Service name
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

### New WCAG 2.2 criteria affects this component

To use the ‘Service header navigation' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [see all page content when interacting with a dropdown menu](/components/service-header-navigation/#wcag-do-not-cover-content)
- [find help links in a consistent place on each page](/components/service-header-navigation/#wcag-consistent-help-links)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/wcag-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

Service header navigation helps users understand that they’re using your service and lets them navigate your service.

## When to use this component

Show the Service header navigation component at the top of every page in your service.

See the [GOV.UK header](/components/header/) component to find out if you also need to show the GOV.UK header component.

## When not to use this component

If your service is 5 pages or fewer and does not need any navigation, do not use the service header navigation component.

## How it works

The [GOV.UK header](/components/header/) and Service header navigation components work together to assure users that they’re in the right place to use your service. It also helps users understand that GOV.UK functions as one website.

See the [Help users to navigate a service](/patterns/navigate-a-service/) pattern for guidance on how to plan your header and navigation.

The GOV.UK header (shown as black) has:

- the GOV.UK logo, which links to the GOV.UK homepage
- space for GOV.UK-wide tools such as GOV.UK One Login and search

The service header navigation (shown as grey) has:

- the service name, which links to the first page of your service
- a navigation menu for your service
- space for service-level tools such as a language selector

Services do not need to duplicate the menu bar used in the [GOV.UK homepage](https://www.gov.uk/) and mainstream guidance pages.

### Default service header without navigation

[EXAMPLE]

If your service is more than 5 pages long, use the default service header without navigation to help users understand which service they are using.

### Service header navigation without service name

[EXAMPLE]

If your service has 5 pages or fewer, you do not need to show the name of your service.

You can use the Service header navigation component to show some basic navigation and links.

### Service header navigation with service name

[EXAMPLE]

If your service needs more than basic navigation, use the service header navigation with service name.

<div class="app-wcag-22" id="wcag-do-not-cover-content" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Do not make header elements, like dropdown menus, ‘sticky’ to the top of the page by using `position: fixed` or any other method. In other words, avoid any implementations that cause menus to sit on top of page content.</p>
  <p>This is to make sure it does not hide or obscure any content which has a focus applied and comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html">2.4.11 Focus not Obscured (minimum)</a>.</p>
</div>

In November 2021, [the GOV.UK homepage introduced a menu bar](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) that avoids obscuring content by shifting the page down.

<div class="app-wcag-22" id="wcag-consistent-help-links" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>You can add a link to a ‘help’ page in your service’s header. If you do, the link must be positioned consistently within the header, and must always link to the same place.</p>
  <p>For example, a header link to “Get help with this service” must go to the same place as similar header links elsewhere in your service. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">3.2.6 Consistent Help</a>.</p>
</div>

### Add custom items in navigation

If you choose to add custom header elements to the service header navigation, there are ‘slots’ to insert code at the start and end of the container.

These can be used to show service-level features, such as language selectors.
