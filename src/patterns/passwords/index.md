---
title: Passwords
description: Help users to create and enter secure and memorable passwords
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 56
layout: layout-pane.njk
---

{% from "govuk/components/tag/macro.njk" import govukTag %}

Help users to create and enter secure and memorable passwords.

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

It's common for services to help users type passwords with a '[show password](https://github.com/alphagov/govuk-design-system-backlog/issues/240)' button to let users see their password if they want to.

When there are two or more password fields on a page, the 'show' and 'hide' labels for each password input must be different.

For example, you can label the input "Password" as "show password" and label the second input "Re-enter password" as "show re-entered password".

### Allow users to paste their password

Do not disable paste on password fields. People may have very good reasons why they want to paste their password, for example if they’re using a password manager.

### Help users who forget their password

Passwords that are hard to guess can also be hard to remember.

When helping users who’ve forgotten their password, you should:

- send them a link or code to trigger a password reset
- avoid password reset questions
- avoid password reminders

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> If you include instructions or a link to help users reset their password, make sure to place them consistently on the page. Also make sure any password reset links always perform the same action across each page. This is to comply with WCAG 2.2 success criterion [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).

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
