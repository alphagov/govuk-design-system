---
title: Confirmation pages
description: Let users know they’ve completed a transaction
section: Patterns
theme: Pages
aliases: completion pages, receipts, finish pages
backlogIssueId: 40
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Use this pattern to let users know they’ve completed a transaction.

{% set wcagCallout %}
  <p class="govuk-!-margin-bottom-2">
    {{ govukTag({
      text: "WCAG 2.2"
    })}}
  </p>

  ### New WCAG 2.2 criteria might affect this pattern

  To use ‘Confirmation pages' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:
  
  - [see and understand all text in the green confirmation panel](/patterns/confirmation-pages/#wcag-see-understand-text)
  - [select and copy text within a confirmation page as well as its panel](/patterns/confirmation-pages/#wcag-select-copy-confirmation)

  See the full list of components and patterns affected on our '[Changes to meet WCAG 2.2 page](/accessibility/WCAG-2.2/#components-affected-in-the-design-system)'.
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

Include a link to the [GOV.UK feedback page](https://www.gov.uk/service-manual/service-assessments/get-feedback-page) to allow users to tell you what they think of your transaction.

{{ example({ group: "patterns", item: "confirmation-pages", example: "default", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

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

<div class="app-wcag-22" id="wcag-see-understand-text" role="note">
    <strong class="govuk-tag">WCAG 2.2</strong> 
    <p>Do not include links, buttons or other interactive elements in the green confirmation panel, as the focus state will not have a minimum contrast ratio of 3:1 with the panel’s background colour.</p>
</div>

{{ example({group: "patterns", item: "confirmation-pages", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second", size: "xl"}) }}

### Help users who bookmark the page

Some users will bookmark the confirmation page as a form of receipt. You should allow them to return to the page, whenever possible.

If you cannot, make sure your service responds in a helpful way when users return using a bookmarked link. For example, if people use your service to make an application you could provide links to information on:

- tracking an application
- starting a new application
- what to do or who to contact if they have a problem with their application

<div class="app-wcag-22" id="wcag-select-copy-confirmation" role="note">
    <strong class="govuk-tag">WCAG 2.2</strong> 
    <p>Allow users to select and copy text within a confirmation page as well as its <a href="/components/panel/">panel component</a>. For example, users should be able to select and copy a booking number. This relates to WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant Entry</a>.</p>
</div>

Consider offering an option for the user to copy information in the panel component area into their device’s clipboard if there’s information that the user is expected to:

- save
- remember
- copy


## Research on this pattern

[Read a blog post about users who bookmark confirmation pages](https://designnotes.blog.gov.uk/2015/12/10/do-users-return-to-your-service-after-finishing/).

### Known gaps

Research is needed on the best way to confirm transactions that are part of a wider user task. For example, where you might need to emphasise next steps more than completion of that particular transaction.
