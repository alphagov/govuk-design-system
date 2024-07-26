---
title: Date input
description: Use the date input component to help users enter a memorable date
section: Components
aliases:
backlogIssueId: 42
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use the date input component to help users enter a memorable date or one they can easily look up.

{{ example({ group: "components", item: "date-input", example: "default", html: true, nunjucks: true, open: false, size: "s", loading: "eager" }) }}

## When to use this component

Use the date input component when you’re asking users for a date they’ll already know, or can look up without using a calendar.

## When not to use this component

Do not use the date input component if users are unlikely to know the exact date of the event you’re asking about.

Read more about how to [ask users for dates](/patterns/dates/).

## How it works

The date input component consists of 3 fields to let users enter a day, month and year.

The 3 date fields are grouped together in a `<fieldset>` with a `<legend>` that describes them, as shown in the examples on this page. This is usually a question, like ‘What is your date of birth?’.

If you’re asking [one question per page](/patterns/question-pages/#start-by-asking-one-question-per-page), you can set the contents of the `<legend>` as the page heading. This is good practice as it means that users of screen readers will only hear the contents once.

Read more about [why and how to set legends as headings](/get-started/labels-legends-headings/).

Make sure that any example dates you use in hint text are valid for the question being asked.

There are 2 ways to use the date input component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "date-input", example: "default", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second" }) }}

Never automatically tab users between the fields of the date input because this can be confusing and may clash with normal keyboard controls.

### If you’re asking more than one question on the page

If you're asking more than one question on the page, do not set the contents of the `<legend>` as the page heading. Read more about [asking multiple questions on question pages](/patterns/question-pages/#asking-multiple-questions-on-a-page).

{{ example({ group: "components", item: "date-input", example: "without-heading", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second" }) }}

### Use the autocomplete attribute for a date of birth

Use the `autocomplete` attribute on the date input component when you're asking for a date of birth. This lets browsers autofill the information on a user's behalf if they’ve entered it previously.

To do this, set the `autocomplete` attribute on the 3 fields to `bday-day`, `bday-month` and `bday-year`. See how to do this in the HTML and Nunjucks tabs in the following example.

{{ example({ group: "components", item: "date-input", example: "date-of-birth", html: true, nunjucks: true, open: true, size: "s", id: "default-2" }) }}

If you are working in production you’ll need to do this to meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html).

You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

### Error messages

If you’re highlighting the whole date, style all the fields like this:

{{ example({ group: "components", item: "date-input", example: "error", html: true, nunjucks: true, open: false, size: "m" }) }}

If you’re highlighting just one field - either the day, month or year - only style the field that has an error. The error message must say which field has an error, like this:

{{ example({ group: "components", item: "date-input", example: "error-single", html: true, nunjucks: true, open: false, size: "m" }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

If there’s more than one error, show the highest priority error message. In order of priority, show error messages about:

- missing or incomplete information
- information that cannot be correct (for example, the number ‘13’ in the month field)
- information that fails validation for another reason

#### If nothing is entered

Highlight the date input as a whole.<br>

Say ‘Enter [whatever it is]’. For example, ‘Enter your date of birth’.

#### If the date is incomplete

Highlight the day, month or year field where the information is missing or incomplete. If more than one field is missing information, highlight the fields the user needs to fill in.<br>

Say ‘[whatever it is] must include a [whatever is missing]’.<br>

For example, ‘Date of birth must include a month’, ‘Date of birth must include a day and month’ or ‘Year must include 4 numbers’.

Consider that a user might intentionally leave part of the date blank because they do not know the exact day, or they remember the day and month but not the year. Could you provide more help to these users?

#### If the day, month or year cannot be correct

Accept all unambiguous inputs.

For day, accept:
- the numbers 1 to 31
- single digits with a leading zero, 01 to 09
- ordinals, 1st, 2nd, ... 31st
- ordinals written, first, second, ... thirty-first

For month, accept:
- the numbers 1 to 12
- single digits with a leading zero, 01 to 09
- English long month names, January, February ... December
- English short month names, Jan, Feb, ... Dec

For day ordinals, and month names, accept any case. For example, 'jan', 'JAN', 'Jan'.

For year, accept any 4 digits.

If day cannot be correct but month and year can, say: ‘Day must be a number between 1 and 31’
If month cannot be correct, by day and year can, say: ‘Month must be a number between 1 and 12’
If year cannot be correct, but day and month can, say: ‘Year must include 4 numbers’

If more than one of day, month and year cannot be correct, then combine the error messages. For example, if day and month cannot be correct, but year can say: ‘Day must be a number between 1 and 31. Month must be a number between 1 and 12.’

If day, month and year all cannot be correct, say: ‘Day must be a number between 1 and 31. Month must be a number between 1 and 12. Year must include 4 numbers.’

Highlight the day, month or year fields with the information that cannot be correct.

#### If the date as a whole does not exist

If the month is April, June, September, November, then check the day is between 1 and 30. If not, say ‘Day must be a number between 1 and 30 for [month]’. Highlight the day and month.

If the month is February and the year is a leap year, then check the day is between 1 and 29. If not, say ‘Day must be a number between 1 and 29 for February [year]’.  Highlight the date input as a whole.

If the month is February and the year is not a leap year, then check the day is between 1 and 28. If not, say ‘Day must be a number between 1 and 28 for February [year]’.  Highlight the date input as a whole.

#### If the date is in the future when it needs to be in the past

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be in the past’. For example, ‘Date of birth must be in the past’.

#### If the date is in the future when it needs to be today or in the past

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be today or in the past’. For example, ‘Date of birth must be today or in the past’.

#### If the date is in the past when it needs to be in the future

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be in the future’. For example, ‘The date your course ends must be in the future’.

#### If the date is in the past when it needs to be today or in the future

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be today or in the future’. For example, ‘The date your course ends must be today or in the future’.

#### If the date must be the same as or after another date

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be the same as or after [date and optional description]’. For example, ‘The date your course ends must be the same as or after 1 September 2017 when you started the course’.

Consider that the other date, in this example 1 September 2017, might be wrong instead. If this is possible, provide help to users to change this date too.

#### If the date must be after another date

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be after [date and optional description]’. For example, ‘The day your course ends must be after 1 September 2017’.

Consider that the other date, in this example 1 September 2017, might be wrong instead. If this is possible, provide help to users to change this date too.

#### If the date must be the same as or before another date

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be the same as or before [date and optional description]’. For example, ‘The date of Gordon’s last exam must be the same as or before 31 August 2017 when they left school’.

Consider that the other date, in this example 31 August 2017, might be wrong instead. If this is possible, provide help to users to change this date too.

#### If the date must be before another date

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be before [date and optional description]’. For example, ‘The date of Gordon’s last exam must be the same as or before 31 August 2017’.

Consider that the other date, in this example 31 August 2017, might be wrong instead. If this is possible, provide help to users to change this date too.

#### If the date must be between two dates

Highlight the date input as a whole.<br>

Say ‘[whatever it is] must be between [date] and [date and optional description]’. For example, ‘The date your contract started must be between 1 September 2017 and 30 September 2017 when you were self-employed’.

Consider that these dates, in this example 1 September 2017 and 30 September 2017, might be wrong instead. If this is possible, provide help to users to change these dates too.

## Research on this component

[Findings from the Apply for teacher training service](https://github.com/alphagov/govuk-design-system-backlog/issues/42#issuecomment-1119724868) showed that hundreds of users were inputting months using full or abbreviated month names and getting an error. They changed the component to accept month names to be consistent with this observed behaviour. Since changing the service the number of errors has dropped dramatically.

Some users with dyscalculia may struggle to convert month names into numbers, but accepting full or abbreviated month names may help these users.
