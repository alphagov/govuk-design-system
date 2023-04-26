---
title: Accessibility
description: accessibility in the GOV.UK Design System
layout: layout-single-page-prose.njk
---

# Accessibility

The GOV.UK Design System team at the Government Digital Service (<abbr>GDS</abbr>) maintains the following products:

- [GOV.UK Design System website](https://design-system.service.gov.uk/)
- [GOV.UK Frontend documentation website](https://frontend.design-system.service.gov.uk/)
- [GOV.UK Frontend codebase](https://github.com/alphagov/govuk-frontend)

This page explains how the team works to ensure these products are accessible.

The GOV.UK Prototype Kit website has a separate accessibility statement. [Read the GOV.UK Prototype Kit website accessibility statement](https://prototype-kit.service.gov.uk/docs/accessibility).

[Read our accessibility strategy](https://design-system.service.gov.uk/community/accessibility-strategy/) for more information on our current principles and work needed to improve the accessibility of the GOV.UK Design System.

[Read about how we test components using accessibility acceptance criteria](https://github.com/alphagov/govuk-frontend/blob/main/docs/contributing/test-components-using-accessibility-acceptance-criteria.md).

## Accessibility statement

This accessibility statement applies to the GOV.UK Design System website at [design-system.service.gov.uk](https://design-system.service.gov.uk/), the GOV.UK Frontend documentation website at [frontend.design-system.service.gov.uk](https://frontend.design-system.service.gov.uk/) and the components and patterns from the GOV.UK Frontend codebase which appear in the examples throughout the Design System.

The GOV.UK Design System team wants as many people as possible to be able to use this website. For example, you should be able to:

- change colours, contrast levels and fonts
- zoom in up to 400% without the text spilling off the screen
- listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA, TalkBack and VoiceOver)
- navigate most of the website using just a keyboard
- navigate most of the website using just a mouse and on-screen keyboard
- navigate most of the website using speech recognition software

The team has also made the website text as simple as possible to understand.

AbilityNet has [advice on making your device easier to use](https://mcmw.abilitynet.org.uk/) if you have a disability.

### Feedback and contact information

The GOV.UK Design System team is always looking to improve the accessibility of this website. If you find any problems that are not listed on this page or think this website is not meeting accessibility requirements, email the team at <govuk-design-system-support@digital.cabinet-office.gov.uk>

The GOV.UK Design System team will review your request and get back to you in 2 working days.

### Enforcement procedure

The Government Digital Service (<abbr>GDS</abbr>) is committed to making its websites accessible, in accordance with the [Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018](https://www.legislation.gov.uk/uksi/2018/952/contents).

The Equality and Human Rights Commission (<abbr>EHRC</abbr>) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). If you contact us with a complaint and you’re not happy with our response, [contact the Equality Advisory and Support Service (<abbr>EASS</abbr>)](https://www.equalityadvisoryservice.com/).

### Compliance status

The Design System website at [design-system.service.gov.uk](https://design-system.service.gov.uk/) is partially compliant with the Web Content Accessibility Guidelines (<abbr>WCAG</abbr>) version 2.1 AA standard. Non-accessible content is documented in the next section.

The GOV.UK Frontend documentation website at [frontend.design-system.service.gov.uk](https://frontend.design-system.service.gov.uk/) is fully compliant with the Web Content Accessibility Guidelines (<abbr>WCAG</abbr>) version 2.1 AA standard.

The GOV.UK Frontend codebase at [github.com/alphagov/govuk-frontend](https://github.com/alphagov/govuk-frontend) is fully compliant with the Web Content Accessibility Guidelines (<abbr>WCAG</abbr>) version 2.1 AA standard. Non-accessible content is documented in the next section.

### Non-accessible content

In this section, we only list non-accessible content that has been reported, verified and tracked in the following repositories:

- [GOV.UK Design System GitHub repository](https://github.com/alphagov/govuk-design-system)
- [GOV.UK Frontend Documentation Github repository](https://github.com/alphagov/govuk-frontend-docs)
- [GOV.UK Frontend GitHub repository](https://github.com/alphagov/govuk-frontend)

For this section, we define an ‘accessibility concern’ as any question about the accessibility of a portion of one of our products.

#### Non-compliance with the accessibility regulations

These accessibility concerns have been classified as being non-compliant, due to a failure in one or more WCAG 2.1 Level AA criteria.

WCAG 2.1 AA failures are documented in two of our repositories under the ‘accessibility-regulations-failure’ issue label:

- [GOV.UK Design System website label for accessibility regulations failures](https://github.com/alphagov/govuk-design-system/labels/accessibility-regulations-failure)
- [GOV.UK Frontend codebase label for accessibility regulations failures](https://github.com/alphagov/govuk-frontend/labels/accessibility-regulations-failure)

From the GOV.UK Design System website:

1. The example summary card on our ‘Summary list’ component page includes different links with the same link text. There is no programmatically determinable link context to differentiate between the links. This is technically a failure of WCAG success criterion [2.4.4 Link Purpose (In Context)](https://www.w3.org/TR/WCAG21/#link-purpose-in-context). We plan to fix this within 2023. Track our progress on the [GitHub issue: ‘Duplicate links on example for summary cards’](https://github.com/alphagov/govuk-design-system/issues/2680).

From the GOV.UK Frontend Documentation website:

There is currently no known non-compliant content in the GOV.UK Frontend Documentation website.

From the GOV.UK Frontend codebase:

There is currently no known non-compliant content in the GOV.UK Frontend codebase.

#### Disproportionate burden

We do not currently make any claims of disproportionate burden for any of our products.

#### Accessibility concerns not within the scope of the accessibility regulations

Above and beyond non-compliant content, we also track accessibility concerns which:

- show strong evidence of being accessibility barriers
- do not constitute a failure in one or more WCAG 2.1 Level AA criteria
- are not classified as non-compliance with the accessibility regulations
- are determined as worth featuring in this accessibility statement

These accessibility concerns are documented in two of our repositories under the ‘accessibility-concern’ issue label:

- [GOV.UK Design System website label for accessibility concerns](https://github.com/alphagov/govuk-design-system/labels/accessibility-concern)
- [GOV.UK Frontend codebase label for accessibility concerns](https://github.com/alphagov/govuk-frontend/labels/accessibility-concern)

From the GOV.UK Design System website:

There are currently no known accessibility concerns in the GOV.UK Design System website which we have determined to be worth featuring in this accessibility statement.

From the GOV.UK Frontend Documentation website:

There are currently no known accessibility concerns in the GOV.UK Frontend Documentation website which we have determined to be worth featuring in this accessibility statement.

From the GOV.UK Frontend codebase:

The accordion component is currently using an `aria-labelledby` ARIA attribute on an unsupported `<div>` element. This is an incorrect implementation of [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/), but is not a failure of WCAG success criterion [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value). We plan to fix this within 2023. Track our progress on the [GitHub issue: ‘Accordion - Elements must only use allowed ARIA attributes’](https://github.com/alphagov/govuk-frontend/issues/2472).


### Testing our products for accessibility

The [GOV.UK Design System website](https://design-system.service.gov.uk/) was last audited for accessibility issues by an external group on 7 October 2019. The test was carried out by the [Digital Accessibility Centre (DAC)](https://digitalaccessibilitycentre.org/).

DAC tested a sample of pages to cover the different content types in the GOV.UK Design System website. They were:

- [the homepage](/)
- [a short content page](/community/design-system-working-group/)
- [a long content page](/styles/layout/)
- [an overview page](/community/)
- [a styles page](/styles/typography/)
- [a component page](/components/radios/)
- [a pattern page](/patterns/question-pages/)

DAC also tested the global search functionality that appears in the header of the GOV.UK Design System website.

#### Frontend documentation website

The [GOV.UK Frontend documentation website](http://frontend.design-system.service.gov.uk/) was last audited for accessibility issues by an external group in April 2021. The audit was carried out by the [Digital Accessibility Centre (DAC)](https://digitalaccessibilitycentre.org/).

DAC tested the [Technical Documentation Template](https://tdt-documentation.london.cloudapps.digital/), which is the platform that runs the GOV.UK Frontend documentation website.

To learn more, read the [Technical Documentation Template accessibility statement](https://tdt-documentation.london.cloudapps.digital/accessibility/).

#### Frontend codebase

The GOV.UK Frontend codebase is not a website but a [code repository](https://github.com/alphagov/govuk-frontend) and [npm package](https://www.npmjs.com/package/govuk-frontend).

Read more about the codebase’s accessibility in the [GOV.UK Frontend GitHub repository readme](https://github.com/alphagov/govuk-frontend#accessibility).

### How the GOV.UK Design System team makes their websites accessible

The GOV.UK Design System team works to make sure the Design System and Frontend websites, and the codebase they use, are accessible.

Where possible, the team aims to research components and patterns with a representative range of users, including those with disabilities.

We also test components to make sure they work with a broad range of browsers, devices and assistive technologies - including screen magnifiers, screen readers and speech recognition tools.

When we publish new content, we’ll continue to make sure that it meets accessibility standards.

### Preparation of this accessibility statement

This statement was prepared on 23 October 2019. It was last reviewed on 26 April 2023.

## Using the Design System and Frontend in your service

While the GOV.UK Design System team takes steps to ensure the Design System is as accessible as possible by default, you still need to carry out contextual research.

Using only the code supplied in the GOV.UK Frontend codebase is not enough to accessibly implement the GOV.UK Design System. There is important written guidance in the [GOV.UK Design System website](https://design-system.service.gov.uk/) on how to implement styles, components and patterns in an accessible way. 

Using the Design System guidance and Frontend codebase does not mean your service automatically meets level AA of WCAG 2.1. You’ll still need to make sure your service as a whole meets accessibility requirements.

You must research styles, components and patterns as part of your service to make sure they are accessible in context.

Find out what you need to do to [make your service accessible](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction) in the GOV.UK Service Manual.

## If you are not using the Design System and Frontend

The Design System and Frontend were introduced in June 2018 to replace the following deprecated codebases:

- GOV.UK Elements
- GOV.UK Frontend Toolkit
- GOV.UK Template

The GOV.UK Design System team no longer supports these products and will not be making updates to help them meet level AA of WCAG 2.1.

If you’re using these products, you should [update your service to use the latest version of GOV.UK Frontend](https://design-system.service.gov.uk/get-started/updating-your-code/).

If you have any questions or need help, contact the GOV.UK Design System team:

using the #govuk-design-system channel on the cross-government [UK Government Digital Slack](https://ukgovernmentdigital.slack.com/app_redirect?channel=govuk-design-system)
by email at <govuk-design-system-support@digital.cabinet-office.gov.uk>

