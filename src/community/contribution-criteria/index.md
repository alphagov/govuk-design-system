---
title: Contribution criteria
description: To help ensure that the contents of the GOV.UK Design System are of a high quality and meet user needs, all components and patterns must meet the following criteria
section: Community
theme: How we work
layout: layout-pane.njk
order: 7
---

{% from "govuk/components/table/macro.njk" import govukTable %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

The contents of the Design System must be of a high quality and meet user needs. To guarantee this, all components and patterns need to meet certain criteria.

## Proposing a component or pattern

To be successful, proposals need to show that the component or pattern being suggested would be useful and unique.

{{ govukTable({
  caption: "New proposals criteria",
  captionClasses: "govuk-visually-hidden",
  firstCellIsHeader: true,
  classes: "app-table--constrained",
  head: [
    {
      text: "Criteria"
    },
    {
      text: "Description"
    }
  ],
  rows: [
    [
      {
        text: "Useful"
      },
      {
        html: '<p> There is evidence that this component or pattern would be useful for many teams or services.</p>
          <p class="govuk-!-margin-bottom-0">Evidence could be screenshots or links to versions of it being used in different services.</p>'
      }
    ],
    [
      {
        text: "Unique"
      },
      {
        html: '<p> It does not replicate something already in the Design System. </p>
          <p class="govuk-!-margin-bottom-0">If it’s intended to replace an existing component or pattern, there is evidence to show that it’s better than the existing version.</p>'
      }
    ]
  ]
}) }}

The [Design System working group](/community/design-system-working-group/) reviews proposals to check they meet these criteria. Proposals that meet the criteria then move to the next step to show they're ready to publish.

## Developing a component or pattern

Before a new component or pattern is published the working group reviews the implementation to make sure it is usable, consistent and versatile.

{{ govukTable({
  caption: "Before publication criteria",
  captionClasses: "govuk-visually-hidden",
  firstCellIsHeader: true,
  classes: "app-table--constrained",
  head: [
    {
      text: "Criteria"
    },
    {
      text: "Description"
    }
  ],
  rows: [
    [
      {
        text: "Usable"
      },
      {
        html: '<p>It has been tested  in user research and shown to work with a representative sample of users, including those with disabilities.</p>
          <p class="govuk-!-margin-bottom-0">Components and patterns published in a limited number of services can still be contributed, as long as it meets other contribution criteria. We\'ll be clear about the specific contexts the component or pattern has been tested in and encourage feedback about its performance in a wide range of services.</p>'
      }
    ],
    [
      {
        text: "Consistent"
      },
      {
        html: '<p>It reuses existing styles and components in the Design System where relevant.</p>
          <p>Both the guidance and any content included in examples must follow the <a href="https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style">GOV.UK content style guide</a>.</p>
          <p class="govuk-!-margin-bottom-0">If there is code, it follows the <a href="https://github.com/alphagov/govuk-frontend/blob/main/CONTRIBUTING.md#conventions-to-follow">GOV.UK Frontend coding standards</a> and is ready to merge in GOV.UK Frontend.</p>'
      }
    ],
    [
      {
        text: "Versatile"
      },
      {
        html: '<p>The implementation is versatile enough that the component or pattern can be used in a range of different services that may need it.</p>
          <p>For example, a versatile date input component could be set up to ask for a year only, a month and year only, a precise date, or any other combination you may need.</p>
          <p class="govuk-!-margin-bottom-0">The component or pattern must also have been <a href="https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices">tested and shown to work with a range of browsers, assistive technologies and devices</a>.</p>'
      }
    ]
  ]
}) }}

## Developing a community resource or tool

Before linking from the Design System to a [community resource or tool](/community/resources-and-tools/) the Design System team will review it to make sure that:

- it has a clear owner
- it cannot be mistaken for an official part of the Design System
- it has documentation explaining how to use it, contribute to it and get support for it
- support tickets are answered within 1 month
- it's clearly documented which version of GOV.UK Frontend it supports
- it's no more than 3 months behind the latest version of GOV.UK Frontend
- design resources are consistent with the styles, components and patterns in the GOV.UK Design System
- development resources output the same markup as GOV.UK Frontend
- it is not being charged for or used to promote a private business
- it's compatible with the [Service Standard](https://www.gov.uk/service-manual/service-standard) and [Technology code of practice](https://www.gov.uk/government/publications/technology-code-of-practice/technology-code-of-practice)

To help users decide whether to use your resource or tool and tell them how to get support for it, add this message to the resource README and after any website links:

{{ govukInsetText({
  text: "[Name of resource or tool] is a community [resource/tool] of the GOV.UK Design System. The Design System team is not responsible for it and cannot support you with using it. Contact [contributor] directly if you need help or you want to request a feature."
}) }}
