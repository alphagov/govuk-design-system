---
layout: layout-pane.njk
title: Using the updated type scale
section: Get started
theme: How to guides
order: 6
description: The GOV.UK Design System team has updated the GOV.UK Frontend type scale used in version 6.0.0 and later. Here's how to use it, what's changed and what to expect when implementing it into your service.
---

{% from "govuk/components/table/macro.njk" import govukTable %}
{% from "govuk/components/warning-text/macro.njk" import govukWarningText %}

The GOV.UK Design System team has updated the GOV.UK Frontend type scale used in version 6.0.0 and later.

Here's how to use it, what's changed and what to expect when implementing the update to your service.

## Changes we've made

The updated type scale includes these changes from the previous scale:

{{ govukTable({
    caption: "Changes to the type scale",
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
                text: "Deprecated as a scale point and removed in GOV.UK Frontend version 6.0.0 and later"
            }
        ],
        [
            {
                text: "16"
            },
            {
                text: "Now 16px across all screen sizes"
            }
        ],
        [
            {
                text: "19"
            },
            {
                text: "Now 19px across all screen sizes"
            }
        ],
        [
            {
                text: "24"
            },
            {
                text: "On small screens, is now font size 21px instead of 18px and line height 25px instead of 20px"
            }
        ],
        [
            {
                text: "27"
            },
            {
                text: "On small screens, is now font size 21px instead of 18px and line height 25px instead of 20px"
            }
        ],
        [
            {
                text: "36"
            },
            {
                text: "On small screens, is now font size 27px instead of 24px and line height 30px instead of 25px"
            }
        ]
    ]
}) }}

### Making our typography scale more accessible

[Read more about this work and why we updated our type scale](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible/).

### Remove the $govuk-new-typography-scale feature flag

The updated type scale was first introduced as an 'opt in' feature under a feature flag. You no longer need to use the `$govuk-new-typography-scale` Sass variable and should remove it.

## Test your service against the updated type scale

If your service uses custom elements made using GOV.UK Frontend, test your service against the new type scale to assess if you need to make any adjustments.

Some key things to look for are:

- spacing – with the increased font sizes, your custom elements may now look squashed on small screens.
- specific positioning values – you may need to adjust these values, for example an `absolute` positioned element
