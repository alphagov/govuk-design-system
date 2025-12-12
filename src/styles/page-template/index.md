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
{% block govukHeader %}
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
      <td class="govuk-table__cell">container</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the part of the page between the <code>header</code> and <code>footer</code> blocks. By default this includes the <code>&lt;div class="govuk-width-container"&gt;</code> element, and the <code>main</code>, <code>containerStart</code>, <code>containerEnd</code> and <code>content</code> blocks.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">containerAttributes</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add HTML attributes to the container.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">containerClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add a class to the container. This is useful if you want to make the page wrapper a fixed width.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">containerEnd</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add custom HTML at the start of the <code>container</code> block and before the <code>&lt;main&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">containerStart</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add custom HTML at the start of the <code>container</code> block and before the <code>&lt;main&gt;</code> element.
      </td>
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
        Override the <code>&lt;footer&gt;</code> element and the <code>govukFooter</code>, <code>footerStart</code>, and <code>footerEnd</code> blocks.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">footerAttributes</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Add HTML attributes to the <code>&lt;footer&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">footerClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Add a class to the <code>&lt;footer&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">footerEnd</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add custom HTML at the end of the <code>&lt;footer&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">footerStart</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add custom HTML at the start of the <code>&lt;footer&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">govukFooter</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/footer/">Footer component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">govukHeader</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/header/">Header component</a>.
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
      <td class="govuk-table__cell">govukServiceNavigation</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/service-navigation/">Service navigation component</a>.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">govukSkipLink</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default <a class="govuk-link" href="/components/skip-link/">Skip link component</a>.
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
      <td class="govuk-table__cell">headIcons</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the default icons used for GOV.UK branded pages.
        <br>
        For example: <code>&lt;link rel="shortcut icon" href="favicon.ico" type="image/x-icon" /&gt;</code>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">header</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Override the <code>&lt;header&gt;</code> element and the <code>govukHeader</code>, <code>headerStart</code>, and <code>headerEnd</code> blocks.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">headerAttributes</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Add HTML attributes to the <code>&lt;header&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">headerClasses</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Add a class to the <code>&lt;header&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">headerEnd</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add custom HTML at the end of the <code>&lt;header&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">headerStart</td>
      <td class="govuk-table__cell">Block</td>
      <td class="govuk-table__cell">
        Add custom HTML at the start of the <code>&lt;header&gt;</code> element.
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
        Override the main section of the page, which by default wraps the <code>&lt;main&gt;</code> element.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">mainAttributes</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Add HTML attributes to the <code>&lt;main&gt;</code> element.</td>
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
      <td class="govuk-table__cell">
        Set the URL for the Open Graph image meta tag. The URL must be absolute, including the protocol and domain name. If you're using the refreshed GOV.UK brand, you may need to update this path to point to the updated assets.
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
      <td class="govuk-table__cell">serviceName</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Set the name of the current service. If set, this will show a <a class="govuk-link" href="/components/service-navigation/">Service navigation component</a> below the header.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">serviceUrl</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">
        Set a URL for the service name to link to. Doesn't do anything if <code>serviceName</code> is not set.
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
