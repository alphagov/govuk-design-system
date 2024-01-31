---
title: Radios
description: Let users select a single option from a list using the radios component
section: Components
aliases: radio buttons, option buttons
backlogIssueId: 59
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({ group: "components", item: "radios", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use the radios component when users can only select one option from a list.

## When not to use this component

Do not use the radios component if users might need to select more than one option. In this case, you should use the [checkboxes][component_checkbox] component instead.

## How it works

Always position radios to the left of their labels. This makes them easier to find, especially for users of screen magnifiers.

Unlike with checkboxes, users can only select one option from a list of radios. Do not assume that users will know how many options they can select based on the visual difference between radios and checkboxes alone.

If needed, add a hint explaining this, for example, 'Select one option'.

Do not pre-select radio options as this makes it more likely that users will:

- not realise they've missed a question
- submit the wrong answer

Users cannot go back to having no option selected once they have selected one, without refreshing their browser window. Therefore, you should include 'None of the above' or 'I do not know' if they are valid options.

Order radio options alphabetically by default.

In some cases, it can be helpful to order them from most-to-least common options. For example, you could order options for 'Where do you live?' based on population size.

However you should do this with extreme caution as it can reinforce bias in your service. If in doubt, order alphabetically.

Group radios together in a `<fieldset>` with a `<legend>` that describes them, as shown in the examples on this page. This is usually a question, like ‘Where do you live?’.

### If you’re asking one question on the page

If you are asking just [one question per page](/patterns/question-pages/#start-by-asking-one-question-per-page) as recommended, you can set the contents of the `<legend>` as the page heading. This is good practice as it means that users of screen readers will only hear the contents once.

Read more about [why and how to set legends as headings](/get-started/labels-legends-headings/).

There are 2 ways to use the radios component. You can use HTML or, if you are using [Nunjucks][lib_nunjucks] or the [GOV.UK Prototype Kit][govuk_prototype_kit], you can use the Nunjucks macro.

{{ example({ group: "components", item: "radios", example: "default", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second" }) }}

### If you’re asking more than one question on the page

If you're asking more than one question on the page, do not set the contents of the `<legend>` as the page heading. Read more about [asking multiple questions on question pages](/patterns/question-pages/#asking-multiple-questions-on-a-page).

{{ example({ group: "components", item: "radios", example: "without-heading", html: true, nunjucks: true, open: false, size: "s" }) }}

### Inline radios

In some cases, you can choose to display radios 'inline' beside one another (horizontally).

Only use inline radios when:

- the question only has two options
- both options are short

Remember that on small screens such as mobile devices, the radios will still be 'stacked' on top of one another (vertically).

{{ example({ group: "components", item: "radios", example: "inline", html: true, nunjucks: true, open: false, size: "s" }) }}

### Radio items with hints

You can add hints to radio items to provide additional information about the options.

{{ example({ group: "components", item: "radios", example: "hint", html: true, nunjucks: true, open: false, size: "s" }) }}

### Radio items with a text divider

If one or more of your radio options is different from the others, it can help users if you separate them using a text divider. The text is usually the word ‘or’.

{{ example({ group: "components", item: "radios", example: "divider", html: true, nunjucks: true, open: false, size: "s" }) }}

### Conditionally revealing a related question

You can ask the user a related question when they select a particular radio option, so they only see the question when it's relevant to them.

This might make two related questions easier to answer by grouping them on the same page. For example, you could reveal a phone number input when the user selects the 'Contact me by phone' option.

{{ example({ group: "components", item: "radios", example: "conditional-reveal", html: true, nunjucks: true, open: false, size: "xl" }) }}

Keep it simple. If the related question is complicated or has more than one part, show it on the next page in the process instead.

Do not conditionally reveal questions to inline radios, such as ‘yes’ and ‘no’ options placed next to each other.

Conditionally reveal questions only - do not show or hide anything that is not a question.

#### Known issues

Users are not always notified when a conditionally revealed question is shown or hidden. This fails [WCAG 2.1 success criterion 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html).

However, we found that screen reader users did not have difficulty answering a conditionally revealed question - as long it’s kept simple. Users we tested with did get confused when complicated questions were conditionally revealed to them, particularly questions with more than one part.

We’ll keep looking for opportunities to [learn more about how conditionally revealed questions be used in services](https://github.com/alphagov/govuk-design-system-backlog/issues/59).

### Smaller radios

Use standard-sized radios in nearly all cases. However, smaller versions work well on pages where it’s helpful to make them less visually prominent.

For example, on a page of search results, the primary user need is to see the results. Using smaller radios lets users see and change search filters without distracting them from the main content.

{{ example({ group: "components", item: "radios", example: "small", html: true, nunjucks: true, open: false, size: "m" }) }}

Small radios can work well on information dense screens in services designed for repeat use, like caseworking systems.

In services like these, the risk that they will not be noticed is lower because users return to the screen multiple times.

### Error messages

Display an error message if the user has not:

- selected any radios
- answered a conditionally revealed question

Error messages should be styled like this:

{{ example({ group: "components", item: "radios", example: "error", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

#### If it’s a ‘yes’ or ‘no’ question

Say ‘Select yes if [whatever it is is true]’. For example, ‘Select yes if Sarah normally lives with you’.

#### If there are two options which are not ‘yes’ and ‘no’

Say ‘Select if [whatever it is]’. For example, ‘Select if you are employed or self-employed’.

#### If there are more than two options

Say ‘Select [whatever it is]’. For example, ‘Select the day of the week you pay your rent’.

#### If it's a conditionally revealed question

Include an [error message](/components/error-message/) that is clearly related to the initial question.

{{ example({ group: "components", item: "radios", example: "conditional-reveal-error", html: true, nunjucks: true, open: false, size: "s" }) }}

## Research on this component

If you’ve done any user research involving conditionally revealed questions, particularly with users of assistive technologies, [tell us what you’ve learned by adding a comment to the discussion about this component](https://github.com/alphagov/govuk-design-system-backlog/issues/59).

Read a blog post about [an update to the radios and checkboxes components in 2016](https://designnotes.blog.gov.uk/2016/11/30/weve-updated-the-radios-and-checkboxes-on-gov-uk/).
