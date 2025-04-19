---
title: Type scale
description: The type scale underpins all of the text styles on GOV.UK
section: Styles
backlogIssueId: 64
theme: Typography
layout: layout-pane.njk
order: 6
---

{% from "_example.njk" import example %}

{% from "govuk/components/details/macro.njk" import govukDetails %}
{% from "govuk/components/table/macro.njk" import govukTable %}

{% include "_new-type-scale.njk" %}

The type scale is a collection of font sizes and line heights that underpin all of the typographic styles on GOV.UK. It has been [tested and iterated](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible/) for readability on different devices.

When creating new components, always start by using the existing typography styles. If you need to create a new style, align it with one of the points on the type scale.

## How it works

Like the [spacing scale](/styles/spacing/), every point on the type scale uses a line height in a multiple of 5px. This creates a consistent vertical rhythm, which makes pages easier to scan and read.

GOV.UK Frontend outputs CSS in relative units like `em` or `rem`. This helps the type resize better when zoomed or magnified. We've used pixels (px) here so it's easier to understand.

## Responsive behaviour

The type scale changes based on screen size.

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
        text: "80"
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
        text: "48"
      },
      {
        html: "<code>govuk-heading-xl</code>"
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
        text: "36"
      },
      {
        html: "<code>govuk-heading-l</code>"
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
        text: "27"
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
        text: "24"
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
        text: "19"
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
        text: "16"
      },
      {
        html: "<code>govuk-body-s</code>"
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
        text: "80"
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
        text: "48"
      },
      {
        html: "<code>govuk-heading-xl</code>"
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
        text: "36"
      },
      {
        html: "<code>govuk-heading-l</code>"
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
        text: "27"
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
        text: "24"
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
        text: "19"
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
        text: "16"
      },
      {
        html: "<code>govuk-body-s</code>"
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

### The old type scale

In February 2024, we updated the type scale in GOV.UK Frontend v5.2 to make text easier to read on small screens. While the new type scale is behind a feature flag, you can still view the old type scale.

{% set oldScaleTable %}
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
          text: "80"
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
          text: "48"
        },
        {
          html: "<code>govuk-heading-xl</code>"
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
          text: "36"
        },
        {
          html: "<code>govuk-heading-l</code>"
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
          text: "27"
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
          text: "24"
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
          text: "19"
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
          text: "16"
        },
        {
          html: "<code>govuk-body-s</code>"
        },
        {
          text: "16px",
          format: "numeric"
        },
        {
          text: "20px",
          format: "numeric"
        }
      ],
      [
        {
          text: "14"
        },
        {
          html: "<code>govuk-body-xs</code>"
        },
        {
          text: "14px",
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
    classes: "govuk-!-margin-bottom-6",
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
          text: "80"
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
          text: "48"
        },
        {
          html: "<code>govuk-heading-xl</code>"
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
          text: "36"
        },
        {
          html: "<code>govuk-heading-l</code>"
        },
        {
          text: "24px",
          format: "numeric"
        },
        {
          text: "25px",
          format: "numeric"
        }
      ],
      [
        {
          text: "27"
        },
        {
          text: "Only used in exceptional circumstances"
        },
        {
          text: "18px",
          format: "numeric"
        },
        {
          text: "20px",
          format: "numeric"
        }
      ],
      [
        {
          text: "24"
        },
        {
          html: "<code>govuk-heading-m</code>, <code>govuk-body-l</code>"
        },
        {
          text: "18px",
          format: "numeric"
        },
        {
          text: "20px",
          format: "numeric"
        }
      ],
      [
        {
          text: "19"
        },
        {
          html: "<code>govuk-heading-s</code>, <code>govuk-body</code>"
        },
        {
          text: "16px",
          format: "numeric"
        },
        {
          text: "20px",
          format: "numeric"
        }
      ],
      [
        {
          text: "16"
        },
        {
          html: "<code>govuk-body-s</code>"
        },
        {
          text: "14px",
          format: "numeric"
        },
        {
          text: "16px",
          format: "numeric"
        }
      ],
      [
        {
          text: "14"
        },
        {
          html: "<code>govuk-body-xs</code>"
        },
        {
          text: "12px",
          format: "numeric"
        },
        {
          text: "15px",
          format: "numeric"
        }
      ]
    ]
  }) }}
{% endset %}

{{ govukDetails({
  summaryText: "View the old type scale",
  html: oldScaleTable
}) }}

## Using the type scale in your own CSS

Include the [`govuk-font` mixin](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-font) to use GOV.UK typography in your CSS.

For example, if you want a custom element to use type scale point 19, use:

```scss
@include govuk-font($size: 19);
```

You can add additional arguments to control font weight, use tabular font spacing, or to override the line height:

```scss
@include govuk-font($size: 19, $weight: bold, $tabular: true);
```

### If you only want to set the font size

Do not use `govuk-font` if you only want to change the font size and line height as it includes additional typography-related CSS like the New Transport font family. Instead, you should use the [`govuk-font-size` mixin](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-font-size):

```scss
@include govuk-font-size($size: 19);
```
