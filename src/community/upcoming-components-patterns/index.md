---
title: Upcoming components and patterns
description: Anyone can propose, develop or contribute to new patterns and components, or improvements to existing ones.
section: Community
aliases: maps, autocomplete, choosing a date, navigation
theme: What we’re working on
layout: layout-pane.njk
order: 1
---

{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}

These are the components and patterns we’re working on right now, and the ones we plan to work on next.

We regularly ask our community to help us decide the things we need to work on the most. [Read a blog post about how we prioritise new additions to the Design System](https://designnotes.blog.gov.uk/2022/09/07/how-we-prioritise-additions-to-the-gov-uk-design-system/).

To get a wider look at our work and see what we released recently, see our [Roadmap](/community/roadmap/).

## Working on now

If you’d like to help us build these components and patterns, join the conversation to see what needs to be done to publish.

{{ govukSummaryList({
  rows: [
    {
      key: {
        text: "Maps"
      },
      value: {
        html: "A community collaboration to develop guidance on designing accessible maps."
      },
      actions: {
        classes: "govuk-!-text-align-left",
        items: [
          {
            href: "https://join.slack.com/t/mapsinservices/shared_invite/zt-163npa168-e5EREuQZU3NqwfdojWw2ew",
            text: "Join the Maps Slack group"
          }
        ]
      }
    },
    {
      key: {
        text: "Navigation"
      },
      value: {
        text: "Exploration into different kinds of navigation, for example sub-navigation and side navigation."
      },
      actions: {
        classes: "govuk-!-text-align-left",
        items: [
          {
            href: "https://github.com/alphagov/govuk-design-system/discussions/2376",
            text: "Discuss Navigation"
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
    },
    {
      key: {
        text: "Choosing a date"
      },
      value: {
        html: "Looking into the use cases for date pickers and whether they’re a good idea."
      },
      actions: {
        classes: "govuk-!-text-align-left",
        items: [
          {
            href: "https://github.com/alphagov/govuk-design-system/discussions/2375",
            text: "Discuss Choosing a date"
          }
        ]
      }
    }
  ]
}) }}

We’ll next review the list of priorities in summer 2023. We’re not committing to publishing all the things on the list before then, but we’ll choose them first when starting new work.

## Other components and patterns

Browse our [list of discussions on GitHub](https://github.com/orgs/alphagov/projects/43/views/1) to find patterns and components that other teams have shared. Any examples, use cases and research you can share would be very valuable for other teams in government looking for guidance or inspiration.

If you can’t find what you’re looking for, you can [propose a component or pattern](/community/propose-a-component-or-pattern/).

If you’d like to contribute a component or pattern that isn’t in the list of priorities, [contact the Design System team](/get-in-touch/).
