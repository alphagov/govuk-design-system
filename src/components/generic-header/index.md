---
title: Generic header
description: A generic header to help services not on GOV.UK
section: Components
aliases: Header (generic)
backlogIssueId: 185
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use this generic version of the header to tell users they’re using a government service that’s not part of the GOV.UK website.

[EXAMPLE]

You’ll usually use this component along with following the steps in the [Unbranding GOV.UK Frontend](#) page.

This is to ensure your non-GOV.UK service does not:

- identify itself as being part of GOV.UK
- use the crown or GOV.UK logotype in the header
- use the GDS Transport typeface
- use the [GOV.UK core brand colours](https://brand.design-system.service.gov.uk/colour/govuk-blue/)

See [Making your service look like GOV.UK in the Service manual](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk) for guidance on what services on and off of GOV.UK need to do.

## When to use this component

Use the Generic header component if your service is both:

- a public-facing government service
- not on the GOV.UK website (meaning that your service is not part of the [GOV.UK proposition](https://www.gov.uk/government/publications/govuk-proposition/govuk-proposition))

This is to maintain user trust as they move between the GOV.UK website and other government websites and services.

The GOV.UK website includes nearly all services hosted on service.gov.uk.

## When not to use this component

If your service is on the GOV.UK website as part of the GOV.UK proposition, you must use the [GOV.UK header component](/components/header/) instead.

You must not suggest your site or service is an official UK government website if it’s not.

## How it works

If you use the page template, you’ll first need to replace the default GOV.UK header in the page template with the Generic header component.

Use the Generic header component to show your own:

- brand logo
- homepage link
- font of your organisation, to show your service name

You must also follow the steps in the [Using GOV.UK Frontend without GOV.UK branding guidance](#) to remove other GOV.UK brand elements elsewhere in your service.

### Using your own brand logo

Follow your organisation’s guidelines and best practice to show your brand logo.

To make your logo image as accessible and optimised as possible, also see:

- our [Images guidance](/styles/images/)
- [Image guidance for GOV.UK content and publishers](https://guidance.publishing.service.gov.uk/formatting-content/images/)

### Homepage link
By default, the Generic header links to `/`, which is the top level of your service’s domain. You should customise the link to point to wherever makes the most sense for your service.

### Do not show service name or navigation links in the generic header

As with the GOV.UK header component, you should not use the generic header to show service name or navigation links. Use the [Service navigation component](/components/service-navigation) instead.

## Research on this component
