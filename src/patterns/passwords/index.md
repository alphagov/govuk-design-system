---
title: Passwords
description: Help users to create and enter secure and memorable passwords
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 56
layout: layout-pane.njk
---

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Help users to create and enter secure and memorable passwords.

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria might affect this pattern

To ask users for 'Passwords' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [interact with any 'show password' button](/patterns/passwords/#wcag-interact-show-password)
- [copy and paste into a password input](/patterns/passwords/#wcag-copy-paste-password)
- [find 'reset password' links in a consistent place on each page](/patterns/passwords/#wcag-consistent-reset)

See the full list of components and patterns affected on our ['Changes to meet WCAG 2.2' page](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

## When to use this pattern

You should follow this pattern whenever you need users to create or enter a password. Before using this pattern, you should also read the guidance on [user accounts](/patterns/create-accounts/).

## How it works

When using passwords in your service, you should:

- help users make them memorable and strong
- let users paste their password
- keep them secure, particularly when helping users reset a password

### Helping users choose strong passwords

Overly strict or confusing constraints can make it harder for people to create memorable passwords. This could mean they:

- stop using your service
- forget their password and have to reset it
- store their password in a non-secure place

Choose constraints that meet the security needs of your service. If you need additional security, add a second authentication factor rather than extra password constraints.

Make sure you:

- set a minimum length of at least 8 characters
- do not set a maximum length
- explain the constraints to users
- do not allow commonly used passwords

### Do not make users keep changing their passwords

Some services force users to change their passwords periodically, for example every&nbsp;month.

You should not do this because it means users:

- are more likely to forget their passwords
- will tend to pick simple variations on their previous password
- are more likely to store their password in a non-secure place

You should only force a password change if you suspect an account may be&nbsp;compromised.

### Handling incorrect login attempts

If a user enters their account details incorrectly, do not reveal whether they got the username or password wrong.

Revealing the source of the error can help fraudsters break into people’s accounts.

Give users between 5 and 10 attempts to enter their password correctly before you lock their account or do any further security checks.

### Hide passwords by default

Users might be in a public space when entering or creating a password, so you should hide passwords by default.

To help users meet your password constraints and prevent mistyped passwords, you can:

- let them see their password if they want to
- show the last typed character of their password
- make them enter their password twice and automatically compare them

#### Showing and hiding passwords

It's common for services to provide a '[show password](https://github.com/alphagov/govuk-design-system-backlog/issues/240)' button which helps users to accurately add their password by letting them see what they're typing

When there are two or more password fields on a page, the 'show' and 'hide' labels for each password input must be unique.

For example, you can label the input "Password" as "show password" and label the second input "Re-enter password" as "show re-entered password".

<div class="app-wcag-22" id="wcag-interact-show-password" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Make sure any ‘show password’ button is at least 24px by 24px in size, with adequate spacing. This is to make sure users can easily interact with the button. This relates to WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">2.5.8 Target Size (minimum)</a>.</p>
</div>

### Allow users to paste or autofill their password

Do not disable paste on password fields. People might have good reasons why they want to paste their password, for example if they’re using a password manager.

Allow password managers to populate password inputs by adding the autocomplete attribute values for `current-password` and `new-password`.

<div class="app-wcag-22" id="wcag-copy-paste-password" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>You must allow users to copy and paste or autofill their password. Avoid making the user memorise or transcribe a password from somewhere else in order to use your service. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum">3.3.8 Accessible Authentication (Minimum)</a>.</p>
</div>

### Help users who forget their password

Passwords that are hard to guess can also be hard to remember.

When helping users who’ve forgotten their password, you should:

- send them a link or code to trigger a password reset
- avoid password reset questions
- avoid password reminders

<div class="app-wcag-22" id="wcag-consistent-reset" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>If you include instructions or a link to help users reset their password, make sure to place them consistently on the page. Also make sure any password reset links always perform the same action across each page. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">3.2.6 Consistent Help</a>.</p>
</div>

### Send a link to trigger password resets

You should never send passwords by email because it’s not a secure channel.

Instead, send users a time-limited password-reset link or code to the email address or phone number that they registered with.

Always email the user when a password reset has happened, in case it was triggered by someone else trying to get into their account.

### Avoid password reset questions

You should not use password reset questions because they often ask for information that’s:

- too obscure and therefore just as hard to remember as a password
- too easy for someone else to find out, for example ‘mother’s maiden name’
- subject to change, for example ‘favourite colour’

### Avoid password reminders

You should not use password reminders because they:

- encourage users to reveal information about their password
- do not work for very strong passwords involving random strings of characters

## Research on this pattern

[Read the National Cyber Security Centre’s guidance on passwords](https://www.ncsc.gov.uk/collection/passwords)

### Next steps

More research is needed into whether using inline validation is a good way of helping users create secure passwords.

If you’ve used this pattern, get in touch to share your user research findings.
