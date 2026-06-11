---
title: Language selector
description: Help users access content in their native language
section: Components
aliases: language, locale, language selection, language chooser, language navigation, translation navigation
backlogIssueId: 285
layout: layout-pane.njk
---

{% from "_callout.njk" import callout %}

{% call callout({
  tagText: "Early access"
}) %}
This component is an early access addition to the GOV.UK Design System. It may be changed significantly or withdrawn without a breaking release. Find out more about <a href="/get-started/early-access/">how we iterate early access components</a>.
{% endcall %}

Content, guidance, examples, etc. would be here to whatever degree the thing is developed.

## How it's performing against the contribution criteria

To be included in the Design System without the early access status, all components and patterns need to meet certain [contribution criteria](/community/contribution-criteria/).

In order for this component to become a stable part of the GOV.UK Design System it needs further work and testing within live services.

{% from "_checklist.njk" import checklist %}

### Proposal

{{ checklist({
  idPrefix: "Proposal-contribution-criteria",
  items: [
    {
      title: "Useful",
      description: "There is evidence that this component or pattern would be useful for many teams or services.",
      status: "yes"
    },
    {
      title: "Unique",
      description: "It does not replicate something already in the Design System.",
      status: "yes"
    }
  ]
})}}

### Development

{{ checklist({
  idPrefix: "Development-contribution-criteria",
  items: [
    {
      title: "Usable",
      description: "It has been tested in user research and shown to work with a representative sample of users, including those with disabilities",
      status: "feedback needed"
    },
    {
      title: "Consistent",
      description: "It reuses existing styles and components in the Design System where relevant.",
      status: "yes"
    },
    {
      title: "Versatile",
      description: "The implementation is versatile enough that the component or pattern can be used in a range of different services that may need it.",
      status: "yes"
    }
  ]
})}}

## What we're still looking to learn

- Have you got any user research on a language switcher component or the need for translations?
- Do you use a language switcher in your service and how well is it working?
- If you use a language switcher, what languages do you accommodate?
- Where is your language switcher positioned on the page and why did you make that decision?
- If we shipped this component, what would it mean for your service?
- Is there anything else you'd like us to keep in mind with this work?

### Ways to give us this feedback

- Add a comment to the [GitHub discussion](https://github.com/alphagov/govuk-design-system/discussions/5351)
- Give feedback to the [Design System Team by email](https://design-system.service.gov.uk/contact/)
- Give feedback via the #govuk-design-system slack channel or by DM-ing me on UK Government Digital slack
