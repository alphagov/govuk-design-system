---
title: GOV.UK header
description: The GOV.UK header shows users that they are on GOV.UK
section: Components
aliases: GOV.UK masthead
backlogIssueId: 97
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_callout.njk" import callout %}

The GOV.UK header component tells users they’re using a service on GOV.UK and lets them use GOV.UK-wide tools. Also known as the GOV.UK masthead.

{{ example({ group: "components", item: "header", example: "default", id: "default-1", html: true, nunjucks: true, open: false, loading: "eager" }) }}

{{ example({ group: "components", item: "header", example: "without-brand-refresh", html: false, nunjucks: false, open: false, loading: "eager" }) }}

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

### GOV.UK header with One Login

GOV.UK One Login maintains their own header on the [Let users navigate to their GOV.UK One Login and sign out easily](https://www.sign-in.service.gov.uk/documentation/design-recommendations/let-users-navigate-sign-out) page.

## Brand refresh of the GOV.UK header component

In June 2025, we updated this component to support a wider refresh of the GOV.UK brand.

The updated GOV.UK header component:

- uses blue as the background colour, instead of black
- uses a refreshed GOV.UK logo and wordmark lockup
- extends to a height of 60px, instead of 50px with a 10px bottom border

To help teams refresh the GOV.UK brand in their services, we released GOV.UK Frontend v5.10.0 (and later fix versions). For teams on earlier versions, we released GOV.UK Frontend v4.10.0

To see more details and how to update, you can read the [release notes for GOV.UK Frontend v5.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0) and [release notes for GOV.UK Frontend v4.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.10.0).

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and navigation, and how you can share your feedback with us.
