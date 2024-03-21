---
layout: layout-pane.njk
title: Community
description: Everyone can help improve the Design System by joining our community discussions, events and co-design collaborations
showSubNav: true
---

{% from "_image-card.njk" import imageCard %}

Everyone can help improve the Design System by joining our community discussions, events and co-design collaborations.

We depend on a strong cross-government community to ensure the Design System includes the latest research, design and development to represent and be relevant for its users. Read our [community principles](/community/community-principles/).

### Sign up to our mailing list

[Find out when we announce new events, workshops and ask for help from our community](https://mailchi.mp/707ce8dec373/get-updated-by-email-govuk-design-system).

<hr class="govuk-section-break govuk-section-break--visible">

## Join the conversation

Here’s a few places to join the discussions that help shape the Design System.

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full govuk-grid-column-one-half-from-desktop">
    {%- call imageCard({
      src: "/community/images/chat-with-us-on-slack.svg",
      alt: "Slack conversation illustration.",
      title: "Chat with us on Slack"
    }) %}
      <p>If you work in government, find us on the <a href="https://ukgovernmentdigital.slack.com/archives/C6DMEH5R6">#govuk-design-system Slack channel</a> to get support, give us feedback or share your work with us.</p>
    {% endcall %}
  </div>
  <div class="govuk-grid-column-full govuk-grid-column-one-half-from-desktop">
    {%- call imageCard({
      src: "/community/images/discuss-and-give-feedback.svg",
      alt: "Github issue illustration.",
      title: "Discuss and give feedback"
    }) %}
      <p>Tell us your experience using our components and patterns. Look for the ‘Help improve this page’ section at the end of each page to see its issue discussion, or <a href="https://github.com/alphagov/govuk-design-system-backlog/issues">see a list of all discussions</a>.</p>
    {% endcall %}
  </div>
  <div class="govuk-grid-column-full govuk-grid-column-one-half-from-desktop">
    {%- call imageCard({
      src: "/community/images/share-your-examples-and-research.svg",
      alt: "Share your examples and research section illustration.",
      title: "Share your examples and research",
      classes: "govuk-!-margin-bottom-2"
    }) %}
      <p>We want to hear how existing components and patterns perform in your service, not just <a href="https://design-system.service.gov.uk/community/upcoming-components-patterns/">what we’re working on</a>. Follow our research template to <a href="https://design-system.service.gov.uk/community/share-research-findings/">share findings about your users.</a></p>
    {% endcall %}
  </div>
  <div class="govuk-grid-column-full govuk-grid-column-one-half-from-desktop">
    {%- call imageCard({
      src: "/community/images/propose-a-change-to-pages.svg",
      alt: "Github propose a change illustration.",
      title: "Propose a change to pages",
      classes: "govuk-!-margin-bottom-2"
    }) %}
      <p>Anyone can suggest an improvement, report a bug or correct an error on our pages. Look for the ‘Help improve this page’ section at the end of each page to <a href="https://design-system.service.gov.uk/community/propose-a-content-change-using-github/">propose a change using GitHub</a>.</p>
    {% endcall %}
  </div>
</div>

<hr class="govuk-section-break govuk-section-break--visible">

## Attend our events

Join one of our regular events where we share ideas and work together to solve common problems affecting service teams.

    {%- call imageCard({
      src: "/community/images/catchup-call-groupshot.jpg",
      alt: "Catchup call screenshot.",
      title: "Design systems monthly catchup",
      large: true
    }) %}
      <p>Every month, we host an informal catchup with our community.</p>
      <p>Hosted on Zoom, the call usually includes a show and tell from the Design System team and contributors, followed by group discussions where everyone can participate.</p>
      <p><a href="https://mailchi.mp/707ce8dec373/get-updated-by-email-govuk-design-system">Sign up to our mailing list</a> to find out when we announce the next call, so you can register.</p>
    {% endcall %}

    {%- call imageCard({
      src: "/community/images/workshop.jpg",
      alt: "Table with post-it notes, pens and paper.",
      title: "Join a Workshop",
      large: true
    }) %}
        <p>We often organise workshops to gather ideas and feedback about work we’re doing, particularly when we know it will affect service teams. If you’d like to help the next time we do, <a href="https://mailchi.mp/707ce8dec373/get-updated-by-email-govuk-design-system">sign up to our mailing list</a>.</p>
    {% endcall %}

    {%- call imageCard({
      src: "/community/images/dsday23-logo.svg",
      alt: "Design System Day 2023 Logo.",
      title: "Design System Day",
      large: true
    }) %}
      <p>Every year, we host an online conference to collaborate and share knowledge about design systems with like-minded people, covering topics like accessibility, community and decision-making.</p>
      <p>Design System Day 2023 took place on 10 and 11 October. <a href="/community/design-system-day-2023/session-information/">View videos, session information and speaker biographies from the event</a>.</p>
    {% endcall %}

<hr class="govuk-section-break govuk-section-break--visible">

## Collaborate and co-design

We’ve also formed cross-government groups to co-design new additions to the Design System. They’re open to everyone that’s interested in working with us.

<img src="/community/images/maps-collab-group.jpg" alt="Maps community call screenshot." class="app-image--no-border govuk-!-margin-bottom-6" loading="lazy">

### Maps in services

Help us explore best practices for the use of maps across the public sector so we can make them more accessible and consistent.

[Join the Maps Slack group](https://join.slack.com/t/mapsinservices/shared_invite/zt-163npa168-e5EREuQZU3NqwfdojWw2ew).

<hr class="govuk-section-break govuk-section-break--visible">

## Propose and help build a component or pattern

If you’d like to take a bigger role to bring a new component or pattern into the Design System, the Design System team can support you. The team can also work with you to ‘upstream’ something you’ve already built into the Design System.

Find out:

- about the [upcoming components and patterns](/community/upcoming-components-patterns/) we’ve prioritised and chosen to work on
- how to [propose a component or pattern](/community/propose-a-component-or-pattern/)
- how to [develop a component or pattern](/community/develop-a-component-or-pattern/)

Learn how the [Design System working group](/community/design-system-working-group/) reviews and approves components and patterns to confirm they meet the [contribution criteria](/community/contribution-criteria/).
