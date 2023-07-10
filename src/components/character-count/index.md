---
title: Character count
description: Tell users how many characters or words they can enter into a textarea
section: Components
aliases: word count
backlogIssueId: 67
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Help users know how much text they can enter when there is a limit on the number of characters.

{% from "_example.njk" import example %}

{{ example({group: "components", item: "character-count", example: "default", html: true, nunjucks: true, open: false}) }}

## When to use this component

Always test your service without a character count first.

Only use the character count component when there is a good reason for limiting the number of characters users can enter. For example, if there is:

- evidence that users are likely to enter more information than they need to
- a legal or technical reason that means an entry must be no more than a certain number of characters

## When not to use this component

If your users keep hitting the character limit imposed by the backend of your service then try to increase the limit rather than use a character count.

## How it works

It tells users how many characters they have remaining as they type into a [textarea](/components/textarea/) with a character limit.

Users will get updates at a pace that works best for the way they interact with the textarea. This means:

- sighted users will see a count message that updates as they type
- screen reader users will hear the count announcement when they stop typing.

This component does not restrict the user from entering information. The user can enter more than the character limit, but are told they've entered too many characters. This lets them type or copy and paste their full answer, then edit it down.

The count message appears below the textarea so that:

- it’s clearly separate from any hint text or error message above the textarea
- if it’s below the visible screen area, users will still see it again when they scroll down to send their response

This component uses JavaScript. If JavaScript is not available, users will see a static message in place of the count message, telling them how many characters they can enter.

There are 2 ways to use the character count component. You can use HTML or, if you’re using Nunjucks or the GOV.UK Prototype Kit, you can use the Nunjucks macro.

{{ example({group: "components", item: "character-count", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second"}) }}

###  If you’re asking more than one question on the page

If you're asking more than one question on the page, do not set the contents of the `<label>` as the page heading. Read more about [asking multiple questions on question pages](/patterns/question-pages/#asking-multiple-questions-on-a-page).

{{ example({group: "components", item: "character-count", example: "without-heading", html: true, nunjucks: true, open: false}) }}

### Consider if a word count is more helpful

In some cases it may be more helpful to show a word count. For example, if your question requires a longer answer.

Do this by setting `data-maxwords` in the component markup. For example, `data-maxwords="150"` will set a word limit of 150.

{% from "_example.njk" import example %}
{{ example({group: "components", item: "character-count", example: "word-count", html: true, nunjucks: true, open: false}) }}

### Avoid narrow limits

When using a character count, try to set the limit higher than most users will need. Find out what this is by doing user research and data analysis.

If the limit is much higher than most users are likely to reach, you can choose to only display the message after a user has entered a certain amount.

To do this, set a threshold in the component markup. For example, `data-threshold="75"` will show the count message only when users have entered 75% of the limit.

Screen reader users will hear the character limit when they first interact with a textarea using the threshold option. Sighted users will not see anything until the count message is shown — though you might choose to include the character limit in the hint text.

{% from "_example.njk" import example %}
{{ example({group: "components", item: "character-count", example: "threshold", html: true, nunjucks: true, open: false}) }}

### Error messages

Error messages should be styled like this:

{% from "_example.njk" import example %}

{{ example({group: "components", item: "character-count", example: "error", html: true, nunjucks: true, open: false}) }}

If a user tries to send their response with too many characters, you must show an error message above the field as well as the count message below it.

The error message tells users what went wrong and how to fix it. The count message provides live feedback and updates as a user types.

The input shows a red border only when the user tries to enter more than the character limit. If the number of characters is within the limit, the input does not show this border even when there's been an error. We felt it might cause the user difficulty if the border disappeared once they started typing.

Make sure errors follow GOV.UK guidance on [writing error messages](/components/error-message/#be-clear-and-concise) and have specific error messages for specific error states.

#### If the input is empty

Say ‘Enter [whatever it is]’.<br>
For example, ‘Enter a summary’.

#### If the input is too long

Say ‘[whatever it is] must be [number] characters or less’.<br>
For example, ‘Summary must be 400 characters or less’.

## Research on this component

The Government Digital Service (GDS) developed and tested this component in a prototype of the ‘Apply for a temporary event notice’ service.

During this research, the component was tested with 17 users, including those with low digital skills and users with disabilities.

[Read more about this research in the Design System wiki on GitHub](https://github.com/alphagov/govuk-design-system/wiki/Character-count-testing-and-user-research).

### Known issues and gaps

In Internet Explorer 11, JAWS will ignore any set threshold and announce the character count, even if the user entered less than the threshold.

In Chrome version 99, JAWS will not announce the hint or character count of a pre-populated textarea. This is a [known issue for the developer of JAWS](https://github.com/FreedomScientific/VFO-standards-support/issues/201).

Also, this component [counts some characters as multiple characters](https://github.com/alphagov/govuk-frontend/issues/1104). For example, emojis and some non-Latin characters.

### Services using this component

The component is used in a number of services, including the following.

**Department for Education**<br>
Publish teacher training courses

**Government Digital Service**<br>
Content publisher application

### Next steps

More user research is needed to find out:

- how to decide between a character limit and a word limit
- if highlighting characters over the limit in red would be helpful for users
- how the component might work with lower as well as upper limits
- if enabling a character count on text inputs would be useful

If you’ve used this component, get in touch to share your user research findings.
