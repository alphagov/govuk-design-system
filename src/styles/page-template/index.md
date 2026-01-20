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
{% from "_nunjucks-options.njk" import nunjucksOptions, addNunjucksOption %}

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

Options are listed by block areas where they're used :

- `<html>` and `<body>`
- `<head>` and metadata
- page header
- main container
- footer
- other sections

See a diagram showing an exploded view of the page template block areas.

### `<html>` and `<body>`

The page template lets you customise the `<html>` and `<body>` element it renders:

- [configure classes and attributes on the `<html>` element](#configure-classes-and-attributes-on-the-html-element)
- [configure classes and attributes on the `<body>` element](#configure-classes-and-attributes-on-the-body-element)
- [add content at the start or end of the `<body>` element](#add-content-at-the-start-or-end-of-the-body-element)

{{ example({ group: "styles", item: "page-template", example: "html-body-template-areas", html: false, open: false }) }}

{% call(options) nunjucksOptions("Configure classes and attributes on the `<html>` element") %}
{%- call addNunjucksOption(options, 'htmlClasses', 'Variable') -%}
Add a class to the `<html>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'htmlLang', 'Variable') -%}
Set the language of the whole document. If your `<title>` and `<main>` element are in a different language to the rest of the page, use `htmlLang` to set the language of the rest of the page.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Configure classes and attributes on the `<body>` element") %}
{%- call addNunjucksOption(options, 'bodyClasses', 'Variable') -%}
Add a class to the `<body>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'bodyAttributes', 'Variable') -%}
Add attributes to the `<body>` element. Add each attribute and its value in the `bodyAttributes` object
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add content at the start or end of the `<body>` element") %}
{%- call addNunjucksOption(options, 'bodyStart', 'Block') -%}
Add content after the opening `<body>` element.
For example: the [Cookie banner component](/components/cookie-banner/).
{%- endcall %}

{%- call addNunjucksOption(options, 'bodyEnd', 'Block') -%}
Add content just before the closing `</body>` element.
{%- endcall %}
{% endcall %}

### `<head>` and metadata

The page template lets you control what’s rendered inside the `<head>` element:

- [configure where your page can access GOV.UK Frontend assets](#configure-where-your-page-can-access-govuk-frontend-assets)
- [customise icons and theme colours](#customise-icons-and-theme-colours)
- [set the page’s title](#set-the-pages-title)
- [add custom metadata to the `<head>` element](#add-custom-metadata-to-the-head-element) (like a `<link>` to your services stylesheet)

<!-- Without this comment, the option is rendered as part of a `<li>` from the previous list -->

{% call(options) nunjucksOptions("Configure where your page can access GOV.UK Frontend assets") %}
{%- call addNunjucksOption(options, 'assetPath', 'Variable') -%}
Specify a path to the [GOV.UK Frontend assets](https://frontend.design-system.service.gov.uk/import-font-and-images-assets/) (icons, images, font files). If you're using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.
{%- endcall -%}

{%- call addNunjucksOption(options, 'assetUrl', 'Variable') -%}
Set the domain for assets where an absolute URL is required, for example the Open Graph image.
{%- endcall -%}
{% endcall %}

{% call(options) nunjucksOptions("Customise icons and theme colours") %}
{%- call addNunjucksOption(options, 'opengraphImageUrl', 'Variable') -%}
Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name. If you're using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.
{%- endcall %}

{%- call addNunjucksOption(options, 'themeColor', 'Variable') -%}
Set the [toolbar colour on some devices](https://developer.chrome.com/blog/support-for-theme-color-in-chrome-39-for-android).
{%- endcall %}

{%- call addNunjucksOption(options, 'headIcons', 'Block') -%}
Override the default icons used for GOV.UK branded pages.
For example: `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />`
{% endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Set the page's title") %}
{%- call addNunjucksOption(options, 'pageTitle', 'Variable') -%}
Override the default page title (`<title>` element).
{%- endcall %}

{%- call addNunjucksOption(options, 'pageTitleLang', 'Variable') -%}
Set the language of the `<title>` element if it's different to `<htmlLang>`.
{% endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add custom metadata to the `<head>` element") %}
{%- call addNunjucksOption(options, 'head', 'Block') -%}
Add additional items inside the `<head>` element.
For example: `<meta name="description" content="My page description">`
{%- endcall %}
{% endcall %}

### Page header

Customise the header appearing at the top of the page:

- [replace the Skip Link rendered before the `<header>`](#replace-the-skip-link-rendered-before-the-header)
- [add classes or attributes to the `<header>` element](#add-classes-or-attributes-to-the-header-element)
- [add extra content at the start or end of the `<header>` element](#add-extra-content-at-the-start-or-end-of-the-header-element)
- [add a Service Navigation component](#add-a-service-navigation-component)
- [replace the default content from the header](#replace-the-default-content-from-the-header)

{{ example({ group: "styles", item: "page-template", example: "header-template-areas", html: false, open: false }) }}

{% call(options) nunjucksOptions("Replace the Skip Link rendered before the `<header>`") %}
{%- call addNunjucksOption(options, 'skipLink', 'Block') -%}
Deprecated - use `govukSkipLink` instead. Override the default [Skip link component](/components/skip-link/).
{%- endcall -%}

{%- call addNunjucksOption(options, 'govukSkipLink', 'Block') -%}
Override the default [Skip link component](/components/skip-link/).
{%- endcall -%}
{% endcall %}

{% call(options) nunjucksOptions("Add classes or attributes to the `<header>` element") %}
{%- call addNunjucksOption(options, 'headerClasses', 'Variable') -%}
Add a class to the `<header>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'headerAttributes', 'Variable') -%}
Add attributes to the `<header>` element. Add each attribute and its value in the `headerAttributes` object
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add extra content at the start or end of the `<header>` element") %}
{%- call addNunjucksOption(options, 'headerStart', 'Block') -%}
Add content after the opening `<header>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'headerEnd', 'Block') -%}
Add content just before the closing `</header>` element.
For example: the [Phase banner component](/components/phase-banner/).
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add a Service Navigation component") %}
{%- call addNunjucksOption(options, 'serviceName', 'Variable') -%}
Renders a Service Navigation with the given `serviceName` if present.
If you need to add navigation items, you’ll need to [replace the default Service Navigation with your own](#govukservicenavigation-block)</a>
{%- endcall %}

{%- call addNunjucksOption(options, 'govukServiceNavigation', 'Block') -%}
Override the Service Navigation rendered if [`serviceName`](#govukservicename-variable) is set or add your custom Service Navigation without affecting the rest of the `<header>` element.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Replace the default content from the header") %}
{%- call addNunjucksOption(options, 'header', 'Block') -%}
Override the `<header>` element and the `govukHeader`, `headerStart`, and `headerEnd` blocks.
{%- endcall -%}

{%- call addNunjucksOption(options, 'govukHeader', 'Block') -%}
Override the GOV.UK Header without changing the rest of the `<header>` element.
{%- endcall -%}
{% endcall %}

### Main content

The page template [renders your content](#render-your-content-inside-the-template) in a `<main>` tag, wrapped in a container limiting the content’s width. You can:

- [add classes to the container limiting the content’s width](#add-classes-or-attributes-to-the-container)
- [add content at the start or end of the container](#add-extra-content-at-the-start-or-end-of-the-container)
- [add classes or attributes to the `<main>` element](#add-classes-or-attributes-to-the-main-element)
- [replace the container or `<main>` element](#replace-the-container-or-main-element) with your own

{{ example({ group: "styles", item: "page-template", example: "main-content-template-areas", html: false, open: false }) }}

{% call(options) nunjucksOptions("Render your content inside the template") %}
{%- call addNunjucksOption(options, 'content', 'Block') -%}
Add content that needs to appear in the <main> element.
{%- endcall %}

{%- call addNunjucksOption(options, 'containerAttributes', 'Variable') -%}
Add other attributes than `class` to the container element. Add each attribute and its value in the `containerAttributes` object.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add classes or attributes to the container") %}
{%- call addNunjucksOption(options, 'containerClasses', 'Variable') -%}
Add a class to the container. This is useful if you want to make the page wrapper a fixed width.
{%- endcall %}

{%- call addNunjucksOption(options, 'containerAttributes', 'Variable') -%}
Add other attributes than `class` to the container element. Add each attribute and its value in the `containerAttributes` object.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add extra content at the start or end of the container") %}
{%- call addNunjucksOption(options, 'containerStart', 'Block') -%}
Add content after the opening `<div class=”govuk-width-container”>` element that limits the width of the page.
For example: the [Back link component](/components/back-link), [Breadcrumbs component](/components/breadcrumbs)
{%- endcall %}

{%- call addNunjucksOption(options, 'containerStart', 'Block') -%}
Deprecated - Use [`containerStart`](#containerstart-variable) instead.
Add content that needs to appear outside the `<main>` element.
For example: the [Back link component](/components/back-link), [Breadcrumbs component](/components/breadcrumbs).
{%- endcall %}

{%- call addNunjucksOption(options, 'containerEnd', 'Block') -%}
Add content just before the closing `</div>` of the width container.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add classes or attributes to the `<main>` element") %}
{%- call addNunjucksOption(options, 'mainClasses', 'Variable') -%}
Add a class to the `<main>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'mainClasses', 'Variable') -%}
Set the language of the `<main>` element if it’s different to [`htmlLang`](#htmllang-variable).
{%- endcall %}

{%- call addNunjucksOption(options, 'mainAttributes', 'Variable') -%}
Add other attributes than `class` and `lang` to the `<main>` element. Add each attribute and its value in the `mainAttributes` object.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Replace the container or `<main>` element") %}
{%- call addNunjucksOption(options, 'container', 'Block') -%}
Override the default container limiting the width of the page, including the `<main>` element it wraps.
{%- endcall %}

{%- call addNunjucksOption(options, 'main', 'Block') -%}
Override the whole <main> element.
{%- endcall %}
{% endcall %}

### Footer

Customise the header appearing at the top of the page:

- [add classes or attributes to the `<footer>` element](#add-classes-or-attributes-to-the-footer-element)
- [add extra content at the start or end of the `<footer>` element](#add-extra-content-at-the-start-or-end-of-the-footer-element)
- [replace the default content from the footer](#replace-the-default-content-from-the-footer)

{{ example({ group: "styles", item: "page-template", example: "footer-template-areas", html: false, open: false }) }}

{% call(options) nunjucksOptions("Add classes or attributes to the `<footer>` element") %}
{%- call addNunjucksOption(options, 'footerClasses', 'Variable') -%}
Add a class to the `<footer>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'footerAttributes', 'Variable') -%}
Add attributes to the `<footer>` element. Add each attribute and its value in the `footerAttributes` object
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Add extra content at the start or end of the `<footer>` element") %}
{%- call addNunjucksOption(options, 'footerStart', 'Block') -%}
Add content after the opening `<footer>` element.
{%- endcall %}

{%- call addNunjucksOption(options, 'footerEnd', 'Block') -%}
Add content just before the closing `</footer>` element.
{%- endcall %}
{% endcall %}

{% call(options) nunjucksOptions("Replace the default content from the footer") %}
{%- call addNunjucksOption(options, 'footer', 'Block') -%}
Override the `<footer>` element and the `govukFooter`, `footerStart`, and `footerEnd` blocks.
{%- endcall -%}

{%- call addNunjucksOption(options, 'govukfooter', 'Block') -%}
Override the GOV.UK Footer without changing the rest of the `<footer>` element.
{%- endcall -%}
{% endcall %}

### Other options

{% call(options) nunjucksOptions("Replace the default content from the header") %}
{%- call addNunjucksOption(options, 'cspNonce', 'Variable') -%}
Add a nonce attribute to the script for your Content Security Policy (CSP). Provide a nonce that hostile actors cannot guess, as otherwise they can easily find a way around your CSP. However, you should use this attribute only if you’re not able to include the hash for the inline scripts in your service’s CSP.
{%- endcall -%}

{%- call addNunjucksOption(options, 'govukRebrand', 'Variable') -%}
Enables rebranded styles. If you’ve overridden any blocks that are affected by this, you may have to make manual changes. See the v5.10.0 release notes for more information.
{%- endcall -%}
{% endcall %}

### [OLD TABLE]

<table class="govuk-table app-table--constrained">
  <caption class="govuk-table__caption govuk-visually-hidden">Options that you can use with the page template</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">Option name</th>
      <th class="govuk-table__header" scope="col">Option type</th>
      <th class="govuk-table__header" scope="col">Description</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">assetPath</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Specify a path to the <a href="https://frontend.design-system.service.gov.uk/import-font-and-images-assets/">GOV.UK Frontend assets</a> (icons, images, font files). If you're using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">assetUrl</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Set the domain for assets where an absolute URL is required, for example the Open Graph image.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">beforeContent</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add content that needs to appear outside <code>&lt;main&gt;</code> element.
        <br>
        For example: The <a class="govuk-link" href="/components/back-link/">Back link component</a>, <a class="govuk-link" href="/components/breadcrumbs/">Breadcrumbs component</a>,
        <a class="govuk-link" href="/components/phase-banner/">Phase banner component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">bodyAttributes</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add attributes to the <code>&lt;body&gt;</code> element. Add each attribute and its value in the <code>bodyAttributes</code> object.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">bodyClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add a class to the <code>&lt;body&gt;</code> element.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">bodyEnd</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add content just before the closing <code>&lt;/body&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">bodyStart</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add content after the opening <code>&lt;body&gt;</code> element.
        <br>
        For example: The <a class="govuk-link" href="/components/cookie-banner/">Cookie banner component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">containerClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add a class to the container. This is useful if you want to make the page wrapper a fixed width.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">content</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add content that needs to appear centered in the <code>&lt;main&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">cspNonce</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Add a <code>nonce</code> attribute to the script for your Content Security Policy (CSP). Provide a nonce that hostile actors cannot guess, as otherwise they can easily find a way around your CSP. However, you should use this attribute only if you’re not able to <a class="govuk-link" href="https://frontend.design-system.service.gov.uk/import-javascript/#if-our-inline-javascript-snippet-is-blocked-by-a-content-security-policy">include the hash for the inline scripts in your service’s CSP</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">footer</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/footer/">Footer component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">govukRebrand</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Enables rebranded styles. If you’ve overridden any blocks that are affected by this, you may have to make manual changes. See the <a class="govuk-link" href="https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0">v5.10.0 release notes</a> for more information.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">head</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add additional items inside the <code>&lt;head&gt;</code> element.
        <br>
        For example: <code>&lt;meta name="description" content="My page description"&gt;</code>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">header</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/header/">Header component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">headIcons</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default icons used for GOV.UK branded pages.
        <br>
        For example: <code>&lt;link rel="shortcut icon" href="favicon.ico" type="image/x-icon" /&gt;</code>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">htmlClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add a class to the <code>&lt;html&gt;</code> element.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">htmlLang</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Set the language of the whole document. If your <code>&lt;title&gt;</code> and <code>&lt;main&gt;</code> element are in a different language to the rest of the page, use <code>htmlLang</code> to set the language of the rest of the page.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">main</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the main section of the page, which by default wraps the <code>&lt;main&gt;</code> element, <code>beforeContent</code> block and <code>content</code> block.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">mainClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add a class to the <code>&lt;main&gt;</code> element. </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">mainLang</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Set the language of the <code>&lt;main&gt;</code> element if it's different to <code>htmlLang</code>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">opengraphImageUrl</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name. If you're using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.
</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">pageTitle</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default page title (<code>&lt;title&gt;</code> element).
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">pageTitleLang</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Set the language of the <code>&lt;title&gt;</code> element if it's different to <code>htmlLang</code>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">skipLink</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/skip-link/">Skip link component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">themeColor</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Set the <a href="https://developer.chrome.com/blog/support-for-theme-color-in-chrome-39-for-android">toolbar colour on some devices</a>.
      </td>
    </tr>
  </tbody>
</table>

#### Exploded view of the page template block areas

{{ example({ group: "styles", item: "page-template", example: "block-areas", html: false, open: false }) }}
