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

### Do not show service name or navigation links in the GOV.UK header

You can no longer use the GOV.UK header to show service name or navigation links. Use the [Service navigation component](/components/service-navigation) instead.

The [Help users navigate a service pattern](/patterns/navigate-a-service) shows how the GOV.UK header and Service navigation components work together to help users know they’re using your service and navigate around it.

### GOV.UK header with One Login

GOV.UK One Login maintains their own header on the [Let users navigate to their GOV.UK One Login and sign out easily](https://www.sign-in.service.gov.uk/documentation/design-recommendations/let-users-navigate-sign-out) page.

## Brand refresh of the GOV.UK header component

In June 2025, we updated this component to support a wider refresh of the GOV.UK brand.

You should now use the refreshed GOV.UK branding. If your service has updated to GOV.UK Frontend v6.0.0 or later, you no longer need to use the `govukRebrand` feature flag and should remove it.

With these changes, the GOV.UK header and GOV.UK footer components should now only be used by [services on the GOV.UK website](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk). Services outside of [the GOV.UK proposition](https://www.gov.uk/government/publications/govuk-proposition) should stop using the header and footer components and instead create their own.

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and navigation, and how you can share your feedback with us.
