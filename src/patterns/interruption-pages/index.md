---
title: Interruption pages
description: Pause the user journey to give them important information
section: Patterns
theme: Pages
aliases: 
backlogIssueId: 27
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use Interruption pages to pause the user’s journey to give them important information that they’d miss if shown any other way.

The NHS Design System and Ministry of Justice (MOJ) Design System both include interruption pages or cards. The guidance on this page is based on their work.

See [Interruption page on NHS Design System](https://service-manual.nhs.uk/design-system/patterns/interruption-page) and [Interruption card on MOJ Design System](https://design-patterns.service.justice.gov.uk/components/interruption-card/)

## When to use this pattern

Think carefully before you choose to use an Interruption page, doing this might get in the way of the user completing their task.

Both of the NHS Design System and MOJ Design System provide use cases for using Interruption pages to:

- warn the user when they’re doing something unusual that's likely to be a mistake
- confirm something that cannot be undone (asking the user if they’re sure about doing something)

The MOJ Design System also provide use cases to:

- warn the user when their answer conflicts with existing information the service knows about
- end a journey when a confirmation page is not appropriate
- show important information ahead of a task

We’ve also seen that many services in government use Interruption pages to show other types of important information that might otherwise get missed. See our [‘Interruption card’ discussion on GitHub](https://github.com/alphagov/govuk-design-system-backlog/issues/27) to see these examples.

## When not to use this pattern

Do not use Interruption pages unless you’re confident that both:

- there's evidence of a clear need to interrupt the user journey
- this is the only way to give the user information that they’d otherwise miss

Read guidance in the Service Manual, particularly to [Map and understand a user's whole problem](https://www.gov.uk/service-manual/design/map-a-users-whole-problem), to find ways to improve the user journey and the organisational processes behind them.

## How it works

Interruption pages pause the user journey to show important information that they might otherwise miss.

On the page, the important information is shown within an Interruption panel, to help ensure the user does not miss it.

The panel includes a ‘continue’ button that the user must interact with to resume their journey. Information within the panel is usually shown as heading with some description text, possibly a bullet or numbered list.

To ensure the interruption is useful, keep information within the panel short. Do not place any other components or form elements inside the panel.

## Research on this pattern

We’d like to get more feedback from service teams to help us improve this pattern.

We'd particularly like to better understand the ways services use Interruption pages, so that we can provide better guidance to ensure they're used effectively and consistently across government.
