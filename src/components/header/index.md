---
title: Header
description: The GOV.UK header shows users that they are on GOV.UK and which service they are using
section: Components
backlogIssueId: 97
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The GOV.UK header shows users that they are on GOV.UK and which service they are using.

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

{{ example({ group: "components", item: "header", example: "with-service-name-and-navigation", html: true, nunjucks: true, open: false, size: "s" }) }}
