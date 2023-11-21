---
title: Changes to the Design System to meet WCAG 2.2
description: Outlines the current principles and work needed to improve the accessibility of the GOV.UK Design System
section: Accessibility
layout: layout-pane.njk
showPageNav: true
order: 2
---

{% from "govuk/components/table/macro.njk" import govukTable %}

W3C [owns and manages the Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/). The Design System team has updated the Design System to meet WCAG 2.2. Any guidance we provide is to make sure teams using the Design System are aware of the changes and can make the necessary adjustments to their services.

### Make sure your service meets the new WCAG 2.2 criteria
WCAG 2.2 is expected to be completed and published between July and September 2023. You’ll need to comply with the new criteria no later than one year after WCAG 2.2 is published.

### What you need to do
1. Revisit the [GDS guidance](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps) on accessibility is and why your service needs to invest in it
2. Read the [What’s new in WCAG 2.2 draft](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) to understand the new criteria your service will need to comply with
3. Ask your wider organisation for support to prepare for work needed to meet WCAG 2.2
4. Review the lists on this page of affected components and patterns in the Design System
5. Assess your service to see how many affected components and patterns are in use
6. Plan and implement the changes needed to your service

Make sure there's expertise within your organisation by advocating for people to receive training in accessibility. To provide some help with this, the Design System team is organising peer support groups for service teams to share information with each other.

<!--


### Components affected in the Design System
The following components have WCAG 2.2 AA changes included. You must check if your service needs amending to align with these changes.

- [Back link](/components/back-link/) – Redundant entry and Target size (minimum)
- [Breadcrumbs](/components/breadcrumbs/) – Target size (minimum)
- [Button](/components/button/) – Target size (minimum)
- [Cookie banner](/components/cookie-banner/) – Focus not obscured (minimum) and Target size (minimum)
- [Error message](/components/error-message/) – Redundant entry
- [File upload](/components/file-upload/) – Dragging movements and Redundant entry
- [Footer](/components/footer/) – Consistent help
- [Header](/components/header/) – Focus not obscured (Minimum) and Focus appearance
- [Panel](/components/panel/) – Redundant entry
- [Phase banner](/components/phase-banner/) – Focus not obscured (minimum)
- [Select](/components/select/) – Dragging movements
- [Summary list](/components/summary-list/) – Redundant entry and Target size (minimum)
- [Tag](/components/tag/) – Dragging movements and Focus appearance

### Patterns affected in the Design System
The following patterns have WCAG 2.2 AA changes included. You must check if your service needs amending to align with these changes.

Ask users for:

- [Addresses](/patterns/addresses/) - Redundant entry
- [Bank details](/patterns/bank-details/) - Redundant entry
- [Email addresses](/patterns/email-addresses/) - Redundant entry
- [Equality information](/patterns/equality-information/) - Redundant entry
- [Names](/patterns/names/) - Redundant entry
- [National Insurance numbers](/patterns/national-insurance-numbers/) - Redundant entry
- [Passwords](/patterns/passwords/) - Accessible authentication, Consistent help and Target size (minimum)
- [Payment card details](/patterns/payment-card-details/) - Redundant entry

Help users to:

- [Check a service is suitable](/patterns/check-a-service-is-suitable/) - Redundant entry
- [Check answers](/patterns/check-answers/) - Redundant entry
- [Confirm a phone number](/patterns/confirm-a-phone-number/)  - Consistent help
- [Confirm an email address](/patterns/confirm-an-email-address/) - Accessible authentication
- [Contact a department or service team](/patterns/contact-a-department-or-service-team/) – Consistent help
- [Create accounts](/patterns/create-accounts/) - Accessible authentication and Redundant entry
- [Start using a service](/patterns/start-using-a-service/) - Focus appearance
- [Recover from validation errors](/patterns/validation/) - Redundant entry

Pages:
- [Confirmation pages](/patterns/confirmation-pages/) - Dragging movements, Focus appearance and Redundant entry
- [Cookies page](/patterns/cookies-page/) - Redundant entry
- [Page not found pages](/patterns/page-not-found-pages/) - Consistent help
- [Question pages](/patterns/question-pages/) - Redundant entry
- [Service unavailable pages](/patterns/service-unavailable-pages/) - Consistent help
- [Task list pages](/patterns/task-list-pages/) - Dragging movements and Redundant entry
- [There is a problem with the service pages](/patterns/problem-with-the-service-pages/) - Consistent help and Redundant entry


### [VARIANT DRAFT] Components and patterns affected in the Design System

