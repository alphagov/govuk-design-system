---
title: Spacing
description: The Design System uses a responsive spacing scale which adapts based on screen size
section: Styles
aliases: margin, padding
layout: layout-pane.njk
showPageNav: true
---

{% from "_example.njk" import example %}

The Design System uses two different spacing scales – responsive and static.

## Responsive spacing

The responsive spacing scale adapts based on screen size.

The spacing for 'large screens' is used when the screen is wider than the tablet breakpoint (640px). Spacing for the smallest units (0-3) stays the same for all screen sizes.

<table class="govuk-table app-table--constrained">
  <caption class="govuk-table__caption small govuk-visually-hidden">The responsive spacing scale</caption>
  <thead>
    <tr>
      <th class="govuk-table__header" scope="col">Spacing unit</th>
      <th class="govuk-table__header govuk-table__header--numeric" scope="col">Small screens</th>
      <th class="govuk-table__header govuk-table__header--numeric" scope="col">Large screens</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="govuk-table__header" scope="row">0</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">0</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">0</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">1</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">5px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">5px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">2</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">10px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">10px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">3</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">15px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">15px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">4</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">15px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">20px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">5</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">15px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">25px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">6</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">20px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">30px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">7</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">25px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">40px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">8</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">30px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">50px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">9</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">40px</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">60px</td>
    </tr>
  </tbody>
</table>

## Static spacing

The static spacing scale stays the same for all screen sizes, and uses the same spacing as 'large screens' in the responsive spacing scale.

<table class="govuk-table app-table--constrained">
  <caption class="govuk-table__caption small govuk-visually-hidden">The static spacing scale</caption>
  <thead>
    <tr>
      <th class="govuk-table__header" scope="col">Spacing unit</th>
      <th class="govuk-table__header govuk-table__header--numeric" scope="col">All screens</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="govuk-table__header" scope="row">0</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">0</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">1</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">5px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">2</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">10px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">3</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">15px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">4</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">20px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">5</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">25px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">6</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">30px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">7</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">40px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">8</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">50px</td>
    </tr>
    <tr>
      <th class="govuk-table__header" scope="row">9</th>
      <td class="govuk-table__cell govuk-table__cell--numeric">60px</td>
    </tr>
  </tbody>
</table>

## Applying spacing in your own CSS

If you want to reference the spacing scale in your CSS, use the spacing helpers.

### Using the responsive spacing helper

To use the responsive spacing scale, include the [`govuk-responsive-margin`](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-responsive-margin) or [`govuk-responsive-padding`](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-responsive-padding) mixins.

For example, to apply spacing unit 6 for 30px padding on large screens and 20px on small screens, use:

```scss
@include govuk-responsive-padding(6);
```

You can also add an argument to apply margin or padding in a single direction.

For example, to apply spacing unit 6 for a 30px bottom margin on large screens and a 20px bottom margin on small screens, use:

```scss
@include govuk-responsive-margin(6, "bottom");
```

### Using the static spacing helper

For the static spacing scale, use the [`govuk-spacing` function](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-spacing).

For example, to apply spacing unit 6 for 30px top padding on all screens, use:

```scss
padding-top: govuk-spacing(6);
```

For negative spacing, use a negative spacing unit number.

For example, to apply spacing unit -3 for a negative 15px top margin all screens, use:

```scss
margin-top: govuk-spacing(-3);
```

## Overriding spacing

Occasionally, you might need to make minor adjustments like adding or removing spacing to elements of your design. You can use the spacing override classes for this.

### Responsive spacing override classes

The responsive spacing override classes start with: `govuk-!-`, followed by either `margin-` or `padding-`, and then a spacing unit number.

To apply spacing in a single direction, include `left-`, `right-`, `top-`, or `bottom-` just before the spacing unit.

For example, use:

- `govuk-!-margin-9` to apply a 40px margin to all sides of the element on small screens, increasing to 60px on large screens
- `govuk-!-padding-right-5` to apply 15px of padding to the right side of the element on small screens, increasing to 25px on large screens
- `govuk-!-margin-0` to remove all margins at all screen sizes

### Static spacing override classes

The static spacing override classes start with `govuk-!-static`. Use them the same way as the responsive spacing override classes.

For example, use:

- `govuk-!-static-margin-9` to apply a 60px margin to all sides of the element at all screen sizes
- `govuk-!-static-padding-right-5` to apply 25px of padding to the right side of the element at all screen sizes
- `govuk-!-static-margin-0` to remove all margins at all screen sizes, same as `govuk-!-margin-0`

### Examples

{{ example({group: "styles", item: "spacing", example: "spacing-scale-padding", html: true, open: false, size: "l"}) }}

{{ example({group: "styles", item: "spacing", example: "spacing-scale-margin", html: true, open: false, size: "xl"}) }}
