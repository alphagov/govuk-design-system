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

Last updated 15 May 2025.

## Recently shipped

We’ve released [GOV.UK Frontend v5.10.2](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.2), which updates the spacing in the header when the navigation is not used, allowing the product name to stay on the same line as the logo for a wider variety of small screens.

Previously, we released [GOV.UK Frontend v5.10.1](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.1), which fixes the colour of the dot in the refreshed GOV.UK logo, alongside small fixes to the implementation of the brand refresh.

On 1 May 2025, we released [GOV.UK Frontend v5.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0), which updates the GOV.UK header, GOV.UK footer, Service navigation and Cookie banner components to use the refreshed GOV.UK brand.

We also deprecated the options to show a service name, as well as navigation links, in the GOV.UK header component. Both options will be removed from the GOV.UK header in the next breaking release of GOV.UK Frontend.

We’ve also recently:

- released [GOV.UK Frontend v5.9.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.9.0), which includes a [JavaScript enhancement to the File upload component](https://design-system.service.gov.uk/components/file-upload/#using-the-improved-file-upload-component)
- released [GOV.UK Frontend v5.8.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.8.0), which includes a new `ConfigurableComponent` class to help you build your own configurable components
- added features to help services [create their own JavaScript components using GOV.UK Frontend](https://frontend.design-system.service.gov.uk/building-your-own-javascript-components/)
- updated the Royal Arms in the [GOV.UK Footer component](/components/footer/)
- introduced a new [Service navigation component](/components/service-navigation/) and published a new [pattern to Help users to navigate a service](/patterns/navigate-a-service)

## Working on now

We're:

- preparing to release v4.10.0 of GOV.UK Frontend which updates the GOV.UK header, GOV.UK footer, Service navigation, Cookie banner components to use the refresh GOV.UK brand
- carrying out research with services teams on how they are using the Design System and how they upgrade their service

## Coming up next

We're getting ready to:

- apply a refreshed GOV.UK colour palette to all Design System components for a future release
- work on breaking changes for [V6.0.0](https://github.com/alphagov/govuk-frontend/milestone/51). We plan to include typographic scale enabled by default, iterate the navigation component and remove some deprecations
- continue our Javascript work and make improvements to the Character Count component, Tabs component and Accordion component

## Future plans

We plan to:

- [drop support for Ruby Sass and LibSass](https://github.com/alphagov/govuk-frontend/issues/2637) and [migrate to the Sass module system](https://github.com/alphagov/govuk-frontend/issues/1791)
- build new autocomplete components to replace [Accessible Autocomplete](https://github.com/alphagov/accessible-autocomplete)
