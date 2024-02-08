---
layout: layout-pane.njk
title: Updating your service to use the new type scale
section: Get started
theme: How to guides
order: 6
description: The GOV.UK Design System team has updated the GOV.UK Frontend type scale. This new scale is an available option to use now, but will be enforced by default in GOV.UK Frontend version 6.0.0. Here's how to use it, what's changed and what to expect when implementing it into your service.
---

{% from "govuk/components/table/macro.njk" import govukTable %}
{% from "govuk/components/warning-text/macro.njk" import govukWarningText %}

The GOV.UK Design System team has updated the GOV.UK Frontend type scale. This new scale is an available option to use now, but will be enforced by default in GOV.UK Frontend version 6.0.0. Here's how to use it, what's changed and what to expect when implementing it into your service.

## Changes we've made
The new typography scale includes the following changes from the previous scale:

{{ govukTable({
    caption: "Changes to the typography scale",
    captionClasses: "govuk-table__caption--m",
    head: [
        {
            text: "Point on type scale"
        },
        {
            text: "Change"
        }
    ],
    rows: [
        [
            {
                text: "14"
            },
            {
                text: "Deprecated as a scale value and will be removed in GOV.UK Frontend version 6.0.0"
            }
        ],
        [
            {
                text: "16"
            },
            {
                text: "16px across all screen sizes and no longer drops to 14px on small screens"
            }
        ],
        [
            {
                text: "19"
            },
            {
                text: "19px across all screen sizes and no longer drops to 16px on small screens"
            }
        ],
        [
            {
                text: "24"
            },
            {
                text: "21px instead of 18px on small screens, plus line height adjustment"
            }
        ],
        [
            {
                text: "27"
            },
            {
                text: "21px instead of 18px on small screens, plus line height adjustment"
            }
        ],
        [
            {
                text: "36"
            },
            {
                text: "27px instead of 24px on small screens, plus line height adjustment"
            }
        ]
    ]
}) }}

[Read more about this work and why we're updating our typography scale](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible/).

## How to use the new typography scale
You can opt into the new scale by setting the feature flag variable `$govuk-new-typography-scale` at the root of your service's Sass to `true`:

```scss
$govuk-new-typography-scale: true;
```

This will automatically use the new typography scale. You do not need to change any of your Sass to use the new scale.

{{ govukWarningText({
  text: "This is an early release of the new typography scale. We may release significant changes to the scale in releases between now and GOV.UK Frontend 6.0.0. Please read the version release notes to see if you are affected."
}) }}

## Testing your service against the new typography scale
If your service uses custom elements made using GOV.UK Frontend, test your service against the new typography scale to assess if you need to make any adjustments. Some key things to look for are:

- spacing – With the increased font sizes, your custom elements may now look squashed on small screens.
- specific positioning values – you may need to adjust these values, for example an `absolute` positioned element 
