---
title: Navigate a service
description: Help users know they’re using your service and can navigate around it.
section: Patterns
theme: Help users to…
aliases: Information architecture, One Login
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Help users know they’re using your service and can navigate around it.

## When to use this pattern

## How it works

The [GOV.UK header](/components/header/) and [Service header navigation](/components/service-header/) components work together to assure users that they’re in the right place to use your service. They also help users understand that GOV.UK functions as one website.

The GOV.UK header (shown as black) has:

- the GOV.UK logo, which links to the GOV.UK homepage
- space for GOV.UK-wide tools such as GOV.UK One Login and search

The service header (shown as grey) has:

- the service name, which links to the first page of your service
- a navigation menu for your service
- space for service-level tools such as a language selector

### Plan your GOV.UK header

The GOV.UK header component should only be used to show the GOV.UK logo and any GOV.UK-wide tools used in your service, such as GOV.UK One Login.

Also see GOV.UK One Login guidance to [Let users navigate to their GOV.UK One Login and sign out easily](https://www.sign-in.service.gov.uk/documentation/design-recommendations/let-users-navigate-sign-out).

Services do not need to duplicate the menu bar used in the [GOV.UK homepage](https://gov.uk) and mainstream guidance pages.

### Plan your service level navigation and links

Use the Service level navigation component to show your service name, navigation links and other service-level tools.

#### Show the service name as a link

If your service is more than 5 pages long, show the service name as a link to the homepage of your service.

If your service does not have a homepage, link to either:

- its GOV.UK start page
- the first question of your service

#### Choosing and writing navigation links

You can use the rest of the space in the Service level navigation component to show navigation, contact or account management links.

Navigation links must be links to top-level sections or tools that are the most useful to the user. These help give the user an idea of what your service does and what they can find within it.

Navigation is not a site map and does not need to list every part of your service – only the most important, top-level sections.

### Adding other elements alongside navigation

In the component code, there are ‘slots’ to insert code at the start and end of the container. These can be used to show tools such as language selectors.

To help maintain consistency across services on GOV.UK, we provide some advice on how and where to place some common components and elements.

[IMAGE]

#### Phase banners

Place the [Phase banner](/components/phase-banner/) component after the service header navigation. Ensure this is consistent across all pages of your service.

#### Breadcrumbs

Place the [Breadcrumbs](/components/breadcrumbs/) component directly after the service header navigation, within the page content.

#### Language navigation

If you use a language navigation that changes your entire service, place it in the service header navigation, between the service name and navigation.

For language navigation that only changes particular pages, consider adding it to the page content.

See some examples of language navigation in the the GitHub discussion to [propose adding a language navigation component](https://github.com/alphagov/govuk-design-system-backlog/issues/285) to the Design System.

#### Search inputs

If your service has search functionality, place the search input in the service header navigation, between the service name and navigation.

Consider telling users what the search input will cover by including your service name in placeholder text within the search input.

## Research on this pattern
