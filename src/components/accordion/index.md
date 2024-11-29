---
title: Accordion
description: The accordion component lets users show and hide sections of related content on a page
section: Components
aliases:
backlogIssueId: 1
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The accordion component lets users show and hide sections of related content on a page.

{{ example({ group: "components", item: "accordion", example: "default", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

## When to use this component

Only use an accordion if there's evidence it’s helpful for the user to:

- see an overview of multiple, related sections of content
- choose to show and hide sections that are relevant to them
- look across information that might otherwise be on different pages

For example, an accordion can work well if the user needs to reveal and compare information that’s relevant to them.

Accordions can also work well for people who use a service regularly. For example, users of caseworking systems who need to do familiar tasks quickly.

Test with users to decide if using an accordion outweighs the potential problems with hiding content.

## When not to use this component

Accordions hide content from the user. Not all users will notice them or understand how they work. For this reason, you should only use them in specific situations and if user research supports it.

Do not use an accordion for content that all users need to see.

Test your content without an accordion first. Well-written and structured content, as shown in the [Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) guidance, can remove the need to use an accordion.

It’s usually better to:

- simplify and reduce the amount of content
- split the content across multiple pages
- keep the content on a single page, separated by headings
- use a list of links at the start of the page (known as 'anchor links') to take the user to particular sections of a page

Accordions work best for simple content and links. Do not use accordions to split up a series of questions. Use separate pages instead.

Do not put accordions within accordions, as it will make content difficult to find.

Do not use the accordion component if the amount of content inside will make the page slow to load.

## Decide between using accordions, tabs and details

The Accordion component, [Tabs component](/components/tabs/) and [Details component](/components/details/) all work by hiding sections of content which a user can choose to reveal. Avoid using any of these components within one another.

If you decide to use one of these components, consider if:

- the user needs to look at more than one section at a time – an accordion can show multiple sections at a time, unlike tabs
- the user needs to switch quickly between sections – tabs can show content without pushing other sections down the page, unlike accordions
- there are many sections of content – accordions can fit more sections as they’re arranged vertically, unlike tabs which are arranged horizontally
- there’s only one or two pieces of short, less important content – the details component is more suitable as it’s visually smaller and less prominent than an accordion or tabs

## How it works

There are 2 ways to use the accordion component. You can use HTML or, if you’re using Nunjucks or the GOV.UK Prototype Kit, you can use the Nunjucks macro.

The accordion component uses JavaScript. When JavaScript is not available, users will see all the content displayed with the section labels as headings.

If you are using HTML, you must add an 'id' attribute to the `<div>` tag with the `govuk-accordion` class. It must be unique across the service's domain to maintain the persistent expanded state of the accordion.

### Section heading buttons

An accordion will usually start with all sections hidden. To show a section, the user can interact anywhere in the heading button.

The heading button includes all of these areas:

- heading text
- summary line (if you decide to add one)
- call-to-action text to 'show' or 'hide'

For users of screen readers, all the text in the button will be read as a single statement (separated by commas to allow for slight pauses). There’s also some visually hidden content in the heading text to help announce the call-to-action as 'show this section' or 'hide this section'.

{{ example({ group: "components", item: "accordion", example: "default", html: true, nunjucks: true, open: false, size: "xl", titleSuffix: "second" }) }}

#### Write clear button text

Write the heading and summary line like any other button text. Use sentence case, describe the content that will show, and keep it short.

Users of screen readers might find it difficult to navigate the accordion if the button text is too long.

If you struggle to come up with clear button text, it might be because the way you’ve separated the content is not clear. Organise sections in a way that makes sense to users, based on their needs.

#### Adding a summary line

Only add a summary line if it’s actually needed, as it's likely to make the button text too long.

If you’ve decided that you need the summary line, you must make it as short as possible.

{{ example({ group: "components", item: "accordion", example: "with-summary-section", html: true, nunjucks: true, open: false, size: "xl" }) }}

#### Structure section headings with the rest of the page

The accordion component shows section headings as `<h2>` headings. If needed, change the heading level of the section headings to make them fit within the other headings on the page.

### Starting with sections open

Users might need some sections to be open from the start. If they leave and then return to the page, they might also need sections they opened to stay open.

By default, if the user leaves and then returns to the page within the same page session, the accordion component will use ['session storage'](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) to remember which sections were open. This functionality can be turned off by adding `rememberExpanded: false` to the Nunjucks macro.

To see the changes you've made, you may need to create a new 'session'. For example, by opening a page in a new tab or window.

You can configure sections to start and stay open, but not stay closed.

Add the `govuk-accordion__section--expanded` class to the `govuk-accordion__section` `div` to make individual sections open from the start.

### Do not disable sections

Disabling controls is normally confusing for users. If there is no content for a section, either remove the section or, if this would be confusing for your users, explain why there is no content when the section is opened.

## Research on this component

We updated this component in December 2021 to solve an accessibility issue where the buttons and section labels might be mistaken for links.

[Read about the research and development that went into improving the accordion component](https://github.com/alphagov/govuk-design-system-backlog/issues/1#issuecomment-995675898).

The team made sure the component is accessible, for example that users can interact with it using just the keyboard.

### Users that navigate using ‘elements lists’

We need to find out more about users that navigate using ‘elements lists’ of headings, buttons, links and other elements – such as users of speech recognition software and partially-sighted users of screen readers.

For these users, it might not be clear enough that the section headings are considered buttons. This could mislead them to navigate (less efficiently) using the show or hide labels.

While this experience is inconvenient at first, it's likely the user will better understand the button area once they interact with it and see its focus state. [See ‘Testing with Dragon’ in the accessibility clinic summary](https://github.com/alphagov/govuk-frontend/issues/2295#issuecomment-906449543).

We want to hear about any user research done in this area so we can identify potential issues.

### Known issues and gaps

Adding a summary line with more than a few short words will likely make the button text too long, particularly for users of screen readers.

We need to better understand when service teams use summary lines and how this affects users of screen readers. [Share your findings and research with us](https://github.com/alphagov/govuk-design-system-backlog/issues/1).

We want to get feedback to inform us what to do next.
