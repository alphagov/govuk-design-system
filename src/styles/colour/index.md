---
title: Colour
description: Always use the GOV.UK colour palette
section: Styles
aliases: palette
backlog_issue_id: 38
layout: layout-pane.njk
---

Always use the GOV.UK colour palette.

## Colour contrast
You must make sure that the contrast ratio of text and interactive elements in
your service meets [level AA of the Web Content Accessibility Guidelines
(WCAG 2.1)](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Main colours

If you are using GOV.UK Frontend or the GOV.UK Prototype Kit, use the [Sass
variables](https://frontend.design-system.service.gov.uk/sass-api-reference/#colours) provided rather than copying the
hexadecimal (hex) colour values. For example, use `$govuk-brand-colour` rather
than `{{ colours.applied['Brand colour'][0]['colour'] | trim }}`.
This means that your service will always use the most recent colour palette
whenever you update.

Only use the variables in the context they're designed for. In all other cases,
you should reference the [colour palette](#colour-palette) directly. For
example, if you wanted to use red, you should
use `govuk-colour("red")` rather than `$govuk-error-colour`.

<table class="govuk-body app-colour-list" summary="Table of main colours">
  <tbody>
  {#- colours is an object built by ./lib/colours.js based on data defined in ./data/colours.json #}
  {% for groupName, group in colours.applied -%}
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
          <code>{{colour.name}}</code>
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

## Colour palette

Use these colours for supporting materials like illustrations, or in custom components where appropriate.

To reference colours from the palette directly you should use the `govuk-colour`
function. For example, `color: govuk-colour("blue")`.

Avoid using the palette colours if there is a Sass variable that is designed for
your context. For example, if you are styling the error state of a component you
should use the `$govuk-error-colour` Sass variable rather than
`govuk-colour("red")`.

If you need to use tints of this palette, use either 25% or 50%.

You can find departmental colours in the GOV.UK Frontend [_colours-organisations](https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/settings/_colours-organisations.scss) file.

<table class="govuk-body app-colour-list" summary="Table of extended colours">
  <tbody>
  {% for name, colour in colours.palette %}
    <tr class="app-colour-list-row">
      <th class="app-colour-list-column app-colour-list-column--name" scope="row">
        <span class="app-swatch {% if colour == "#ffffff" %}app-swatch-border{% endif %}" style="background-color:{{colour}}"></span>
        <code>govuk-colour("{{name}}")</code>
      </th>
      <td class="app-colour-list-column app-colour-list-column--colour">
        <code>{{colour}}</code>
      </td>
      <td class="app-colour-list-column app-colour-list-column--notes"></td>
    </tr>
  {% endfor %}
 </tbody>
</table>

### Colour palette for charts
When creating charts, use the colour palettes and guidance set out in the Government Analysis Function [Data visualisation: colours guidance](https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/).

The colour palettes recommended by the Government Analysis Function are based on the colours shown on this page. They've made some slight changes to improve colour contrast, in line with the Web Content Accessibility Guidelines (WCAG).
