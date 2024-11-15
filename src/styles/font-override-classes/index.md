---
title: Font override classes
description: Use paragraphs for your core content
section: Styles
backlogIssueId: 64
theme: Typography
layout: layout-pane.njk
showPageNav: true
order: 11
---

{% from "_example.njk" import example %}

{% include "_new-type-scale.njk" %}

Use font override classes sparingly to change the default styling of text on a page.

You can use the font override classes in your HTML or reference the ([`govuk-font` mixin](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-font) or [`govuk-font-size` mixin](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-font-size)) in your own components.

## Text alignment

If you need to align text differently to how it usually displays on the page, you can use text alignment override classes.

Use:

- `govuk-!-text-align-left` to align text to the left
- `govuk-!-text-align-right` to align text to the right
- `govuk-!-text-align-centre` to align text to the centre

As the most commonly used languages on GOV.UK are written left-to-right, you should usually left-align body copy text. Right-aligned body copy text can be hard for users to find and read when they magnify their screen. Use right-aligned body copy text if you are translating content into a language which is written right-to-left.

Do not 'justify' blocks of body copy text so it's aligned to both the left and right margins. Doing this creates wider spaces between words, which can make the text hard to read.

## Font size

The full GOV.UK typography scale goes from 16px up to 80px on large screens. You can add these font size override classes to any other typographic class or element and they will change the font size.

{{ example({ group: "styles", item: "font-override-classes", example: "font-size", html: true, open: true, size: "xl" }) }}

## Font weight

As with the font size, you can add a font weight override class to any other typographic class or element to change the font weight to regular or bold weight.

{{ example({ group: "styles", item: "font-override-classes", example: "font-weight", html: true, open: true }) }}

### Bold text

Use bold text sparingly - using too much will make it difficult for users to know which parts of your content needs their attention the most.

You can use bold to highlight critical information and emphasise particular words in a transaction.

For example, "Your reference number is **ABC12345678**. Use this to track your application. Updates will be sent to **name<i></i>@example.com**"

## Tabular numbers

Tabular numbers are an alternative style where each digit is given equal width.

Using tabular numbers can make numbers intended for comparison to one another easier to read. For example, numbers in data tables, or reference numbers where the additional spacing makes it easier to read each digit individually.

You can also use tabular numbers for numbers that dynamically update, such as in a counter. The equal width of each digit prevents the numbers from visually moving towards and away from each other as the counter updates.

Activate tabular numbers by using `govuk-!-font-tabular-numbers`.

## Breaking up long words

You might need to show long words that cannot be changed or broken into smaller parts, such as:

- technical or scientific terms
- long email addresses
- words from other languages

Long words can create issues in constrained spaces such as mobile device screens and data tables. They can 'break out' of the layout, resulting in a broken visual appearance and requiring users to scroll horizontally to view all of your content.

You can help to reduce these issues by surrounding content likely to 'break out' with `govuk-!-text-break-word`.

This class forcibly splits long words onto multiple lines when they become longer than the width of the container. It'll make the split exactly where the word would otherwise 'break out', which might make compound words more difficult to read. You can control where words can be split by inserting [the `wbr` HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr) into your content.

{{ example({ group: "styles", item: "font-override-classes", example: "break-word", html: true, open: true }) }}