The following components and patterns have WCAG 2.2 AA changes included. You must check if your service needs amending to align with these changes.

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Components</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Component</th>
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Relevant WCAG 2.2 criteria</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/back-link/">Back link</a></th>
      <td class="govuk-table__cell">Redundant entry<br>Target size (minimum)</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/breadcrumbs/">Breadcrumbs</a></th>
      <td class="govuk-table__cell">Target size (minimum)</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/button/">Button</a></th>
      <td class="govuk-table__cell">Target size (minimum)</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/cookie-banner/">Cookie banner</a></th>
      <td class="govuk-table__cell">Focus not obscured (minimum)<br>Target size (minimum)</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/error-message/">Error message</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/file-upload/">File upload</a></th>
      <td class="govuk-table__cell">Dragging movements<br>Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/footer/">Footer</a></th>
      <td class="govuk-table__cell">Consistent help</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/header/">Header</a></th>
      <td class="govuk-table__cell">Focus not obscured (Minimum)<br>Focus appearance</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/panel/">Panel</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/phase-banner/">Phase banner</a></th>
      <td class="govuk-table__cell">Focus not obscured (minimum)</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="(/components/select/">Select</a></th>
      <td class="govuk-table__cell">Dragging movements</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/summary-list/">Summary list</a></th>
      <td class="govuk-table__cell">Redundant entry<br>Target size (minimum)</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/components/tag/">Tag</a></th>
      <td class="govuk-table__cell">Dragging movements<br>Focus appearance</td>
    </tr>
  </tbody>

</table>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Patterns to ask users for information</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Ask users for...</th>
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Relevant WCAG 2.2 criteria</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/addresses/">Addresses</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/bank-details/">Bank details</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns-email-addresses/">Email addresses</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/equality-information/">Equality information</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/names/">Names</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/national-insurance-numbers/">National Insurance Numbers</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/passwords/">Passwords</a></th>
      <td class="govuk-table__cell">Accessible authentication<br>Consistent help<br>Target size (minimum)
</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/payment-card-details/">Payment card details</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
  </tbody>
</table>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Patterns to help users</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Help users to...</th>
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Relevant WCAG 2.2 criteria</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/check-a-service-is-suitable/">Check a service is suitable</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/check-answers/">Check answers</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/confirm-a-phone-number/">Confirm a phone number</a></th>
      <td class="govuk-table__cell">Consistent help</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/confirm-an-email-address/">Confirm an email address</a></th>
      <td class="govuk-table__cell">Accessible authentication</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/contact-a-department-or-service-team/">Contact a department or service team</a></th>
      <td class="govuk-table__cell">Consistent help</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/create-accounts/">Create accounts</a></th>
      <td class="govuk-table__cell">Accessible authentication<br>Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/start-using-a-service/">Start using a service</a></th>
      <td class="govuk-table__cell">Focus appearance</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/recover-from-validation-errors/">Recover from validation errors</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
  </tbody>
</table>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Page patterns</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Page</th>
      <th scope="col" class="govuk-table__header govuk-!-width-one-half">Relevant WCAG 2.2 criteria</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/confirmation-pages/">Confirmation pages</a></th>
      <td class="govuk-table__cell">Dragging movements<br>Focus appearance<br>Redundant entry
</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/cookies-page/">Cookies page </a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/page-not-found-pages/">Page not found pages</a></th>
      <td class="govuk-table__cell">Consistent help</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/question-pages/">Question pages</a></th>
      <td class="govuk-table__cell">Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/service-unavailable-pages/">Service unavailable pages</a></th>
      <td class="govuk-table__cell">Consistent help</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/task-list-pages/">Task list pages</a></th>
      <td class="govuk-table__cell">Dragging movements<br>Redundant entry</td>
    </tr>
        <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/patterns/problem-with-the-service-pages/">There is a problem with the service pages</a></th>
      <td class="govuk-table__cell">Consistent help<br>Redundant entry</td>
    </tr>
  </tbody>
</table>

--->

### Components and patterns affected in the Design System

The following components and patterns have WCAG 2.2 AA changes included. You must check if your service needs amending to align with these changes.

{{ govukTable({
  caption: "Components",
  captionClasses: "govuk-table__caption--m",
  head: [
    {
      text: "Component",
      classes: "govuk-!-width-one-half"
    },
    {
      text: "Relevant WCAG 2.2 criteria",
      classes: "govuk-!-width-one-half"
    }
  ],
  rows: [
    [
      {
        html: '<a href="/components/back-link/">Back link</a>'
      },
      {
        html: 'Redundant entry<br>Target size (minimum)'
      }
    ],
    [
      {
        html: '<a href="/components/breadcrumbs/">Breadcrumbs</a>'
      },
      {
        html: 'Target size (minimum)'
      }
    ],
    [
      {
        html: '<a href="/components/button/">Button</a>'
      },
      {
        html: 'Target size (minimum)'
      }
    ],
    [
      {
        html: '<a href="/components/cookie-banner/">Cookie banner</a>'
      },
      {
        html: 'Focus not obscured (minimum)<br>Target size (minimum)'
      }
    ],
    [
      {
        html: '<a href="/components/error-message/">Error message</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/components/file-upload/">File upload</a>'
      },
      {
        html: 'Dragging movements<br>Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/components/footer/">Footer</a>'
      },
      {
        html: 'Consistent help'
      }
    ],
    [
      {
        html: '<a href="/components/header/">Header</a>'
      },
      {
        html: 'Focus not obscured (Minimum)<br>Focus appearance'
      }
    ],
    [
      {
        html: '<a href="/components/panel/">Panel</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/components/phase-banner/">Phase banner</a>'
      },
      {
        html: 'Focus not obscured (minimum)'
      }
    ],
    [
      {
        html: '<a href="(/components/select/">Select</a>'
      },
      {
        html: 'Dragging movements'
      }
    ],
    [
      {
        html: '<a href="/components/summary-list/">Summary list</a>'
      },
      {
        html: 'Redundant entry<br>Target size (minimum)'
      }
    ],
    [
      {
        html: '<a href="/components/tag/">Tag</a>'
      },
      {
        html: 'Dragging movements<br>Focus appearance'
      }
    ]
  ]
}) }}

