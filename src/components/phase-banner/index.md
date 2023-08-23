---
title: Phase banner
description: Use the phase banner component to show users your service is still being worked on
section: Components
aliases: alpha banner, beta banner, prototype banner, status banner, feedback banner
backlogIssueId: 57
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Use the phase banner component to show users your service is still being worked on.

{{ example({ group: "components", item: "phase-banner", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Services hosted on a service.gov.uk domain must use the phase banner until they pass a live assessment.

Use an alpha banner when your service is in alpha, and a beta banner if your service is in private or public beta.

## How it works

Your banner must be directly under the black GOV.UK header and colour bar.

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> Do not make the phase banner ‘sticky’ to the top of the page by using `position: fixed` or any other method. This is to make sure it does not cover or obscure any content which has a focus applied and to comply with WCAG 2.2 success criterion [2.4.11 Focus not Obscured (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

There are 2 ways to use the phase banner component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "phase-banner", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

{{ example({ group: "components", item: "phase-banner", example: "beta", html: true, nunjucks: true, open: false }) }}

### Add a feedback link

Use a ‘feedback’ link to collect on-page feedback about your service. This can open an email or take the user to a dedicated page or form. Whatever option you use, make sure that users do not lose their place in the service and can return to the page they were on.

Find out what [feedback you need to collect at each phase](https://www.gov.uk/service-manual/measuring-success/measuring-user-satisfaction#user-satisfaction-through-each-service-phase) in the GOV.UK Service Manual.
