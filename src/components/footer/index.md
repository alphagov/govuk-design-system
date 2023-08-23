---
title: Footer
description: The footer provides copyright, licensing and other information about your service and department
section: Components
aliases: privacy notice, accessibility statement, terms and conditions
backlogIssueId: 96
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

The footer provides copyright, licensing and other information about your service.

{{ example({ group: "components", item: "footer", example: "default", id: "default-1", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

If you use the page template, you'll also get the footer without having to add it, as it's included by default. However, if you want to customise the default footer, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

## When to use this component

Use the footer at the bottom of every page of your service.

## How it works

Add a copyright notice to the footer to clarify who owns the copyright. For GOV.UK services, add the coat of arms to keep things consistent with the rest of GOV.UK.

Make it clear whether content is available for re-use - and if it is, under what sort of licence. Use an [Open Government Licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) unless you have permission from the National Archives to use a [different type of licence](https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/open-government-licence/other-licences/).

### Footer without links

{{ example({ group: "components", item: "footer", example: "default", titleSuffix: "second", html: true, nunjucks: true, open: false, size: "m", titleSuffix: "second" }) }}

### Footer with links

{{ example({ group: "components", item: "footer", example: "with-meta", html: true, nunjucks: true, open: false, size: "m" }) }}

## Adding links

You can add links to:

- [privacy notice](https://www.gov.uk/service-manual/design/collecting-personal-information-from-users)
- [accessibility statement](https://www.gov.uk/service-manual/helping-people-to-use-your-service/publishing-information-about-your-services-accessibility)
- [cookies page](/patterns/cookies-page/)
- terms and conditions
- other language options
= help content

Use ‘Privacy’, ‘Accessibility’, ‘Cookies’ and ‘Terms and conditions’ for the link text.

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> If you add links to ‘help’ pages, such as contact information, make sure those links are always shown consistently in your footer. Use the same link text, information and placement within the footer in every instance. This is to comply with WCAG 2.2 success criterion [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).

## Adding secondary navigation

Only add secondary GOV.UK navigation if you’re creating a GOV.UK service, and you want users to be able to navigate away from the service to somewhere else on the GOV.UK website. For example, you probably don’t want to encourage a user to navigate away from a linear, form-type service.

### Footer with secondary navigation

{{ example({ group: "components", item: "footer", example: "with-navigation", html: true, nunjucks: true, open: false, size: "xl" }) }}

### Footer with links and secondary navigation

{{ example({ group: "components", item: "footer", example: "full", html: true, nunjucks: true, open: false, size: "xl" }) }}
