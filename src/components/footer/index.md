---
title: Footer
description: The footer provides copyright, licensing and other information about your service and department
section: Components
aliases: privacy notice, accessibility statement, terms and conditions
backlogIssueId: 96
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

The footer provides copyright, licensing and other information about your service.

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affects this component

To use the ‘Footer' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [find help links in a consistent place on each page](/components/footer/#wcag-consistent-links)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/wcag-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

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
- help content

Use ‘Privacy’, ‘Accessibility’, ‘Cookies’ and ‘Terms and conditions’ for the link text.

<div class="app-wcag-22" id="wcag-consistent-links" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>If you include links to ‘help’ pages within a footer, make sure to place those links consistently within the footer content. Also make sure that ‘help’ links always function in a similar way across each page. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">3.2.6 Consistent help</a>.</p>
</div>

## Adding secondary navigation

Only add secondary GOV.UK navigation if you’re creating a GOV.UK service, and you want users to be able to navigate away from the service to somewhere else on the GOV.UK website. For example, you probably don’t want to encourage a user to navigate away from a linear, form-type service.

### Footer with secondary navigation

{{ example({ group: "components", item: "footer", example: "with-navigation", html: true, nunjucks: true, open: false, size: "xl" }) }}

### Footer with links and secondary navigation

{{ example({ group: "components", item: "footer", example: "full", html: true, nunjucks: true, open: false, size: "xl" }) }}
