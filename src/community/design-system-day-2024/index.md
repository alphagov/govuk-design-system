---
title: Design System Day 2024
description: Description
section: Community
theme: Events and workshops
layout: layout-pane.njk
order: 15
---

{% from "_call-to-action.njk" import callToAction %}
{% from "_promo-banner.njk" import promoBanner %}

<p class="govuk-!-font-size-24">
Thanks to all who joined us in Liverpool for this year's face to face event!
</p>

Our latest event took place on Thursday 5 September 2024 at St George's Hall in Liverpool. 200 members of our community joined us to hear [a wide range of talks](/community/design-system-day-2024/session-information) on this year's theme 'unsung heroes of design systems' from our brilliant [speakers](/community/design-system-day-2024/speaker-information).

Each session was recorded and will be shared through [our mailing list](https://mailchi.mp/707ce8dec373/get-updated-by-email-govuk-design-system) in the coming months.

<img class="app-image--no-border govuk-!-margin-bottom-9" src="/images/dsd24-day3-speakers-image.png" alt="Panelists in conversation at the Design Day 2024 held in St. George's Hall, Liverpool">

## Day 3 is coming up in November

Join us online for our third and final Design System Day event of 2024.

{% call callToAction({
  subHeader: "Day 3 call for speakers",
  imageDesktop: "/images/dsd24-day3.svg",
  imageMobile: "/images/dsd24-day3-mob.svg",
  imagePosition: "top"
}) %}

  <table class="govuk-table">
    <tbody>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">
          Date
        </th>
        <td class="govuk-table__cell">
          28 November 2024
        </td>
      </tr>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">
          Location
        </th>
        <td class="govuk-table__cell">
          Online
        </td>
      </tr>
    </tbody>
  </table>
  <p class="govuk-!-font-size-24">
    This year our theme is ‘Unsung heroes of the Design System’.
  </p>
  <p>
    We’re looking for people who help keep the design system running without being noticed.
  </p>
  <p>
    If this sounds like something you’d be interested in, <a href="/community/call-for-speakers-2024">find out how to apply to speak at Design System Day</a>.
  </p>
{% endcall %}

{% call promoBanner({
  img: "/images/dsd24-mail.svg",
  padding: 5
}) %}

  <p>
    You can <a class="govuk-link" href="https://mailchi.mp/707ce8dec373/get-updated-by-email-govuk-design-system">sign up to our mailing list</a> to get the latest information on Design System Day events planned for this year.
  </p>
{% endcall %}
