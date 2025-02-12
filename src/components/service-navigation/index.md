---
title: Service navigation
description: Service navigation helps users understand that they’re using your service and lets them navigate around your service
section: Components
aliases: Primary navigation
backlogIssueId: 76
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

Service navigation helps users understand that they’re using your service and lets them navigate around your service.

{{ wcagCallout({
  type: "component",
  introAction: "use",
  name: "Service navigation",
  criteria: [
    {
      text: "make sure all page content can be seen when the user interacts with a dropdown menu",
      anchor: "wcag-do-not-cover-content"
    },
    {
      text: "make sure help links can be found in a consistent place on each page",
      anchor: "wcag-consistent-help-links"
    }
  ]
}) }}

{{ example({ group: "components", item: "service-navigation", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

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

### Showing your service name only

Use the Service navigation component to show your service name.

We’ve deprecated the option to show a service name in the GOV.UK header component and recommend teams to start updating existing services.

{{ example({ group: "components", item: "service-navigation", example: "with-service-name", html: true, nunjucks: true, open: false }) }}

### Showing service name and navigation links

Show navigation links to let users navigate to different parts of your service and find useful links and tools.

{{ example({ group: "components", item: "service-navigation", example: "with-service-name-and-navigation", html: true, nunjucks: true, open: false }) }}

See when and how to show navigation links in the [Help users navigate a service pattern](/patterns/navigate-a-service/).

{% call wcagNote({id: "wcag-do-not-cover-content"}) %}

<p>Do not make header elements, like dropdown menus, ‘sticky’ to the top of the page by using `position: fixed` or any other method. In other words, avoid any implementations that cause menus to sit on top of page content.</p>
<p>This is to make sure elements do not hide or obscure any content which has a focus applied and comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html">WCAG 2.2 success criterion 2.4.11 Focus not obscured (minimum)</a>.</p>
{% endcall %}

In November 2021, [the GOV.UK homepage introduced a menu bar](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) that avoids obscuring content by shifting the page down.

{% call wcagNote({id: "wcag-consistent-help-links"}) %}

<p>You can add a link to a ‘help’ page in your Service header component. If you do, the link must be positioned consistently within the header, and must always link to the same place.</p>
<p>For example, a header link to 'Get help with this service' must go to the same place as similar header links elsewhere in your service. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">WCAG 2.2 success criterion 3.2.6 Consistent help</a>.</p>
{% endcall %}

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

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and Service navigation, and how you can share your feedback with us.
