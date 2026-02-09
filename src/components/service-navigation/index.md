---
title: Service navigation
description: Service navigation helps users understand that they’re using your service and lets them navigate around your service
section: Components
aliases: Primary navigation
backlogIssueId: 76
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_callout.njk" import callout %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

Service navigation helps users understand that they’re using your service and lets them navigate around your service.

{{ example({ group: "components", item: "service-navigation", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

If you use the page template, you'll also get the Service navigation without having to add it, as it's included by default. However, if you want to customise the default Service navigation, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

## When to use this component

Use the Service navigation to help users understand that they’re using your service.

To decide when to use navigation links in your service, see the [Help users to navigate a service pattern](/patterns/navigate-a-service/).

## How it works

Together, the [GOV.UK header component](/components/header/) and Service navigation component ensure users get a consistent experience on GOV.UK.

This also assures users that they’re in the right place to use your service and to understand that GOV.UK functions as one website.

For guidance on how to plan your header and navigation, see the [Help users navigate a service pattern](/patterns/navigate-a-service/).

### Change the blue colour bar under the GOV.UK header to full width

To use the GOV.UK header and Service navigation and make them fit together visually, you’ll need to change the bottom blue border of the GOV.UK header to full width.

Apply a class `govuk-header--full-width-border` to the GOV.UK header.

{{ example({ group: "components", item: "service-navigation", example: "with-govuk-header", html: true, nunjucks: true, open: false }) }}

{% call callout({ tagText: "Brand", colour: "green" }) %}

<p class="govuk-body">You do not need to change the bottom border of the updated GOV.UK header component with the refreshed GOV.UK branding.</p>

{% endcall %}

### Showing your service name only

Use the Service navigation component to show your service name.

{{ example({ group: "components", item: "service-navigation", example: "with-service-name", html: true, nunjucks: true, open: false }) }}

### Showing service name and navigation links

Show navigation links to let users navigate to different parts of your service and find useful links and tools.

{{ example({ group: "components", item: "service-navigation", example: "with-service-name-and-navigation", html: true, nunjucks: true, open: false }) }}

See when and how to show navigation links in the [Help users navigate a service pattern](/patterns/navigate-a-service/).

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

## Brand refresh of the Service navigation component

In June 2025, we updated this component to support a wider refresh of the GOV.UK brand.

You should now use the refreshed GOV.UK branding. If your service has updated to GOV.UK Frontend v6.0.0 or later, you no longer need to use the `govukRebrand` feature flag and should remove it.

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and Service navigation, and how you can share your feedback with us.
