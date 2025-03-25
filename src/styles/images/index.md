---
title: Images
description: Only use images if there’s a real user need
section: Styles
theme: Visual elements
backlogIssueId: 70
layout: layout-pane.njk
showPageNav: true
order: 13
---

{% from "_example.njk" import example %}

Avoid using images for unnecessary decoration. Only use images if there’s a real user need.

To meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure any icons and images used in links meet the minimum target size. This is to make sure users can easily interact with the link.

Make sure any information contained in an image can be understood by someone who cannot see it. Also consider partially-sighted users with visual impairments and the assistive technologies they might use.

This guidance is for government teams that build online services. To learn how to use images as a GOV.UK content publisher, go to [GOV.UK content guidance for images](https://www.gov.uk/guidance/content-design/images).

## Using images to give information

Services usually work best without relying on images. Focus on writing clear, simple content for your service first.

Adding images can sometimes help users better understand instructions. However, images should only be visual aids – written content must contain all the information the user needs to complete the service.

If you choose to add an image to your service, you’ll need to carefully decide if the image needs to be described with [alternative text (alt text)](#alt-text).

## Photography

Use photography when it’s important to show a lifelike representation of something. For example, showing a preview of a document a user has uploaded.

Do not use photography to represent abstract concepts, such as to convey an impression or emotion to the user. Avoid using generic stock photography in your service.

## Illustrations

Use illustrations to show a simplified image of something complex. For example:

- to demonstrate a physical interaction, like scanning a passport
- to help users find something on a document, like a reference number

### Creating illustrations

Use as few visual elements as possible to communicate your message.

Start by following the [guidance on colour, and use the GOV.UK colour palette](/styles/colour/).

If you need more colours, try to use tints of the colour palette.

Use flat blocks of colour. Avoid using shadows or gradients, except when needed to show a distinctive feature of an object or to communicate layering or depth.

If you're creating multiple illustrations for a service, use consistent colours, line widths and border radiuses across them all.

Avoid depicting people in illustrations. If you need to show people, think carefully about how you represent the people that use your service – do not only show one kind of person.

For example, only depicting people of a particular age, gender or ethnicity can exclude people and reinforce negative stereotypes.

## Icons

Avoid using icons in most cases. People can understand a single icon to mean different things, so they can be confusing.

Icons can be more useful in case working systems, where users are familiar with the interface and return to it frequently. In this context, they can help users to scan pages more quickly. In most cases it’s still helpful to include a visible text label alongside any icons.

Do not use a single icon to represent more than one thing. For example, the search icon (magnifying glass) should only be used for search functionality, and not also for screen magnification.

## Avoid images that contain text

Generally, you should avoid using images that contain any sort of text. Use written content or other alternatives wherever possible.

Any text inside an image will be difficult to read, especially for users that need to read text using:

- screen readers
- copy and paste
- highlight
- resize
- recolour

Remember to avoid using images for unnecessary decoration, even if it’s an 'image of text'.

### Show text as written content, instead of images

It’s usually unnecessary to use an image to merely show some text (known as an ‘image of text’).

Give the information as written content instead, or use other alternatives.

Examples of unnecessary ‘images of text’ include images that show:

- the contents of a post from social media
- an excerpt from a document
- key facts from a slide presentation

If you do choose to use the image anyway, include written content nearby that conveys the same meaning and context.

[Find out more about ‘images of text’](https://www.w3.org/WAI/tutorials/images/textual/#image-of-styled-text-with-decorative-effect) on the Web Accessibility Initiative website.

### If text is not the focus of an image

It’s okay to use an image that just happens to have text in it.

So if you choose to use an image to visually show something, and there’s text in it that’s not meant to be the focus of attention, it’s fine to leave the text in the image.

Examples of images that just happen to have text:

- a photo of a library with book covers and signs in the background
- a collage to promote UK tourism that includes the Brighton Palace Pier sign
- an illustration of a Manchester street with store signs in the background

Write alt text that explains the meaning and context of the visual. Where the visual is essential to the user journey, include written content nearby that conveys the same meaning and context.

However, make sure the image actually benefits the user and is not just for decoration.

### Essential text in images

There are some rare cases where you can use an image that contains text.

Text in an image is considered essential if:

- the text provides an intentional meaning and context
- removing the text would cause the image to lose that intended meaning and context

In other words, you cannot give this same information as written content or any other way.

Essential text must be relevant to the information you need to give.

Examples of essential text in images might be:

- a portion of the Magna Carta, showing its handwriting style
- showing what a store’s sign looks like on their shopfront

There can also be essential text when the text needs to be shown in a specific way to communicate an identity.

Examples of these might be:

- text within an organisation’s logo (known as logotype)
- a signature, signed in a distinctive way

Read more about essential text in [WCAG 2.2 success criterion 1.4.5 Images of text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html).

#### What to do with essential text in images

You’ll need to decide whether an image is necessary, and whether any text within it is essential, to the information you want to give.

You should also consider some of the other alternatives suggested on this page.

If you do choose to use an image with essential text, you should add alt text to convey the meaning and context of the image.

Be sure to follow the guidance on this page about writing good alt text.

### Possible alternatives

If it's not practical to avoid using an image that contains text (and replace it with written content), there’s a few other ways to replace it.

You should consider these options even if the text in an image is essential, as it will make your information easier to read for users that customise the way they look at web pages.

In any case, make sure that the contrast ratio of text colour and all portions of the image that overlap the text [meets WCAG 2.2 success criterion 1.4.3 Contrast (minimum) level AA](https://www.w3.org/TR/WCAG22/#contrast-minimum).

#### Show HTML text over an image

You could place HTML text so that it shows over the image.

You’ll still need to make sure there is enough contrast, between the text colour and all portions of the image that overlap the text, on all screen sizes and all zoom levels.

#### Use a vector graphic image file

You could create the image and text as a vector graphic, such as an SVG file. This ensures that any text stays crisp and readable when the user zooms in. Text within other rasterised image formats such as PNG, JPEG can become pixellated or unreadable when zoomed in.

Remember to follow the guidance on contrast ratios.

### Text in charts, diagrams and complex images

It takes effort to make charts, diagrams and complex images accessible. Consider whether you can give the same information well enough using a table or other text-based option.

In general, you must write short alt text that explains the meaning and context of the image. You must also write any further, and more complex, information contained in the image in a longer text description.

Make sure the long description (or a link or button that shows it) is visible to sighted users.

Some charts and diagrams can be built in an accessible way using HTML, CSS, JavaScript or SVG. Accessible charts and diagrams must make the data within the chart available as text.

## Alt text

Alternative text, or alt text, is read out by screen readers and displayed if an image does not load or if images have been switched off.

All images should include the alt attribute, even if it’s left empty without alt text (`alt=""`).

### When to use alt text

Only add alt text when you need to describe visual details you cannot practically include in the written content.

There are some cases when an empty `alt=""` attribute is more appropriate. These include:

- a decorative image that does not include important content
- an icon with a text label, where the alt text would repeat the text label
- an image used in a link, where the image is not needed to understand the link

To decide if an image needs alt text, see the [Web Accessibility Initiative alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/).

### Writing good alt text

Good alt text:

- tells people what information the image provides
- describes the content and function of the image
- is specific, meaningful and concise

Use normal punctuation, like commas and full stops, so the text is easy to read and understand.

Generally, aim for no more than 2 sentences of alt text.

Do not write alt text that:

- includes the name of the photographer or person who created the image
- starts with ‘Image of’, ‘Graphic of’ or common information that would repeat across every image
- repeats information from the page
- includes extra information not in the image

{{ example({ group: "styles", item: "images", example: "alt-text", html: true, open: true, size: "l" }) }}

## Research on images

In March 2023, we updated this page to help teams make decisions on when to use images in their services.

In particular, we added a section on how to use images and ensure they’re as accessible as possible – giving advice to teams on how to meet or surpass relevant WCAG AA guidelines, in line with the [GOV.UK Design System accessibility strategy](/accessibility/accessibility-strategy/).

To help us validate that this guidance is useful and practical for service teams across government, we want to hear from you.

We’re looking for feedback about any of these areas:

- how you use images to give information to users
- examples of the types of images used in services
- how you create and choose images to use in your service
- how you implement images (for frontend performance)

Give us your feedback and examples by [posting a comment on the ‘Images’ discussion on GitHub](https://github.com/alphagov/govuk-design-system-backlog/issues/70).

## Accessibility

Make sure any icons and images used in links are at least 24px by 24px in size, with adequate spacing. This is to make sure users can easily interact with the link. This relates to [WCAG 2.2 success criterion 2.5.8 Target size (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
