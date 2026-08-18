---
title: Language navigation
description: The Language navigation component helps users choose and switch between languages when using a service.
section: Components
aliases: Language selector, Language switcher
backlogIssueId: 285
layout: layout-pane.njk
status: 
  type: trial
  links:
    - href: "#research-on-this-component"
      text: Research on this component
    - href: "#help-improve-this-page"
      text: Help improve this component
---

{% from "_example.njk" import example %}

The Language navigation component helps users choose and switch between languages when using a service.

{{ example({ group: "components", item: "language-navigation", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use the Language navigation component when you can provide your service in more than one language.

For example, to help users choose and switch from a page in English to a Welsh version of the same page.

How you use this component will depend on whether you offer a choice of languages for:

- your entire service
- specific pages within your service

## When not to use this component

Do not use this component unless you can provide all the same key information on a page in another language.

## How it works

The Language navigation component shows users a choice of languages and helps the user choose and switch between them.

Use the native name of each language, for example Cymraeg for Welsh. This helps speakers of that language recognise the link.

The component does not translate content. You'll need to create, test and maintain content for all the languages you offer your service in.

See some of the other things you might need to do as part of [designing services that offer multiple languages](#designing-services-that-offer-multiple-languages).

Ensure the user does not lose any data they've entered when they navigate to another language. Do not ask the user to re-enter information they've already given.

### Placement on pages

Where you place the Language navigation component helps users understand whether they can use your entire service or only specific pages in another language.

Choose a single consistent location that works best for your users.

Use the same placement throughout your service in all languages. This helps users who often switch languages throughout their journey to check their understanding.

### If you only offer specific pages in another language

You could place the language navigation at the top of a page, after the `h1` element, in a location that makes sense within the page heading structure.

This helps users find their preferred language as quickly as possible.

{{ example({ group: "components", item: "language-navigation", example: "after-h1", html: true, nunjucks: true, open: false }) }}

### If you offer your whole service in another language

If users can change the language for your whole service, you can place the [Language navigation component into the Service navigation component](/components/service-navigation/#adding-language-navigation) using its 'slots' options.

Use the `inline` align option for slots to align the language navigation inline with navigation items as shown in this example.

{{ example({ group: "components", item: "service-navigation", example: "with-inline-end-slot", html: true, nunjucks: true, open: false }) }}

### Showing language navigation in another language

Make sure to translate:

- the `aria-label` (or `ariaLabel` in Nunjucks) to be in the language of the page it is on (it says “Language navigation” by default)
- the hidden text behind each item (`languageDescriptionText` in Nunjucks) to be in the language of the item

### Language navigation on dark backgrounds

Use the `govuk-language-navigation--inverse` modifier class to show white links and text on a dark background – for example, inside a Service navigation with a dark background.

Make sure all users can see the breadcrumbs – the background colour must have a contrast ratio of at least 4.5:1 with white to [meet WCAG 2.2 success criterion 1.4.3 Contrast (minimum), level AA](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

{{ example({ group: "components", item: "language-navigation", example: "inverse", html: true, nunjucks: true, open: false }) }}

## Designing services that offer multiple languages

GOV.UK Content and publishing guidance gives some advice on things you need to [consider when translating content](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/consider-translations/).

Test your service with users in your intended language to spot potential issues such as word inaccuracies and cultural differences. The Service Manual for Wales shows how to [consider bilingualism in your research](https://digitalpublicservices.gov.wales/guidance-and-standards/service-manual/researching-your-users-and-testing-your-service/considering-bilingualism-in-your-research/).

### Internationalisation and localisation

If you choose to show larger parts of your service in another language, consider if you need to translate the text within components such as navigation, buttons and accordions.

Our components use English by default but include methods to translate text within them. Follow our documentation on how to [localise GOV.UK Frontend](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#localise-gov-uk-frontend/).

For some languages, you’ll need to [modify components](/get-started/extending-and-modifying-components/) to ensure text displays well and is understandable by users of assistive technologies. For example, to show languages that read from right to left, such as Arabic, you’ll need to make changes to components and layouts.

See [W3C’s introduction to internationalisation](https://www.w3.org/International/i18n-drafts/nav/about/) for more about some of the things you might need to consider.

Keep in mind that language and regional differences can affect the format users expect to see and enter information such as names, numbers and addresses.

## Research on this component
