---
layout: layout-pane.njk
title: Accessibility
description:  tbd
showSubNav: true
---

{% from "_image-card.njk" import imageCard %}

Our work to make the GOV.UK Design System meet public sector accessibility regulations is a continuous and iterative process. You must [make sure your service is accessible](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps). We outline our approach on our [accessibility strategy](/accessibility/accessibility-strategy/).

Using the GOV.UK Design System in a service does not immediately make that service accessible. You’ll need additional research, design, development and testing work to make sure your service is accessible, even when using accessible styles, components and patterns.

## Accessibility changes to the Design System to meet WCAG 2.2
W3C [owns and manages WCAG 2.2](https://www.w3.org/TR/WCAG22/). The Design System team has updated the Design System to meet WCAG 2.2. Any guidance we provide is to make sure teams using the Design System are aware of the changes and can make the necessary adjustments to their services.

### Make sure your service meets the new WCAG 2.2 criteria
WCAG 2.2 is expected to be completed and published between July and September 2023. You’ll need to comply with the new criteria no later than one year after WCAG 2.2 is published.

### What you need to do
1. Revisit the [GDS guidance](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps) on what accessibility is and why your service needs to invest in it
2. Read the [What’s new in WCAG 2.2 draft](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) to understand the new criteria your service will need to comply with
3. Ask your wider organisation for support to prepare for the work needed to meet WCAG 2.2
4. Review the lists on this page of affected components and patterns in the Design System
5. Assess your service to see how many affected components and patterns are in use
6. Plan and implement the changes needed to your service

Make sure there is expertise within your organisation by advocating for people to receive training in accessibility. The Design System team is organising peer support groups to help service teams share information. You can see dates and details on how to register on our xxxxxxx page.

### Join our community events and support groups

Join one of our WCAG 2.2 events where we offer support and work together to solve common problems affecting service teams.

<div class="govuk-grid-row govuk-!-padding-bottom-4">
  <div class="govuk-grid-column-full">
    {%- call imageCard({
      src: "/accessibility/images/catchup-call-groupshot.jpg",
      alt: "Catchup call screenshot.",
      title: "WCAG 2.2 support events",
      large: true
    }) %}
      <p>We are offering a series of <a href="/accessibility/wcag-2-2-support-events">profession based support events to help your teams and services transform to WCAG 2.2</a>.</p>
    {% endcall %}
  </div>
  <div class="govuk-grid-column-full">
    {%- call imageCard({
      src: "/accessibility/images/workshop.jpg",
      alt: "Table with post-it notes, pens and paper.",
      title: "WCAG 2.2 peer community support",
      large: true
    }) %}
        <p>We are creating <a href="/accessibility/wcag-2-2-peer-community-support">support groups to help our community to update components in their services to WCAG 2.2</a>. The aim is to “Help one another out”.</p>
    {% endcall %}
  </div>
</div>


### Components affected
The following components have WCAG 2.2 AA changes included. You must check if your service needs amending to align with these changes. We’ve made WCAG guideline changes for:

- [Accordion](/components/accordion/) - Focus not obscured (Minimum)
- [Back link](/components/back-link/) - Redundant entry
- [Button](/components/button/) - Focus appearance
- [Breadcrumbs](/components/breadcrumbs/)  - Focus appearance
- [Checkboxes](/components/checkboxes/) - Focus appearance
- [Date input](/components/date-input/) - Focus appearance
- [Details](/components/details/) - Focus appearance and Focus not obscured (Minimum)
- [Error summary](/components/error-summary/) - Target size (Minimum)
- [Error message](/components/error-message/) - Redundant entry
- [Exit this page](/components/exit-this-page/) - Focus not obscured (Minimum)
- [Fieldset](/components/fieldset/) - Focus appearance
- [Header](/components/header/) - Focus not obscured (Minimum) and Focus appearance
- [Panel](/components/panel/) - Focus appearance and Focus not obscured (Minimum)
- [Pagination](/components/pagination/) - Focus appearance
- [Radios](/components/radios/) - Focus appearance
- [Select](/components/select/) - Focus not obscured (Minimum)
- [Skip link](/components/skip-link/) - Focus appearance
- [Summary list](/components/summary-list/)  - Redundant entry
- [Tabs](/components/tabs/) - Focus not obscured (Minimum)
- [Tag](/components/tag/) - Target size (Minimum)

### Patterns affected
The following patterns have WCAG 2.2 AA changes included. You must check if your service needs amending to align with these changes. We’ve made WCAG guideline changes for:

- [Addresses](/patterns/addresses/) - Redundant entry
- [Bank details](/patterns/bank-details/) - Redundant entry
- [Check answers](/patterns/check-answers/) - Redundant entry
- [Confirm an email address](/patterns/confirm-an-email-address/) - Accessible authentication and Redundant entry
- [Confirm a phone number](/patterns/confirm-a-phone-number/)  - Accessible authentication and Redundant entry
- [Confirmation pages](/patterns/confirmation-pages/) - Focus appearance and Redundant entry
- [Contact a department or service team](/patterns/contact-a-department-or-service-team/) - Consistent help
- [Cookies page](/patterns/cookies-page/) - Redundant entry
- [Create a username](/patterns/create-a-username/) - Accessible authentication and Redundant entry
- [Dates](/patterns/dates/) - Redundant entry
- [Email addresses](/patterns/email-addresses/) - Accessible authentication and redundant entry
- [Equality information](/patterns/equality-information/) - Redundant entry
- [Names](/patterns/names/) - Redundant entry
- [National Insurance numbers](/patterns/national-insurance-numbers/) - Accessible authentication and Redundant entry
- [Passwords](/patterns/passwords/) - Accessible authentication and Target size
- [Payment card details](/patterns/payment-card-details/) - Redundant entry
- [Recover from validation errors](/patterns/validation/) - Consistent help
- [Start using a service](/patterns/start-using-a-service/) - Focus appearance
- [Step by step navigation](/patterns/step-by-step-navigation/) - Focus appearance, Focus not obscured (minimum) and Target size (minimum)
- [Task list pages](/patterns/task-list-pages/) - Dragging movements, Focus appearance and Redundant entry
- [Telephone numbers](/patterns/telephone-numbers/) - Redundant entry
- [There is a problem with the service pages](/patterns/problem-with-the-service-pages/) - Redundant entry
- [Question pages](/patterns/question-pages/) - Redundant entry
