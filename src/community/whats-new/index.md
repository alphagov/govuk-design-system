---
title: What's new
description: What's new in the Design System over the past year.
section: Community
theme: What we’re working on
layout: layout-pane.njk
order: 10
---

See our latest releases and updates.

## January 2026

### We released GOV.UK Frontend v5.14.0

This release allows you to remove content licence information from the GOV.UK footer if your service does not provide information under the Open Government Licence (OGL).

It also provides a fix for a bug in the VoiceOver screen reader software that affects the menu toggle in the Service navigation component.

[Read the release notes for v5.14.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.14.0) to see what’s changed.

## October 2025

### We released GOV.UK Frontend v5.13.0

This release introduces new Sass functions to help write `@media` and `@container` queries, mixins and functions whilst still using custom breakpoints or [GOV.UK Frontend’s `$govuk-breakpoints`](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-breakpoints) setting.

You can continue using the [`govuk-media-query` mixin](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-media-query) exactly as before - we changed how it works under the hood, but the mixin should behave the same way.

Read the [release notes for v5.13.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.13.0) to see what’s changed.

## September 2025

### We released GOV.UK Frontend v5.12.0

It introduces a new mixin you can use to style the focus state if you’re building your own form input components.

Read the [release notes for v5.12.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.12.0) to see what’s changed.

## August 2025

### We released GOV.UK Frontend v5.11.2

This release includes some JavaScript bug fixes, as well as a fix for thickness of underlines on the Pagination component in Safari.

Read the [release notes for v5.11.2](https://github.com/alphagov/govuk-frontend/releases/tag/v5.11.2) to see what changed.

## July 2025

### We released GOV.UK Frontend v5.11.1

It fixes link styles in the Service navigation on inverted backgrounds and makes govuk-shade and govuk-tint more reliable.

Read the [release notes for v5.11.1](https://github.com/alphagov/govuk-frontend/releases/tag/v5.11.1) to see what's changed.

## June 2025

### We released GOV.UK Frontend v5.11.0

This release includes improvements to the Service navigation component, making it easier to use on mobile devices and offering an inverse colour option. We also added deprecation warnings for code built with the LibSass library.

Read the [release notes for v5.11.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.11.0) to see what's changed.

## May 2025

### We released GOV.UK Frontend v4.10.0

This is the first step towards refreshing the GOV.UK brand for users of earlier versions of GOV.UK Frontend.

Read the [release notes for v4.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.10.0) to see what's changed.

### We released GOV.UK Frontend v5.10.2

This release fixes an issue with the way product names are shown in the header.

Read the [release notes for v5.10.2](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.2) to see what's changed.

### We released GOV.UK Frontend v5.10.1

It makes some fixes to the implementation of the GOV.UK brand refresh introduced in v5.10.0.

Read the [release notes for v5.10.1](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.1) to see what's changed.

### We released GOV.UK Frontend v5.10.0

This release is first step towards refreshing the GOV.UK brand.

It includes updates to the:

- [GOV.UK header component](/components/header/)
- [GOV.UK footer component](/components/footer/)
- [Service navigation component](/components/service-navigation/)
- [Cookie banner component](/components/cookie-banner/)

Read the [release notes for v5.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0) to see what's changed.

## March 2025

### We released GOV.UK Frontend v5.9.0

This release includes a [JavaScript enhancement to the File upload component](/components/file-upload/#using-the-improved-file-upload-component), which makes dragging and dropping files easier for users.

We also deprecated the options to show a service name, as well as navigation links, in the GOV.UK header component. Both options will be removed from the GOV.UK header in the next breaking release of GOV.UK Frontend.

Read the [full release notes](https://github.com/alphagov/govuk-frontend/releases/tag/v5.9.0) to see what’s changed.

## January 2025

### We released GOV.UK Frontend 5.8.0

This release includes a new ConfigurableComponent class to help you build your own configurable components.

Read the [full release notes](https://github.com/alphagov/govuk-frontend/releases/tag/v5.8.0) to see what’s changed.
