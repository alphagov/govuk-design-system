---
title: GOV.UK header
description: The GOV.UK header shows users that they are on GOV.UK and which service they are using
section: Components
aliases: GOV.UK masthead
backlogIssueId: 97
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_callout.njk" import callout %}

The GOV.UK header component tells users they’re using a service on GOV.UK and lets them use GOV.UK-wide tools. Also known as the GOV.UK masthead.

{{ example({ group: "components", item: "header", example: "default", id: "default-1", html: true, nunjucks: true, open: false, loading: "eager" }) }}

{% call callout({ tagText: "Brand", colour: "green" }) %}

<p class="govuk-body"><a href="/components/header/default/branded/index.html">See an example of the GOV.UK header showing the refreshed GOV.UK branding</a>.</p>
{% endcall %}

If you use the page template, you'll also get the GOV.UK header without having to add it, as it's included by default. However, if you want to customise the default GOV.UK header, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

{% call callout({ tagText: "Brand", colour: "green", isInset: "true" }) %}

<h2 class="app-callout__heading">Brand refresh of the {{title}} component</h2>
<p class="govuk-body">From 25 June 2025, the {{title}} component will change to support a wider refresh of the GOV.UK brand. </p>

<p class="govuk-body">The updated {{title}} component:</p>

<ul class="govuk-list">
<li>uses blue as the background colour, instead of black</li>
<li>uses a refreshed GOV.UK logo and wordmark lockup</li>
<li>adds 60px in height</li>
</ul>

<p class="govuk-body">To help service teams in government get ready, we’ve released GOV.UK Frontend v5.10.0 (and later fix versions). For teams on earlier versions, we’ve released GOV.UK Frontend v4.10.0</p>

<p class="govuk-body">To see more details and how to update, you can read:</p>
<ul class="govuk-list govuk-list--bullet"> 
          <li><a href="https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0" class="govuk-link">release notes for v5.10.0</a></li>
          <li><a href="https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.1" class="govuk-link">release notes for v5.10.1</a></li>
          <li><a href="https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.2" class="govuk-link">release notes for v5.10.2</a></li>
          <li><a href="https://github.com/alphagov/govuk-frontend/releases/tag/v4.10.0" class="govuk-link">release notes for v4.10.0</a></li>
</ul>
{% endcall %}

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

## Research on this component

See the [research section in the Help users navigate a service pattern](/patterns/navigate-a-service/#research-on-this-pattern) for a summary of our research on the GOV.UK header and navigation, and how you can share your feedback with us.
