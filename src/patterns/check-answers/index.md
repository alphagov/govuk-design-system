---
title: Check answers
description: Let users check their answers before submitting information to a service
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 36
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Let users check their answers before submitting information to a service.

{{ example({ group: "patterns", item: "check-answers", example: "default", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

## When to use this pattern

Show a single check answers page immediately before the confirmation screen for small to medium-sized transactions.

When designing a very large transaction with multiple sections, it may help to include a check answers pages at the end of each section.

This can be valuable for services where different users might be completing each section. You should test this approach with your users to find out if it’s helpful.

Use [summary cards](/components/summary-list/#summary-cards) when users need to check multiple things of the same type. For example to review a series of interview appointments or application choices.

## How it works

Check answers pages help to:

- increase users’ confidence as they can clearly see that they have completed all the sections and that their data has been captured
- reduce error rates as users are given a second chance to notice and correct errors before submitting data

### Choose the right layout for the page

Many services ask users for short answers, which are suitable for a layout that takes up two-thirds of the screen on desktop devices. For example, the 'Check your answers before submitting your application' page included in this guidance.

Using a two-thirds layout stops lines of text getting so long that the page becomes difficult to read. To learn more about line length, see ['Layout'](/styles/layout/). It also means the action links are closer to the other content on the page. Users with screen magnifiers are less likely to miss them.

However, if your service asks users for longer or more detailed answers, a full width layout may be more suitable.

### Make the page easy to understand

Use the page title to tell the user what they need to do — otherwise, they might miss the 'submit' button at the end of the page.

On the page, you should also:

- make it clear the transaction will not be complete until a user confirms their information is correct
- break the content up into sections when you can
- only show sections that are relevant to users &ndash; for example, if they’ve said they’re from the UK, do not show sections for questions they have not answered about locations outside of the UK
- rephrase questions if you need to &ndash; for example, you do not need to label every individual line of an address, and you can rewrite long questions as shorter statements
- make sure the 'submit' button clearly shows the action it performs &ndash; for example, ‘Change your tax details’ or ‘Send your claim form’

### Let users go back and change their answers

You should provide a ‘Change’ link next to each section on your check answers page so that users can add or change the information. 'Change' links contain hidden text to make them accessible to screen reader users. Update the hidden text to describe what each 'change' link is for.

<strong class="govuk-tag govuk-tag--grey">WCAG 2.2</strong> If a user decides to go back to a previous answer, make sure information they've already entered is pre-populated.

Do not pre-populate if the information is no longer valid, or when pre-populating would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html).

The answers pages should look the same way they did when the user last used them.

When they’ve finished, the ‘Continue’ button should return them to the check answers page. They should not need to go through the rest of the transaction again.

If a user changes their response in a way that means you need to ask them more questions, do this before returning them to the check answers page.

If you have questions that are optional, let users know that they've skipped it without giving an answer by showing their response as ‘Not provided’.

## Research on this pattern

Read a blog about [how the Carer’s Allowance Service used check answers to improve its users’ experience](https://dwpdigital.blog.gov.uk/2016/07/08/a-live-service-is-not-the-end-of-the-story/).
