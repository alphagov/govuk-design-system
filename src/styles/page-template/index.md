---
title: Page template
description: Template combines the boilerplate markup and components needed for a basic GOV.UK page
section: Styles
theme: Page structure
aliases: boilerplate
layout: layout-pane.njk
showPageNav: true
order: 1
---

{% from "_example.njk" import example %}

Use this template to keep your pages consistent with the rest of GOV.UK.

This page template combines the boilerplate markup and [components](/components/) needed for a basic GOV.UK page. It includes:

- JavaScript that adds a `.govuk-frontend-supported` class, which is required by components with JavaScript behaviour
- the [Skip link component](/components/skip-link/), [Header component](/components/header/) and [Footer component](/components/footer/)
- the favicon, and other related theme icons

In the examples provided, we show both HTML and [Nunjucks](https://frontend.design-system.service.gov.uk/use-nunjucks/).

You can use the HTML examples if you are not able to use Nunjucks. If you use HTML you’ll need to update it manually when new versions are released.

If you're using Nunjucks you can get this page template by installing GOV.UK Frontend.
You’ll get updates to the page template when we update GOV.UK Frontend.

## Default

This example shows the minimum required for a GOV.UK page.

{{ example({ group: "styles", item: "page-template", example: "default", customCode: true, html: true, nunjucks: true, open: false, size: "l", loading: "eager" }) }}

## Customised page template

You can customise the page template, for example, by:

- adding a service name and navigation
- including a [Back link component](/components/back-link/) or [Phase banner component](/components/phase-banner/)

{{ example({ group: "styles", item: "page-template", example: "custom", customCode: true, html: true, nunjucks: true, open: false, size: "xl" }) }}

## Changing template content

If you’re using Nunjucks, you can change the template’s content using options. You can make changes in:

- [the `<html>` and `<body>` elements](#the-html-and-body-elements)
- [the `<head>` element and page metadata](#the-head-element-and-page-metadata)
- [the page's header](#the-pages-header)
- [the page's main content](#the-pages-main-content)
- [the page's footer](#the-pages-footer)
- [other parts of the template](#other-options)

How you set an option depends on whether it's a 'variable' option or a 'block' option.

To set a 'variable' option, use `set` to pass in a single value or string. For example, to add a class to the `<body>` element using the `bodyClasses` option:

```njk
{% raw %}
{% set bodyClasses = "EXAMPLE-CLASS" %}
{% endraw %}
```

By default, the template contains a [Skip link component](/components/skip-link/), [Header component](/components/header/) and [Footer component](/components/footer/), all of which require 'blocks' to change.

To set a 'block' option, use `block` to pass in a multiline value or HTML markup. For example, to add a block of HTML before the closing `</body>` element in the page template using the `bodyEnd` option:

```njk
{% raw %}
{% block bodyEnd %}
  <div>
     <p>Example text</p>
  </div>
{% endblock %}
{% endraw %}
```

To change the components that are included in the page template by default, set their equivalent blocks. For example:

```njk
{% raw %}
{% block header %}
  {{ govukHeader ({
    homepageUrl: "/custom-url"
  }) }}
{% endblock %}
{% endraw %}
```

### The `<html>` and `<body>` elements

The page template lets you customise the `<html>` and `<body>` element it renders:

- [configure classes and attributes on the `<html>` element](#htmlclasses-variable)
- [configure classes and attributes on the `<body>` element](#bodyclasses-variable)
- [add content at the start or end of the `<body>` element](#bodystart-block)

{{ example({ group: "styles", item: "page-template", example: "html-body-template-areas", html: false, open: false }) }}

{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}

{{ govukSummaryList({
  card: {
    classes: 'app-page-template-options-list',
    title: { html: "Configure classes and attributes on the `<html>` element" | markdown | replace('<p>','') | replace('</p>','')}
  },
  rows: [{
    key: {
      html: '#### `htmlClasses` (Variable)' | markdown | replace('h4', 'span')
    },
    value: {
      html: 'Add a class to the `<html>` element.' | markdown
    }
  }, {
    key: {
      html: '#### `htmlLang` (Variable)' | markdown | replace('h4', 'span')
    },
    value: {
      html: 'Set the language of the whole document. If your `<title>` and `<main>` element are in a different language to the rest of the page, use `htmlLang` to set the language of the rest of the page.' | markdown
    }
  }, {
    key: {html :'#### `htmlLang` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Set the language of the whole document. If your `<title>` and `<main>` element are in a different language to the rest of the page, use `htmlLang` to set the language of the rest of the page.' | markdown}
  }]
}) | replace('h2', 'h4')}}

{{ govukSummaryList({
  card: {
    classes: 'app-page-template-options-list',
    title: { html: "Configure classes and attributes on the `<body>` element" | markdown | replace('<p>','') | replace('</p>','')}
  },
  rows: [{
    key: {html: '#### `bodyClasses` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Add a class to the `<body>` element.' | markdown}
  }, {
    key: {html: '#### `bodyAttributes` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Add attributes to the `<body>` element. Add each attribute and its value in the `bodyAttributes` object.' | markdown}
  }]
}) | replace('h2', 'h4')}}

{{ govukSummaryList({
  card: {
    classes: 'app-page-template-options-list',
    title: { html: "Add content at the start or end of the `<body>` element" | markdown | replace('<p>','') | replace('</p>','')}
  },
  rows: [{
    key: {html: '#### `bodyStart` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Add content after the opening `<body>` element.
For example: The [Cookie banner component](/components/cookie-banner/).' | markdown}
  }, {
    key: {html: '#### `bodyEnd` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Add content just before the closing `</body>` element.' | markdown }
  }]
}) | replace('h2', 'h4')}}

### The `<head>` element and page metadata

The page template lets you control what’s rendered inside the `<head>` element:

- configure [where your page can access GOV.UK Frontend assets](#assetpath-variable)
- [set the page’s title and its language](#pagetitle-block)
- [add custom metadata to the `<head>` element](#head-block) (like a `<link>` to your services stylesheet)

{{ govukSummaryList({
  classes: 'app-page-template-options-list',
  rows: [{
    key: {html: '#### `assetPath` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Specify a path to the GOV.UK Frontend assets (icons, images, font files). If you’re using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.' | markdown}
  }, {
    key: {html: '#### `assetUrl` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Set the domain for assets where an absolute URL is required, for example the Open Graph image.' | markdown}
  }, {
    key: {html: '#### `headIcons` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Override the default icons used for GOV.UK branded pages.
For example: `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />`' | markdown}
  }, {
    key: {html: '#### `opengraphImageUrl` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: "Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name. If you’re using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets." | markdown }
  }, {
    key: {html: '#### `themeColor` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Set the [toolbar colour on some devices](https://developer.chrome.com/blog/support-for-theme-color-in-chrome-39-for-android).' | markdown }
  }, {
    key: {html: '#### `pageTitle` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Override the default page title (`<title>` element).' | markdown}
  }, {
    key: {html: '#### `pageTitleLang` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Set the language of the `<title>` element if it’s different to `htmlLang`.' | markdown }
  }, {
    key: {html: '#### `head` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Add additional items inside the `<head>` element.
For example: `<meta name="description" content="My page description">`' | markdown }
  }]
})}}

### The page's header

Customise the header appearing at the top of the page:

- [replace the Skip Link rendered before the `<header>`](#govukskiplink-block)
- [replace the whole `<header>` element](#header-block) with your own
- [add classes or attributes to the `<header>` element](#headerclasses-variable)
- [add extra content at the start or end of the `<header>` element](#headerstart-block)
- [replace the components rendered inside the `<header>`](#govukheader-block)

{{ example({ group: "styles", item: "page-template", example: "header-template-areas", html: false, open: false }) }}

{{ govukSummaryList({
  classes: 'app-page-template-options-list',
  rows: [{
    key: {html: '#### `govukSkipLink` (Block)' | markdown | replace('h4', 'span') },
    value: {html: 'Override the default [Skip link component](/components/skip-link/)' | markdown }
  }, {
    key: {html: '#### `skipLink` (Block)' | markdown | replace('h4', 'span')},
    value: {html: '**Deprecated - Use [`govukSkipLink`](#govukskiplink-block) instead**
Override the default [Skip link component](/components/skip-link/).' | markdown}
  }, {
    key: {html: '#### `header` (Block)' | markdown  | replace('h4', 'span')},
    value: {html: 'Override the whole `<header>` element (including its opening and closing tags).' | markdown }
  }, {
    key: {html: '#### `headerClasses` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Add a class to the `<header>` element.' | markdown }
  }, {
    key: {html: '#### `headerAttributes` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: '
Add other attributes than `class` to the `<header>` element. Add each attribute and its value in the `headerAttributes` object.' | markdown}
  }, {
    key: {html: '#### `headerStart` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Add content after the opening `<header>` element.' | markdown}
  }, {
    key: {html: '#### `headerEnd` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Add content just before the closing `</header>` element.
For example: The [Phase banner component](/components/phase-banner/).' | markdown}
  }, {
    key: {html: '#### `govukHeader` (Block)' | markdown | replace('h4', 'span')},
    value: {html: 'Override the GOV.UK Header component rendered by default without affecting the rest of the `<header>` element.' | markdown}
  }, {
    key: {html: '#### `serviceName` (Variable)' | markdown | replace('h4', 'span')},
    value: {html: 'Renders a Service Navigation with the given `serviceName` if present. If you need to add navigation items, you’ll need to [replace the default Service Navigation with your own](#govukservicenavigation-block).' | markdown}
  }, {
    key: {html: '#### `govukServiceNavigation` (Block)' | markdown | replace('h4', 'span')},
    value: {html: '
Override the Service Navigation rendered if `serviceName` is set or add your custom Service Navigation without affecting the rest of the `<header>` element.' | markdown}
  }]
})}}

### The page's main content

The page template [renders your content](#content-block) in a `<main>` tag, wrapped in a container limiting the content’s width. You can:

- [replace the container limiting the content’s width](#container-block)
- [add classes or attributes to the container](#containerclasses-variable)
- [add content at the start or end of the container](#containerend-block)
- [replace the `<main>` element](#main-block) with your own
- [add classes or attributes to the `<main>` element](#mainclasses-variable)

{{ example({ group: "styles", item: "page-template", example: "main-content-areas", html: false, open: false }) }}

### container (Block)

Override the default container limiting the width of the page, including `<main>` element it wraps.

#### `containerClasses` (Variable)

Add a class to the container. This is useful if you want to make the page wrapper a fixed width.

#### `containerAttributes` (Variable)

Add other attributes than `class` to the container. Add each attribute and its value in the `containerAttributes` object.

#### `containerStart` (Block)

Add content after the opening `<div class=”govuk-width-container”>` element that limits the width of the page.
For example: [Back link component](/components/back-link/), [Breadcrumbs component](/components/breadcrumbs/)

#### `beforeContent` (Block)

**Deprecated - Use [`containerStart`](#containerstart-block) instead**
Add content that needs to appear outside `<main>` element.  
For example: The [Back link component](/components/back-link/), [Breadcrumbs component](/components/breadcrumbs/), [Phase banner component](/components/phase-banner/).

#### `containerEnd` (Block)

Add content just before the closing `</div>` of the container.

#### `main` (Block)

Override the main section of the page, which by default wraps the `<main>` element, `beforeContent` block and `content` block.

#### `mainClasses` (Variable)

Add a class to the `<main>` element.

#### `mainLang` (Variable)

Set the language of the `<main>` element if it’s different to `htmlLang`.

#### `mainAttributes` (Variable)

Add other attributes than `class` to the container. Add each attribute and its value in the `mainAttributes` object.

#### `content` (Block)

Add content that needs to appear centered in the `<main>` element.

### The page's footer

Customise the header appearing at the top of the page:

- [replace the whole `<footer>` element](#footer-block) with your own
- [add classes or attributes to the `<footer>` element](#footerclasses-variable)
- [add extra content at the start or end of the `<footer>` element](#footerstart-block)
- [replace the components rendered inside the `<footer>`](#govukfooter-block)

{{ example({ group: "styles", item: "page-template", example: "footer-template-areas", html: false, open: false }) }}

#### `footer` (Block)

Override the whole `<footer>` element (including its opening and closing tags).

#### `footerClasses` (Variable)

Add a class to the `<footer>` element.

#### `footerAttributes` (Variable)

Add attributes to the `<footer>` element. Add each attribute and its value in the `footerAttributes` object.

#### `footerStart` (Block)

Add content after the opening `<footer>` element.

#### `govukFooter` (Block)

Override the GOV.UK Footer component rendered by default without changing the rest of the `<footer>` element.

#### `footerEnd` (Block)

Add content just before the closing `</footer>` element.

### Other options

#### `cspNonce` (Variable)

Add a `nonce` attribute to the script for your Content Security Policy (CSP). Provide a nonce that hostile actors cannot guess, as otherwise they can easily find a way around your CSP. However, you should use this attribute only if you’re not able to [include the hash for the inline scripts in your service’s CSP](https://frontend.design-system.service.gov.uk/import-javascript/#if-our-inline-javascript-snippet-is-blocked-by-a-content-security-policy).

#### `govukRebrand` (Variable)

Enables rebranded styles. If you’ve overridden any blocks that are affected by this, you may have to make manual changes. See the [v5.10.0 release notes](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0) for more information.
