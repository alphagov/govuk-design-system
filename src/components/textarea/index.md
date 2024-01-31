---
title: Textarea
description: Help users provide detailed information using the textarea component
section: Components
aliases: multi-line text box, multi-line text field
backlogIssueId: 65
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({ group: "components", item: "textarea", example: "default", html: true, nunjucks: true, open: false, size: "m", loading: "eager" }) }}

## When to use this component

Use the textarea component when you need to let users enter an amount of text that’s longer than a single line.

## When not to use this component

Users can find open-ended questions difficult to answer. It might be better to break up one complex question into a series of simple ones, for example where users can select from options using [radios][component_radio].

### If you need to ask an open question

Do not use the textarea component if you need to let users enter shorter answers no longer than a single line, such as a phone number or name. In this case, you should use the [text input](/components/text-input/) component.

## How it works

You must label textareas. Placeholder text is not a suitable substitute for a label, as it disappears when users click inside the textarea.

Labels must be aligned above the textarea they refer to. They should be short, direct and written in sentence case. Do not use colons at the end of labels.

There are 2 ways to use the textarea component. You can use HTML or, if you’re using [Nunjucks][lib_nunjucks] or the [GOV.UK Prototype Kit][govuk_prototype_kit], you can use the Nunjucks macro.

{{ example({ group: "components", item: "textarea", example: "default", html: true, nunjucks: true, open: false, size: "m", titleSuffix: "second" }) }}

### Use appropriately-sized textareas

Make the height of a textarea proportional to the amount of text you expect users to enter. You can set the height of a textarea by by specifying the `rows` attribute.

{{ example({ group: "components", item: "textarea", example: "specifying-rows", html: true, nunjucks: true, open: false, size: "l" }) }}

### Do not disable copy and paste

Users will often need to copy and paste information into a textarea, so do not stop them from doing this.

### If you’re asking more than one question on the page

If you're asking more than one question on the page, do not set the contents of the `<label>` as the page heading. Read more about [asking multiple questions on question pages](/patterns/question-pages/#asking-multiple-questions-on-a-page).

{{ example({ group: "components", item: "textarea", example: "without-heading", html: true, nunjucks: true, open: false, size: "l" }) }}

### Limiting the number of characters

If there’s a good reason to limit the number of characters users can enter, you can use the [character count](/components/character-count/) component.

### Error messages

Error messages should be styled like this:

{{ example({ group: "components", item: "textarea", example: "error", html: true, nunjucks: true, open: false, size: "l" }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

#### If the input is empty

Say ‘Enter [whatever it is]’.<br>
For example, ‘Enter summary’.

#### If the input is too long

Say ‘[whatever it is] must be [number] characters or less’.<br>
For example, ‘Summary must be 400 characters or less’.

#### If the input is too short

Say ‘[whatever it is] must be [number] characters or more’.<br>
For example, ‘Summary must be 10 characters or more’.

#### If the input is too long or too short

Say ‘[whatever it is] must be between [number] and [number] characters’.<br>
For example, ‘Summary must be between 10 and 400 characters’.

#### If the input uses characters that are not allowed and you know what the characters are

Say ‘[whatever it is] must not include [characters]’.<br>
For example, ‘Summary must not include è and £’.

#### If the input uses characters that are not allowed and you do not know what the characters are

Say ‘[whatever it is] must only include [list of allowed characters]’.<br>
For example, ‘Summary must only include letters a to z, hyphens, spaces and apostrophes.
