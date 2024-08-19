---
title: Confirm an email address
description: Use an email confirmation loop to check that a user has access to a specific email
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 39
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{{ wcagCallout({
  type: "pattern",
  introAction: "help users to",
  name: "Confirm an email address",
  criteria: [
    {
      text: "copy and paste a security code (if you're asking the user to enter a security code you've sent them)",
      anchor: "wcag-copy-paste-security-codes"
    }
  ]
}) }}

Check that a user has access to a specific email account using an email confirmation&nbsp;loop.

## When to use this pattern

Only use email confirmation loops if:

- critical functionality in the service is only available via email, for example, a password reset
- accidentally using the wrong email address would give someone else access to sensitive information about the user

Remember that confirmed emails do not prove a person’s identity, just that they have access to that email address at the time they confirmed.

## How it works

Email confirmation loops can be disruptive because they force users to switch from your service to their email account and back again.

Common problems with email confirmation include:

- confusing users about the journey outside the service
- assuming users have an email account and access to it
- sending emails to spam folders so users do not see them, for example, because it goes to their spam folder
- taking too long to send the confirmation email

You must design your service to reduce these issues for users.

If you use email confirmation loops you must consider:

- any expiry conditions you set on the email link
- letting users resend their email
- whether to use a blocking or non-blocking loop
- the design of the ‘activate your account’ page

Most email confirmation loops will send the user a link and ask them to click it to return to the service. Another approach is to send the user a security code, similar to the [Confirm a phone number](/patterns/confirm-a-phone-number/) pattern, and ask the user to enter it.

<div class="app-wcag-22" id="wcag-copy-paste-security-codes" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>You must allow users to copy and paste any security codes. Avoid making the user memorise or transcribe a security code between apps or browser tabs to use your service. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum">3.3.8 Accessible authentication (minimum)</a>.</p>
</div>

### Set expiry conditions

You must set an expiry date on the email you send so that the link cannot be used after a certain period of time.

You should also set the link to expire when:

- it’s been used once
- it’s superseded by a new link
- the user has changed the email address on their account

If a user attempts to use an expired link or a link that’s already been used then you should explain that it’s expired, and why.

### Let users resend the email

You should let users resend the email confirmation link in case they entered the wrong email address previously or the email did not arrive.

### Blocking or non-blocking loops

There are 2 versions of the email confirmation loop: blocking and non-blocking.

In a blocking loop, the user cannot use the service until they’ve confirmed their email&nbsp;address.

In the non-blocking version, they can continue to use the service, but will be reminded regularly that they need to confirm their email. Some functionality may not be available until they’ve done this.

Blocking loops have a simpler flow, but if a user cannot complete the loop then they’re unable to use the service at all. It’s important that you send the emails instantly if you use blocking loops.

Non-blocking loops need more careful design because you cannot guarantee that all users will confirm their email. This could stop people from accessing your service.

You can also use a combination of both, by starting users on a non-blocking loop initially and then change to a blocking loop.

### Designing the ‘activate your account’ page

This page should explain what the user needs to do to activate their account.

You should show this page immediately after the user provides their email address or if they try to sign in before confirming their email.

The page should:

- show the user the email address that you sent their activation email to
- explain that they need to click the link in the email to proceed
- let them resend the activation email to a different email address if necessary

For blocking loops this should be the only page the user sees if they try to sign in before activating their account.

For non-blocking loops, if a user signs in before activating their account then you should:

- let them use the service
- remind them that they need to activate their account
- tell them where the activation email has been sent
- let them resend the activation email
- let them change their email address and confirm that instead

When a user clicks on the link in the activation email, send them to a page that confirms they’ve activated their account. You may or may not require them to sign in at this stage, depending on where in the flow the ‘activate your account’ screen appears.
