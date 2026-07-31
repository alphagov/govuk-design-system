---
title: Generic header - Change history
layout: layout-pane.njk
---

{% from "govuk/components/table/macro.njk" import govukTable %}

Change history for [Generic header](/components/text-input).

<div class="app-changelog-table">

{{ govukTable({
  caption: "Generic header change history",
  head: [
    {
      text: "Date"
    },
    {
      text: "Version"
    },
    {
      text: "Changes"
    }
  ],
  rows: [
    [
      {
        text: "26 Mar 2024"
      },
      {
        text: "5.3.0"
      },
      {
        text: "Component introduced."
      }
    ],
    [
      {
        text: "19 Apr 2024"
      },
      {
        text: "5.3.1"
      },
      {
        text: "Fixed issue with button growing larger if the text input has a capped width."
      }
    ],
    [
      {
        text: "17 May 2024"
      },
      {
        text: "5.4.0"
      },
      {
        text: "Removed duplicate `errorMessage` parameter."
      }
    ],
    [
      {
        text: "4 Mar 2025"
      },
      {
        text: "5.9.0"
      },
      {
        text: "The `id` parameter now defaults to match `name` if an `id` isn't provided."
      }
    ]
  ]
}) }}

</div>
