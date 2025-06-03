---
layout: layout-pane.njk
title: Extending and modifying components in production
section: Get started
theme: How to guides
order: 5
description: What to do when you want to extend or modify a component in production.
---

You might need to extend or modify components in the GOV.UK Design System from time to time. For example to:

- improve them based on user research
- meet a specific user need in your service

Consider whether your changes:

- help the long term maintenance of your service
- allow you to safely install updates from the GOV.UK Design System
- reduce the risk of technical debt
- continue to meet accessibility requirements

When you extend or modify components in the GOV.UK Design System you create potential risk. For example, your code or service may break when you install Design System updates, or you might make your service less accessible.

You can help reduce potential risk to your code by:

- using [override classes](#start-with-override-classes)
- not [overwriting GOV.UK Design System code](#avoid-overwriting-govuk-design-system-code)
- using a [unique prefix for component names][prefix]
- creating [custom override classes for multiple components](#custom-override-classes)
- using BEM for [small modifications to components](#small-modifications-to-components)
- forking components when you are making [large modifications](#large-modifications-to-components)
- [checking for accessibility](#check-for-accessibility) of modified components

The GOV.UK Design System team uses many of these techniques to make sure code in the GOV.UK Design System does not unintentionally break your application code.

## Start with override classes

Check the [styles section](/styles/) to see if there’s a CSS class you can use before adding CSS to your service.

For example, you can make changes to:

- spacing with [spacing override classes](/styles/spacing/#overriding-spacing)
- font size with [font override classes](/styles/font-override-classes)
- width with [width override classes](/styles/layout/#width-override-classes)

## Avoid overwriting GOV.UK Design System code

If you make a modification involving CSS you might decide to write a selector that targets a GOV.UK Design System class and change its CSS properties.

This will work in the short term but may break if you install an update relying on the component’s previous behaviour.

For example, if you want to override the button component you could do the following.

```html
<div class="app-interruption-card">
  <button class="govuk-button">
    Inverse button
  </button>
</div>
```

```css
.app-interruption-card .govuk-button {
  color: govuk-colour("blue");
  background-color: govuk-colour("white");
}
```

This would work in the short term, but if the GOV.UK Design System team changes how the button component works it could break when you update your service. For examples like this, consider using [small modifications to components](#small-modifications-to-components).

## Use a unique prefix for component names

The GOV.UK Design System team uses prefixes, sometimes called [namespacing](https://techterms.com/definition/namespace), to make sure the code in the GOV.UK Design System does not unintentionally break your application code.

Styles, components and patterns in the GOV.UK Design System use the `govuk-` prefix.

When writing code for your application, use a different prefix, like `app-`.

If your department has its own design resources, they should use a new separate prefix. It's a good idea to use departmental initials, like `hmcts-` or `dvla-`.

Apply this principle anywhere you name components, such as to:

- CSS class names
- Nunjucks Macros
- SCSS variables and mixins

If you contribute a component from an app to a departmental design system or the GOV.UK Design System, change the component’s prefix accordingly.

## Custom override classes

If you need to specify some custom override classes which do not belong to a particular component, you can define these using your [prefix] and the `-!-` convention from the GOV.UK Design System.

For example, to define a custom width for a specific reference number in your services you might do this.

```css
.app-\!-reference-number-width {
  width: 10ch !important;
}
```

```html
<span class="app-!-reference-number-width">
  7446868939
</span>
```

## Small modifications to components

The GOV.UK Design System uses a naming convention called [Block Element Modifier (BEM)](http://getbem.com/) which makes it easier to ensure styling is isolated to individual components. You can use this convention to make modifications to components.

When making small modifications to components you can make use of the [modifier convention from BEM](http://getbem.com/naming/), which uses a suffix of `--` plus a name, alongside your own [prefix].

For example, if you wanted to override the button component you could do the following.

```html
<div class="app-interruption-card">
  <button class="govuk-button app-button--inverse">
    Inverse button
  </button>
</div>
```

```css
.app-button--inverse {
  color: govuk-colour("blue");
  background-color: govuk-colour("white");
}
```

You should not use modifiers when:

- you’re modifying most of the component
- the component does not meet the original user need
- you need to make large changes to the HTML markup

## Large modifications to components

If you need to make a large modification to a component you should fork it entirely by copying and pasting the source code to create a new component.

When you do this you’ll need to rename all [prefixes][prefix] that include `govuk` to avoid conflicts. You should also use a different component name from those already in the GOV.UK Design System, to differentiate your unique component from a BEM modifier.

Doing this removes the possibility of any updates breaking your service. However, you will not receive any future updates from the original component.

For example, a large modification of an existing component is the [Step by step navigation pattern](/patterns/step-by-step-navigation/) which began as a small modification to the [Accordion component](/components/accordion/). The step by step navigation had so many changes it was eventually forked into a separate component.

## Check for accessibility

Make sure any modified components meet accessibility standards. This is to ensure your service is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA standard](https://www.w3.org/TR/WCAG22/) and [meets accessibility regulations](https://www.gov.uk/guidance/meet-the-requirements-of-equality-and-accessibility-regulations).

Read our [accessibility statement](/accessibility-statement/) to understand the accessibility of existing Design System components. See [accessibility guidance in the Service Manual](https://www.gov.uk/service-manual/helping-people-to-use-your-service) to understand what you need to do to ensure your service is accessible.

## Contributing back

If you’ve extended something and you think it’s useful for the wider government community you can propose an improvement.

You can do this by proposing your change to a component on the [list of discussions on GitHub](https://github.com/orgs/alphagov/projects/43/views/2).

[prefix]: #use-a-unique-prefix-for-component-names
