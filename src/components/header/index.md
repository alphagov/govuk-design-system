---
title: GOV.UK header
description: The GOV.UK header shows users that they are on GOV.UK and which service they are using
section: Components
aliases: GOV.UK masthead
backlogIssueId: 97
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The GOV.UK header component tells users they’re using a service on GOV.UK and lets them use GOV.UK-wide tools. Also known as the GOV.UK masthead.

{{ example({ group: "components", item: "header", example: "default", id: "default-1", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

If your service is being hosted on one of these domains, use the GOV.UK header component:

- gov.uk/[myservice]
- [myservice].service.gov.uk
- [myblog].blog.gov.uk

You must use the GOV.UK header at the top of every page.

## When not to use this component

If your service is not hosted on one of the mentioned gov.uk domains, you must not use the GOV.UK header component.

## How it works

Together, the GOV.UK header and [Service header navigation components](/components/service-header-navigation/) assure users that they’re in the right place to use your service. It also helps users understand that GOV.UK functions as one website.

See the [Help users to navigate a service](/patterns/navigate-a-service/) pattern for guidance on how to plan your header and navigation.

The GOV.UK header (shown as black) has:

- the GOV.UK logo, which links to the GOV.UK homepage
- space for GOV.UK-wide tools such as GOV.UK One Login and search

The service header navigation (shown as grey) has:

- the service name, which links to the first page of your service
- a navigation menu for your service
- space for service-level tools such as a language selector

Services do not need to duplicate the menu bar used in the [GOV.UK homepage](http://GOV.UK) and mainstream guidance pages.

### Default GOV.UK header

Use the default header if your service has 5 pages or fewer.

[EXAMPLE]

#### Showing the name of your service

If your service is more than 5 pages, use the default GOV.UK header. Show the name of your service using the [Service header navigation](/components/service-header-navigation/) component.

Do not show your service name in the GOV.UK header.

[EXAMPLE WITH SERVICE HEADER]

### Adding custom header elements

If you choose to add custom header elements to the GOV.UK header, there are ‘slots’ to insert code at the start and end of the container.

Only add GOV.UK-wide tools or links in the GOV.UK header. Place service-level tools and links in the [Service header navigation](/components/service-header-navigation/) component.

### Previous versions of the headers

In [June] 2024, we introduced the GOV.UK header and [Service header navigation](/components/service-header-navigation/) components, replacing what was once a single header component.

This included several design updates, particularly moving the service name and navigation links into the service header navigation area (shown as grey). The blue ‘accent bar’ has also been made full width.

If you’re using a previous version of the header, you should update it soon. We’ll continue to support previous versions of the header until the next major release of GOV.UK Frontend.
