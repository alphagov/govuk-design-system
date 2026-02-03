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
{% from "_colour-table.njk" import colourTable %}

Always use the GOV.UK colour palette.

## Colour contrast

You must make sure that the contrast ratio of text and interactive elements in your service meets [Web Content Accessibility Guidelines (WCAG 2.2) success criterion 1.4.3 Contrast (minimum) level AA](https://www.w3.org/TR/WCAG22/#contrast-minimum).

{{ govukInsetText({
  text: "The WCAG 2.2 criterion for Contrast (minimum) is the same as WCAG 2.1."
}) }}

## Functional colours

The GOV.UK Design System has a set of functional colours for essential page elements. These help apply colours across the Design System in a way that makes interactions predictable and consistent to users.

### Assign colours using `govuk-functional-colour`

To access these colours, use the `govuk-functional-colour` Sass function. The colours available using this function are based on specific purposes and contexts, so that function will automatically assign appropriate colours.

Do not copy the specific hexadecimal (hex) colour values. For example, use `govuk-functional-colour("brand")` rather than `#1d70b8`.

This means that your service will always use the most recent colour palette whenever you update.

Only use the variables in the context they're designed for. In all other cases, you should reference the [GOV.UK web palette](#govuk-web-palette) directly. For example, if you wanted to use red, you should use `govuk-colour("red")` rather than `govuk-functional-colour("error")`.

{{ colourTable({
  title: "Table of functional colours",
  colourSet: colours.functional,
  hiddenGroups: ["Print"]
})}}

## GOV.UK web palette

The GOV.UK web palette works as part of the [GOV.UK brand guidelines](https://www.gov.uk/government/publications/govuk-brand-guidelines). Use these colours for supporting elements in your service like illustrations, or in custom components where appropriate.

The web palette is organised into colour groups. Each colour group includes:

- a 'primary' variant
- tints – lighter variants of each colour
- shades – darker variants of each colour

### Add colours using `govuk-colour`

You can access the full web palette, and all its available colours, using the `govuk-colour` function.

By default, the function will return the ‘primary’ variant of each colour. For example: `govuk-colour("blue")` will return ‘Primary blue’ ` #1d70b8`.

Access tints and shades of colour groups using the ` $variant` option.

For example:

- `govuk-colour("red", $variant: "tint-25")` will return ‘Red tint 25%’, which is a variant of red with a tint of 25%
- ` govuk-colour("blue", $variant: "shade-50")` will return ‘Blue shade 50%’, which is a variant of blue with a shade of 50%

Most colours include these variants:

- tints at 25% (`tint-25`), 50% (`tint-50`), 80% (`tint-80`) and 95% (`tint-95`)
- shades at 25% (`shade-25`) and 50% (`shade-50`)

Black includes a ‘primary’ black, with tints to show greys. White has no variants.

{{ colourTable({
  title: "Table of palette colours",
  colourSet: colours.palette
})}}
