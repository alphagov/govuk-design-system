---
title: Tabs
description: Tabs can be a helpful way of letting users quickly switch between related information
section: Components
aliases:
backlogIssueId: 100
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The tabs component lets users navigate between related sections of content, displaying one section at a time.

{{ example({ group: "components", item: "tabs", example: "default", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

## When to use this component

Tabs can be a helpful way of letting users quickly switch between related information if:

- your content can be usefully separated into clearly labelled sections
- the first section is more relevant than the others for most users
- users will not need to view all the sections at once

Tabs can work well for people who use a service regularly, for example, users of a caseworking system. Their need to perform tasks quickly may be greater than their need for simplicity of first-time use.

## When not to use this component

Do not use the tabs component if the total amount of content the tabs contain will make the page slow to load. For this reason, do not use the tabs component as a form of page navigation.

Tabs hide content from users and not everyone will notice them or understand how they work.

Do not use tabs if your users might need to:

- read through all of the content in order, for example, to understand a step-by-step process
- compare information in different tabs - having to memorise the information and switch backwards and forwards can be frustrating and difficult

Test your content without tabs first. Consider if it’s better to:

- simplify and reduce the amount of content
- split the content across multiple pages
- keep the content on a single page, separated by headings
- use a table of contents to let users navigate quickly to specific sections of content

## Decide between using tabs, accordion and details

Tabs, [accordions](/components/accordion/), and [details](/components/details/) all hide sections of content which a user can choose to reveal.

If you decide to use one of these components, consider if:

- the user does not need to view more than one section at a time – consider using tabs
- the user needs to switch quickly between sections – tabs can show content without pushing other sections down the page, unlike accordions
- there are many pieces of content – tabs can fit fewer sections as they’re arranged horizontally, unlike accordions which are arranged vertically
- there’s only one or two pieces of short, less important content – the details component is more suitable as it’s visually smaller and less prominent than an accordion or tabs

## How it works

There are 2 ways to use the tabs component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "tabs", example: "default", html: true, nunjucks: true, open: false, size: "xl", titleSuffix: "second" }) }}

The tabs component uses JavaScript. When JavaScript is not available, users will see the tabbed content on a single page, in order from first to last, with a table of contents that links to each of the sections.

This is also how the component currently behaves on small screens, though more research is needed on this.

### The current tab gets stored in the URL

When moving between tabs, the URL gets updated with a fragment (`#id-of-the-tab`) corresponding to the current tab's `id` attribute's value.

If the tab's name is "United Kingdom" then the fragment could be `#tab_united-kingdom`.

Because of this feature, pressing the browser's 'back' button should navigate back to the previous tab.

### Use clear labels

Tabs hide content, so the tab labels need to make it very clear what they link to, otherwise users will not know if they need to click on them.

If you struggle to come up with clear labels, it might be because the way you’ve separated the content is not clear.

### Order the tabs according to user needs

The first tab should be the most commonly-needed section. Arrange the other tabs in the order that makes most sense for your users.

### Do not disable tabs

Disabling elements is normally confusing for users. If there is no content for a tab, either remove the tab or, if that would be confusing for your users, explain why there is no content when the tab is selected.

### Avoid tabs that wrap over more than one line

If you use too many tabs or they have long labels then they may wrap over more than one line. This makes it harder for users to see the connection between the selected tab and its content.

### Add headings to tab content

Include a heading at the beginning of each tab that duplicates the information in the tab label. Providing a heading improves navigation on smaller screen sizes and for screen reader users.

## Research and testing

This component has not yet been tried in research with users.

The design, code and guidance here are based on recommendations from [Inclusive Components](https://inclusive-components.design/tabbed-interfaces/) and the [Nielsen Norman Group](https://www.nngroup.com/articles/tabs-used-right/) as well as user research findings and examples of tabs in the following services:

- Manage bereavement support payment (DWP)
- Support for check your state pension (DWP)
- Access to work integrated system (DWP)
- Bank holidays (GDS)
- Universal Credit (DWP)
- Criminal Justice Services (CPP)
- Judiciary UI internal systems (HMCTS)
- Rural Payments (Defra)

### Next steps

User research is needed to confirm:

- which types of services tabs work best in
- that this approach to tabs is the best option for screen reader users and sighted keyboard users
- how this component should behave on small screen sizes
