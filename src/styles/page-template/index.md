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

If you’re using Nunjucks, you can change the template’s content using options.

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

### Options

#### assetPath (Variable)

Specify a path to the GOV.UK Frontend assets (icons, images, font files). If you’re using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.

#### assetUrl (Variable)

Set the domain for assets where an absolute URL is required, for example the Open Graph image.

#### beforeContent (Block)

Add content that needs to appear outside `<main>` element.  
For example: The [Back link component](/components/back-link/), [Breadcrumbs component](/components/breadcrumbs/), [Phase banner component](/components/phase-banner/).

#### bodyAttributes (Variable)

Add attributes to the `<body>` element. Add each attribute and its value in the `bodyAttributes` object.

#### bodyClasses (Variable)

Add a class to the `<body>` element.

#### bodyEnd (Block)

Add content just before the closing `</body>` element.

#### bodyStart (Block)

Add content after the opening `<body>` element.  
For example: The [Cookie banner component](/components/cookie-banner/).

#### containerClasses (Variable)

Add a class to the container. This is useful if you want to make the page wrapper a fixed width.

#### content (Block)

Add content that needs to appear centered in the `<main>` element.

#### cspNonce (Variable)

Add a `nonce` attribute to the script for your Content Security Policy (CSP). Provide a nonce that hostile actors cannot guess, as otherwise they can easily find a way around your CSP. However, you should use this attribute only if you’re not able to [include the hash for the inline scripts in your service’s CSP](https://frontend.design-system.service.gov.uk/import-javascript/#if-our-inline-javascript-snippet-is-blocked-by-a-content-security-policy).

#### footer (Block)

Override the default [Footer component](/components/footer/).

#### govukRebrand (Variable)

Enables rebranded styles. If you’ve overridden any blocks that are affected by this, you may have to make manual changes. See the [v5.10.0 release notes](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0) for more information.

#### head (Block)

Add additional items inside the `<head>` element.  
For example: `<meta name="description" content="My page description">`

#### header (Block)

Override the default [Header component](/components/header/).

#### headIcons (Block)

Override the default icons used for GOV.UK branded pages.  
For example: `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />`

#### htmlClasses (Variable)

Add a class to the `<html>` element.

#### htmlLang (Variable)

Set the language of the whole document. If your `<title>` and `<main>` element are in a different language to the rest of the page, use `htmlLang` to set the language of the rest of the page.

#### main (Block)

Override the main section of the page, which by default wraps the `<main>` element, `beforeContent` block and `content` block.

#### mainClasses (Variable)

Add a class to the `<main>` element.

#### mainLang (Variable)

Set the language of the `<main>` element if it’s different to `htmlLang`.

#### opengraphImageUrl (Variable)

Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name. If you’re using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.

#### pageTitle (Block)

Override the default page title (`<title>` element).

#### pageTitleLang (Variable)

Set the language of the `<title>` element if it’s different to `htmlLang`.

#### skipLink (Block)

Override the default [Skip link component](/components/skip-link/).

#### themeColor (Variable)

Set the [toolbar colour on some devices](https://developer.chrome.com/blog/support-for-theme-color-in-chrome-39-for-android).

#### Exploded view of the page template block areas

{{ example({ group: "styles", item: "page-template", example: "block-areas", html: false, open: false }) }}
