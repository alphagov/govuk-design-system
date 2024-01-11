---
title: Service unavailable pages
description: This is a page that tells someone a service is unavailable. It should say when the service will be available or what to do if it is permanently closed
section: Patterns
theme: Pages
aliases: "503"
backlogIssueId: 124
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affects this pattern

To use ‘Service unavailable pages' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [get contact information in a consistent way](/patterns/service-unavailable-pages/#wcag-consistent-content-service-unavailable)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

Tell the user a service is unavailable on purpose. These are also known as 503 and shutter pages.

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this pattern

Use a service unavailable page when a service has been closed on purpose. This could be for a specific period of time or permanently.

If there is a problem with the service, use a [there is a problem with the service page](/patterns/problem-with-the-service-pages/).

Have a general page in case you need to close a service and do not have time to update the page. As soon as you know when the service will be available, update the page.

## How it works

The page should have:

- ‘Sorry, the service is unavailable – service name – GOV.UK’ as the page title
- ‘Sorry, the service is unavailable’ as the H1
- the day, date and time it is going to be available or what to do if it is permanently closed
- information about what has happened to their answers if they are in the middle of a transaction
- contact information, if it exists and helps meet a user need
- a link to another service, if they can use it to do what they came to do

Contact information should either be:

- a link to a specific page that includes numbers and opening times
- include all numbers and opening times

<div class="app-wcag-22" id="wcag-consistent-content-service-unavailable" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>You must always write contact information in a clear and consistent way across ‘Service unavailable’ and similar service error pages. This relates to WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">3.2.6 Consistent Help</a>.</p>
</div>

Have clear and concise content and do not use:

- breadcrumbs
- vague, unhelpful words like maintenance, improvements
- red text to warn people

### General page

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "general", html: true, nunjucks: true, open: false }) }}

### When you know when a service will be available

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "available-at-known-date", html: true, nunjucks: true, open: false }) }}

### A link to another service

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "link-to-another-service", html: true, nunjucks: true, open: false }) }}

### Service is closed for part of the year

This is for a service like tax credit renewals.

#### After a service closes

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "after-service-closes", html: true, nunjucks: true, open: false }) }}

#### Before a service opens

Do not include any contact information.

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "before-service-opens", html: true, nunjucks: true, open: false }) }}

### Service is closed forever

#### Nothing has replaced the service

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "no-replacement-service", html: true, nunjucks: true, open: false }) }}

#### Something has replaced the service

{{ example({ group: "patterns", item: "service-unavailable-pages", example: "service-replaced", html: true, nunjucks: true, open: false }) }}

## Research on this pattern

This pattern was tested with 5 users. The user needs identified were to say:

- when the service will be available
- how they can do what they came to do

To meet the needs:

- give clear information about when the service will be available again
- if the service has closed forever, what has replaced it
- say what someone needs to do if they need to speak to someone
- include a link to another service or contact information about offline support

### Next steps

More research is needed to find out:

- what people need to know
- what their expectations are after reading the page
- if people understand what is going on when they see the page
