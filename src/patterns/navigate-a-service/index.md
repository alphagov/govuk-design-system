---
title: Navigate a service
description: Help users know they’re using your service and navigate around it
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 76
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

Help users know they’re using your service and navigate around it.

{{ wcagCallout({
  type: "pattern",
  introAction: "help users to",
  name: "Navigate a service",
  criteria: [
    {
      text: "see all page content when interacting with a dropdown menu",
      anchor: "wcag-do-not-cover-content"
    },
    {
      text: "find help links in a consistent place on each page",
      anchor: "wcag-consistent-help-links"
    }
  ]
}) }}

Use this pattern to plan and design your navigation header using the [GOV.UK header](/components/header/) and [Service navigation](/components/service-navigation/) components. Check the ‘When to use this component’ sections in each of these components to make sure they’re right for your service.

This pattern also includes guidance on how to add other elements commonly used alongside navigation that are not in the GOV.UK Design System. We’ve included this guidance to help service teams make navigation headers more consistent across government.

## When to use this pattern

Navigation links usually appear in services that:

- are used repeatedly by some users
- involve multiple tasks
- do not have a clear order of tasks or end-to-end journey

Simplify the user journey as much as possible first. This might remove the need for users to navigate around your service.

## When not to use this pattern

If your service does have a clear end-to-end journey, avoid using navigation links.

Use [Task lists](/components/task-list/) instead, as they’re better for helping users understand:

- the tasks involved in completing a transaction
- the order they should complete tasks in
- when they’ve completed tasks

See how to do this in the [Help users to complete multiple tasks](/patterns/complete-multiple-tasks/) pattern.

## How it works

Together, the [GOV.UK header](/components/header/) and [Service navigation](/components/service-navigation/) components work together to assure users that they’re in the right place to use your service. They also help users understand that GOV.UK functions as one website.

The GOV.UK header (black background) includes space to show:

- the GOV.UK logo, which links to the GOV.UK homepage
- GOV.UK-wide tools such as GOV.UK One Login

The Service navigation (grey background) includes space to show:

- the service name, which links to the homepage of your service (or closest page)
- a navigation menu for your service
- service-level tools, such as a language selector

### Plan your GOV.UK header

The [GOV.UK header](/components/header/) component should only be used to show the GOV.UK logo and any GOV.UK-wide tools used in your service, such as GOV.UK One Login.

We recommend using the [Service navigation](/components/service-navigation/) component to show your service name and navigation links instead of the GOV.UK header, and to start updating existing services.

#### Do not show GOV.UK topic links

To help users focus on completing your service, [do not add the menu of GOV.UK topic links](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) to your service’s GOV.UK header.

