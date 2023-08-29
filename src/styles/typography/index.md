---
title: Typography
description: If your service is on the service.gov.uk subdomain you must use the GDS Transport font
section: Styles
backlogIssueId: 64
layout: layout-pane.njk
showPageNav: true
headings:
  - text: Section break
    aliases: horizontal rule, hr
---

{% from "_example.njk" import example %}

## Font

If your service is on the service.gov.uk subdomain you must use the GDS Transport font.

### When not to use the GDS Transport font

If your service is publicly available on a subdomain other than service.gov.uk, use an alternative typeface like Helvetica or Arial.

If you’re not sure whether you should use GDS Transport, do one of the following:

- [read the 'If your service is not on GOV.UK' section on 'Making your service look like GOV.UK'](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk#if-your-service-isnt-on-govuk)
- [contact the Design System team](/get-in-touch/)

## Headings

Write all headings in sentence case.

Use heading tags, such as `<h1>`, `<h2>` and so on, to tag the headings on a page. Apply a heading class, such as `govuk-heading-l`, to style them visually. Style headings consistently to create a clear content structure throughout your service.

For a [question page](/patterns/question-pages/), or pages with long headings, start with `govuk-heading-l` for an `<h1>`, `govuk-heading-m` for an `<h2>` and so on. But change it if your pages feel unbalanced – the heading class you use does not always need to correspond to the heading level.

{{ example({ group: "styles", item: "typography", example: "headings", html: true, open: true, size: "m", loading: "eager" }) }}

If your page has lots of long form content, start with `govuk-heading-xl` for an `<h1>`, `govuk-heading-l` for an `<h2>`, and so on.

{{ example({ group: "styles", item: "typography", example: "headings-xl", html: true, open: true, size: "m" }) }}

### Headings with captions

Sometimes you may need to make it clear that a page is part of a larger section or group. To do this, you can use a heading with a caption above it.

{{ example({ group: "styles", item: "typography", example: "captions", html: true, open: true, size: "l" }) }}

If the caption should be considered part of the page heading, you can also nest the caption within the `<h1>`.

{{ example({ group: "styles", item: "typography", example: "captions-inside", html: true, open: true, size: "l" }) }}

## Paragraphs

### Body

The default paragraph font size is 19px on large screens and 16px on small screens.

{{ example({ group: "styles", item: "typography", example: "body", html: true, open: true }) }}

You can also add classes to create a lead paragraph or smaller body copy to convey hierarchy in your page.

### Lead paragraph

A lead paragraph is an introductory paragraph that you can use at the top of a page to summarise the content. Lead paragraphs use 24px type on desktop and should only be used once per page if needed.

{{ example({ group: "styles", item: "typography", example: "lead", html: true, open: true }) }}

### Body small

You can use the `govuk-body-s` class sparingly to make your paragraph font size smaller: 16px on larger screens and 14px on smaller screens.

The majority of your body copy should use the standard 19px paragraph size.

{{ example({ group: "styles", item: "typography", example: "small", html: true, open: true }) }}

## Text alignment override classes

If you need to align text differently to how it usually displays on the page, you can use text alignment override classes.

Use:

- `govuk-!-text-align-left` to align text to the left
- `govuk-!-text-align-right` to align text to the right
- `govuk-!-text-align-centre` to align text to the centre

You should usually left-align body copy that's read left to right. Right-aligned body copy can be hard for users to find and read when they magnify their screen.

Do not 'justify' blocks of body copy so that they're aligned to both the left and right margins. Doing this creates wider spaces between words, which can make the text hard to read.

## Font override classes

You might need to set the font size or font weight of an element outside of the predefined heading and paragraph classes. For this you can use the font override classes in your HTML or reference the typography mixins in your own components.

### Font size

The full GOV.UK typography scale goes from 14px up to 80px on large screens. You can add these font size override classes to any other typographic class or element and they will change the font size.

{{ example({ group: "styles", item: "typography", example: "font-size", html: true, open: true, size: "xl" }) }}

### Font weight

As with the font size, you can add a font weight override class to any other typographic class or element to change the font weight to regular or bold weight.

{{ example({ group: "styles", item: "typography", example: "font-weight", html: true, open: true }) }}

#### Bold text

You can use bold to emphasise particular words in a transaction. Use it to highlight critical information that users need to refer to or you’ve seen them miss.

For example, "Your reference number is **ABC12345678**. Use this to track your application. Updates will be sent to **name<i></i>@example.com**"

Use bold sparingly. Overuse will make it difficult for users to know which parts of your content they need to pay the most attention to.

## Section break

You can use the `govuk-section-break` classes on an `<hr>` element to create a thematic break between sections of content. `govuk-section-break` has class-based modifiers for different size margins.

By default `govuk-section-break` is only visible by its margin. You can add the `govuk-section-break--visible` class to make it visible with a separator line.

{{ example({ group: "styles", item: "typography", example: "section-break", html: true, open: true, size: "m" }) }}

## Our plans to improve this style

In 2023, we’ll be reviewing and improving our typography standards to make sure they’re up-to-date and as accessible as possible for users and service teams. [Read a blog post about our plans](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible/).
