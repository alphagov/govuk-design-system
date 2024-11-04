---
title: Bank details
description: How to ask users for their bank details
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 149
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{{ wcagCallout({
  type: "pattern",
  introAction: "ask users for",
  name: "Bank details",
  criteria: [
    {
      text: "reuse previously entered bank details",
      anchor: "wcag-reuse-bank-details"
    }
  ]
}) }}

{{ example({ group: "patterns", item: "bank-details", example: "default", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

## When to use this pattern

Follow this pattern if you need users to provide their bank details so you can pay them.

Only ask for bank details securely within your service. For example, do not ask users to send their bank details by email.

This pattern does yet not cover asking users for bank details so they can pay by Direct Debit.

If your service lets users set up Direct Debit payments, first check if you can use [GOV.UK Pay](https://www.payments.service.gov.uk/direct-debit/).

## How it works

Include extra fields if your payment service provider needs additional information.

### Do not ask users for their account type

Do not ask users if they have a bank account or building society account as not all users know this.

If your service does not support building society accounts, remove building society from the content and do not ask for a roll number.

### Reusing entered bank details

{% call wcagNote({id: "wcag-reuse-bank-details"}) %}

<p>Do not ask for bank details more than once within a single journey if only one transaction is taking place.</p>
<p>Make sure users can easily reuse previously entered bank details within a single journey, unless the information is no longer valid or doing so would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant entry</a>.</p>
{% endcall %}

You can make it easier to reuse bank details through one of these methods:

- pre-populate fields with the previously entered bank details
- show any previously entered bank details as an option for the user to select

Continue to give users the option to enter new bank details.

### Asking for building society roll numbers

Roll numbers are only used by some building societies for certain types of account, so make this field optional.

However, you need a user’s roll number when they have one. This is why the label says ‘(if you have one)’.

### Allow different formats for the sort code

Let users enter their sort code in whatever format is familiar to them. Allow additional spaces, hyphens and dashes.

Use one input for the sort code. It allows users to enter their sort code more quickly, and avoids them needing to read and understand multiple input labels.

### Use a branching question if users can choose how to get paid

Not everyone has a bank account or wants to share their account details online.

Let users choose to get paid by an alternative method.

Adapt this question depending on what payment options your users need and what your service can support.

{{ example({ group: "patterns", item: "bank-details", example: "branch", html: true, nunjucks: true, open: false, size: "xl" }) }}

### International bank account details

If you expect your users will have a non-UK bank account, you’ll need to:

- use different fields to sort code and account number - usually BIC code (also known as 'SWIFT code') and IBAN
- do research on other fields you may need to add for the countries your service supports
- only show the fields for the country your user selects

If you expect your users to have a non-UK bank account, give them an option to select this.

International bank accounts require different fields to sort code and account number.

Different countries ask for additional details. This guidance does not cover all possibilities. You will need to research what information is needed by the countries your service supports.

Only show the fields that relate to that country.

Most countries need the IBAN and BIC, sometimes known as the SWIFT code.

{{ example({ group: "patterns", item: "bank-details", example: "international", html: true, nunjucks: true, open: false, size: "xl" }) }}

### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "bank-details", example: "error", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in the [Error message component](/components/error-message/) and have specific error messages for specific error states.

#### If the name on the account is empty

Say 'Enter the name on the account'.

#### If the sort code is empty

Say 'Enter a sort code'.

#### If the sort code is not in the correct format

Say 'Enter a valid sort code like 309430'.

#### If the account number is empty

Say 'Enter an account number'

#### If the account number is not in the correct format

Say 'Enter a valid account number like 00733445'.

#### If the account number is too long or too short

Say 'Account number must be between 6 and 8 digits'.

#### If the building society roll number is too long

Say 'Building society roll number must be between 1 and 18 characters'.

#### If the building society roll number uses characters that are not allowed

Say 'Building society roll number must only include letters a to z, numbers, hyphens, spaces, forward slashes and full stops'.

## Research on this pattern

This pattern was originally contributed by a team at the Ministry of Justice.

It has not been tested in user research yet. It's closely based on the pattern used by GOV.UK Pay, and patterns used by the following government services.

**Department for Work and Pensions**<br>
Universal Credit<br>
Get Jobseeker’s Allowance<br>
Get your State Pension

**HM Revenue & Customs**<br>
Register your anti-money laundering supervision<br>
Tax-Free Childcare

**Office of the Public Guardian**<br>
Claim a power of attorney refund

**Ministry of Justice**<br>
Claim for costs of a child’s funeral

If you’ve used this pattern, get in touch to share your user research findings.

### Next steps

The team that developed this pattern only found one service, Claim power of attorney refund, that warns users their bank details will be hidden for their security.

But GoCardless says to display a user's bank details again before the user submits them.

Some users with older bank or building society accounts might have account numbers that are 9 or 10 digits long. Research is needed to confirm that these users know how to shorten their account number to fit into the field.

More research is also needed on:

- how to ask users for their bank details in the context of setting up Direct Debit payments
- whether bank details should be shown or not on a ‘Check your answers’ page and how that affects this pattern
- how to handle international bank accounts so users are only asked for information that’s needed based on the location of their bank account
- the information required to pay credit union accounts and how to ask credit union members for that information
