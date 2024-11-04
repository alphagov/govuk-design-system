---
layout: layout-pane.njk
title: Understanding focus state styles
section: Get started
theme: How to guides
order: 5
description: Some people use keyboards or other devices to navigate through a page by jumping from one interactive element to the next. Focus states let users know which element they’re currently on and is ready to be interacted with.
---

Some people use keyboards or other devices to navigate through a page by jumping from one interactive element to the next. Focus states let users know which element they’re currently on and is ready to be interacted with.

Focus states in the GOV.UK Design System use a combination of yellow and black to make sure they meet Web Content Accessibility Guidelines (WCAG) 2.1 level AA [non-text contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) on any background colour used on GOV.UK.

The yellow has a high contrast with dark backgrounds and the thick black border has a high contrast against light backgrounds.

## Link focus state style

When links are focused, they have a yellow background with a black bottom border. This helps the focused link stand out from the rest of the content on the page.

![A focused link against different GOV.UK background colours](link-focus.png)

Other components and elements that look like links use the link focus state style. For example, the controls on the [Accordion component](/components/accordion/) and [Details component](/components/details/).

![A focused details component. In the examples, the expandable text reads "Help with nationality" and beneath is an explanation of why the user is being asked for this information.](details-focus.png)

## Form input focus state style

When form inputs are focused, they have a yellow outline and a thick black border. If the element already has a border, the border gets thicker.

![A text input labelled "What is your name?". The example shows the text input both unfocused and focused.](text-input-focus.png)

[Radios components](/components/radios/) and [checkboxes components](/components/checkboxes/) use the same style.

![Yes and no radio options to answer the question "Have you changed your name?". In this example, the "No" option is focused.](radios-focus.png)

## Making focus states accessible for extended and modified components

If you've [extended or modified components in the GOV.UK Design System](/get-started/extending-and-modifying-components/), you can use GOV.UK styles to make the focus states of these components accessible.

How you make focus states accessible depends on if the component is:

- focusable text without a background colour or border
- another focusable element with a background colour or border

### Make focusable text accessible

If you use Sass, you should include the `govuk-focused-text` mixin in your component's `:focus` selector if that component is focusable text. For example, the component is a link in body text, or the details component:

```scss
.app-component:focus {
  @include govuk-focused-text;
}
```

### Make other focusable elements accessible

If you use Sass, you can use 3 GOV.UK Frontend variables if your component has a background colour or border. For example a text input or checkbox.

The 3 Sass variables are:

- `$govuk-focus-colour` - yellow background
- `$govuk-focus-text-colour` - black text
- `$govuk-focus-width` - for consistent width

Use these variables in your components instead of numeric values for the background, text and widths.

## If you do not use Sass

To make a component's focus state accessible without using Sass, you can:

- see how the `govuk-focused-text` mixin works from the [GOV.UK Frontend source code](https://github.com/alphagov/govuk-frontend/blob/25a4333b239e1c3b8a136e526981fe29172a2852/src/govuk/helpers/_focused.scss#L12-L28)
- get the values for `$govuk-focus-colour` and `$govuk-focus-text-colour` from the [colour page](/styles/colour/)

## Contributing back

If you’ve extended or modified a component and you think this is useful for the wider government community you can propose an improvement.

You can propose your change to a component on the [list of discussions on GitHub](https://github.com/orgs/alphagov/projects/43/views/2).
