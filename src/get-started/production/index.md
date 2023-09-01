---
layout: layout-pane.njk
title: Production
section: Get started
theme: Setup guides
order: 2
description: This guide explains how to set up your project so you can start using the styles and coded examples in the GOV.UK Design System in production
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

This guide explains how to set up your project so you can start using the styles and coded examples in the GOV.UK Design System in production.

{{ govukInsetText({
  classes: "app-table--constrained",
  html: "If you’ve used GOV.UK Elements, GOV.UK Template or the GOV.UK Frontend Toolkit before, you might also find it useful to read the guide on <a href=\"/get-started/updating-your-code/\">updating your code</a>."
}) }}

## Include GOV.UK Frontend in your project

To start using GOV.UK styles, components and patterns contained here, you’ll need to include GOV.UK Frontend in your project.

There are 2 ways to include GOV.UK Frontend in your project. You can either install it using node package manager (npm) or include the compiled files in your application.

### Option 1: install using npm

We recommend [installing GOV.UK Frontend using npm](https://frontend.design-system.service.gov.uk/installing-with-npm/#install-with-node-js-package-manager-npm).

Using this option, you will be able to:

- selectively [include the CSS or JavaScript](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/) for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build (for example, overriding colours or enabling global styles)
- use the [Nunjucks template and macros](https://frontend.design-system.service.gov.uk/use-nunjucks/) if your environment supports them

### Option 2: include compiled files

If your project does not use npm, or if you want to try out GOV.UK Frontend in your project without installing it through npm, you can [download and include compiled stylesheets, JavaScript and the asset files](https://frontend.design-system.service.gov.uk/installing-from-dist/#install-from-dist).

Using this option, you will be able to include all the CSS and JavaScript of GOV.UK Frontend in your project.

You will not be able to:

- selectively [include the CSS or JavaScript](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/) for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build, for example, overriding colours or enabling global styles
- use the component Nunjucks templates

## Start using the GOV.UK page template

You can set up a basic page that is consistent with GOV.UK branding by using the [GOV.UK page template](/styles/page-template/).

## Styling page elements

The Design System provides CSS classes for styling content, instead of global styles.

The class names follow the Block Element Modifier (BEM) naming convention. This can look a bit daunting at first, but it makes robust code that’s easy to maintain.

Explore the [Styles](/styles/) section of the Design System to see what classes are available.

## Using components

The components in the Design System are designed to be accessible and responsive.

You can use them in your live application as either:

- HTML
- [Nunjucks macros](https://frontend.design-system.service.gov.uk/use-nunjucks/) - if you installed GOV.UK Frontend using npm and your application uses Node.js

You can get the code from the HTML or Nunjucks tabs below any examples:

{{ example({ group: "components", item: "button", example: "default", html: true, nunjucks: true, open: false }) }}