The menu bar used in the [GOV.UK homepage](https://www.gov.uk/) and mainstream guidance pages are designed to help users explore topics and find government services and information.

Once users enter your service, they should have all the information they need to complete it [from its start page](/patterns/start-using-a-service/). If you need to refer to specific information as part of your service’s journey, use links within your pages.

### Plan your Service navigation

Use the [Service navigation](/components/service-navigation/) component to show your service name, navigation links and other service-level tools.

#### Show the service name as a link

Show your service name in the Service navigation. Make the service name a link to the homepage of your service.

If your service does not have a homepage, link to either:

- your service’s GOV.UK start page
- the first question of your service

#### Choosing and writing navigation links

You can use the rest of the space in the Service navigation component to show links, such as to help users:

- navigate around your service
- get in touch
- manage their accounts

Links within your service must go to the most important top-level sections that are the most useful to the user. This gives the user an idea of what your service does and what they can find within it.

Navigation is not a site map and does not need to list every part of your service.

{% call wcagNote({id: "wcag-do-not-cover-content"}) %}

<p>Do not make header elements, like dropdown menus, ‘sticky’ to the top of the page by using `position: fixed` or any other method. In other words, avoid any implementations that cause menus to sit on top of page content.</p>
<p>This is to make sure it does not hide or obscure any content which has a focus applied and comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html">2.4.11 Focus not obscured (minimum)</a>.</p>
{% endcall %}

In November 2021, [the GOV.UK homepage introduced a menu bar](https://insidegovuk.blog.gov.uk/2021/11/11/launching-gov-uks-new-menu-bar/) that avoids obscuring content by shifting the page down.

{% call wcagNote({id: "wcag-consistent-help-links"}) %}

<p>You can add a link to a ‘help’ page in your service’s header. If you do, the link must be positioned consistently within the header, and must always link to the same place.</p>
<p>For example, a header link to “Get help with this service” must go to the same place as similar header links elsewhere in your service. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">3.2.6 Consistent help</a>.</p>
{% endcall %}

#### External links

Links that go outside of your service should usually:

- be grouped together, and shown after links within your service
- open in a new window – warn the user of this, if possible

Consider showing external links in the page body instead.

### GOV.UK One Login

GOV.UK One Login [publishes its own header component](https://www.sign-in.service.gov.uk/documentation/design-recommendations/let-users-navigate-sign-out/) for services to give users an easy, consistent route to their GOV.UK One Login and a way to sign out.

## Adding other header and navigation elements

To help maintain consistency across services on GOV.UK, we’ve outlined some guidance on how to use the space in your header, and where to add other components and elements.

As a general rule, the ordering of header and navigation elements should start with the most general (GOV.UK-wide) elements at the top, with the more specific (service-level) elements further down.

### Start with GOV.UK-wide, general elements

In the GOV.UK header, only add GOV.UK-wide elements.

### Next, show any important elements that affect your entire service

You can add space between the GOV.UK header and Service navigation to insert important elements that apply to your entire service.

Elements you might add here include ‘organisation switchers’, or similar tools that help users use your service across a set of things

See an example of an [organisation switcher](https://design-patterns.service.justice.gov.uk/components/organisation-switcher/) component in the Ministry of Justice Design System.

We’d like to learn more about elements you might place between the GOV.UK header and Service navigation. [Tell us in our discussion space](https://github.com/alphagov/govuk-design-system/discussions/categories/navigation/).

### Then, add any other service-level elements

Most other service-level elements can be added within the Service navigation, immediately after the service name.

The [Service navigation component includes ‘slots’](/components/service-navigation/#use-slots-to-add-custom-elements) to support this. You’ll need to decide on the most appropriate layout and positioning and provide your own styles.

Elements you might add to Service navigation include:

- language selectors, if they work across your entire service
- search inputs, if they only search within your service

To help users understand what the search input will cover, include ‘Search [your service]’ as placeholder text within the search input.

#### Phase banners

Show the [Phase banner](/components/phase-banner/) component directly under either:

- the Service navigation component
- the GOV.UK header and blue colour bar (if your service does not use the Service navigation component)

Phase banners are shown across all pages of a service, so users should understand it as a service-level message.

You can choose to place the Phase banner in a more appropriate place for your service, however you’ll need to customise the component and provide your own CSS code to make it show correctly.

### Finally, show page-specific elements

Show any elements that only affect the current page after the Service header navigation.

Place any [Breadcrumbs](/components/breadcrumbs/) just before the `<main>` element. Placing them here means that the ‘Skip to main content’ link allows the user to skip all navigation links, including breadcrumbs.

## Changes to the GOV.UK header and Service navigation, and how they work together

We introduced this pattern and the [Service navigation](/components/service-navigation/) component in August 2024. We recommend service teams start using these to show navigation links in their services.

We’re confident that the new component is an improvement on the ‘GOV.UK header with navigation’, which we’ll deprecate in the next breaking release of GOV.UK Frontend.

We also recommend services to start using the Service navigation to show the service name. This is to help users understand:

- the relationship between GOV.UK and services
- that GOV.UK functions as one website
- the difference between GOV.UK-wide tools with service-level tools

We’ve decided not to deprecate the 'GOV.UK header with service name' for now, as we'd like to gather more research.

Share your research and give us your feedback in our [GitHub discussion space](https://github.com/alphagov/govuk-design-system/discussions/categories/navigation/).

## Research on this pattern

To explain our design rationale and decision-making process, we're writing a series of design notes and discussion topics to be posted in our [GitHub discussion space](https://github.com/alphagov/govuk-design-system/discussions/categories/navigation/).

We also ask service teams to use the space to share any research findings they have and give us their feedback to help us iterate.
