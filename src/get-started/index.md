---
layout: layout-pane.njk
title: Get started
description: The following introductory guides will help you to get set up
showSubNav: true
---

The GOV.UK Design System is for everyone that works on government services for GOV.UK. It helps digital teams in government make services look like GOV.UK with guides for applying layout, typography, colour and images.

{% from "govuk/components/warning-text/macro.njk" import govukWarningText %}

{% set callout %}
  Using the GOV.UK Design System for websites that spoof GOV.UK services and information may result in legal action.
{% endset %}

{{ govukWarningText({
  html: callout,
  iconFallbackText: "Warning"
}) }}

The examples in the GOV.UK Design System come with code to make it easy for you to use them in your project.

There are guides to getting started:

- [prototyping](prototyping/)
- [in production](production/)

## Using styles, components and patterns

When something is published in the GOV.UK Design System as a [style](/styles/), [component](/components/) or [pattern](/patterns/) we include details of how and when it’s been tested in user research. This should help you decide whether it’s something you can use or adapt for your service.

You can ask questions or share your research by joining the discussion on GitHub. There are links at the end of each style, component and pattern page - under the ‘Help improve this page’ heading.

## GitHub discussions about styles, components and patterns

Bear in mind that ideas discussed on GitHub may not have been tested. You can use them as a starting point, but it’s important to carry out user research to check that they work for your service. Then when you’ve carried out your user research, add your findings to the relevant discussion.

GitHub discussions are open to everyone, including members of the public. The views expressed there are the views of individuals and not the views of the [GOV.UK Design System team](/design-system-team/).
