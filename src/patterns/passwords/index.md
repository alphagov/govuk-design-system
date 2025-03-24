---
title: Passwords
description: Help users to create and enter secure and memorable passwords
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 56
layout: layout-pane.njk
---

Help users to create and enter secure and memorable passwords.

## When to use this pattern

You should follow this pattern whenever you need users to create or enter a password. Before using this pattern, you should also read the guidance on the [User accounts pattern](/patterns/create-accounts/).

For technical considerations, you may also want to read the guidance for the [Password input component](/components/password-input/).

## How it works

When using passwords in your service, you should:

- help users make strong, unique passwords
- let users paste their password
- keep them secure, particularly when helping users reset a password

### Helping users choose strong passwords

Overly strict or confusing constraints can make it harder for people to create strong and memorable passwords. This could mean they:

- stop using your service
- forget their password and have to reset it
- store their password in a non-secure place

Choose restrictions that meet the security needs of your service, and be clear and consistent about them.

Any restrictions must be identical wherever the user creates or enters a password. If you change the restrictions over time, you must continue to support existing user passwords or ask them to set a new one.

If you need additional security, consider adding a second authentication factor rather than extra password restrictions.

Make sure you:

- set a minimum length of at least 8 characters
- do not set a maximum length
- explain any restrictions to users
- do not allow commonly used passwords

### Do not make users keep changing their passwords

Some services force users to change their passwords regularly, for example every month.

You should not do this because it means users:

- are more likely to forget their passwords
- will tend to pick simple variations on their previous password
- are more likely to store their password in a non-secure place

Usually, you should only force a password change if you suspect an account might be compromised.

### Handling incorrect login attempts

If a user enters their account details incorrectly, do not reveal whether they got the username or password wrong.

Revealing the source of the error can help fraudsters break into people’s accounts.

Do not keep any entered password inputs from an incorrect login attempt.

Give users between 5 and 10 attempts to enter their password correctly before you lock their account or do any further security checks.

### Help users who forget their password

Passwords that are hard to guess can also be hard to remember.

When helping users who’ve forgotten their password, you should:

- send them a link or code to trigger a password reset
- avoid password reset questions
- avoid password reminders

Also make sure any password reset links always perform the same action across each page.

### Send a link to trigger password resets

You should never send passwords by email because it’s not a secure channel.

Instead, send users a time-limited password-reset link or code to the email address or phone number that they registered with.

Always email the user when a password reset has happened, in case it was triggered by someone else trying to get into their account.

### Avoid password reset questions

Some services ask users to provide a ‘password reminder’ when they create a password, and give users the option to show this reminder when they’ve forgotten their password.

You should not use password reset questions because they often ask for information that’s:

- too obscure and therefore just as hard to remember as a password
- too easy for someone else to find out, for example ‘mother’s maiden name’
- subject to change, for example ‘favourite colour’

### Avoid password reminders

Some services ask users to provide a ‘password reminder’ when they create a password, and give users the option to show this reminder when they’ve forgotten their password.

You should not use password reminders because they:

- encourage users to reveal information about their password
- do not work for very strong passwords involving random strings of characters

## Research on this pattern

[Read the National Cyber Security Centre’s guidance on passwords](https://www.ncsc.gov.uk/collection/passwords)

### Next steps

More research is needed into whether using inline validation is a good way of helping users create secure passwords.

If you’ve used this pattern, get in touch to share your user research findings.

## Accessibility

If you include instructions or a link to help users reset their password, make sure to place them consistently on the page. This is to comply with [WCAG 2.2 success criterion 3.2.6 Consistent help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).
