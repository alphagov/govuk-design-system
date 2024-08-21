---
title: Day 1
description: Description
layout: layout-pane.njk
order: 16
draft: true
ignoreInSitemap: true
---

{% from "_embed-card.njk" import embedCard %}

{% from "_cookie-banner.njk" import cookieBanner %}

<p class="govuk-body-l">
  Day one was online and happened on the 5th of May 2024. An overview of day one activities could go here.
</p>

<img class="app-image--no-border govuk-!-margin-bottom-9" src="/images/dsd24-24.svg" alt="" role="presentation">

## Watch the Day 1 talks

{% set html %}

  <p class="govuk-body">You'll need to accept cookies to watch the videos on this page.</p>
  <p class="govuk-body">If you don't want to accept cookies, the videos and transcripts are also available on YouTube.</p>
{% endset %}

{% set acceptHtml %}

  <p class="govuk-body">You’ve accepted campaign cookies. You can <a class="govuk-link" href="/cookies/">change your cookie settings</a> at any time.</p>
{% endset %}

{% set rejectHtml %}

  <p class="govuk-body">You’ve rejected campiagn cookies. You can <a class="govuk-link" href="/cookies/">change your cookie settings</a> at any time.</p>
{% endset %}

{% call cookieBanner({
  html: html,
  acceptHtml: acceptHtml,
  rejectHtml: rejectHtml,
  category: "campaign",
  classes: "app-campaign-cookie-banner govuk-!-padding-right-5 govuk-!-padding-left-5 govuk-!-margin-bottom-5",
  title: "Accept additional cookies to watch videos of Design System Day"
}) %}{% endcall %}

{% call embedCard({
  ytId: "x91MPoITQ3I",
  transcriptHref: "https://www.google.com",
  authorImgSrc: "/images/dsd24-day1-speakers1.png",
  title: "The GOV.UK Design System in 5 years Video"
}) %}

  <h3><a href="#">The GOV.UK Design System in 5 years</a></h3>
  <p>Trang Erskine, Charlotte Downs and Romaric Pascal, GOV.UK Design System</p>
  <p>A show &amp; tell exploring the history of the Design System, and our focus for the next few years</p>
{% endcall %}
