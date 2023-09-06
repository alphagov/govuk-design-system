---
title: Links
description: Use links to navigate between pages
section: Styles
layout: layout-pane.njk
showPageNav: true
---

{% from "_example.njk" import example %}

Links are blue and underlined by default. If your link is at the end of a sentence or paragraph, make sure that the linked text does not include the full stop.

{{ example({ group: "styles", item: "links", example: "default", html: true, open: true }) }}

## Links without a visited state

Use the `govuk-link--no-visited-state` modifier class where it is not helpful to distinguish between visited and unvisited states, for example when linking to pages with frequently-changing content such as the dashboard for an admin interface.

{{ example({ group: "styles", item: "links", example: "no-visited-state", html: true, open: true }) }}

## External links

If it's an external link to a non-government website, make that clear in the link text. For example, 'read advice on writing link text from [name of organisation]'. There's no need to say explicitly that you're linking to an external site. [Do not use an external link icon](https://designnotes.blog.gov.uk/2016/11/28/removing-the-external-link-icon-from-gov-uk/).

## Opening links in a new tab

Avoid opening links in a new tab or window. It can be disorienting - and [can cause accessibility problems for people who cannot visually perceive that the new tab has opened](https://www.w3.org/TR/WCAG20-TECHS/G200.html).

If you need a link to open in a new tab - for example, to stop the user losing information they’ve entered into a form - then include the words ‘opens in new tab’ as part of the link. There's no need to say 'tab or window', since opening in a new tab is the default behaviour for most browsers.

Include `rel="noreferrer noopener"` along with `target="_blank"` to reduce the risk of [reverse tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing). The following example shows how to do this in HTML.

{{ example({ group: "styles", item: "links", example: "opening-in-new-tab", html: true, open: true }) }}

If you're displaying lots of links together and want to save space and avoid repetition, consider doing both of the following:

- adding a line of text before the links saying 'The following links open in a new tab'
- including `<span class="govuk-visually-hidden">(opens in new tab)</span>` as part of the link text, so that part of the link text is visually hidden but still accessible to screen readers

## Links on dark backgrounds

Use the `govuk-link--inverse` modifier class to show white links on dark backgrounds — for example, in headers, custom components, and patterns with darker backgrounds.

Make sure all users can see the links — the white links and background colour [must have a contrast ratio of at least 4.5:1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

{{ example({ group: "styles", item: "links", example: "on-dark-background", html: true, open: true }) }}

## Links without underlines

Use the `govuk-link--no-underline` modifier class to remove underlines from links.

Only do this if the context tells the user that the text is a link, even without the underline.

For example, links in a header or side navigation might not need underlines. Users will understand that they’re links because of where they are, at the same place, across different pages.

{{ example({ group: "styles", item: "links", example: "no-underline", html: true, open: true }) }}

## Links to change a language

You can use links to allow a user to access the current content in a different language.

When offering links to content in other languages, make sure:

- the link's text includes the name of the alternative language in both English and the source language
- the link's purpose is always clear, even when taken out of context
- the link element includes an [`hreflang` attribute](https://www.w3schools.com/tags/att_a_hreflang.asp) that identifies the language of the linked page.

For example, your link text could be 'use [Service name] in [language]'.
