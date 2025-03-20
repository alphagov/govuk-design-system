---
title: Service navigation
description: Service navigation helps users understand that they’re using your service and lets them navigate around your service
section: Components
aliases: Primary navigation
backlogIssueId: 76
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_brand-callout.njk" import brandCallout %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

Service navigation helps users understand that they’re using your service and lets them navigate around your service.

{% call brandCallout({ text: "Brand", classes: "brand-tag-green" }) %}

<h2>Brand changes to the {{title}} component</h2><p class="govuk-body">From June 2025, the {{title}} component will be updated to support a wider refresh of the GOV.UK brand. <a href="#/">See the refreshed GOV.UK brand identity.</a>

<p class="govuk-body">The updated {{title}} component:</p>
<ul class="govuk-list">
<li>uses light blue as the background colour, instead of grey</li>
<li>reduces overall padding by [x]px</li>
</ul>
<p class="govuk-body">To help you get ready to use the new branding by June 2025, <a href="#update-to-refresh-the-govuk-brand">we’ve provided several options to update your service</a>.</p>
{% endcall %}

{{ example({ group: "components", item: "service-navigation", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use the Service navigation to help users understand that they’re using your service.

To decide when to use navigation links in your service, see the [Help users to navigate a service pattern](/patterns/navigate-a-service/).

## How it works

Together, the [GOV.UK header component](/components/header/) and Service navigation component ensure users get a consistent experience on GOV.UK.

This also assures users that they’re in the right place to use your service and to understand that GOV.UK functions as one website.

For guidance on how to plan your header and navigation, see the [Help users navigate a service pattern](/patterns/navigate-a-service/).

### Update to refresh the GOV.UK brand

If you use the Nunjucks macro and page template across your service, you can enable the brand refresh by setting the page template’s `rebrand` option to `true`. This will automatically make all needed changes related to the brand refresh.

You can enable the brand refresh within the [component] by setting its `rebrand` option to true. You’ll also need to add some code to your `<html>` and `<head>` elements.

[See the release notes](https://github.com/alphagov/govuk-frontend/releases) for more details and other ways to update.

As you update your service, check the size and positioning of these nearby components:

- [Back link component](/components/back-link/)
- [Breadcrumbs component](/components/breadcrumbs/)
- [Exit this page component](/components/exit-this-page/)

### Change the blue colour bar under the GOV.UK header to full width

To use the GOV.UK header and Service navigation and make them fit together visually, you’ll need to change the bottom blue border of the GOV.UK header to full width.

Apply a class `govuk-header--full-width-border` to the GOV.UK header.

{{ example({ group: "components", item: "service-navigation", example: "with-govuk-header", html: true, nunjucks: true, open: false }) }}

### Showing your service name only

Use the Service navigation component to show your service name.

{{ example({ group: "components", item: "service-navigation", example: "with-service-name", html: true, nunjucks: true, open: false }) }}

### Showing service name and navigation links

Show navigation links to let users navigate to different parts of your service and find useful links and tools.

{{ example({ group: "components", item: "service-navigation", example: "with-service-name-and-navigation", html: true, nunjucks: true, open: false }) }}

See when and how to show navigation links in the [Help users navigate a service pattern](/patterns/navigate-a-service/).

In November 2021, [the GOV.UK homepage introduced a menu bar](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) that avoids obscuring content by shifting the page down.

## Use ‘slots’ to add custom elements

The Service navigation includes the option to use ‘slots’ to insert custom HTML code at specific points inside the component. This helps you extend the component to add custom elements, such as language selectors.

You must provide your own styles and JavaScript code for the content within a slot, particularly if you’re not using an existing component. You’ll need to decide on the most appropriate layout and positioning.

The [Help users to navigate a service pattern](/patterns/navigate-a-service) includes some guidance on ‘Adding other header and navigation elements’.

### Ensure the ‘aria-label’ is accurate for users of assistive technology

When a service name is shown, we let users know that there’s information about the service with a ‘region landmark’ using the `<section>` element.

Depending on what you add in the slots, you might need to rename the `aria-label` to accurately describe what’s in the section.

### Test with each update of GOV.UK Frontend

There’s a risk that slot contents may look or work differently in a future release of GOV.UK Frontend.

You’ll need to ensure that slot content still works as intended after each update.

## Accessibility

Do not make header elements, like dropdown menus, ‘sticky’ to the top of the page by using `position: fixed` or any other method. In other words, avoid any implementations that cause menus to sit on top of page content.

This is to make sure elements do not hide or obscure any content which has a focus applied and comply with [WCAG 2.2 success criterion 2.4.11 Focus not obscured (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

You can add a link to a ‘help’ page in your Service header component. If you do, the link must be positioned consistently within the header, and must always link to the same place.

For example, a header link to 'Get help with this service' must go to the same place as similar header links elsewhere in your service. This is to comply with [WCAG 2.2 success criterion 3.2.6 Consistent help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and Service navigation, and how you can share your feedback with us.
