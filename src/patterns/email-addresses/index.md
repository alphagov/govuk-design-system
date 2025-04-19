---
title: Email addresses
description: Help users enter a valid email address
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 45
layout: layout-pane.njk
---

{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}
{% from "_example.njk" import example %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{{ wcagCallout({
  type: "pattern",
  introAction: "ask users for",
  name: "Email addresses",
  criteria: [
    {
      text: "make sure users can reuse a previously entered email address",
      anchor: "wcag-reuse-email-addresses"
    }
  ]
}) }}

{{ example({ group: "patterns", item: "email-addresses", example: "default", html: true, nunjucks: true, open: false, size: "s", loading: "eager" }) }}

## When to use this pattern

Follow this pattern whenever you need to capture an email address.

## How it works

When asking users for their email address, you must:

- make it clear why you’re asking
- make sure the field works for all of your users
- help users to enter a valid email address

You may also need to check that users have access to the email account they give you.

{{ example({ group: "patterns", item: "email-addresses", example: "default", html: true, nunjucks: true, open: true, size: "s", titleSuffix: "second" }) }}

### Reusing entered email addresses

{% call wcagNote({id: "wcag-reuse-email-addresses"}) %}

<p>Make sure users can easily reuse a previously entered email address within a single journey, unless doing so would be a major safety or security concern. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">WCAG 2.2 success criterion 3.3.7 Redundant entry</a>.</p>
{% endcall %}

You can make it easier to reuse email addresses through one of these methods:

- pre-populate the email field with the previously entered email address
- show any previously entered email addresses as an option for the user to select

Continue to give users the option to enter a new email address.

### Tell users why you want the email address

Make it clear what the email address will be used for so that:

- users feel confident that you’re not going to abuse it
- users with multiple email addresses can choose which one to give you

If the email address field is part of a sign-in box, you do not need to say ‘We need your email so we can sign you in’.

### Make sure the field works for all of your users

Make sure the field can accommodate up to 254 characters, which is the [longest an email address can be](https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690).

### Help users to enter a valid email address

Help your users to enter a valid email address by:

- checking they have entered the correct format
- allowing users to paste the email address
- setting the `type` attribute to `email` so that devices display the correct keyboard
- setting the `spellcheck` attribute to `false` so that browsers do not spellcheck the email address
- confirming their address back to them so they can check and change it

You should also set the `autocomplete` attribute to `email`. This lets browsers autofill the email address on a user's behalf if they’ve entered it previously.

If you are working in production you’ll need to do this to meet [WCAG 2.2 success criterion 1.3.5 Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html). You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

The field should be wide enough for most users to see their entire email address once they have entered it. A good rule of thumb is to make sure you can see at least 30 characters at once. You can analyse your user data to refine this.

You can check for common misspellings of popular email providers, for example ‘homtail.com’ instead of ‘hotmail.com’. Warn users if you detect one, but allow them to proceed in case it’s a genuine email address.

Some services ask users to repeat their email address. Only do this if your user research shows it to be effective.

### Check the user has access to their email account

If email is an essential part of your service - for example to send a password reset - you can confirm whether the user has access to the email address they give you [using an email confirmation loop](/patterns/confirm-an-email-address/).

However, these are disruptive and should be avoided as far as possible.

### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "email-addresses", example: "error", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in the [Error message component](/components/error-message/) and have specific error messages for specific error states.

#### If the email address is not in the correct format and there is no example

Say ‘Enter an email address in the correct format, like name<i></i>@example.com’.

#### If the email address is not in the correct format and there is an example

Say ‘Enter an email address in the correct format’.
