---
title: Confirm a phone number
description: Identifying users when they sign in
section: Patterns
theme: Help users to…
aliases: 2FA, MFA, multi-factor authentication, security code, telephone number, text message, two-factor authentication
backlogIssueId: 25
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Check that a user has access to a specific mobile phone number using a security code sent by text message.

{{ example({group: "patterns", item: "confirm-a-phone-number", example: "default", html: true, nunjucks: true, open: false}) }}

## When to use this pattern

Ask the user to enter a security code when they need to sign in or complete a higher-risk task, such as changing a password.

Asking the user to enter a security code sent to their mobile phone gives a second layer of security over a [password](/patterns/passwords/).

You can ask for a security code every time a user signs in or only once per device, depending on the risk level of your service.

## How it works

Send and ask the user for the security code when they:

- create an account
- sign in later

### When the user creates an account

When the user creates an account, ask for their password and mobile phone number at the same time. Make it clear if you'll only use the mobile number for sending security codes, or if you'll also use it for other purposes.

After saving the user’s password and mobile phone number, verify their mobile phone number by sending them a text message with a 5 digit code in this format:

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{{ govukInsetText({
  text: "12345 is your [service name] security code"
}) }}

Then ask the user to enter this code:

{{ example({group: "patterns", item: "confirm-a-phone-number", example: "default", titleSuffix: "second", html: true, nunjucks: true, open: false}) }}

Let the user enter the code in whatever format is familiar to them. Allow additional spaces, hyphens and dashes.

Give a time limit of 15 minutes for the user to enter the code — the code should expire after this time limit.

If the user enters an expired code that was sent more than:

- 15 minutes ago, show a ‘code has expired’ error message and send the user a new code
- 2 hours ago, show an ‘incorrect security code’ message, even if the code was correct

If the user follows the ‘Not received a text message?’ link, allow them to check which mobile number they entered, and to change it if necessary. This prevents the user becoming stuck if they entered a mobile number incorrectly. Do not allow the user to change the number when they're signing in.

{{ example({group: "patterns", item: "confirm-a-phone-number", example: "resend-first-time", html: true, nunjucks: true, open: false}) }}

When the user requests a new code, send them a new one. The new code should have its 15 minute time limit. The previous code should remain valid within its original time limit.

### When the user signs in

When the user returns to your service, verify their password first. Once they have entered this correctly, send a text message to their mobile phone with a 5 digit code in this format:

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{{ govukInsetText({
  text: "12345 is your [service name] security code"
}) }}

Ask the user to enter this code. Use the same pattern and time limit as when creating an account.

If they follow the ‘Not received a text message?’ link, show them a page allowing them to request a new code. Do not reveal the mobile number you sent it to.

{{ example({group: "patterns", item: "confirm-a-phone-number", example: "resend", html: true, nunjucks: true, open: false}) }}

You should tell the user what to do if they no longer have access to the phone used to sign up.

For example, you might tell them to contact a support address.

### Domain-bound codes

You can also follow the [domain-bound codes](https://developer.apple.com/news/?id=z0i801mg) standard. This improves security by restricting the code to a specific domain.

Include the domain of the service on a new line, prefixed with an `@`, followed by a `#` symbol and the code, like this:

{{ govukInsetText({
html: "12345 is your [service name] security code<br><br>@www.example.service.gov.uk #12345"
}) }}

### Error messages

Style error messages like this:

{{ example({group: "patterns", item: "confirm-a-phone-number", example: "error-incorrect", html: true, nunjucks: true, open: false}) }}

If the user does not enter enough digits:
<br>Say ‘You've not entered enough numbers, the code must be 5 numbers’.

If the user enters too many digits:
<br>Say ‘You’ve entered too many numbers, the code must be 5 numbers’.

If the user enters non-numeric characters, other than spaces:
<br>Say ‘The code must be 5 numbers’.

If the code has expired, show this message:

{{ example({group: "patterns", item: "confirm-a-phone-number", example: "error-expired", html: true, nunjucks: true, open: false}) }}

If the code was sent more than 2 hours ago, show the 'incorrect security code' message.
### Technical security measures

Use [technical measures to prevent automated attacks](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach#tip2-password-collection). For example, add a time delay after 10 incorrect number entries.

Set up monitoring for potentially malicious behaviour, such as activity from unexpected geographical areas.

## Research on this pattern

[Read the National Cyber Security Centre’s guidance on multi-factor authentication](https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services).

### Services using this pattern

This pattern has been used in a number of services, including the following:

**Government Digital Service**<br>
GOV.UK Notify<br>
GOV.UK Pay

**Department for Work and Pensions**<br>
DWP Authenticate

**Home Office**<br>
EU Settlement Service

**Office for Product Safety and Standards**<br>
Product Safety Database

### Next steps

We need more research to know whether it’s useful to partially show the user the phone number that the security code was sent to.

If you’ve used this pattern, get in touch to share your user research findings.
