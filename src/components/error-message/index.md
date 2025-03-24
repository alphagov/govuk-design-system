---
title: Error message
description: When there's a validation error, use an error message to explain what went wrong and how to fix it
section: Components
aliases: validation message
backlogIssueId: 47
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

Follow the [Validation pattern](/patterns/validation/) and show an error message when there is a validation error. In the error message explain what went wrong and how to fix it.

{{ example({ group: "components", item: "error-message", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Show an error message next to the field and in the [Error summary component](/components/error-summary/) when there is a validation error.

Use standard messages for different components.

## When not to use this component

Do not use error messages to tell a user that they are not eligible or do not have permission to do something. Or to tell them about a lack of capacity or other problem the user cannot fix - because the problem is with the service rather than with the information the user has provided.

Instead, take the user to a page that explains the problem (for example, telling them why they’re not eligible) and provides useful information about what to do next.

There are separate patterns for:

- ['There is a problem with the service' pages](/patterns/problem-with-the-service-pages/)
- ['Page not found' pages](/patterns/page-not-found-pages/)
- ['Service unavailable' pages](/patterns/service-unavailable-pages/)

## How it works

For each error:

- put the message in red after the question text and hint text
- use a red border to visually connect the message and the question it belongs to
- if the error relates to a specific field within the question, give it a red border and refer to that field in the error message - for example: "you must enter a year"

Keeping information that caused errors helps users to:

- see what went wrong
- edit their previous answer
- avoid re-entering information

To help screen reader users, the error message component includes a hidden 'Error:' before the error message. These users will hear, for example, "Error: The date your passport was issued must be in the past".

If your error message is written in another language, you can change the prefix as needed, as shown in this example.

{{ example({ group: "components", item: "error-message", example: "custom-prefix", html: true, nunjucks: true, open: true, displayExample: false, size: "s" }) }}

Summarise all errors at the top of the page the user is on using an [Error summary component](/components/error-summary/).

There are 2 ways to use the error message component. You can use HTML or, if you are using Nunjucks or the GOV.UK Prototype Kit, you can use the Nunjucks macro.

### Legend

{{ example({ group: "components", item: "error-message", example: "legend", html: true, nunjucks: true, open: false, size: "m" }) }}

### Label

{{ example({ group: "components", item: "error-message", example: "label", html: true, nunjucks: true, open: false, size: "s" }) }}

### Match up error messages to labels

Error messages should directly include language from the question or fieldset label. This helps match up the error message with the relevant form field.

Here are some examples of label and error message pairs.

Example 1:

- Label: ‘How many hours do you work a week?’
- Error message: ‘Enter how many hours you work a week’

Example 2:

- Label: ‘Address line 1’
- Error message: ‘Enter address line 1, typically the building and street’

### Be clear and concise

Describe what has happened and tell them how to fix it. The message must be in plain English, use positive language and get to the point.

Do not use:

- technical jargon like ‘form post error’, ‘unspecified error’ and ‘error 0x0000000643’
- words like ‘forbidden’, ‘illegal’, ‘you forgot’ and ‘prohibited’
- ‘please’ because it implies a choice
- ‘sorry’ because it does not help fix the problem
- ‘valid’ and ‘invalid’ because they do not add anything to the message
- humourous, informal language like ‘oops’

Do not give an example in the error message if there is an example on the screen. For example, if you are asking for a National Insurance number and include ‘QQ 12 34 56 C’ as hint text, do not include an example in the error message.

Above all, aim for clarity.

Read the message out loud to see if it sounds like something you would say.

### Be consistent

Use the same message next to the field and in the [Error summary component](/components/error-summary/) so they:

- look, sound and mean the same
- make sense out of context
- reduce the cognitive effort needed to understand what has happened

### Be specific

General errors are not helpful to everyone. They do not make sense out of context. Avoid messages like:

- ‘An error occurred’
- ‘Answer the question’
- ‘Select an option’
- ‘Fill in the field’
- ‘This field is required’

Different errors need different messages. For example, text fields may be:

- empty
- too long
- too short
- using characters that are not allowed
- in the wrong format

An error for a specific situation is more helpful. It will tell someone what has happened and how to fix it.

### Use instructions and descriptions

Some errors work better as instructions and some work better as descriptions. For example:

- ‘Enter your first name’ is clearer, more direct and natural than ‘First name must have an entry’
- ‘Enter a first name that is 35 characters or less’ is wordier, less direct and natural than ‘First name must be 35 characters or less’
- ‘Enter a date after 31 August 2017 for when you started the course’ is wordier, less direct and natural than ‘Date you started the course must be after 31 August 2017’

Use both instructions and descriptions, but use them consistently. For example, use an instruction for empty fields like ‘Enter your name’, but a description like ‘Name must be 35 characters or less’ for entries that are too long.

### Use error message templates

Use template messages for common errors on:

- [Addresses pattern](/patterns/addresses/#error-messages)
- [Character count component](/components/character-count/#error-messages)
- [Checkboxes component](/components/checkboxes/#error-messages)
- [Date input component](/components/date-input/#error-messages)
- [Email address pattern](/patterns/email-addresses/#error-messages)
- [File upload component](/components/file-upload/#error-messages)
- [Names pattern](/patterns/names/#error-messages)
- [National Insurance numbers pattern](/patterns/national-insurance-numbers/#error-messages)
- [Radios component](/components/radios/#error-messages)
- [Phone numbers pattern](/patterns/phone-numbers/#error-messages)
- [Text input component](/components/text-input/#error-messages)
- [Textarea component](/components/textarea/#error-messages)

### Track errors

Find out how often people see them. This will let you:

- improve content
- A/B test variations
- redesign a journey

## Research on this component

Error messages designed using this guidance have been tested with all types of users in live services, including tax credits.

Research showed users:

- understood what went wrong
- knew how to fix the problem
- were able to recover from the error

If you’ve used this component, get in touch to share your user research findings.

## Accessibility

Do not clear any form fields when showing the Error message component. This is to comply with [WCAG 2.2 success criterion 3.3.7 Redundant entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html).
