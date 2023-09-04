---
title: Contact a department or service team
description: Contact a department or service team
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 10
layout: layout-pane.njk
status: Experimental
statusMessage: This pattern is currently experimental because <a class="govuk-link" href="#next-steps">more research</a> is needed to validate it.
---

{%- from "_example.njk" import example -%}

Give users contact information within your service.

{{ example({ group: "patterns", item: "contact-a-department-or-service-team", example: "default", html: true, open: false, size: "s" }) }}

## When to use this pattern

Use this pattern whenever you need to help users contact your team or department. Carry out contextual user research to decide exactly where to use this pattern in a page or service.

Read about how and why to [set up user support](https://www.gov.uk/service-manual/helping-people-to-use-your-service/set-up-and-manage-user-support) in the GOV.UK Service Manual.

## How it works

{{ example({ group: "patterns", item: "contact-a-department-or-service-team", example: "all-contact-information", html: true, open: false, size: "xl" }) }}

### Order contact channels consistently

List contact channels in the same order throughout your service. This helps users to find what they need more easily.

Order contact channels based on what research shows your users need, and what your service or department can best support.

### Social media

If you have social media channels:

- list these channels last
- do not include a link to the social media sites you're using - read more about this in [GOV.UK’s external linking policy](https://www.gov.uk/guidance/content-design/links#linking-policy)
- tell users not to share personal information with you

### Write telephone numbers in the GOV.UK style

See the [GOV.UK style for writing telephone numbers](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#telephone-numbers).

### Explain any charges

Tell users if they might have to pay to use any of your contact channels.

For telephone call charges, link to the GOV.UK page on [call charges](https://www.gov.uk/call-charges). Include the link after the contact channels list and opening hours.

{{ example({ group: "patterns", item: "contact-a-department-or-service-team", example: "default", html: true, open: false, size: "s", titleSuffix: "second" }) }}

### Give opening hours

Follow the GOV.UK style guide format for [time ranges](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#times) and [date ranges](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates).

Explain any exceptions, like bank holidays, or days of the week when your opening hours are different.

For example, ‘Monday to Friday, 9am to midday and 2pm to 4:30pm (closed on bank holidays)’ or ‘24-hour service’.

### Tell users how long they’ll have to wait

Tell users when you'll respond to them. This helps users choose which contact channel to use.

For example, tell users how long it'll usually take to:

- receive a response to their email
- get to the front of your webchat queue

### Inset contact information

Use [inset text](/components/inset-text/) to display contact information when you want to differentiate it from the content that surrounds it.

{{ example({ group: "patterns", item: "contact-a-department-or-service-team", example: "inset-contact-information", html: true, nunjucks: true, open: false, size: "m" }) }}

### Expanding contact information

If contact information is less important than other content on a page, you can enclose contact information inside the [details](/components/details/) component to avoid distracting users.

For example, if you need to provide contact information at the bottom of a form page for users who need help completing the form.

Only do this when there’s a lot of contact information to display. When there are only 1 or 2 lines, include the contact information within the body of the page.

{{ example({ group: "patterns", item: "contact-a-department-or-service-team", example: "expanding-contact-information", html: true, nunjucks: true, open: false, size: "m" }) }}

## Research on this pattern

This pattern was originally contributed by a team at the Government Digital Service (GDS). The team tested this pattern as part of a government campaign. They ran 2 rounds of research with 12 participants in total.

The examples and guidance here are based on patterns used by the Legal Aid Agency (LAA) and HM Courts & Tribunals Service (HMCTS).

### Next steps

Research is needed to work out:

- if users who are signed into a service need a different approach
- how to give contact information to users who need urgent help
