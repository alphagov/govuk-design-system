---
title: Layout
description: Organise the layout of the page into blocks
section: Styles
theme: Design guides
layout: layout-pane.njk
order: 5
show_page_nav: true
---

{% from "_example.njk" import example %}

## Screen size

Design for small screens first, starting with a single-column layout.

For most types of page, we recommend using either a 'two-thirds' or a 'two-thirds and one-third' layout. That stops lines of text getting so long that the page becomes difficult to read on desktop devices. This would usually mean no more than 75 characters per line.

Never make assumptions about what devices people are using. Design for different screen sizes rather than specific devices.

The default maximum page width is 1020px, but you can make it wider if your content requires it.


## Common layouts


### Two-thirds

{{ example({group: "styles", item: "layout", example: "common-two-thirds", html: true, open: true, size: "m"}) }}

### Two-thirds and one-third

{{ example({group: "styles", item: "layout", example: "common-two-thirds-one-third", html: true, open: true, size: "m"}) }}


### Row 1: Two-thirds <br>Row 2: Two-thirds and one-third

{{ example({group: "styles", item: "layout", example: "common-two-thirds-two-thirds-one-third", html: true, open: true, size: "l"}) }}


## Building your own layout

If you want to build your layout from scratch, or understand what each of the parts are responsible for, here’s an explanation of how the page wrappers and grid system works.

## Page wrappers

### Limiting width of content

To set up your layout you will need to create 2 wrappers. The first should have the class  `govuk-width-container`, which sets the maximum width of the content but does not add any vertical margin or padding.

If your design requires them, you should place components such as [breadcrumbs](/components/breadcrumbs/), [back link](/components/back-link/) and [phase banner](/components/phase-banner/) inside this wrapper so that they sit directly underneath the header.

### Add vertical space

Within `govuk-width-container` you should add the `govuk-main-wrapper` class to your `<main>` element. This adds responsive padding to the top and bottom of the page and will be the container for your main content.

If you’re not using the [breadcrumbs](/components/breadcrumbs/), [back link](/components/back-link/) or [phase banner](/components/phase-banner/) components in your design, add the correct amount of vertical padding above the content by adding one of the following to your `<main>` element:

- the `govuk-main-wrapper--auto-spacing` class
- the `govuk-main-wrapper--l` class - if `govuk-main-wrapper--auto-spacing` does not work for your service

### Exploded view of page wrappers

{{ example({group: "styles", item: "layout", example: "layout-wrappers", html: true, open: true, size: "l"}) }}

### Exploded view of page wrappers without a back link, breadcrumbs or phase banner

{{ example({group: "styles", item: "layout", example: "layout-wrappers-l", html: true, open: true, size: "l"}) }}

## Grid system

Use the grid system to lay out the content on your service’s pages.

Most GOV.UK pages follow a 'two-thirds and one-third' layout, but the grid system allows for a number of additional combinations when necessary.

Your main content should always be in a two-thirds column even if you’re not using a corresponding one-third column for secondary content.

### Understanding the grid system

The grid is structured with a `govuk-grid-row` wrapper which acts as a row to contain your grid columns.

You can add columns inside this wrapper to create your layout. To define your columns add the class beginning with `govuk-grid-column-` to a new container followed by the width, for example `govuk-grid-column-one-third` to apply your desired width.

The available widths are:

### Full width

{{ example({group: "styles", item: "layout", example: "full-width", html: true, open: true, size: "s"}) }}

### One-half

{{ example({group: "styles", item: "layout", example: "one-half", html: true, open: true, size: "s"}) }}

### One-third

{{ example({group: "styles", item: "layout", example: "one-third", html: true, open: true, size: "s"}) }}

### Two-thirds

{{ example({group: "styles", item: "layout", example: "two-thirds", html: true, open: true, size: "s"}) }}

### One-quarter

{{ example({group: "styles", item: "layout", example: "one-quarter", html: true, open: true, size: "s"}) }}

### Three-quarters

{{ example({group: "styles", item: "layout", example: "three-quarters", html: true, open: true, size: "s"}) }}

### Example combinations

{{ example({group: "styles", item: "layout", example: "combinations", html: true, open: true, size: "xl"}) }}

### Desktop specific grid classes

To specify a width at the desktop breakpoint you can use the desktop specific grid classes. For example `govuk-grid-column-two-thirds-from-desktop` will set your column width to be two-thirds width at the desktop breakpoint only.

{{ example({group: "styles", item: "layout", example: "desktop", html: true, open: true, size: "m"}) }}

The desktop specific classes also allow you to set the width of the tablet breakpoint by using them in combination with the standard grid classes. For example using `govuk-grid-column-one-half` and `govuk-grid-column-two-thirds-from-desktop` together will mean the column will be one-half at the tablet breakpoint and two-thirds width at desktop.

{{ example({group: "styles", item: "layout", example: "tablet-desktop", html: true, open: true, size: "m"}) }}

### Nested grids

{{ example({group: "styles", item: "layout", example: "nested", html: true, open: true, size: "m"}) }}


## Width override classes

If you need to constrain the width of an element independently of the grid system, you can use width override classes.

The width override classes start with `govuk-!-width-`, followed by the width on larger screen sizes. For example, `govuk-!-width-one-half` will apply a width of 50% and `govuk-!-width-two-thirds`will apply a width of 66.66%.

These examples are for the generic width override classes - read specific [guidance on setting text input width](/components/text-input/#use-appropriately-sized-text-inputs).

{{ example({group: "styles", item: "layout", example: "width-overrides", html: true, open: true, size: "xl"}) }}

## Override how elements display

You can use display override classes if you need to override how elements display on the page.

Use:

- `govuk-!-display-block` to display as a block
- `govuk-!-display-inline` to display inline
- `govuk-!-display-inline-block` to display as an inline block
- `govuk-!-display-none` to remove the element from the page

You can also remove elements from the printed version of the page using `govuk-!-display-none-print`.
