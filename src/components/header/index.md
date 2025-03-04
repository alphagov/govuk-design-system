---
title: GOV.UK header
description: The GOV.UK header shows users that they are on GOV.UK and which service they are using
section: Components
aliases: GOV.UK masthead
backlogIssueId: 97
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

The GOV.UK header component tells users they’re using a service on GOV.UK and lets them use GOV.UK-wide tools. Also known as the GOV.UK masthead.

{{ wcagCallout({
  type: "component",
  introAction: "use the",
  name: "GOV.UK header",
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

{{ example({ group: "components", item: "header", example: "default", id: "default-1", html: true, nunjucks: true, open: false, loading: "eager" }) }}

If you use the page template, you'll also get the GOV.UK header without having to add it, as it's included by default. However, if you want to customise the default GOV.UK header, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

## When to use this component

If your service is being hosted on one of these domains, use the GOV.UK header component:

- gov.uk/[myservice]
- [myservice].service.gov.uk
- [myblog].blog.gov.uk

You must use the GOV.UK header component at the top of every page. The Service Manual explains why it’s important for you to [make your service look like GOV.UK](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk).

## When not to use this component

If your service is not hosted on one of the gov.uk domains outlined, you must not use the GOV.UK header component as it’s not considered part of GOV.UK.

You can still build from this component, but you’ll need to [make some changes to make sure users do not confuse your website with GOV.UK](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk#if-your-service-isnt-on-govuk).

## How it works

Together, the GOV.UK header and [Service navigation component](/components/service-navigation/) both ensure users get a consistent experience on GOV.UK.

This also assures users that they’re in the right place to use your service and to understand that GOV.UK functions as one website.

For guidance on how to plan your header and navigation, see the [Help users navigate a service pattern](/patterns/navigate-a-service).

### Default GOV.UK header

Most services on GOV.UK should use the default GOV.UK header.

It should only show the GOV.UK logo and any GOV.UK-wide links and tools to help your users. [Do not add the menu of GOV.UK topic links](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) to your service’s GOV.UK header.

{{ example({ group: "components", item: "header", example: "default", titleSuffix: "second", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Previous variants of the GOV.UK header

The GOV.UK header component was originally released with 2 variants:

- with service name
- with service name and navigation

These 2 variants will be removed from the GOV.UK header component in the next breaking release of GOV.UK Frontend.

In August 2024, we introduced a separate [Service navigation component](/components/service-navigation). This is to better help users understand that they’re using your service and let them navigate around your service.

We recommend using the Service navigation component to show your service name and navigation links instead of the GOV.UK header, and to start updating existing services.

See the [Help users navigate a service pattern](/patterns/navigate-a-service) for more guidance.

#### GOV.UK header with service name

We’ve deprecated the [GOV.UK header with service name](/components/header/with-service-name) and will remove this option in the next breaking release of GOV.UK Frontend.

Use the Service navigation component to show your service name instead. We recommend teams to start updating existing services.

#### GOV.UK header with navigation

We’ve deprecated the [GOV.UK header with navigation](/components/header/with-service-name-and-navigation/) and will remove this option in the next breaking release of GOV.UK Frontend.

Use the Service navigation component to add navigation links instead.

{% call wcagNote({id: "wcag-do-not-cover-content"}) %}

<p>Do not make header elements, like dropdown menus, ‘sticky’ to the top of the page by using `position: fixed` or any other method. In other words, avoid any implementations that cause menus to sit on top of page content.</p>
<p>This is to make sure elements do not hide or obscure any content which has a focus applied and comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html">WCAG 2.2 success criterion 2.4.11 Focus not obscured (minimum)</a>.</p>
{% endcall %}

In November 2021, [the GOV.UK homepage introduced a menu bar](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) that avoids obscuring content by shifting the page down.

{% call wcagNote({id: "wcag-consistent-help-links"}) %}

<p>You can add a link to a ‘help’ page in your service’s GOV.UK header component. If you do, the link must be positioned consistently within the header, and must always link to the same place.</p>
<p>For example, a header link to “Get help with this service” must go to the same place as similar header links elsewhere in your service. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">WCAG 2.2 success criterion 3.2.6 Consistent help</a>.</p>
{% endcall %}

### GOV.UK header with One Login

GOV.UK One Login maintains their own header on the [Let users navigate to their GOV.UK One Login and sign out easily](https://www.sign-in.service.gov.uk/documentation/design-recommendations/let-users-navigate-sign-out) page.

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and navigation, and how you can share your feedback with us.
