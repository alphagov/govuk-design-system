---
title: Page not found pages
description: A page not found tells someone we cannot find the page they were trying to view. They are also known as 404 pages.
section: Patterns
theme: Pages
aliases: "404"
backlogIssueId: 130
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

A page not found tells someone we cannot find the page they were trying to view. They are also known as 404 pages.

{{ wcagCallout({
  type: "pattern",
  introAction: "use",
  name: "Page not found pages",
  criteria: [
    {
      text: "make sure users can find contact information in a consistent way",
      anchor: "wcag-consistent-content-page-not-found"
    }
  ]
}) }}

{{ example({ group: "patterns", item: "page-not-found-pages", example: "default", html: true, nunjucks: true, size: "xl", loading: "eager" }) }}

## When to use this pattern

Use a page not found if someone is trying to view a page that does not exist. This happens if someone:

- selects a link or button that takes them to a page that does not exist
- types or copies a web address for a page that does not exist
- types or copies a web address incorrectly

Test all links and buttons to make sure they work. Remember to [do the hard work to make it simple](https://www.gov.uk/guidance/government-design-principles#do-the-hard-work-to-make-it-simple).

Make sure any web addresses in your service, letters, forms and on GOV.UK are for pages that exist or redirect to pages that exist.

## How it works

The page should have:

- ‘Page not found – service name – GOV.UK’ as the page title
- ‘Page not found’ as the H1
- contact information, if it exists and helps meet a user need

Contact information should either:

- be a link to a specific page that includes numbers and opening times
- include all numbers and opening times

The content should be clear and concise, not blame the user.

{% call wcagNote({id: "wcag-consistent-content-page-not-found"}) %}

<p>You must always write contact information in a clear and consistent way across ‘Page not found’ and similar service error pages. This relates to <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html">WCAG 2.2 success criterion 3.2.6 Consistent help</a>.</p>
{% endcall %}

Do not use:

- breadcrumbs
- technical jargon like 404 or bad request
- informal or humorous words like oops
- red text to warn people

{{ example({ group: "patterns", item: "page-not-found-pages", example: "default", html: true, nunjucks: true, titleSuffix: "second", size: "xl" }) }}

## Research on this pattern

More research is needed to find out if people:

- can fix the problem on their own
- understand what has happened
- understand the content and if there is anything missing
