---
title: Page template
description: Template combines the boilerplate markup and components needed for a basic GOV.UK page
section: Styles
aliases: boilerplate
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use this template to keep your pages consistent with the rest of GOV.UK.

This page template combines the boilerplate markup and [components](/components/) needed for a basic GOV.UK page. It includes:

- JavaScript that adds a `.js-enabled` class, which is required by components with JavaScript behaviour
- the [skip link](/components/skip-link/), [header](/components/header/) and [footer](/components/footer/) components
- the favicon, and other related theme icons

In the examples provided, we show both HTML and [Nunjucks](https://frontend.design-system.service.gov.uk/use-nunjucks/).

You can use the HTML examples if you are not able to use Nunjucks. If you use HTML you’ll need to update it manually when new versions are released.

If you're using Nunjucks you can get this page template by installing GOV.UK Frontend.
You’ll get updates to the page template when we update GOV.UK Frontend.

## Default

This example shows the minimum required for a GOV.UK page.

{{ example({group: "styles", item: "page-template", example: "default", customCode: true, html: true, nunjucks: true, open: false, size: "l", loading: "eager"}) }}

## Customised page template

You can customise the page template, for example, by:

- adding a service name and navigation
- including a [back link](/components/back-link/) or [phase banner](/components/phase-banner/)

{{ example({group: "styles", item: "page-template", example: "custom", customCode: true, html: true, nunjucks: true, open: false, size: "xl" }) }}

## Changing template content

If you’re using Nunjucks, you can change the template’s content using options.

How you set an option depends on whether it's a 'variable' option or a 'block' option.

To set a 'variable' option, use `set` to pass in a single value or string. For example, to add a class to the `<body>` element using the `bodyClasses` option:

```javascript
{% raw %}
{% set bodyClasses = "EXAMPLE-CLASS" %}
{% endraw %}
```

By default, the template contains a [skip link](/components/skip-link/), [header](/components/header/) and [footer](/components/footer/), all of which require 'blocks' to change.

To set a 'block' option, use `block` to pass in a multiline value or HTML markup. For example, to add a block of HTML before the closing `</body>` element in the page template using the `bodyEnd` option:

```javascript
{% raw %}
{% block bodyEnd %}
  <div>
     <p>Example text</p>
  </div>
{% endblock %}
{% endraw %}
```

To change the components that are included in the page template by default, set their equivalent blocks. For example:

```javascript
{% raw %}
{% block header %}
  {{ govukHeader ({
    homepageUrl: "/custom-url"
  }) }}
{% endblock %}
{% endraw %}
```

### Options

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
        Specify a path to the <a href="https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#font-and-image-assets">GOV.UK Frontend assets</a> (icons, images, font files).
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
        For example: The <a class="govuk-link" href="/components/back-link/">back link</a> component, <a class="govuk-link" href="/components/breadcrumbs/">breadcrumbs</a> component,
        <a class="govuk-link" href="/components/phase-banner/">phase banner</a> component.
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
        For example: The <a class="govuk-link" href="/components/cookie-banner/">cookie banner</a> component.
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
        Add a <code>nonce</code> attribute to the script for your Content Security Policy (CSP). Provide a nonce that hostile actors cannot guess, as otherwise they can easily find a way around your CSP. However, you should use this attribute only if you’re not able to <a class="govuk-link" href="https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#if-your-javascript-is-not-working-properly">include the hash for the inline scripts in your service’s CSP</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">footer</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/footer/">footer</a> component.
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
        Override the default <a class="govuk-link" href="/components/header/">header</a> component.
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
      <td class="govuk-table__cell">Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name.</td>
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
        Override the default <a class="govuk-link" href="/components/skip-link/">skip link</a> component.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">themeColor</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Set the <a href="https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android">toolbar colour on some devices</a>.
      </td>
    </tr>
  </tbody>
</table>

#### Exploded view of the page template block areas

{{ example({group: "styles", item: "page-template", example: "block-areas", html: false, open: false }) }}
