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

You can use the font override classes in your HTML or reference the typography mixins ([`govuk-font`](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-font) or [`govuk-font-size`](https://frontend.design-system.service.gov.uk/sass-api-reference/#govuk-font-size)) in your own components.

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
