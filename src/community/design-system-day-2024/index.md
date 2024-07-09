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

<img class="app-image--no-border govuk-!-margin-bottom-9" src="/images/dsd24-24.svg" alt="" role="presentation">

<p class="govuk-!-font-size-24">
  Design System Day is the GOV.UK Design System’s flagship event! It’s an opportunity to collaborate and share knowledge about design systems with like-minded people, covering topics like accessibility, community and decision-making.
</p>

It’s a space for anyone using design systems in government to share ideas and developments, learn from colleagues, and spark conversations on related topics.

In previous years we covered topics such as:

<ul>
  <li>design ethics</li>
  <li>designing for marginalised groups</li>
  <li>equity in design systems</li>
  <li>inclusivity by design</li>
  <li>managing contributions</li>
  <li>new web capabilities</li>
  <li>systems thinking</li>
  <li>working at scale</li>
</ul>

{% call callToAction({
  header: "Day 2 call for speakers",
  imageMobile: "/images/dsd24-tickets-mob.svg",
  imageDesktop: "/images/dsd24-tickets-desk.svg"
}) %}

  <table class="govuk-table">
    <tbody>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">
          Date
        </th>
        <td class="govuk-table__cell">
          Thursday 5 September 2024
        </td>
      </tr>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">
          Location
        </th>
        <td class="govuk-table__cell">
          St Georges Hall, Liverpool
        </td>
      </tr>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">
          Time
        </th>
        <td class="govuk-table__cell">
          9:45am to 4:30pm
        </td>
      </tr>
    </tbody>
  </table>
  <p
    class="govuk-!-padding-bottom-4"
  >
    This year our theme is ‘Unsung heroes of the Design System’. We’re looking for people who help keep the design system running without being noticed. If this sounds like something you’d be interested in, <a class="call-to-action-container__link govuk-link" href="/community/call-for-speakers-2024/"> find out how to apply to speak at Design System Day.</a>
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
