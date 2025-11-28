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

## Main colours

If you are using GOV.UK Frontend or the GOV.UK Prototype Kit, use the [Sass variables](https://frontend.design-system.service.gov.uk/sass-api-reference/#colours) provided rather than copying the hexadecimal (hex) colour values. For example, use `$govuk-brand-colour` rather than `{{ colours.applied['Brand colour'][0]['colour'] | trim }}`.

This means that your service will always use the most recent colour palette whenever you update.

Only use the variables in the context they're designed for. In all other cases, you should reference the [colour palette](#colour-palette) directly. For example, if you wanted to use red, you should use `govuk-colour("red")` rather than `$govuk-error-colour`.

{% for groupName, group in colours.applied -%}
  <h3 class="govuk-heading-m">
    {{groupName}}
  </h3>

  <dl class="app-swatch-list">
    {% for colour in group -%}
      {% if colour.notes %}
        <dt class="app-swatch__notes">{{colour.notes}}</dt>
      {% endif %}
      <div class="app-swatch" style="--app-swatch-colour:{{colour.colour}}">
        <dt class="app-swatch__name"><code>{{colour.name}}</code></dt>
        <dt class="app-swatch__value"><code>{{colour.colour}}</code></dt>
      </div>
    {% endfor %}
  </dl>
{% endfor %}

## Colour palette

Use these colours for supporting materials like illustrations, or in custom components where appropriate.

To reference colours from the palette directly you should use the `govuk-colour` function. For example, `color: govuk-colour("blue")`.

Avoid using the palette colours if there is a Sass variable that is designed for your context. For example, if you are styling the error state of a component you should use the `$govuk-error-colour` Sass variable rather than `govuk-colour("red")`.

If you need to use tints of this palette, use either 25% or 50%.

<dl class="app-swatch-list">
  {% for name, colour in colours.palette -%}
    <div class="app-swatch" style="--app-swatch-colour:{{colour}}">
      <dt class="app-swatch__name"><code>govuk-colour("{{name}}")</code></dt>
      <dt class="app-swatch__value"><code>{{colour}}<code></dt>
    </div>
  {% endfor %}
</dl>

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
