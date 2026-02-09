---
title: Roadmap
description: This roadmap shows what we’re working on and planning to do.
section: Community
theme: What we’re working on
layout: layout-pane.njk
order: 9
---

This roadmap shows what we’re working on and planning to do.

Some things on the roadmap might change – the purpose is to tell you what’s coming up and help service teams prepare and plan their own work.

See our [GitHub team board](https://github.com/orgs/alphagov/projects/53) for more details on our plans and day-to-day activities.

Last updated 9 February 2026.

## Recently shipped

We’ve released [GOV.UK Frontend v6.0.0](https://github.com/alphagov/govuk-frontend/releases/tag/v6.0.0). This breaking release includes changes to improve our Sass architecture, use an updated type scale, update our colours and improve flexibility in our page template layout. We’ve also removed a number of deprecated APIs, Sass variables and component options.

In January 2026, we released [GOV.UK Frontend v5.14.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.14.0). This release allows you to remove content licence information from the GOV.UK footer if your service does not provide information under the Open Government Licence (OGL). It also provides a fix for a bug in the VoiceOver screen reader software that affects the menu toggle in the Service navigation component.

In October 2025, we released [GOV.UK Frontend v5.13.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.13.0), which introduced new Sass functions to help write `@media` and `@container` queries, mixins and functions whilst still using custom breakpoints or GOV.UK Frontend’s `$govuk-breakpoints` setting.

In September 2025, we released [GOV.UK Frontend v5.12.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.12.0), which introduced a new mixin you can use to style the focus state if you're building your own form input components.

In June 2025, we released [GOV.UK Frontend v5.11.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.11.0), which includes improvements to the Service navigation component, making it easier to use on mobile devices and offering a new inverse colour option. We also added deprecation warnings for code built with the LibSass library.

In May 2025, we released [GOV.UK Frontend v5.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0) (and later fix versions) and [GOV.UK Frontend v4.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.10.0). These are the first steps towards refreshing the GOV.UK brand across government services.

## Working on now

We've started to:

- apply a refreshed GOV.UK colour palette to all Design System components
- work on breaking changes for [v6.0.0](https://github.com/alphagov/govuk-frontend/milestone/51) – we plan to include typographic scale enabled by default and remove some deprecated features and options

## Coming up next

We're getting ready to:

- provide a pattern on how services can collect feedback
- review component and pattern proposals from the community to determine if they will be added to the GOV.UK Design System
- [migrate to the Sass module system](https://github.com/alphagov/govuk-frontend/issues/1791)
- make some improvements to the website as a result of research into user's mental models of content

## Future plans

We plan to:

- improve user journeys between the GOV.UK Design System and other design resources in government
- explore patterns for data sharing between services, and services where AI is in use
- create further CSS custom properties
- build new autocomplete components to replace [Accessible autocomplete](https://github.com/alphagov/accessible-autocomplete)
