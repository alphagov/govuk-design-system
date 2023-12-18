---
title: Type scale
description: The type scale underpins all of the text styles on GOV.UK
section: Styles
theme: Typography
layout: layout-pane.njk
order: 3
---

{% from "_example.njk" import example %}

{% from "govuk/components/table/macro.njk" import govukTable %}

The type scale is a collection of font sizes and line heights that underpin all of the typography styles on GOV.UK. It has been tested and [iterated](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible/) for readability on different devices.

When creating new components, always start by using the existing typography styles. If you need to create a new style, align it with one of the points on the type scale.

## How it works

Like the [spacing](/styles/spacing/) scale, every point on the type scale uses a line height in a multiple of 5px. This creates a consistent vertical rhythm, which makes pages easier to scan and read.

(Something about how Frontend outputs things in relative units but we use pixels here for easy communication etc.)

## Responsive behaviour

The type scale adapts based on screen size.

The scale for ‘large screens’ is used when the screen is wider than the tablet breakpoint (640px).

{{ govukTable({
  caption: "Large screens",
  captionClasses: "govuk-table__caption--m",
  head: [
    {
      text: "Point on type scale"
    },
    {
      text: "Used by"
    },
    {
      text: "Font size",
      format: "numeric"
    },
    {
      text: "Line height",
      format: "numeric"
    }
  ],
  rows: [
    [
      {
        text: "XXL"
      },
      {
        text: "Only used in exceptional circumstances"
      },
      {
        text: "80px",
        format: "numeric"
      },
      {
        text: "80px",
        format: "numeric"
      }
    ],
    [
      {
        text: "XL"
      },
      {
        html: "<code>govuk-heading-xl<code>"
      },
      {
        text: "48px",
        format: "numeric"
      },
      {
        text: "50px",
        format: "numeric"
      }
    ],
    [
      {
        text: "L"
      },
      {
        html: "<code>govuk-heading-l<code>"
      },
      {
        text: "36px",
        format: "numeric"
      },
      {
        text: "40px",
        format: "numeric"
      }
    ],
    [
      {
        text: "M+"
      },
      {
        text: "Only used in exceptional circumstances"
      },
      {
        text: "27px",
        format: "numeric"
      },
      {
        text: "30px",
        format: "numeric"
      }
    ],
    [
      {
        text: "M"
      },
      {
        html: "<code>govuk-heading-m</code>, <code>govuk-body-l</code>"
      },
      {
        text: "24px",
        format: "numeric"
      },
      {
        text: "30px",
        format: "numeric"
      }
    ],
    [
      {
        text: "S"
      },
      {
        html: "<code>govuk-heading-s</code>, <code>govuk-body</code>"
      },
      {
        text: "19px",
        format: "numeric"
      },
      {
        text: "25px",
        format: "numeric"
      }
    ],
    [
      {
        text: "XS"
      },
      {
        html: "<code>govuk-body-s<code>"
      },
      {
        text: "16px",
        format: "numeric"
      },
      {
        text: "20px",
        format: "numeric"
      }
    ]
  ]
}) }}

{{ govukTable({
  caption: "Small screens",
  captionClasses: "govuk-table__caption--m",
  head: [
    {
      text: "Point on type scale"
    },
    {
      text: "Used by"
    },
    {
      text: "Font size",
      format: "numeric"
    },
    {
      text: "Line height",
      format: "numeric"
    }
  ],
  rows: [
    [
      {
        text: "XXL"
      },
      {
        text: "Only used in exceptional circumstances"
      },
      {
        text: "53px",
        format: "numeric"
      },
      {
        text: "55px",
        format: "numeric"
      }
    ],
    [
      {
        text: "XL"
      },
      {
        html: "<code>govuk-heading-xl<code>"
      },
      {
        text: "32px",
        format: "numeric"
      },
      {
        text: "35px",
        format: "numeric"
      }
    ],
    [
      {
        text: "L"
      },
      {
        html: "<code>govuk-heading-l<code>"
      },
      {
        text: "27px",
        format: "numeric"
      },
      {
        text: "30px",
        format: "numeric"
      }
    ],
    [
      {
        text: "M+"
      },
      {
        text: "Only used in exceptional circumstances"
      },
      {
        text: "21px",
        format: "numeric"
      },
      {
        text: "25px",
        format: "numeric"
      }
    ],
    [
      {
        text: "M"
      },
      {
        html: "<code>govuk-heading-m</code>, <code>govuk-body-l</code>"
      },
      {
        text: "21px",
        format: "numeric"
      },
      {
        text: "25px",
        format: "numeric"
      }
    ],
    [
      {
        text: "S"
      },
      {
        html: "<code>govuk-heading-s</code>, <code>govuk-body</code>"
      },
      {
        text: "19px",
        format: "numeric"
      },
      {
        text: "25px",
        format: "numeric"
      }
    ],
    [
      {
        text: "XS"
      },
      {
        html: "<code>govuk-body-s<code>"
      },
      {
        text: "16px",
        format: "numeric"
      },
      {
        text: "20px",
        format: "numeric"
      }
    ]
  ]
}) }}