{{ govukTable({
  caption: "Patterns to ask users for information",
  captionClasses: "govuk-table__caption--m",
  head: [
    {
      text: "Ask users for...",
      classes: "govuk-!-width-one-half"
    },
    {
      text: "Relevant WCAG 2.2 criteria",
      classes: "govuk-!-width-one-half"
    }
  ],
  rows: [
    [
      {
        html: '<a href="/patterns/addresses/">Addresses</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/bank-details/">Bank details</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns-email-addresses/">Email addresses</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/equality-information/">Equality information</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/names/">Names</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/national-insurance-numbers/">National Insurance Numbers</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],    
    [
      {
        html: '<a href="/patterns/passwords/">Passwords</a>'
      },
      {
        html: 'Accessible authentication<br>Consistent help<br>Target size (minimum)'
      }
    ],
    [
      {
        html: '<a href="/patterns/payment-card-details/">Payment card details</a>'
      },
      {
        html: 'Redundant entry'
      }
    ]
  ]
}) }}

{{ govukTable({
  caption: "Patterns to help users do things",
  captionClasses: "govuk-table__caption--m",
  head: [
    {
      text: "Help users to...",
      classes: "govuk-!-width-one-half"
    },
    {
      text: "Relevant WCAG 2.2 criteria",
      classes: "govuk-!-width-one-half"
    }
  ],
  rows: [
    [
      {
        html: '<a href="/patterns/check-a-service-is-suitable/">Check a service is suitable</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/check-answers/">Check answers</a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/confirm-a-phone-number/">Confirm a phone number</a>'
      },
      {
        html: 'Consistent help'
      }
    ],
    [
      {
        html: '<a href="/patterns/confirm-an-email-address/">Confirm an email address</a>'
      },
      {
        html: 'Accessible authentication'
      }
    ],
    [
      {
        html: '<a href="/patterns/contact-a-department-or-service-team/">Contact a department or service team</a>'
      },
      {
        html: 'Consistent help'
      }
    ],
    [
      {
        html: '<a href="/patterns/create-accounts/">Create accounts</a>'
      },
      {
        html: 'Accessible authentication<br>Redundant entry'
      }
    ],    
    [
      {
        html: '<a href="/patterns/start-using-a-service/">Start using a service</a>'
      },
      {
        html: 'Focus appearance'
      }
    ],
    [
      {
        html: '<a href="/patterns/recover-from-validation-errors/">Recover from validation errors</a>'
      },
      {
        html: 'Redundant entry'
      }
    ]
  ]
}) }}

{{ govukTable({
  caption: "Page patterns",
  captionClasses: "govuk-table__caption--m",
  head: [
    {
      text: "Page",
      classes: "govuk-!-width-one-half"
    },
    {
      text: "Relevant WCAG 2.2 criteria",
      classes: "govuk-!-width-one-half"
    }
  ],
  rows: [
    [
      {
        html: '<a href="/patterns/confirmation-pages/">Confirmation pages</a>'
      },
      {
        html: 'Dragging movements<br>Focus appearance<br>Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/cookies-page/">Cookies page </a>'
      },
      {
        html: 'Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/page-not-found-pages/">Page not found pages</a>'
      },
      {
        html: 'Consistent help'
      }
    ],
    [
      {
        html: '<a href="/patterns/question-pages/">Question pages</a>'
      },
      {
        html: 'Dragging movements<br>Redundant entry'
      }
    ],
    [
      {
        html: '<a href="/patterns/service-unavailable-pages/">Service unavailable pages</a>'
      },
      {
        html: 'Consistent help'
      }
    ],
    [
      {
        html: '<a href="/patterns/task-list-pages/">Task list pages</a>'
      },
      {
        html: 'Dragging movements<br>Redundant entry'
      }
    ],    
    [
      {
        html: '<a href="/patterns/problem-with-the-service-pages/">There is a problem with the service pages</a>'
      },
      {
        html: 'Redundant entry'
      }
    ]
  ]
}) }}