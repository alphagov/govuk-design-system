---
title: Skip link
description: Use the skip link component to help keyboard-only users skip to the main content on a page
section: Components
aliases: Skip navigation link
backlogIssueId: 66
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use the skip link component to help keyboard-only users skip to the main content on a page.

{{ example({group: "components", item: "skip-link", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

If you use the page template, you'll also get the skip link without having to add it, as it's included by default. However, if you want to customise the default skip link, read the [page template guidance about customising components](/styles/page-template/#changing-template-content).

## When to use this component

All GOV.UK pages must include a skip link. Usually, you should place the skip link immediately after the opening `<body>` tag. However, if you're using a [cookie banner](/components/cookie-banner/), place the skip link immediately after the cookie banner.

Some automated accessibility testing tools may warn that the skip link element is not inside a landmark. This warning does not apply to skip links, so you can ignore it. Do not wrap the skip link in a `<nav>` region, or move it inside the header.

## How it works

Some people use the tab key on their keyboard to navigate through the links and form elements on a web page.

Including the skip link component gives users the option to bypass the top-level navigation links and jump to the main content on a page.

The skip link component is visually hidden until a keyboard press activates it.

There are 2 ways to use the skip link component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({group: "components", item: "skip-link", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second"}) }}
