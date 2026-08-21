---
title: Feedback
description: Ask users to give their feedback about your service at any point of the journey
section: Components
discussionId: 4978
layout: layout-pane.njk
status: 
  type: Trial
  links:
    - href: "#research-on-this-component"
      text: Research on this component
    - href: "#help-improve-this-page"
      text: Help improve this component
  date: August 2026
  dataCollectionUrl: https://github.com/alphagov/govuk-design-system/discussions/4978
---

{% from "_example.njk" import example %}

Ask users to give feedback about their experience using your service.

{{ example({ group: "components", item: "feedback", example: "default", html: true, nunjucks: true, loading: "eager" }) }}

## When to use this component

Use the Feedback component to give users the opportunity to give feedback at any point in their journey. This helps you gather a wide range of feedback to understand how well your service performs and improvements you can make.

## How it works

Show the Feedback component on as many pages of your service as you can.

The component is designed to allow users to give feedback at any time without distracting them.

### Ask for feedback at the end of each page

Place the Feedback component just before the GOV.UK footer component.

If your service is using Nunjucks, you can use the [GOV.UK Frontend page template](/styles/page-template/) to add the Feedback component by placing it in the `footerStart` template block.

### Asking users for feedback

The heading and message in the Feedback component should tell users:

- why you want feedback
- what you'll do with their feedback

Also try to give users some idea about:

- how long it'll take to give feedback
- the difference between giving feedback and asking for support

You must include a link to a feedback page, which could be either:

- [a GOV.UK feedback page](https://www.gov.uk/service-manual/service-assessments/get-feedback-page)
- a feedback page page of your own, if you need to ask specific questions

## Research on this component

During design exploration for this component, desk research suggested that services struggled to get enough feedback from users using a previous version of this component.

This version separates the feedback link from the [Phase banner component](/components/phase-banner/).

We've released this Feedback component in trial status as we want to understand whether:

- moving the feedback link from the phase banner increases the amount of feedback services receive
- placing the feedback link its own dedicated location helps users know where to provide feedback when they need to, by overcoming potential 'banner blindness' of the phase banner.

Until we have enough evidence that these needs are being met, the component will remain in trial.

We thank the service teams across government who worked with us in the early stages of this component to measure its effectiveness.

We’d also like to thank the GOV.UK Forms team for helping us build this component.
