---
title: There is a problem with the service pages
description: This is a page that tells someone there is something wrong with the service. They are also known as 500 pages
section: Patterns
theme: Pages
aliases: "500"
backlogIssueId: 129
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/tag/macro.njk" import govukTag %}


This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

Tell the user there is something wrong with the service. These are also known as 500 and internal server error pages.

{{ example({ group: "patterns", item: "problem-with-the-service-pages", example: "offline-support-link", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

## When to use this pattern

Use this page when there is an unexpected problem with the service. Use the same page for all unexpected problems.

Log all errors and fix them as quickly as possible.

Only display the page for a short time. If a problem cannot be fixed quickly, close the service and use a [service unavailable page](/patterns/service-unavailable-pages/).

## How it works

These pages should have:

- ‘Sorry, there is a problem with the service – service name – GOV.UK’ as the page title
- ‘Sorry, there is a problem with the service’ as the H1
- ‘Try again later.’ as a normal paragraph
- information about what has happened to their answers if they are in the middle of a transaction
- contact information, if it exists and helps meet a user need
- a link to another service, if they can use it to do what they came to do

Contact information should either be:

- a link to a specific page that includes numbers and opening times
- include all numbers and opening times

Have clear and concise content and do not use:

- breadcrumbs
- jargon like 500 or bad request
- ‘We are experiencing technical difficulties’
- red text to warn people

Store previously entered information for a reasonable amount of time so users can resume a journey with re-populated information when the service becomes available again.

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> Whenever possible, make sure to save and store any information the user has previously entered, unless doing so would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html).

### Showing contact information

Contact information should either:

- include all numbers and opening times in one place on the page
- be a link out to a page that includes numbers and opening times

You might choose to link to a ‘contact information’ page, such as one shown in the ‘[Contact a department or service team](https://design-system.service.gov.uk/patterns/contact-a-department-or-service-team/)’ pattern.

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> You must always write contact information in a clear and consistent way across ‘There is a problem with the service’ pages. This relates to WCAG 2.2 success criterion [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).

### Service has a specific page that includes numbers and opening times

{{ example({ group: "patterns", item: "problem-with-the-service-pages", example: "offline-support-link", html: true, nunjucks: true, open: false, titleSuffix: "second", size: "xl" }) }}

### Service has offline support but no specific page that includes numbers and opening times

{{ example({ group: "patterns", item: "problem-with-the-service-pages", example: "offline-support", html: true, nunjucks: true, open: false, size: "xl" }) }}

### A link to another service

{{ example({ group: "patterns", item: "problem-with-the-service-pages", example: "link-to-another-service", html: true, nunjucks: true, open: false, size: "xl" }) }}

## Research on this pattern

The pattern was tested with 5 users. The user needs identified were to say:

- when the service will be available
- how they can do what they came to do

We cannot meet the first need because we do not know what has happened.

To meet the other need:

- say what someone needs to do if they need to speak to someone
- include a link to another service or contact information about offline support

### Next steps

More research is needed to find out:

- what people need to know
- what their expectations are after reading the page
- if people understand what is going on when they see the page
- if people need to know if this affects only them or other people too
- if people expect to see please and sorry
