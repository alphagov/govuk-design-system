---
title: Notification banner
description: Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content
section: Components
aliases: alert, warning, success message, important message, flash message
backlog_issue_id: 2
layout: layout-pane.njk
status: Experimental
statusMessage: This component is currently experimental because <a class="govuk-link" href="#research-on-this-component">more research</a> is needed to validate it.
---

{% from "_example.njk" import example %}

Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content.

{{ example({group: "components", item: "notification-banner", example: "default", html: true, nunjucks: true, open: false, size: "s"}) }}

## When to use this component

A notification banner lets you tell the user about something that’s not directly relevant to the thing they’re trying to do on that page of the service. For example:

- telling the user about a problem that’s affecting the service as a whole (for example, delays in processing applications because of an emergency)
- telling the user about something that affects them in particular (for example, an approaching deadline they need to meet)
- telling the user about the outcome of something they've just done on a previous page (for example, confirming that an email has been sent)

## When not to use this component

Use notification banners sparingly. There’s [evidence that people often miss them](https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/), and using them too often is likely to make this problem worse.

If the information is directly relevant to the thing the user is doing on that page, put the information in the main page content instead. Use [inset text](/components/inset-text/) or [warning text](/components/warning-text/) if it needs to stand out.

Do not:

- use a notification banner to tell the user about validation errors - use an [error message](/components/error-message/) and [error summary](/components/error-summary/) instead
- show a notification banner and an [error summary](/components/error-summary/) on the same page - just show the error summary

## How it works

Position a notification banner immediately before the page `h1`. The notification banner should be the same width as the page's other content, such as components, headings and body text. For example, if the other content takes up two-thirds of the screen on desktop devices, then the notification banner should also take up two-thirds. [Read about how to lay out pages](https://design-system.service.gov.uk/styles/layout/). 

Use `role="region"` and `aria-labelledby="govuk-notification-banner-title"` (with `id="govuk-notification-banner-title"` on `<govuk-notification-banner__title>`) so that screen reader users can navigate to the notification banner.

Avoid showing more than one notification banner on the same page. Instead, combine the messages in a single notification banner. If the messages are too different to combine, only show the highest priority notification banner.

### Notification banner headings

You can use `<h3>` headings in the `govuk-notification-banner__content` to help structure your content.

Avoid using headings for single-line notifications that do not need them.

## Telling the user about a problem that affects the whole service

Use a ‘neutral’ blue notification banner if the user needs to know about a problem with the service as a whole.

For example:

- in a service that lets the user register or apply for something, they might need to know that it’s taking longer than usual to process applications because of an emergency
- in an account-type service, the user might need to know that the service will be down for scheduled maintenance

{{ example({group: "components", item: "notification-banner", example: "whole-service", html: true, nunjucks: true, open: false, size: "s"}) }}

If your service is on GOV.UK and it’s affected by an emergency, ask your department’s content team to [request a change to the service start page](https://www.gov.uk/guidance/contact-the-government-digital-service/request-a-thing#change-govuk-content).
If your service is getting more demand than usual, check that you’ve set up [There is a problem with the service pages](/patterns/problem-with-the-service-pages/) and [Service unavailable pages](/patterns/service-unavailable-pages/), and the wording is up to date.

## Telling the user about something that’s happening elsewhere

Use a ‘neutral’ notification banner if the user needs to know about something that’s happening elsewhere in the service. For example:

- in a case working system, the user might need to know that there are new cases waiting for their attention
- in an account-type service, you might need to tell the user that there’s a deadline approaching or that a payment is overdue

{{ example({group: "components", item: "notification-banner", example: "default", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second"}) }}

## Reacting to something the user has done

You can also use a notification banner to tell the user about the outcome of something they’ve just done - but they have not finished using the service, so it does not make sense to use a [confirmation page](/patterns/confirmation-pages/).

Using a notification banner is unlikely to be the right approach in a linear service - for example, a service that lets the user register or apply for a thing. For a linear service, it will usually make sense to stick to the [‘one thing per page’ approach](https://www.gov.uk/service-manual/design/form-structure). Do not use a notification banner to tell users that they’ve finished using a linear service. Use a [confirmation page](/patterns/confirmation-pages/) instead.

Use the green version of the notification banner to confirm that something they’re expecting to happen has happened.

{{ example({group: "components", item: "notification-banner", example: "success", html: true, nunjucks: true, open: false, size: "s"}) }}

Since you’re using the notification banner to tell the user about the outcome of something they’ve just done, add `role="alert"` so focus shifts to the notification banner on page load.

Remove a green notification banner when the user moves to a new page.

To make the green version of the notification banner accessible:

- use headings like ‘Success’ - so that you’re [not relying on colour alone to convey meaning](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html))
- use the same heading for green notification banners within the same service - so that you’re [identifying components that work in the same way consistently](https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification)

## Research on this component

We need more research to understand:

- how common it is for users to miss important information in notification banners (including users of assistive technology, who might skip straight to the `h1`)
- whether it’s sometimes helpful to allow users to dismiss notifications, and how to do this
