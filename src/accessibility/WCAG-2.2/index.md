---
title: Changes to the Design System to meet WCAG 2.2
description: Outlines the current principles and work needed to improve the accessibility of the GOV.UK Design System
section: Accessibility
layout: layout-pane.njk
showPageNav: true
order: 2
---

{% from "govuk/components/table/macro.njk" import govukTable %}

W3C owns and manages the [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/). 

In 2023, the Design Systme team assessed and updated the GOV.UK Design System to comply with the new criteria and recommendations given in WCAG 2.2.

Any guidance we provide is to make sure teams using the Design System are aware of the changes and can make the necessary adjustments to their services.

### Make sure your service meets the new WCAG 2.2 criteria
WCAG 2.2 was published in October 2023. You’ll need to comply with the new criteria no later than October 2024. See more about [Meeting government accessibility requirements](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag) in the GOV. UK Service Manual.

### What you need to do
1. Revisit the [Government Digital Service (GDS) guidance](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps) on accessibility is and why your service needs to invest in it
2. Read the [What’s new in WCAG 2.2 draft](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) to understand the new criteria your service will need to comply with
3. Ask your wider organisation for support to prepare for work needed to meet WCAG 2.2
4. Review the lists on this page of affected components and patterns in the Design System
5. Assess your service to see how many affected components and patterns are in use
6. Plan and implement the changes needed to your service

Make sure there's expertise within your organisation by advocating for people to receive training in accessibility. To provide some help with this, the Design System team is organising peer support groups for service teams to share information with each other.

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
