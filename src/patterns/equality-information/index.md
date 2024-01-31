---
title: Equality information
description: This pattern explains how to ask users for equality information
section: Patterns
theme: Ask users for…
aliases: protected characteristics, ethnic group, diversity, demographic, age, disability, marriage, civil partnership, religion, sex, gender identity, sexual orientation
backlogIssueId: 180
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Public sector organisations have a duty to consider the need to avoid discrimination and advance equality of opportunity as part of what they do. This is part of what’s called the [public sector equality duty](https://www.gov.uk/guidance/equality-act-2010-guidance#public-sector-equality-duty).

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affects this pattern

To ask users for 'Equality information' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [update their equality information without re-entering existing information](/patterns/equality-information/#wcag-do-not-ask-reentry-equality-info)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/wcag-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

Public sector bodies often collect equality information about service users to help them meet this duty.

## When to use this pattern

These patterns are based on the [harmonised standards developed by the Government Statistical Service](https://analysisfunction.civilservice.gov.uk/government-statistical-service-and-statistician-group/gss-support/gss-harmonisation-support/harmonised-standards-and-guidance/).

Collecting equality information in a consistent way across the public sector makes the data more useful. For example, an organisation can benchmark its own services against other public sector services or the population in general. And it can adjust its approach if it finds a particular group is under-represented.

Do not use this pattern to collect information for operational reasons - especially if you’re legally required to ask for the information in a particular way. For example, you’re [asking about the user’s gender or sex](/patterns/gender-or-sex/) to work out how much State Pension they’re entitled to.

## How it works

When asking users for equality information, make it clear:

- that the questions are different from other questions in the service
- why you’re asking the questions, and what you’ll do with the information
- that the questions are optional

### Where to place equality questions

For a service that people are likely to use on a one-off basis:

- place equality questions between the [‘check your answers’ page][pattern_check_answers] and the [confirmation page](/patterns/confirmation-pages/)
- show the user a screen explaining why you’re asking the questions and what you’ll do with the information they provide, like the one below

{{ example({ group: "patterns", item: "equality-information", example: "explainer-screen", html: true, nunjucks: true, open: false, loading: "eager" }) }}

#### Longer term services

With a service that you expect users to return to multiple times, you’ll need to decide where to place the equality questions. For example, with an account-type service with tasks that need to be completed at different times, you might choose to make answering the equality questions an optional task.

You’ll also need to give users the option to update their equality information in case anything changes.

### Updating equality information

Some categories of equality information can change over time, including changes to:

- marriage or partnership status
- disability
- religion
- sexual orientation
- gender identity

When possible, offer users the option to update their equality information. Users should be able to update their equality information through an online account, a change request form, or other contact methods. Integrating the option to update equality information directly into your service or user account system is often the most usable and efficient method.

Updating equality information is especially relevant for longer term services and services that use the same equality information multiple times.

<div class="app-wcag-22" id="wcag-do-not-ask-reentry-equality-info" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>When users are updating equality information, only ask them to enter the information that has changed. Do not ask them to re-enter all existing equality information. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant Entry</a>.</p>
</div>

## Get specialist privacy or data protection advice

Some or all of the equality information you collect is likely to be what’s called ‘[special category personal data](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/special-category-data/what-is-special-category-data/)’, meaning it has special legal protections.

So before you start collecting equality information, it’s important to get advice and approval from your organisation’s privacy or data protection expert on how to collect and process the information.

You’ll also need to update [the service’s privacy notice](https://www.gov.uk/service-manual/design/collecting-personal-information-from-users).

## What information to collect

Public sector organisations will have someone who is responsible for making sure the organisation is meeting its obligations under the public sector equality duty. They can help you work out what equality information to collect.

This pattern covers:

- age
- disability
- ethnic group
- marital or partnership status
- religion
- sex and gender identity
- sexual orientation

### Collecting more detailed information

Start with the harmonised standards, keeping the categories of responses in the same order. Break them down into subcategories if necessary. For example if your service is aimed at a disabled people in particular, you may want to collect more detailed information about their disability. But make sure any categories you use map back to a ‘parent’ category in the harmonised standard.

### Collecting other types of equality information

See the [full list of Government Statistical Service harmonised standards](https://analysisfunction.civilservice.gov.uk/government-statistical-service-and-statistician-group/gss-support/gss-harmonisation-support/harmonised-standards-and-guidance/) if you want to collect other types of equality information. For example, about income or employment status.

### Asking about date of birth (age)

Use this approach to ask for the user’s date of birth.

{{ example({ group: "patterns", item: "equality-information", example: "date-of-birth", html: true, nunjucks: true, open: false }) }}

### Asking about disability

Use this approach to ask about disability.

{{ example({ group: "patterns", item: "equality-information", example: "disability", html: true, nunjucks: true, open: false }) }}

If the user answers ‘yes’, ask about the impact of their condition or illness.

{{ example({ group: "patterns", item: "equality-information", example: "disability-impact", html: true, nunjucks: true, open: false }) }}

### Asking about ethnic group

The ethnic groups used here are for England. The Government Statistical Service harmonised standard for ethnicity uses [different categories for Wales, Scotland and Northern Ireland](https://gss.civilservice.gov.uk/policy-store/ethnicity/). This is to reflect differences in local populations.

If your service covers more than one of England, Wales, Scotland or Northern Ireland, you should accommodate these differences in your design. For example, by changing the ethnic groups shown depending on where the user is based. Where this is not possible, use the English categories.

First ask about the user’s broad ethnic group.

{{ example({ group: "patterns", item: "equality-information", example: "ethnic-group", html: true, nunjucks: true, open: false }) }}

Then ask for a more detailed category, depending on which broad ethnic group the user selects. Always give the user the option to enter their own description of their background.

{{ example({ group: "patterns", item: "equality-information", example: "white", html: true, nunjucks: true, open: false }) }}
{{ example({ group: "patterns", item: "equality-information", example: "multiple", html: true, nunjucks: true, open: false }) }}
{{ example({ group: "patterns", item: "equality-information", example: "asian", html: true, nunjucks: true, open: false }) }}
{{ example({ group: "patterns", item: "equality-information", example: "black", html: true, nunjucks: true, open: false }) }}
{{ example({ group: "patterns", item: "equality-information", example: "other", html: true, nunjucks: true, open: false }) }}

### Asking about marriage or civil partnership status

Use this approach to ask about marriage or civil partnership status.

{{ example({ group: "patterns", item: "equality-information", example: "marriage-status", html: true, nunjucks: true, open: false }) }}

### Asking about religion

The categories used here are for England. The Government Statistical Service harmonised standard for religion uses [different categories for Wales, Scotland and Northern Ireland](https://gss.civilservice.gov.uk/policy-store/religion/). This is to reflect differences in local populations.

If your service covers more than one of England, Wales, Scotland or Northern Ireland, you should accommodate these differences in your design. For example, by changing the categories shown depending on where the user is based. Where this is not possible, use the English categories.

{{ example({ group: "patterns", item: "equality-information", example: "religion", html: true, nunjucks: true, open: false }) }}

### Asking about sex and gender identity

Use this approach to ask about sex and gender identity.

{{ example({ group: "patterns", item: "equality-information", example: "sex-gender", html: true, nunjucks: true, open: false }) }}

### Asking about sexual orientation

Use this approach to ask about sexual orientation.

{{ example({ group: "patterns", item: "equality-information", example: "sexual-orientation", html: true, nunjucks: true, open: false }) }}

### Validation and error messages

If a user enters information that’s valid but incomplete, accept it. For example, they might just enter their year of birth without the day or month.

Error messages should be styled like this -

{{ example({ group: "patterns", item: "equality-information", example: "error-ethnicity", html: true, nunjucks: true, open: false }) }}

{{ example({ group: "patterns", item: "equality-information", example: "error-date-of-birth", html: true, nunjucks: true, open: false }) }}

## Research on this pattern

The two-step approach to asking for ethnicity information is based on:

- user research by the [Race Disparity Unit](https://www.gov.uk/government/organisations/race-disparity-unit)
- [examples of ways to ask about ethnic groups](https://designnotes.blog.gov.uk/2019/01/29/researching-how-we-ask-users-about-their-ethnicity/) from a number of different government services

### Questions we’d like to answer through research

For one-off services, we’ve suggested placing the equality and diversity questions between the ‘check your answers’ and confirmation pages.

This is based on where the ‘Do you want to create an account?’ question is placed in the ‘Get support if you’re clinically extremely vulnerable to coronavirus’ service - but we’d like to confirm whether this placement works for the equality questions too.

We’d also appreciate any the following questions:

- do users understand from the first ‘Equality questions’ screen that the questions they’re about to answer are different from other questions in the service?
- do we need to explain why we’re asking each question individually, or is it enough to have an explanation at the start?
- what’s the best way to ask for equality information in different types of service where you expect to have more than one contact with the user?
- is including the ‘If you prefer not to say, continue without entering any information’ text the clearest way to get across that all the text inputs on that screen are optional?
