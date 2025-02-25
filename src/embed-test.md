---
title: Test Embed Page
description: Description
layout: layout-pane.njk
order: 16
draft: true
ignoreInSitemap: true
---

{% from "_embed-card.njk" import embedCard %}

{% from "_cookie-banner.njk" import cookieBanner %}

## Test Page

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
  title: "Test Video"
}) %}
{% endcall %}
