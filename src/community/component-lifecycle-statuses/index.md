---
title: Component lifecycle statuses
description: The component lifecycle outlines how components develop over time within the GOV.UK Design System
section: Community
theme: How we work
layout: layout-pane.njk
order: 9
---

{% from "_example.njk" import example %}

The component lifecycle outlines how components develop over time within the GOV.UK Design System. We also use it to communicate our level of confidence that a component is suitable for use in a wide range of public-facing services.

The GOV.UK Design System:

- trials new components
- iterates existing components
- deprecates components that do not adapt to evolving user needs, current research and technologies

We currently use 2 component statuses on the GOV.UK Design System website:

- Trial - these components have a trial status tag
- Stable - these components do not have a tag

## Trial components

The guidance page for each trial component has a trial status tag and message:

{{ example({ group: "community", item: "component-lifecycle-statuses", example: "default", loading: "eager" }) }}

We use trial status when we release components (or variants of components) that might not meet all our [contribution criteria](/community/contribution-criteria/). We do this for components or variants that:

- are new or have significantly changed
- are potentially valuable but need further testing in services
- we're actively working on

We release trial components or variants to:

- get feedback from the community
- allow services to test the components with users

These components need feedback from the community to move to stable status. For more information on the type of feedback we need, see the ‘Research on this component’ section of each trial component.

Components that have been in trial status for 6 months will move to stable status if we do not receive any negative feedback.

### Using trial components in your service

We encourage you to:

- use trial components in your service if they meet user needs
- tell us how you’re using trial components to help us improve them

All the components we publish are usable and accessible in the most common use cases. However, components with a trial status tag may:

- change substantially, meaning you may need to do further work to continue using them
- become deprecated after the trial period

To help you decide whether to use a specific trial component in your service, see the guidance for that trial component.

## Research on component statuses

[Our research](https://github.com/alphagov/govuk-design-system/discussions/5622) showed that participants were broadly positive about introducing lifecycle statuses into the GOV.UK Design System.

Users:

- understood the meaning of the trial status tag
- appreciated greater transparency about which components we were working on
- wanted guidance on how to use trial components in services

We plan to monitor the use of component statuses over the coming months.

## Tell us how you’re using components

Community contribution at each stage of the component lifecycle is important to us.

We’d love to know:

- if you’re using a component
- if you’re not using a component for a specific reason

If you have more detailed research, you can also [share findings about your users](/community/share-research-findings/) with us.
