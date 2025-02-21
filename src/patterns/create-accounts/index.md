---
title: Create accounts
description: Help users create an account for your service
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 41
layout: layout-pane.njk
---

{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

Help users create an account for your service.

{{ wcagCallout({
  type: "pattern",
  introAction: "help users to",
  name: "Create accounts",
  criteria: [
    {
      text: "make sure users can reuse information they've already entered",
      anchor: "wcag-reuse-account-information"
    },
    {
      text: "make sure that cognitives tests, such as CAPTCHAs, are not needed for users to create an account",
      anchor: "wcag-avoid-cognitive-test"
    }
  ]
}) }}

## When to use this pattern

Provide user accounts if your users will need to regularly access or update their data in your service.

## When not to use this pattern

Do not create user accounts if you can provide a usable service without them.

This is because user accounts are:

- a barrier for many users and make it more likely they will drop out
- difficult to build and maintain

If you want to let users check the status of a one-off transaction, give them a unique reference number they can use along with their name or email address.

Unique references are hard to remember so you should send them in an email or text message to the user.

## How it works

If a user needs an account as part of your service:

- let them use as much of your service as possible before they need to create an account
- use clear and consistent language
- create a simple user journey
- make the sign-up process clear

### Use clear and consistent language

For consistency with other GOV.UK services, use the phrase ‘Create an account’ instead of ‘Register’, ‘Sign up’ or something else.

Use labels like ‘Create a username’ and ‘Create a password’ rather than ‘Username’ and ‘Password’. This helps users to understand that they’re not being asked to enter an existing username or password.

### Create a simple user journey

Make it clear what you need users to do when they create an account.

Show a clear difference between creating an account and signing in. Presenting the options side by side is not enough because users might miss one of them or not understand the&nbsp;difference.

{% call wcagNote({id: "wcag-reuse-account-information"}) %}

<p>Make sure users do not need to enter the same information more than once when creating an account, unless the information is no longer valid or it’s necessary for security reasons. Use the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete">HTML autocomplete attribute</a> to allow password managers and user agents to automatically populate fields. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">WCAG 2.2 success criterion 3.3.7 Redundant entry</a>.</p>
{% endcall %}

### Make the sign-up process clear

If a user fails to create an account they might not be able to use your service at all.

Make sure the account creation screen is solely about that task. Do not add any distracting content or links.

### Avoid using security measures such as CAPTCHAs

<abbr title="Completely Automated Public Turing Test to Tell Computers and Humans Apart">CAPTCHAs</abbr> and similar tests require users to recognise words or pictures.

These are tests of cognitive function, which might be difficult for some users. Users can also struggle to recognise specific words or pictures due to differences in culture and locale.

{% call wcagNote({id: "wcag-avoid-cognitive-test"}) %}

<p>Avoid making users do a cognitive test to use your service. If you do, you must also offer an alternative method. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum">WCAG 2.2 success criterion 3.3.8 Accessible authentication (minimum)</a>.</p>
<p>See more about <a href="https://www.gov.uk/service-manual/technology/using-captchas">using CAPTCHAs and why they’re problematic</a> in the Service Manual. <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum#object-recognition">WCAG lists some other security measures</a> you can implement to prevent misuse and automated abuse in your service.</p>
{% endcall %}

### Never use National Insurance numbers to verify a user’s identity

If you currently use National Insurance numbers to verify identity, find out how to [protect your service against fraud](https://www.gov.uk/service-manual/technology/protecting-your-service-against-fraud#avoid-using-national-insurance-numbers-to-verify-identity).
