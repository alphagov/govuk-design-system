---
title: Font override classes
description: Use paragraphs for your core content
section: Styles
theme: Typography
layout: layout-pane.njk
showPageNav: true
order: 11
---

{% from "_example.njk" import example %}

Use font override classes sparingly to etc. etc.

You can use the font override classes in your HTML or reference the typography mixins in your own components.

## Text alignment

If you need to align text differently to how it usually displays on the page, you can use text alignment override classes.

Use:

- `govuk-!-text-align-left` to align text to the left
- `govuk-!-text-align-right` to align text to the right
- `govuk-!-text-align-centre` to align text to the centre

You should usually left-align body copy that's read left to right. Right-aligned body copy can be hard for users to find and read when they magnify their screen.

Do not 'justify' blocks of body copy so that they're aligned to both the left and right margins. Doing this creates wider spaces between words, which can make the text hard to read.

## Font size

The full GOV.UK typography scale goes from 14px up to 80px on large screens. You can add these font size override classes to any other typographic class or element and they will change the font size.

{{ example({ group: "styles", item: "font-override-classes", example: "font-size", html: true, open: true, size: "xl" }) }}

## Font weight

As with the font size, you can add a font weight override class to any other typographic class or element to change the font weight to regular or bold weight.

{{ example({ group: "styles", item: "font-override-classes", example: "font-weight", html: true, open: true }) }}

### Bold text

You can use bold to emphasise particular words in a transaction. Use it to highlight critical information that users need to refer to or you’ve seen them miss.

For example, "Your reference number is **ABC12345678**. Use this to track your application. Updates will be sent to **name<i></i>@example.com**"

Use bold sparingly. Overuse will make it difficult for users to know which parts of your content they need to pay the most attention to.
