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

{{ example({ group: "patterns", item: "interruption-pages", example: "default", html: true, nunjucks: true, open: false, size: "l", loading: "eager" }) }}

## When to use this pattern

Think carefully before you choose to use an Interruption page, as doing this might get in the way of the user completing their task.

Use Interruption pages to warn the user before they:

- do something unusual that’s probably a mistake
- do something that cannot be undone (asking the user “Are you sure?”)
- give an answer that conflicts with existing information

You can also use Interruption pages:

- instead of Confirmation pages to show a more varied journey outcomes (that are different to a straightforward success, rejection or completion)
- to show the user important information ahead of a task

## When not to use this pattern

Only use Interruption pages if you’re confident that:

1. There’s evidence of a clear need to interrupt the user journey.
2. This is the only way to give the user information and that they’d otherwise miss it.

Read guidance in the Service Manual, particularly to [Map and understand a user's whole problem](https://www.gov.uk/service-manual/design/map-a-users-whole-problem), to find ways to improve the user journey and the organisational processes behind them.

## How it works

Interruption pages pause the user journey to show important information.

On the page, the important information is shown within an Interruption panel, to help ensure the user does not miss it.

The panel includes a ‘continue’ button that the user must interact with to resume their journey. Information within the panel is usually shown as heading with some description text, possibly with bullet points and numbered steps.

Keep information within the panel short. Do not place any other components or form elements inside the panel.

## Research on this pattern

This pattern was originally contributed by the NHS Design System. We thank the team for working with us to publish the [Interruption panel variant of the Panel component](/components/panel/) and this pattern.

Guidance in this pattern is based on:

- [Interruption page on NHS Design System](https://service-manual.nhs.uk/design-system/patterns/interruption-page)
- [Interruption card on Ministry of Justice (MOJ) Design System](https://design-patterns.service.justice.gov.uk/components/interruption-card/)

### Other uses of Interruption pages

We’ve seen that many services in government use Interruption pages to show other types of important information that might otherwise get missed.

See our [‘Interruption card’ discussion on GitHub](https://github.com/alphagov/govuk-design-system-backlog/issues/27) to see these examples.

### Next steps

We’d like to get more feedback from service teams to help us improve this pattern.

We'd particularly like to better understand the ways services use Interruption pages, so that we can provide better guidance on ‘When to use this pattern’ and ‘When not to use this pattern’ to ensure they're used effectively and consistently across government.
