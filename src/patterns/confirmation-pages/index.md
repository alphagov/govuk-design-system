---
title: Confirmation pages
description: Let users know they’ve completed a transaction
section: Patterns
theme: Pages
aliases: completion pages, receipts, finish pages
backlog_issue_id: 40
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use this pattern to let users know they’ve completed a transaction.

Include a link to the [GOV.UK feedback page](https://www.gov.uk/service-manual/service-assessments/get-feedback-page) to allow users to tell you what they think of your transaction.

{{ example({group: "patterns", item: "confirmation-pages", example: "default", html: true, nunjucks: true, open: false, size: "xl"}) }}

## When to use this pattern

You should use a confirmation page at the end of a transaction.

## How it works

Confirmation pages reassure users that they have completed a transaction and helps them understand what to expect next.

Your confirmation page must include:

- a reference number, if there is one
- details of what happens next and when
- contact details for the service
- links to information or services that users are likely to need next
- a link to your [feedback page](https://www.gov.uk/service-manual/service-assessments/get-feedback-page)
- a way for users to save a record of the transaction, for example, as a PDF

{{ example({group: "patterns", item: "confirmation-pages", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second", size: "xl"}) }}

### Help users who bookmark the page

Some users will bookmark the confirmation page as a form of receipt. You should allow them to return to the page, whenever possible.

If you cannot, make sure your service responds in a helpful way when users return using a bookmarked link. For example, if people use your service to make an application you could provide links to information on:

- tracking an application
- starting a new application
- what to do or who to contact if they have a problem with their application

## Research on this pattern

[Read a blog post about users who bookmark confirmation pages](https://designnotes.blog.gov.uk/2015/12/10/do-users-return-to-your-service-after-finishing/).

### Known gaps

Research is needed on the best way to confirm transactions that are part of a wider user task. For example, where you might need to emphasise next steps more than completion of that particular transaction.
