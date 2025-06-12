---
title: GOV.UK footer
description: The footer provides copyright, licensing and other information about your service and department
section: Components
aliases: privacy notice, accessibility statement, terms and conditions
backlogIssueId: 96
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_callout.njk" import callout %}
{%- from "govuk/components/tag/macro.njk" import govukTag -%}

The GOV.UK footer provides copyright, licensing and other information about your service.

{{ example({ group: "components", item: "footer", example: "default", id: "default-1", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

{{ example({ group: "components", item: "footer", example: "without-brand-refresh", html: false, nunjucks: false, open: false, size: "m", loading: "eager" }) }}

If you use the page template, you'll also get the footer without having to add it, as it's included by default. However, if you want to customise the default footer, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

{% call callout({ tagText: "Brand", colour: "green", isInset: "true" }) %}

<h2 class="app-callout__heading">Brand refresh of the {{title}} component</h2><p class="govuk-body">From 25 June 2025, the {{title}} component will change to support a wider refresh of the GOV.UK brand.</p>

<p class="govuk-body">The updated {{title}} component:</p>
<ul class="govuk-list">
<li>uses a light blue as the background colour, instead of grey</li>
<li>adds a thick blue top border</li>
<li>adds a small crown logo, in addition to the existing coat of arms</li>
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

- [your service's privacy notice](https://www.gov.uk/service-manual/design/collecting-personal-information-from-users)
- [your service's accessibility statement](https://www.gov.uk/service-manual/helping-people-to-use-your-service/publishing-information-about-your-services-accessibility)
- [your service's Cookies page](/patterns/cookies-page/)
- terms and conditions
- other language options
- help content

Use ‘Privacy’, ‘Accessibility’, ‘Cookies’ and ‘Terms and conditions’ for the link text.

If you include links to ‘help’ pages within the GOV.UK footer component, make sure to place those links consistently within the footer content.

Also make sure that ‘help’ links always function in a similar way across each page. This is to comply with [WCAG 2.2 success criterion 3.2.6 Consistent help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).

## Adding secondary navigation

Only add secondary GOV.UK navigation if you’re creating a GOV.UK service, and you want users to be able to navigate away from the service to somewhere else on the GOV.UK website. For example, you probably don’t want to encourage a user to navigate away from a linear, form-type service.

### Footer with secondary navigation

{{ example({ group: "components", item: "footer", example: "with-navigation", html: true, nunjucks: true, open: false, size: "xl" }) }}

### Footer with links and secondary navigation

{{ example({ group: "components", item: "footer", example: "full", html: true, nunjucks: true, open: false, size: "xl" }) }}
