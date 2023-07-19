---
layout: layout-pane.njk
title: Prototyping
section: Get started
theme: Setup guides
order: 1
description: This guide explains how to create prototypes using the GOV.UK Design System and GOV.UK Prototype Kit
---

{% from "_example.njk" import example %}

This guide explains how to create prototypes using the GOV.UK Design System and GOV.UK Prototype Kit.


## Before you start

To make prototypes you will need to install version 7 or later of the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs/create-new-prototype) which has been built to work with the Design System.

Version 7 of the Prototype Kit works in the same way as previous versions except that it uses a new frontend framework called GOV.UK Frontend.

This means that any code that you copy across from old prototypes will not display correctly. Instead, you should use the code provided in the Design System.


## Styling page elements

The Design System provides lots of new CSS classes for styling page elements, so you should not need to write as much of your own Sass or CSS.

Explore the [Styles](/styles/) section of the Design System to see what classes are available and how to apply them.


## Using components

Components are reusable parts of the user interface, like buttons, text inputs and checkboxes. The components in the Design System are designed to be accessible and responsive.

There are 2 ways to use components in the Design System. You can either use HTML or a Nunjucks macro.

You can copy the code from the HTML or Nunjucks tabs below any examples:

{{ example({group: "components", item: "button", example: "default", html: true, nunjucks: true, open: false, loading: "eager"}) }}

## Using Nunjucks macros

A Nunjucks macro is a simple template that generates more complex HTML. However, macros are more sensitive to mistakes than HTML, so it’s worth saving and previewing.

When using Nunjucks macros in the Prototype Kit leave out the first line that starts with `{% raw %}{% from {% endraw %}...`.
