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

The GOV.UK Design System has a set of functional colours for essential page elements.

To access these colours, use the `govuk-functional-colour` Sass function. The colours available using this function are based on specific purposes and contexts, so that function will automatically assign appropriate colours.

Do not copy the specific hexadecimal (hex) colour values.

For example, use `govuk-functional-colour("brand")` rather than` #1d70b8`.

This means that your service will always use the most recent colour palette whenever you update.

Only use the variables in the context they’re designed for.

In all other cases, you should reference colours directly from the GOV.UK web palette.

For example, if you wanted to use red, you should use`govuk-colour("red")` rather than `govuk-functional-colour("error")`.

### Text

govuk-functional-colour("text")
#0b0c0c

govuk-functional-colour("secondary-text")
#484949

### Links

govuk-functional-colour("link")
#1d70b8

govuk-functional-colour("link-hover")
#0f385c

govuk-functional-colour("link-visited")
#54319f

govuk-functional-colour("link-active")
#0b0c0c

### Border

govuk-functional-colour("border")
#cecece

govuk-functional-colour("input-border")
#0b0c0c

### Backgrounds

govuk-functional-colour(body-background)
#ffffff

govuk-functional-colour(template-background)
#f3f3f3

### Focus state

Only use `govuk-functional-colour("focus")` colour to indicate which element is focused on. For example, when a user tabs to an element with their keyboard.

govuk-functional-colour("focus")
#ffdd00

govuk-functional-colour("focus-text")
#0b0c0c

### Error state

Use for error messages

govuk-functional-colour("error")
#ca3535

### Success state

Use for success messages

govuk-functional-colour("success")
#11875a

### Hover state

Use for input hover states

govuk-functional-colour(hover)
#cecece

### Brand colour

govuk-functional-colour("brand")
#1d70b8

### Print

govuk-functional-colour(print-text)
#00000

<!--
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
-->

## GOV.UK web palette

The GOV.UK web palette works as part of the [GOV.UK brand guidelines](https://www.gov.uk/government/publications/govuk-brand-guidelines). Use these colours for supporting elements in your service like illustrations, or in custom components where appropriate.

The web palette includes:

- primary colours
- tints – lighter variants of each colour
- shades – darker variants of each colour

### Add colours using using `govuk-colour`

You can access the full web palette, and all its available colours, using the `govuk-colour` function.

By default, the function will return the ‘primary’ variant of each colour.

For example: `govuk-colour("blue")` will return ‘Primary blue’ ` #1d70b8`.

Access tints and shades of colour groups using the `$variant` option.

For example:

- `govuk-colour(‘red’, $variant: ‘tint-25’)` will return ‘Red tint 25%’, which is a variant of red with a tint of 25%
- ` govuk-colour(‘blue’, $variant: ‘shade-50’)` will return ‘Blue shade 50%’, which is a variant of blue with a shade of 50%

Most colours include these variants:

- tints at 25% (`tint-25`), 50% (`tint-50`), 80% (`tint-80`) and 95% (`tint-95`)
- shades at 25% (`shade-25`) and 50% (`shade-50`)

Black includes a ‘Primary black', with tints to show grey. White has no variants.

See the [\_colours-palette.scss](https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/settings/_colours-palette.scss) file for the full list of colour values and their tints and shades.

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
