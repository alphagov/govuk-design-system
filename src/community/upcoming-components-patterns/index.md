---
title: Upcoming components and patterns
description: Anyone can propose, develop or contribute to new patterns and components, or improvements to existing ones.
section: Community
aliases: maps, autocomplete, choosing a date, navigation
theme: How we work
layout: layout-pane.njk
order: 3
---

{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}

These are the components and patterns we’re working on right now, and the ones we plan to work on next.

We regularly ask our community to help us decide the things we need to work on the most. [Read a blog post about how we prioritise new additions to the Design System](https://designnotes.blog.gov.uk/2022/09/07/how-we-prioritise-additions-to-the-gov-uk-design-system/).

To get a wider look at our work and see what we released recently, see our [Roadmap](/community/roadmap/).

## Essential component criteria

Alongside community input, we prioritise work to maintain and improve components that are essential to the Design System.

An essential component should:

1. Build things for user facing services on GOV.UK.
2. Be required to provide security and trust in GOV.UK through consistent design across its services.
3. Provide the building blocks to allow teams to successfully iterate at scale.
4. Improve accessibility of GOV.UK services.
5. Improve sustainability of GOV.UK services.
6. Be in use in a large number of services.

## Working on now

If you’d like to help us build these components and patterns, join the conversation to see what needs to be done to publish.

{{ govukSummaryList({
  rows: [
    {
      key: {
        text: "Interruption panel"
      },
      value: {
        html: "The interruption panel is part of an Interruption page and shows the user important information that they’d miss if shown any other way."
      }
    },
    {
      key: {
        text: "Feedback link"
      },
      value: {
        text: "Let users leave feedback about a page consistently."
      },
      actions: {
        classes: "govuk-!-text-align-left",
        items: [
          {
            href: "https://github.com/alphagov/govuk-design-system/discussions?discussions_q=is%3Aopen+label%3A%22feedback+link%22",
            text: "Discuss Feedback link"
          }
        ]
      }
    },
    {
      key: {
        text: "Language switcher"
      },
      value: {
        text: "Allowing users to switch a page between languages."
      },
      actions: {
        classes: "govuk-!-text-align-left",
        items: [
          {
            href: "https://github.com/alphagov/govuk-design-system/discussions/categories/language-switcher?discussions_q=is%3Aopen+category%3A%22Language+Switcher%22",
            text: "Discuss Language selector"
          }
        ]
      }
    }
  ]
}) }}

## Next priorities

We particularly welcome input on the following themes. To contribute, you can add designs, code or research findings to the discussion on GitHub.

{{ govukSummaryList({
  rows: [
    {
      key: {
        text: "Autocomplete"
      },
      value: {
        html: "Input fields that suggest possible answers as users are typing."
      },
      actions: {
        classes: "govuk-!-text-align-left",
        items: [
          {
            href: "https://github.com/alphagov/govuk-design-system/discussions/2374",
            text: "Discuss Autocomplete"
          }
        ]
      }
    }
  ]
}) }}

When we start new work, we’ll choose from this list of priorities first.

## Other components and patterns

Browse our [list of discussions on GitHub](https://github.com/orgs/alphagov/projects/43/views/1) to find patterns and components that other teams have shared. Any examples, use cases and research you can share would be very valuable for other teams in government looking for guidance or inspiration.

If you can’t find what you’re looking for, you can [propose a component or pattern](/community/propose-a-component-or-pattern/).

If you’d like to contribute a component or pattern that isn’t in the list of priorities, [contact the Design System team](/contact/).
