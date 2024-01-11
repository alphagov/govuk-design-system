---
title: Payment card details
description: How to ask users for their payment card details
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 80
layout: layout-pane.njk
---

{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affects this pattern

To ask users for 'Payment card details' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [interact the with month and year fields, by adding adequate spacing between them](/patterns/payment-card-details/#wcag-spacing-month-year)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

![A form entitled enter card details which asks for a card number, an expiry date, a name on the card and the card security code.](enter-card-details.jpg)

## When to use this pattern

Before using this pattern, check if [GOV.UK Pay](https://www.payments.service.gov.uk/) is suitable for your service.

If you cannot use GOV.UK Pay and need to build your own payment service, follow this pattern to collect payment card details from your users.

## How it works

### Allow different formats

Let users enter payment card numbers in whatever format is familiar to them. Allow additional spaces, hyphens and dashes.

### Help users enter valid card information

Present all fields on a single page, in the order in which they appear on a credit or debit card. This makes it easy for users to transcribe the information from their payment card.

<div class="app-wcag-22" id="wcag-spacing-month-year" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Make sure to add adequate spacing between the month and year fields. Ideally, leave at least 24px of space between the fields, either horizontally (inline) or vertically. This is to make sure users can easily interact with the fields. This relates to WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">2.5.8 Target Size (minimum)</a>.</p>
</div>

Show logos for the cards you accept as icons so users can see whether their card is supported.

Use Issuer Identification Number (IIN) lookups to validate the card number as the user enters it. Once you’ve been able to identify the user’s card type, leave only the relevant logo highlighted and grey out the others.

<div class="app-video">
  <video class="app-video__player" role="region" aria-labelledby="card-number-video-description" controls muted>
    <source src="card-number.mp4" type="video/mp4">
  </video>
  <p class="app-video__description" id="card-number-video-description">
    This video shows the card number validation in practice. It does not have any audio.
  </p>
</div>

If JavaScript is not available, display all of the logos anyway, as they still help users to understand which card types you support.

When you validate the card number, the card security code information should update according to the type of card being used. For example, if a user enters an American Express card, the hint text and icon should change to match the front of the card.

![2 different images of a card security code input, one above the other. The top image shows an input where the security code is the last 3 digits on the back of the card, with hint text and an icon showing that. The bottom image shows an input where the security code is the last 4 digits after the card number on the front, with hint text and an icon showing that.](card-security-code.jpg)

Do not use CVV or other acronyms for the card security code.

If you need to ask for a user's name elsewhere in your service, do not assume that the name on their card will be the same.

## Research on this pattern

This pattern is based on the one used in [GOV.UK Pay](https://www.payments.service.gov.uk/), which has been live since November 2016.

The GOV.UK Pay team tests this pattern quarterly as part of its user research.

### Services using this pattern

As of August 2018 the following services were using this pattern as part of GOV.UK Pay.

**Office of the Public Guardian**<br>
Lasting Power of Attorney

**Ministry of Justice**<br>
Send money to a prisoner

**Border Force**<br>
Registered Traveller: faster entry through the UK border<br>
Global Entry: apply for faster entry to the USA<br>
Electronic Visa Waiver

**Disclosure and Barring Service**<br>
Basic Disclosure<br>
Disclosure Scotland

**HM Courts and Tribunals**<br>
Probate Fees<br>
Civil Money Claims<br>
Divorce Fees

**Foreign and Commonwealth Office**<br>
Emergency Travel Documents

**Ministry of Defence**<br>
Defence Academy

**Department for Digital, Culture, Media & Sport**<br>
Government Art Collection<br>
Press Accreditation

**Department for International Trade**<br>
Overseas Market Introduction Service

**Nottingham University Hospitals NHS Trust**<br>
Private Care

**Land Registry**<br>
Local Land Charges

**Environment Agency**<br>
Waste Permitting
