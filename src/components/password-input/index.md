---
title: Password input
description: Help users accessibly enter passwords
section: Components
aliases: pass word, pass phrase
backlogIssueId: 240
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_callout.njk" import callout %}
{% from "_wcag-note.njk" import wcagNote %}

Help users to create and enter passwords.

{{ callout({
  wcag: "true",
  colour: "blue",
  type: "component",
  introAction: "use the",
  name: "Password input",
  criteria: [
    {
      text: "make sure 'show password' buttons are easy to interact with",
      anchor: "wcag-interact-show-password"
    },
    {
      text: "make sure users can use `autocomplete` to securely create and enter passwords",
      anchor: "wcag-autocomplete-attribute"
    },
    {
      text: "make sure users can enter a password using copy and paste",
      anchor: "wcag-copy-paste-password"
    }
  ]
}) }}

{{ example({ group: "components", item: "password-input", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use this component whenever you need users to create or enter a password.

Before using this component, you should also read the guidance on the [Ask users for passwords pattern](/patterns/passwords/) and [Creating user accounts pattern](/patterns/create-accounts/).

## When not to use this component

Do not use this component to ask for any information other than a password.

Use a [Text input component](/components/text-input/) to ask for other security information, such as:

- multi-factor authentication codes
- answers to security questions
- other personally identifiable information

Also see the [Confirm a phone number pattern](/patterns/confirm-a-phone-number/).

## How it works

This component allows users to enter a password, with an option to show what they’ve entered as plain text.

This allows users to visually check their password before they submit it, which helps them reduce errors and choose passwords that are more unique and secure.

### Error messages

{{ example({ group: "components", item: "password-input", example: "error", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

If the user enters their account details incorrectly, do not reveal whether they got the username or password wrong. Clear any information entered into the password input.

Revealing the source of the error can help fraudsters break into people’s accounts.

See how to handle incorrect login attempts and help users who forget their password in the [Ask users for passwords pattern](/patterns/passwords/).

### Showing and hiding passwords

Hide passwords by default until the user chooses to show it using the ‘show’ button. Users might not be in a private space when entering or creating a password, so you should hide passwords by default.

{% call wcagNote({id: "wcag-interact-show-password"}) %}

<p>Make sure any ‘show password’ button is at least 24px by 24px in size, or has adequate spacing. This is to make sure users can easily interact with the button. This relates to <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">WCAG 2.2 success criterion 2.5.8 Target size (minimum)</a>.</p>
{% endcall %}

If you do choose to include two or more password inputs on a page, the ‘show’ and ‘hide’ toggles and labels for each password input must be different.

For example, you can label:

- the first input as 'Password' with a toggle of 'show password'
- the second input as 'Re-enter password' with a toggle of 'show re-entered password'

### Avoid adding a ‘confirm password’ field

It’s not necessary to add a second password field, also known as a ‘confirm password’ field, particularly as this component allows users to show and hide passwords.

See [Research on this component](#research-on-this-component) and why we decided having a second field is not helpful for users.

### Define the input’s type as ‘password’

When the form is submitted, the password input should automatically change its `type` to `password`, if it has not already done so.

This is to prevent browsers from remembering it as a previously-provided value and potentially displaying it as an autofill option on non-password inputs.

### Use the autocomplete attribute

Use the `autocomplete` attribute on password inputs to help users complete forms faster.

`Autocomplete` indicates to browsers and password managers what kind of password is needed so it can be entered for the user.

Set the `autocomplete` attribute to `new-password` if the user is creating a password. Otherwise, use `current-password`.

{% call wcagNote({id: "wcag-autocomplete-attribute"}) %}

<p>Providing an <code>autocomplete</code> attribute is one way to avoid making the user memorise or transcribe a password from somewhere else in order to use your service. This is to help comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum">WCAG 2.2 success criterion 3.3.8 Accessible authentication (minimum)</a>.</p>
{% endcall %}

Many browsers will autofill password inputs, even when the `autocomplete` attribute is missing or set to `off`.

### Allow copy and paste

Always allow users to copy and paste in password fields. People may have very good reasons why they want to do this, for example if they’re using a password manager.

{% call wcagNote({id: "wcag-copy-paste-password"}) %}

<p>You must allow users to paste in or use autofill to enter their password. Avoid making the user memorise or transcribe a password from somewhere else in order to use your service. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum">WCAG 2.2 success criterion 3.3.8 Accessible authentication (minimum)</a>.</p>
{% endcall %}

#### Copying text from password fields

Users can copy any text from a password field when it’s set on ‘show’ – this is a feature of browser behaviour and cannot be overridden.

This can be useful for users, such as to save a password that the browser has suggested into a separate password manager.

### Avoid restricting the user's input

See the [Ask users for passwords pattern](/patterns/passwords/) to see how to help users choose strong passwords.

Support all the characters users may need to enter a password, including numbers and symbols.

If you must place password restrictions on users, such as for technical or security reasons, be clear and consistent.

Any restrictions must be identical wherever the user creates or enters a password. If you change the restrictions over time, you must continue to support existing user passwords or ask them to set a new one.

#### Do not use maxlength to restrict password length

Users will not get any feedback when they’ve reached the `maxlength` and their text input has been truncated. This happens when a user has pasted text from elsewhere or it’s been autofilled by a password manager.

If you must restrict the length of a password, show an error message instead using the [Validation pattern](/patterns/validation/).

### Do not spellcheck or autocapitalise the user's input

Some browsers might automatically change what the user is typing when the input’s text is visible, such as correcting spelling or automatically turning on upper case letters at the start of sentences.

You can tell browsers not to correct spellings by setting the `spellcheck` attribute to `false`.

Doing this can [avoid making your service vulnerable to ‘spell-jacking’](https://www.itpro.com/security/vulnerability/370010/what-is-spell-jacking), where security researchers have found some spell checking tools gathering personal identifiable information, even user’s passwords, from password input fields to send to third party services.

You can tell browsers not to autocapitalise values by setting the `autocapitalize` attribute to `off`.

### Known issues

Some apps and tools will add their own native functionality to show and hide passwords.

These tools include:

- browsers (particularly when suggesting new passwords)
- password managers
- screen readers

We’ve tried to minimise duplicate functionality by hiding other types of ‘show password’ buttons where possible.

There’s also other instances where a password could be ‘shown’ or ‘hidden’ without the use of a button – causing a mismatch with the button label (in other words, the user would see a button to ‘show’ a password that’s already visible).

[We found this mismatch happens in some browsers](https://github.com/alphagov/govuk-design-system/issues/3552#issuecomment-1976660248) when:

- a keyboard shortcut is pressed
- a suggested password is created

## Research on this component

We [decided that having a second field is not helpful for users](https://github.com/alphagov/govuk-design-system-backlog/issues/240#issuecomment-2020125340), particularly on password inputs with show and hide buttons.

However, we’d like to better support our rationale with real life examples from service teams and get your feedback.
