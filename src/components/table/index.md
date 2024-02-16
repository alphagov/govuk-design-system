---
title: Table
description: Use the table component to make information easier to compare and scan for users
section: Components
aliases:
backlogIssueId: 61
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

Use the table component to make information easier to compare and scan for users.

{{ example({ group: "components", item: "table", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use the table component to let users compare information in rows and columns.

## When not to use this component

Never use the table component to layout content on a page. Instead, use the [grid system](/styles/layout/#using-the-grid-system).

## How it works

### Table captions

Use the `<caption>` element to describe a table in the same way you would use a heading. A caption helps users find, navigate and understand tables.

There are other styling options for table captions. You can use `govuk-table__caption--s`, `govuk-table__caption--m`, `govuk-table__caption--l` and `govuk-table__caption--xl` classes to make them larger or smaller from the default.

{{ example({ group: "components", item: "table", example: "caption-l", html: true, nunjucks: true, open: false, size: "m" }) }}

### Table headers

Use table headers to tell users what the rows and columns represent. Use the `scope` attribute to help users of assistive technology distinguish between row and column headers.

There are 2 ways to use the table component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "table", example: "default", html: true, nunjucks: true, open: false, size: "m", titleSuffix: "second" }) }}

## Numbers in a table

When comparing columns of numbers, align the numbers to the right in table cells.

{{ example({ group: "components", item: "table", example: "numbers", html: true, nunjucks: true, open: false, size: "m" }) }}

## Custom column widths

You can use the [width override classes](/styles/layout/#width-override-classes) to set the width of table columns.

{{ example({ group: "components", item: "table", example: "column-widths", html: true, nunjucks: true, open: false, size: "m" }) }}

If the [width override classes](/styles/layout/#width-override-classes) do not meet your needs you can create your own width classes and apply them to the cells in the table head. These can be added using the `classes` option in the Nunjucks macro or adding the class directly to the individual cells within `govuk-table__head` as below.

To learn more about this, read guidance on [extending and modifying components in production](/get-started/extending-and-modifying-components/).

{{ example({ group: "components", item: "table", example: "column-widths-custom-classes", html: true, nunjucks: true, open: false, size: "m" }) }}

## Tables with a lot of data

If possible, you should aim to have less data in your tables. If you have a lot of data, try to organise it into multiple tables or multiple pages.

If you cannot split your data, you can use the CSS class `govuk-table--small-text-until-tablet`. This class reduces the size of the text on small screens so large amounts of data has more empty space around it. This makes it easier to visually differentiate between each piece of data when read on small screens.

{{ govukInsetText({
  html: "<p>The CSS class <code>govuk-table--small-text-until-tablet</code> is only available in version 5.2 of GOV.UK Frontend and later.</p><p>Read about <a href=\"/get-started/new-type-scale/\">updating your service to use the new type scale</a>.</p>"
}) }}

You should not use this class on tables unless your table has a lot of data, because a smaller amount of data is easier to read if the text is larger.

{{ example({ group: "components", item: "table", example: "lots-of-data", html: true, nunjucks: true, open: false, size: "m" }) }}
