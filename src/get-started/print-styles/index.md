---
layout: layout-pane.njk
title: Building print friendly pages
section: Get started
theme: How to guides
order: 6
description: Designing and developing pages that are ready to print whilst sustainably reducing ink and paper usage.
---

Printing web pages may not initially seem like a typical use case. We build pages that are dynamic and readily change over time, making print versions quickly outdated.

However, a user may choose to print a web page for several reasons:

- because they lack regular or stable access to the internet
- to provide a copy for someone who doesn't have access to the internet
- to retain a copy of guidance for future reference
- for personal records, such as a page showing the outcome of a decision

You can use the CSS `print` media query to provide styles specific to printers.

## Reduce paper and ink consumption

Printer ink and paper are resource intensive to manufacture and expensive to purchase.

You can help users and [minimise the environmental impact](https://www.gov.uk/guidance/government-design-principles#minimise-environmental-impact) of printing by reducing the amount of paper and ink needed to convey the same information. Do this by [hiding parts of the page](/styles/layout/#override-how-elements-display) that don't serve a purpose on a printed document, such as navigation and feedback forms.

You should substitute dark grey for pure black (`#000000`) when printing. Colour printers produce shades of grey by combining different colours, which consumes significantly more ink than using pure black.

## Don't rely on colour

Don't rely on colour to convey information or to provide visual separation between parts of a page.

Many models of printer, including most laser printers, are incapable of printing in colour. Users may choose to print in greyscale to preserve coloured ink.

The print settings in web browsers often default to removing large regions of colour prior to printing, such as background colours and images. This can make it difficult to identify elements or section breaks that are conveyed using background colour.

Consider proactively removing background colours and adding borders or other visible dividers when a page is being printed.

## Provide context for invisible information

[Provide visible versions of invisible information, such as where links direct to.]

```css
@media print {
  a::after {
    content: " (" attr(href) ")";
  }
}
```

## Checking your print styles

GOV.UK Frontend already makes many of these adaptions for you, however to test your own components ...
