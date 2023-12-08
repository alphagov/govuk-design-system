---
title: National Insurance numbers
description: Ask users to provide their National Insurance number
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 54
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

### New WCAG 2.2 criteria might affect this pattern

To ask users for 'National insurance numbers' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [reuse a previously entered National Insurance number](/patterns/national-insurance-numbers/#wcag-reuse-national-insurance-number)

See the full list of components and patterns affected on our ['Changes to meet WCAG 2.2' page](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

Ask users to provide their National Insurance number.

{{ example({ group: "patterns", item: "national-insurance-numbers", example: "default", html: true, nunjucks: true, open: false, size: "s", loading: "eager" }) }}

## When to use this pattern

Follow this pattern whenever you need to ask for a National Insurance number.

## When not to use this pattern

Never use National Insurance numbers to verify a user’s identity.

If you currently use National Insurance numbers to verify identity, find out how to [protect your service against fraud](https://www.gov.uk/service-manual/technology/protecting-your-service-against-fraud#avoid-using-national-insurance-numbers-to-verify-identity).

## How it works

Use a single [text input](/components/text-input/) labelled ‘National Insurance number’. Write it out in full and never use abbreviations such as ‘NINO’ or ‘NI Number’.

Show a National Insurance number using the format ‘QQ 12 34 56 C’ – the spaces will break up the number to make it easier to read, particularly for screen reader users.

When asking for a National Insurance number:

- allow for 13 characters as National Insurance numbers are spaced in pairs followed by a single letter
- let users enter upper and lower case letters, additional spaces and punctuation
- ignore any unwanted characters before validating
- avoid using ‘AB 12 34 56 C’ as an example because it belongs to a real person and use ‘QQ 12 34 56 C’ instead
- set the `spellcheck` attribute to `false` so that browsers do not spellcheck the National Insurance number

{{ example({ group: "patterns", item: "national-insurance-numbers", example: "default", html: true, nunjucks: true, open: true, size: "s", titleSuffix: "second" }) }}

### Reusing entered National Insurance numbers

<div class="app-wcag-22" id="wcag-reuse-national-insurance-number" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Do not ask for a National Insurance number more than once within a single journey, if only one person’s details are needed.</p>
  <p>Make sure users can easily reuse previously entered National Insurance numbers within a single journey, unless doing so would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant Entry</a>.</p>
</div>

You can make it easier to reuse National Insurance numbers through one of these methods:

- pre-populate fields with the previously entered number
- show any previously entered numbers as an option for the user to select

Continue to give users the option to enter a new National Insurance number.

### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "national-insurance-numbers", example: "error", html: true, nunjucks: true, open: true, size: "s" }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

#### If the National Insurance number is not in the correct format and there is no example

Say ‘Enter a National Insurance number that is 2 letters, 6 numbers, then A, B, C or D, like QQ 12 34 56 C’.

#### If the National Insurance number is not in the correct format and there is an example

Say ‘Enter a National Insurance number in the correct format’.
