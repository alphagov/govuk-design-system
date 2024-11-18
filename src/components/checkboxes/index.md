---
title: Checkboxes
description: Let users select one or more options by using the checkboxes component
section: Components
aliases: check boxes, tickboxes, tick boxes
backlogIssueId: 37
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Let users select one or more options by using the checkboxes component.

{{ example({ group: "components", item: "checkboxes", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use the checkboxes component when you need to help users:

- select multiple options from a list
- toggle a single option on or off

## When not to use this component

Do not use the checkboxes component if users can only choose one option from a selection. In this case, use the [Radios component](/components/radios/).

## How it works

Always position checkboxes to the left of their labels. This makes them easier to find, especially for users of screen magnifiers.

Unlike with radios, users can select multiple options from a list of checkboxes. Do not assume that users will know how many options they can select based on the visual difference between radios and checkboxes alone.

If needed, add a hint explaining this, for example, 'Select all that apply'.

Do not pre-select checkbox options as this makes it more likely that users will:

- not realise they’ve missed a question
- submit the wrong answer

Order checkbox options alphabetically by default.

In some cases, it can be helpful to order them from most-to-least common options. For example, you could order options for ‘What is your nationality?’ based on population size.

Group checkboxes together in a `<fieldset>` with a `<legend>` that describes them, as shown in the examples on this page. This is usually a question, like ‘How would you like to be contacted?’.

### If you’re asking one question on the page

If you're asking just [one question per page](/patterns/question-pages/#start-by-asking-one-question-per-page) as recommended, you can set the contents of the `<legend>` as the page heading. This is good practice as it means that users of screen readers will only hear the contents once.

Read more about [why and how to set legends as headings](/get-started/labels-legends-headings/).

There are 2 ways to use the checkboxes component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "checkboxes", example: "default", html: true, nunjucks: true, open: false, size: "m", titleSuffix: "second" }) }}

### If you’re asking more than one question on the page

If you're asking more than one question on the page, do not set the contents of the `<legend>` as the page heading. Read more about [asking multiple questions on Question pages](/patterns/question-pages/#asking-multiple-questions-on-a-page).

{{ example({ group: "components", item: "checkboxes", example: "without-heading", html: true, nunjucks: true, open: false, size: "m" }) }}

### Checkbox items with hints

You can add hints to checkbox items to provide additional information about the options.

Keep each hint to a single short sentence, without any full stops. Screen readers will read out the entire text when users interact with an item. This could frustrate users if the text is long.

Do not use links in hint text. While screen readers will read out the link text when describing the item, they usually do not tell users the text is a link.

{{ example({ group: "components", item: "checkboxes", example: "hint", html: true, nunjucks: true, open: false, size: "s" }) }}

### Add an option for ‘none’

When 'none' would be a valid answer, give users the option to check a box to say none of the other options apply to them – without this option, users would have to leave all of the boxes unchecked. Giving users this option also makes sure they do not skip the question by accident.

Remember to [start by asking one question per page](/patterns/question-pages/#start-by-asking-one-question-per-page). You might be able to remove the need for a 'none' option by asking the user a better question or filtering them out with a ‘filter question’ beforehand. The GOV.UK Service Manual has guidance on [designing good questions](https://www.gov.uk/service-manual/design/designing-good-questions).

Show the ‘none’ option last. Separate it from the other options using a divider. The text is usually the word ‘or’.

Write a label that repeats the key part of the question.

For example, for the question 'Will you be travelling to any of these countries?', say 'No, I will not be travelling to any of these countries.'

To enable some JavaScript that unchecks all other checkboxes when the user clicks 'None', add the `exclusive` behaviour to the 'none' checkbox.

{{ example({ group: "components", item: "checkboxes", example: "with-none-option", html: true, nunjucks: true, open: false, size: "xl" }) }}

If JavaScript is unavailable, and a user selects both the ‘none’ checkbox and another checkbox, display an error message.

{{ example({ group: "components", item: "checkboxes", example: "with-none-option-in-error", html: true, nunjucks: true, open: false, size: "xl" }) }}

### Conditionally revealing a related question

You can ask the user a related question when they select a particular checkbox, so they only see the question when it's relevant to them.

This might make 2 related questions easier to answer by grouping them on the same page. For example, you could reveal a phone number input when the user selects the 'Contact me by phone' option.

{{ example({ group: "components", item: "checkboxes", example: "conditional-reveal", html: true, nunjucks: true, open: false, size: "xl" }) }}

Keep it simple. If the related question is complicated or has more than one part, show it on the next page in the process instead.

You should only conditionally reveal questions - do not show or hide anything that is not a question.

#### Known issues

Users are not always notified when a conditionally revealed question is shown or hidden. This fails [WCAG 2.2 success criterion 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html).

However, we found that screen reader users did not have difficulty answering a conditionally revealed question - as long as it’s kept simple. It confused our test users when we conditionally revealed complicated questions to them.

We’ll keep looking for opportunities to [learn more about how conditionally revealed questions should be used in services](https://github.com/alphagov/govuk-design-system-backlog/issues/37).

### Smaller checkboxes

Use standard-sized checkboxes in most cases. However, smaller checkboxes work well on pages where it’s helpful to make them less visually prominent.

For example, on a page of search results, the main user need is to see the results. Using smaller checkboxes lets users see and change search filters without distracting them from the main content.

{{ example({ group: "components", item: "checkboxes", example: "small", html: true, nunjucks: true, open: false, size: "m" }) }}

Small checkboxes can work well on information dense screens in services designed for repeat use, like caseworking systems.

In services like these, the risk that they will not be noticed is lower because users return to the screen multiple times.

### Error messages

Error messages should be styled like this:

{{ example({ group: "components", item: "checkboxes", example: "error", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in the [Error message component](/components/error-message/) and have specific error messages for specific error states.

#### If nothing is selected and the question has options in it

Say ‘Select if [whatever it is]’.<br>
For example, ‘Select if you are British, Irish or a citizen of a different country’.

#### If nothing is selected and the question does not have options in it

Say ‘Select [whatever it is]’.<br>
For example, ‘Select your nationality or nationalities’.

#### If users check both a 'none' checkbox and another checkbox

Say:

<div class="govuk-inset-text">Select [option label text] or select ‘[none of the above label text]’</div>

For example:

<div class="govuk-inset-text">Select countries you will be travelling to, or select ‘No, I will not be travelling to any of these countries’</div>

## Research on this component

If you’ve done any user research involving conditionally revealed questions, particularly with users of assistive technologies, [tell us what you’ve learned by adding a comment to the discussion about this component](https://github.com/alphagov/govuk-design-system-backlog/issues/37).

Read a blog post about [an update to the radios and checkboxes components in 2016](https://designnotes.blog.gov.uk/2016/11/30/weve-updated-the-radios-and-checkboxes-on-gov-uk/).
