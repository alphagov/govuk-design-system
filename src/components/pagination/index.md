---
title: Pagination
description: Help users navigate collections of numbered pages like search results
section: Components
aliases:
backlog_issue_id: 77
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Help users navigate forwards and backwards through a series of pages. For example, search results or guidance that's divided into multiple website pages — like [the GOV.UK mainstream guide format](https://prototype-kit.service.gov.uk/docs/templates/mainstream-guide).

{{ example({group: "components", item: "pagination", example: "default", html: true, nunjucks: true }) }}

## When to use this component

Consider using pagination when:

- showing all the content on a single page makes the page take too long to load
- most users will only need the content on the first page or first few pages

## When not to use this component

Only break up content onto separate pages if it improves the performance or usability of your service.

Avoid using the 'infinite scroll' technique to automatically load content when the user approaches the bottom of the page. This causes problems for keyboard users.

Do not use this Pagination component for linear journeys — for example, where you’re asking the user to complete a form. Instead, use the [Button component](/components/button/) (usually a 'Continue' button) to let the user move to the next page — and a [Back link](/components/back-link/) to let them move to the previous page.

## How it works

Add the pagination component after the content on each page that you're paginating.

[View an example of Pagination in a standard GOV.UK page template](in-page/index.html).

Do not show pagination if there's only one page of content.

Redirect users to the first page if they enter a URL of a page that no longer exists.

## For smaller numbers of pages

Use 'Previous' and 'Next' links to let users navigate through a small number of pages. Stack the links vertically, so they’re more obvious to screen magnifier users when they’re zoomed in:

{{ example({group: "components", item: "pagination", example: "labels", html: true, nunjucks: true }) }}

### Add link labels to describe pages

You can use link labels to give more context:

{{ example({group: "components", item: "pagination", example: "labels-2", html: true, nunjucks: true }) }}

## For larger numbers of pages

Use a list-type layout if users need to navigate through large numbers of pages. For example, long lists of search results.

{{ example({group: "components", item: "pagination", example: "large-number-of-pages", html: true, nunjucks: true }) }}

Show the page number in the page `<title>` so that screen reader users know they’ve navigated to a different page. For example, 'Search results (page 1 of 4)'.

Show an appropriate number of pages to fit the horizontal space available.

For smaller screens, show page numbers for:

- the current page
- previous and next pages
- first and last pages

For larger screens, show page numbers for:

- the current page
- at least one page immediately before and after the current page
- first and last pages

Use ellipses (…) to replace any skipped pages. For example:

- **[1]** 2 … 100
- 1 **[2]** 3 … 100
- 1 2 **[3]** 4 … 100
- 1 2 3 **[4]** 5 … 100
- 1 … 4 **[5]** 6 … 100
- 1 … 97 **[98]** 99 100
- 1 … 98 **[99]** 100
- 1 … 99 **[100]**

### First and last pages

Do not show the previous page link on the first page — and do not show the next page link on the last page.

{{ example({group: "components", item: "pagination", example: "first-page", html: true, nunjucks: true }) }}

{{ example({group: "components", item: "pagination", example: "last-page", html: true, nunjucks: true }) }}

### Filtering and sorting

Consider adding filtering or sorting options if it helps users to find what they need in a long list of pages. For example, [the business support finder on GOV.UK](https://www.gov.uk/business-finance-support) has filtering options.

If the user filters or sorts the list of pages, apply this to the whole list (not just the current page) and redirect them back to the first page of the new results.

Set defaults to minimise how many pages most users have to click through to find what they need.

## Research on this component

This component is based on similar ones developed and used successfully by the Government Digital Service, Ministry of Justice and the Home Office, and on feedback in the Design System backlog.
