---
title: Colour
description: Always use the GOV.UK colour palette
section: Styles
theme: Visual elements
aliases: palette
backlogIssueId: 38
layout: layout-pane.njk
order: 12
---

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

Always use the GOV.UK colour palette.

## Colour contrast

You must make sure that the contrast ratio of text and interactive elements in your service meets [Web Content Accessibility Guidelines (WCAG 2.2) success criterion 1.4.3 Contrast (minimum) level AA](https://www.w3.org/TR/WCAG22/#contrast-minimum).

{{ govukInsetText({
  text: "The WCAG 2.2 criterion for Contrast (minimum) is the same as WCAG 2.1."
}) }}

## Functional colours

If you are using GOV.UK Frontend or the GOV.UK Prototype Kit, use the [Sass variables](https://frontend.design-system.service.gov.uk/sass-api-reference/#colours) provided rather than copying the hexadecimal (hex) colour values. For example, use `govuk-functional-colour("brand")` rather than `{{ colours['Brand colour'][0]['colour'] | trim }}`.

This means that your service will always use the most recent colour palette whenever you update.

Only use the variables in the context they're designed for. In all other cases, you should reference the [colour palette](#govuk-web-palette) directly. For example, if you wanted to use red, you should use `govuk-colour("red")` rather than `govuk-functional-colour("error")`.

<table class="govuk-body app-colour-list" summary="Table of main colours">
  <tbody>
  {#- colours is an object built by ./lib/colours.js based on data defined in ./data/colours.json #}
  {% for groupName, group in colours -%}
    <tr>
      <td colspan="3">
        <h3 class="govuk-heading-m {% if not loop.first %}govuk-!-padding-top-6{% endif %}">
        {{groupName}}
        </h3>
      </td>
    </tr>
    {% for colour in group -%}
      <tr class="app-colour-list-row">
        <th class="app-colour-list-column app-colour-list-column--name" scope="row">
          <span class="app-swatch {% if colour.colour == "#ffffff" %}app-swatch-border{% endif %}" style="background-color:{{colour.colour}}"></span>
          <code>govuk-functional-colour("{{colour.name}}")</code>
        </th>
        <td class="app-colour-list-column app-colour-list-column--colour">
          <code>{{colour.colour}}</code>
        </td>
        {% if colour.notes %}
        <td class="app-colour-list-column app-colour-list-column--notes">
          {{colour.notes}}
        </td>
        {% else %}
        <td class="app-colour-list-column app-colour-list-column--notes">
        </td>
        {% endif %}
      </tr>
    {% endfor %}
  {% endfor %}
  </tbody>
</table>

## GOV.UK web palette

If you need to add other colours, and your product or service is within the GOV.UK proposition, use the GOV.UK web palette and its brand colours.

Use the [\_colours-palette.scss](https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/settings/_colours-palette.scss) file to find the values for colours along with their tints and shades.

The [GOV.UK brand guidelines](https://www.gov.uk/government/publications/govuk-brand-guidelines) shows the full list of colours and swatches.

### Add colours with the `govuk-colour` function

In [January 2026], we changed the purpose of the `govuk-colour` function for use with the GOV.UK web palette. Previously, the function used a more generalised set of common colours.

If you already use the `govuk-colour` function, the GOV.UK web palette colours will now apply automatically.

Read the [GOV.UK Frontend v6.0 release notes](https://github.com/alphagov/govuk-frontend/releases/tag/v6.0.0) for more guidance on what’s changed, and what you need to do if your service used the `govuk-colour` function in any earlier versions.

You should no longer use the `govuk-colour` function, the GOV.UK web palette and its colours:

- if your product or service is not part of the GOV.UK proposition
- for any other purpose

### Colour palette for charts

When creating charts, use the colour palettes and guidance set out in the Government Analysis Function [Data visualisation: colours guidance](https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/).

The colour palettes recommended by the Government Analysis Function are based on the colours shown on this page. They've made some slight changes to improve colour contrast, in line with the Web Content Accessibility Guidelines (WCAG).

## Organisation colours

You can find brand colours for government departments and organisations in the [\_colours-organisations file in GOV.UK Frontend](https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/settings/_colours-organisations.scss).

This file is maintained on a best effort basis and is assembled from a number of sources, including:

- [HM Government branding portal](https://hmgbrand.gcs.civilservice.gov.uk/)
- Cabinet Office branding team
- [Design102](https://design102.co.uk/), the government's in-house design studio
- Communications teams from individual organisations
