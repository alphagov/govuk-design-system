---
title: Recover from validation errors
description: Check the answers users give to make sure they’re valid - and if there’s an error, tell them what's wrong and how to fix it
section: Patterns
theme: Help users to…
aliases:
layout: layout-pane.njk
---

Check the information the user gives you to make sure it’s valid. If there's a validation error, tell the user what's gone wrong and how to fix it. Turn off HTML5 validation.

## When to use this pattern

Use validation to identify when the user tried to provide information that you're not able to use. Then show the user an error message that helps them to fix the problem.

But minimise your chances of needing to show an error message in the first place by:

- [making sure your questions are well designed](https://www.gov.uk/service-manual/design/designing-good-questions)
- accepting information in different formats, as long as it’s not ambiguous (for example, accept postcodes with or without spaces - and names that include a non-alphabetical character or an apostrophe, accent or other diacritic)

## When not to use this pattern

Do not use validation to check whether the user is eligible to use the service or has permission to do something. Instead, take them to a page which tells them they’re not eligible and gives them useful information about what to do next.

There are separate patterns for:

- [‘there is a problem with the service’ pages](/patterns/problem-with-the-service-pages/)
- [‘page not found’ pages](/patterns/page-not-found-pages/)
- [‘service unavailable’ pages](/patterns/service-unavailable-pages/)

## How it works

Validation should refuse to accept:

- information that cannot be correct
- information that’s too ambiguous for you to use
- missing information, if the information is required

For example, if you’re asking for someone’s date of birth you should not accept ‘13’ in the month field.

Use validation to ignore unwanted characters, unless it would make the information too unclear for you to use. For example, any spaces, invisible characters or punctuation, like hyphens, brackets, dashes and full stops.

If these characters caused a validation error, it would be difficult for the user to see and fix — especially if added by accident.

You should ignore unwanted characters entered:

- as part of numbers and codes, such as postcodes or card details
- before or after an answer, as users might have copied and pasted them in by accident
- by dictation software — this is particularly common when dictating numbers

### How to tell the user about validation errors

If the user's answers fail validation:

- show them the page again, with the form fields as the user filled them in
- add ‘Error: ’ to the beginning of the page `<title>` so screen readers read it out as soon as possible
- show an [error summary](/components/error-summary/) at the top of the page, and move keyboard focus to it
- show [error messages](/components/error-message/) next to fields with errors

Read guidance on [writing good error messages](/components/error-message/#be-clear-and-concise).

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> Do not clear any form fields when validating users’ answers. Keep both passing and failing answers. This is to comply with WCAG 2.2 success criterion [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html).

Keeping information that failed validation helps users to:

- see what went wrong
- edit their previous answer
- avoid re-entering information

### When to tell the user about validation errors

Do not validate when the user moves away from a field. Wait until they try to move to the next part of the service - usually by clicking the ‘continue’ or ‘submit’ button at the bottom of the page.

Generally speaking, avoid validating the information in a field before the user has finished entering it. This sort of validation can cause problems - especially for users who type more slowly.

Only add this sort of validation if your user research shows that, on balance, it solves more problems for users than it causes. For example, the [character count component](/components/character-count/) shows users an error message when they go over the character limit. Because it’s important that users do not spend time and effort writing out a response that turns out to be too long.

If you do use this sort of validation, [make sure you do it in a way that’s accessible](https://www.gov.uk/service-manual/technology/accessibility-for-developers-an-introduction).

## Client side and server side validation

There are 2 ways to carry out validation:

- server side validation
- client side validation (in the browser, using either JavaScript or HTML)

You’ll always need to carry out server side validation, even if you use client side validation. This is because there’s no guarantee that client side validation will work in all circumstances. For example, the user can bypass client side validation, or [JavaScript can fail to load](https://www.gov.uk/service-manual/technology/using-progressive-enhancement).

Only add client side validation if you find a user need for it. For example, because research shows it helps the user if you validate the information they're providing as they type.

Before you add client side validation, consider that:

- it's hard to tell the user about errors in a way that works reliably across different browsers and assistive technologies
- carrying out both kinds of validation means you have to check their rules do not conflict

## Turn off HTML5 validation

HTML5 validation is a type of client side validation built into browsers. Do not use it because:

- the visual style, placement and content of HTML5 error messages cannot be made consistent with the GOV.UK Design System
- we know that the GOV.UK Design System error message and error summary components are accessible

To turn off HTML5 validation, add ‘[novalidate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate)’ to your form tags.

Do not add ‘required’ to your input fields.

## Research on this pattern

This approach to validation has been used on a number of services over an extended period of time. For example, [Renew or replace your adult passport](https://www.gov.uk/renew-adult-passport/renew).

But we'd like to expand the guidance, and we're especially interested in hearing from teams whose research has identified a need to use client side validation.

We'd also like to know about any research into whether not adding ‘required‘ to form fields causes problems for screen reader users.
