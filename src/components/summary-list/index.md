---
title: Summary list
description: Use the summary list to summarise information, for example, a user’s responses at the end of a form.
section: Components
aliases: Summary card
backlogIssueId: 182
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Use a summary list to summarise information, for example, a user’s responses at the end of a form.

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### WCAG 2.2 criteria might affect this component

To use ‘Summary list’ and comply with new success criteria introduced in Web Content Accessibility Guidelines (WCAG) 2.2, make sure that users can successfully:

- [interact with row actions](/components/summary-list/#wcag-interact-row-actions)
- [change information they've previously given in an answer](/components/summary-list/#wcag-change-answers)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

{{ example({ group: "components", item: "summary-list", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use a summary list to show information as a list of key facts.

You can use it to display metadata like ‘Last updated’ with a date like ‘22 June 2018’, or to summarise a user’s responses at the end of a form like the [check answers](/patterns/check-answers/) pattern.

[Summary cards](#summary-cards) are a variant within this component. You can use summary cards to show multiple summary lists that describe the same type of thing, such as people. You can also add card actions that apply to the entire summary list.

## When not to use this component

The summary list uses the description list (`<dl>`) HTML element, so only use it to present information that has a key and at least one value.

Do not use it for tabular data or a simple list of information or tasks, like a [task list](/components/task-list/). For those use a `<table>`, `<ul>` or `<ol>`.

## How it works

Each row of a summary list is made up of a:

- ‘key’ that’s a description or label of a piece of information, like “Name”
- ‘value’ which is the piece of information itself, such as “John Smith”

You can show a single or multiple summary lists on a page. If you’re showing multiple summary lists on a page, you can add structure by using headings or summary cards.

There are 2 ways to use the summary list component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "summary-list", example: "without-actions", html: true, nunjucks: true, open: false }) }}

### Adding actions to each row

You can add ‘row actions’ to a summary list. For example, you can help users go back and edit an answer by adding a ‘change’ link.

When navigating visually, the borders above and below each row help to show which row action is tied to which piece of information.

There's a few things to keep in mind to ensure that users can successfully use row actions.

<div class="app-wcag-22" id="wcag-interact-row-actions" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Make sure any 'action links' are at least 24px by 24px in size, with adequate spacing. This is to make sure users can easily interact with the links. This relates to WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">2.5.8 Target Size (minimum)</a>.</p>
</div>

<div class="app-wcag-22" id="wcag-change-answers" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>If a user decides to go back to a previous answer through a card or row action, make sure information they have already entered is pre-populated.</p>
  <p>Do not pre-populate if the information is no longer valid, or when pre-populating would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant Entry</a>.</p>
</div>

Assistive technology users, including those who use a screen reader, might hear a row action link out of context and might not know what it will do.

To give more context, add visually hidden text to the links. This means a screen reader user will hear the row action and the ‘key’ label for the information it will affect, like ‘Change name’ or ‘Change date of birth’.

{{ example({ group: "components", item: "summary-list", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

#### Showing rows with and without actions

If you’re showing a mix of rows (where some rows include actions and some do not), add the `govuk-summary-list__row--no-actions` modifier class to the rows without actions. This is to ensure the bottom border is drawn correctly in some browsers.

{{ example({ group: "components", item: "summary-list", example: "mixed-actions", html: true, nunjucks: true, open: false }) }}

### Removing the borders

The summary list includes separating borders to help users by joining the information on each row and its action together.

Think carefully before you remove row borders. Borders help many users find and read information that’s laid out in rows, especially users who zoom in on pages or use assistive technologies to magnify their screen.

If your summary list does not have any actions, you can choose to remove the separating borders with the `govuk-summary-list--no-border` class.

{{ example({ group: "components", item: "summary-list", example: "without-borders", html: true, nunjucks: true, open: false }) }}

To remove borders on a single row, use the `govuk-summary-list__row--no-border` class.

### Showing missing information

In some contexts, you might need to show rows that have missing information. This can happen when:

- a user returns to an incomplete journey
- you've added or changed the questions in a service.

Show a link to the appropriate question page in the `value` column so the user can enter the missing information, instead of showing a 'change' link on that row.

{{ example({ group: "components", item: "summary-list", example: "with-missing-information", html: true, nunjucks: true, open: false }) }}

## Summary cards

If you’re showing multiple summary lists on a page, you can show each list within a summary card. This lets you visually separate each summary list and give each a title and some actions.

Use summary cards when you need to show:

- multiple summary lists that all describe the same type of thing, such as people
- actions that will apply to all the items in a list

Summary cards are often used in case working systems to help users quickly view a set of information and related actions.

Do not use summary cards if you only need to show a small amount of related information. Use summary lists instead, and structure them with headings if needed.

If you’re showing summary cards at the end of a longer journey, you might want to familiarise the user with them earlier on – such as when the user reviews individual sections.

### Card titles

Use the summary card’s header area to give each summary list a title.

Each title must be unique and help identify what the summary list describes. For example, this could be the name of a specific person, organisation or professional qualification.

Try to keep titles short and relevant. You can use one or two important values in the summary list – such as the first and last name of a person.

{{ example({ group: "components", item: "summary-list", example: "card-with-title", html: true, nunjucks: true, open: false }) }}

### Adding card actions

You can add card actions in the header, which will be shown after the summary card's title.

For example, if you have multiple rows with "change" actions that all take the user to the same place, you can show a single “change” card action instead. This helps avoid repeating the same row action on every row.

Card actions are shown in bold text to make them visually distinct from row actions – and help alert the user that the card action will affect the entire summary card.

Write link text for card actions to tell the user what the card action will do and that it will apply to the entire summary card. It should also be as short as possible, usually 2 words.

Example card actions include:

- Remove tenant
- Edit qualification
- Update issue
- Approve application
- Cancel order

Keep it short and do not add more than 2 to 3 actions in a header.

If a card action cannot easily be undone or might have serious consequences, consider adding a warning or asking the user for confirmation.

{{ example({ group: "components", item: "summary-list", example: "card-with-actions", html: true, nunjucks: true, open: false }) }}

## Research on this component

This component was developed and tested by the Government Digital Service as part of the [check answers pattern](/patterns/check-answers/).

The Department for Education contributed the summary card. It’s being used in some of their services, such as:

- [apply for teacher training](https://www.gov.uk/apply-for-teacher-training), used by the general public
- [register trainee teachers](https://www.register-trainee-teachers.service.gov.uk/), used by people that work for training providers

The summary card is also used in services run by other departments, such us:

- manage supervisions (Ministry of Justice)
- submit social housing lettings and sales data (Department for Levelling Up, Housing & Communities)

### Next steps

We still want to learn more about when this component works well.

If you use this component in your service, we'd like to hear about how you use the summary list and summary card, as well as any research findings you might have.
