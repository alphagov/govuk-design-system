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

A page not found tells someone we cannot find the page they were trying to view. They are also known as 404 pages.

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
