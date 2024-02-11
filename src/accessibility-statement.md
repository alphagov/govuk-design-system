---
title: Accessibility statement
description: accessibility in the GOV.UK Design System
layout: layout-single-page-prose.njk
---

# Accessibility statement

The GOV.UK Design System team (the team) is committed to making its website at [design-system.service.gov.uk][govuk_frontend_design_system] and the GOV.UK Frontend documentation website at [frontend.design-system.service.gov.uk][govuk_frontend_design_system_] accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.

This accessibility statement applies to both websites and the components and patterns from the GOV.UK Frontend codebase which appear in the examples throughout the Design System.

The team wants to make sure as many people as possible can use their websites. For example, making sure the website text is as clear as possible to understand and making sure you can:

- change colours, contrast levels and fonts
- zoom in up to 400% without the text spilling off the screen
- listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA, TalkBack and VoiceOver)
- navigate most of the website using just a keyboard
- navigate most of the website using just a mouse and on-screen keyboard
- navigate most of the website using speech recognition software

AbilityNet has [advice on making your device easier to use](https://mcmw.abilitynet.org.uk/), if you have a disability.

## Compliance status

The Design System website at [design-system.service.gov.uk][govuk_design_system] is fully compliant with the Web Content Accessibility Guidelines (WCAG) version 2.1 AA standard.

The GOV.UK Frontend documentation website at [frontend.design-system.service.gov.uk][govuk_frontend_design_system] is fully compliant with the Web Content Accessibility Guidelines (WCAG) version 2.1 AA standard.

The GOV.UK Frontend codebase at [github.com/alphagov/govuk-frontend](https://github.com/alphagov/govuk-frontend) is fully compliant with the Web Content Accessibility Guidelines (WCAG) version 2.2 AA standard.

## Non-accessible content

In this section, the team lists non-accessible content that has been reported, verified and tracked in the following repositories:

- [GOV.UK Design System GitHub repository](https://github.com/alphagov/govuk-design-system)
- [GOV.UK Frontend Documentation Github repository](https://github.com/alphagov/govuk-frontend-docs)
- [GOV.UK Frontend GitHub repository](https://github.com/alphagov/govuk-frontend)

The team document WCAG 2.1 A and AA failures in two repositories under the ‘accessibility-regulations-failure’ issue label:

- [GOV.UK Design System website label for accessibility regulations failures](https://github.com/alphagov/govuk-design-system/labels/accessibility-regulations-failure)
- [GOV.UK Frontend codebase label for accessibility regulations failures](https://github.com/alphagov/govuk-frontend/labels/accessibility-regulations-failure)

### Non-compliance with the accessibility regulations

There is currently no known non-compliant content in the GOV.UK Design System website, GOV.UK Frontend Documentation website or the GOV.UK Frontend codebase.

### Disproportionate burden

The team does not currently make any claims of disproportionate burden for any of our products.

### Content not within the scope of the accessibility regulations

The accessibility regulations apply to all portions of the GOV.UK Design System website, GOV.UK Frontend Documentation website and GOV.UK Frontend codebase.

The team does not have any content within these products outside the scope of the accessibility regulations.

### Other identified and tracked accessibility concerns

In addition to non-compliant content, the team also track additional concerns about accessibility which:

- show strong evidence of being accessibility barriers
- do not constitute a failure in one or more WCAG 2.1 Level AA criteria
- are not classified as non-compliance with the accessibility regulations
- are determined as worth featuring in this accessibility statement

The team documents these additional concerns in two repositories under the ‘accessibility-concern’ issue label:

- [GOV.UK Design System website label for accessibility concerns](https://github.com/alphagov/govuk-design-system/labels/accessibility-concern)
- [GOV.UK Frontend codebase label for accessibility concerns](https://github.com/alphagov/govuk-frontend/labels/accessibility-concern)

For the GOV.UK Design System website and the GOV.UK Frontend Documentation website, the team do not currently know of any additional accessibility concerns to add to this statement.

Additional accessibility concerns from the GOV.UK Frontend codebase include:

1.  The details component does not work well with Dragon and VoiceOver. This is not an issue with our details component, but is a known issue with the assistive technology and the `<details>` HTML element. Track our progress on the [GitHub issue: ‘Details component does not work well with Dragon and VoiceOver’](https://github.com/alphagov/govuk-frontend/issues/3693).
2.  [A bug within Dragon means no action is taken when trying to activate the file upload component](https://github.com/alphagov/reported-bugs/issues/35) through the command ‘click choose file’. This is a usability issue originating from the assistive technology. The team does not plan to fix this, as the assistive technology will need to resolve it. Track our progress on the [GitHub issue: ‘Upload file component doesn’t respond to ‘click choose file’ due to Dragon / browser bugs’](https://github.com/alphagov/govuk-frontend/issues/3686).

## Preparation of this accessibility statement

This statement was prepared on 23 October 2019. It was last reviewed and updated on 2 August 2023.

The [GOV.UK Design System website][govuk_design_system] was last audited for accessibility issues by an external group on 7 October 2019. The test was carried out by the [Digital Accessibility Centre (DAC)](https://digitalaccessibilitycentre.org/).

DAC tested a sample of pages to cover the different content types in the GOV.UK Design System website. They were:

- [the homepage][govuk_design_system]
- [a short content page](https://design-system.service.gov.uk/community/design-system-working-group/)
- [a long content page](https://design-system.service.gov.uk/styles/layout/)
- [an overview page](https://design-system.service.gov.uk/community/)
- [a styles page](https://design-system.service.gov.uk/styles/typography/)
- [a component page](https://design-system.service.gov.uk/components/radios/)
- [a pattern page](https://design-system.service.gov.uk/patterns/question-pages/)

DAC also tested the global search functionality that appears in the header of the GOV.UK Design System website.

### Frontend documentation website

The [GOV.UK Frontend documentation website](http://frontend.design-system.service.gov.uk/) was last audited for accessibility issues by an external group in April 2021. The audit was carried out by the [Digital Accessibility Centre (DAC)](https://digitalaccessibilitycentre.org/).

DAC tested the [Technical Documentation Template](https://tdt-documentation.london.cloudapps.digital/), which is the template for the GOV.UK Frontend documentation website.

To learn more, read the [Technical Documentation Template accessibility statement](https://tdt-documentation.london.cloudapps.digital/accessibility/).

### Frontend codebase

The GOV.UK Frontend codebase is not a website but a [code repository](https://github.com/alphagov/govuk-frontend) and [npm package](https://www.npmjs.com/package/govuk-frontend).

Examples using the GOV.UK Frontend codebase were last audited for accessibility issues by an external group in May 2023. The audit was carried out by the [Digital Accessibility Centre (DAC)](https://digitalaccessibilitycentre.org/).

Read more about the codebase’s accessibility in the [GOV.UK Frontend GitHub repository readme](https://github.com/alphagov/govuk-frontend#accessibility).

### How the GOV.UK Design System team makes their websites accessible

The team aims to research components and patterns with a representative range of users, including those with disabilities.

The team also tests components to make sure they work with a broad range of browsers, devices and assistive technologies – including screen magnifiers, screen readers and speech recognition tools.

When the team publishes new content, they continue to make sure it meets accessibility standards.

## Feedback and contact information

The team is always looking to improve the accessibility of this website.

If you find any problems not listed on this page or think this website is not meeting accessibility requirements, email the team at govuk-design-system-support@digital.cabinet-office.gov.uk

The team will review your request and get back to you in 2 working days.

## Enforcement procedure

The Equality and Human Rights Commission (EHRC) is responsible for enforcing the [Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018](https://www.legislation.gov.uk/uksi/2018/952/contents) (the ‘accessibility regulations’).

If you’re not happy with how the team responds to your complaint, [contact the Equality Advisory and Support Service (EASS)](https://www.equalityadvisoryservice.com/).
