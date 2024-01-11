---
title: Names
description: Help users correctly enter their name
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 53
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria might affect this pattern

To ask users for 'Names' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [reuse a previously entered name](/patterns/names/#wcag-reuse-name)

See the full list of components and patterns affected on our '[Changes to meet WCAG 2.2 page](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system)'.
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

{{ example({ group: "patterns", item: "names", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this pattern

You should follow this pattern whenever you need to ask for a user’s name as part of your service.
Only ask for people’s names if you need that information to deliver a service.

## How it works

Make it as easy as possible for a user to enter their name.

{{ example({ group: "patterns", item: "names", example: "default", html: true, nunjucks: true, open: true, titleSuffix: "second" }) }}

### Make sure the fields work for most of your users

Fields must be long enough to accommodate the names of your users. You should use population data or data about your existing users to do this.

Support all the characters users may need to enter, including numbers and symbols.

### Single or multiple name fields

Use single or multiple fields depending on your user’s needs. Not everyone’s name fits the first-name, last-name format. Using multiple name fields mean there’s more risk that a person’s name will not fit the format you’ve chosen and that it is entered incorrectly.

A single name field can accommodate the broadest range of name types, but means you cannot reliably extract parts of a name.

### Labelling name fields

Label single name fields:

- ‘Full name’

For multiple name fields, use:

- ‘First name’
- ‘Last name’

If users are from outside the UK, use the labels:

- ‘Given names’
- ‘Family name’

Make it clear whether you need someone’s common name, or their name as it's written on official documents such as a passport or driving licence.

#### Middle names

Only ask for middle names if your service requires them.

Use the label:

- ’Middle names‘

Make sure middle names are optional, as not everyone has them.

The label should not include `(optional)`. Users will enter their middle names if they have them and skip the field if they do not.

### Use the autocomplete attribute on name fields

Use the `autocomplete` attribute on the text input component when you're asking for a user's name. This lets browsers autofill the information on a user's behalf if they’ve entered it previously.

If you are asking for a user's full name in a single field, set the `autocomplete` attribute to `name`.

If you are asking users to enter their name in multiple fields, set the `autocomplete` attribute on both fields using:

- `given-name` for fields labelled 'First name' or 'Given name'
- `family-name` for fields labelled 'Last name' or 'Family name'

If you are working in production you’ll need to do this to meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html).

You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

### Reusing entered names

<div class="app-wcag-22" id="wcag-reuse-name" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Make sure users can easily reuse a previously entered name within a single journey, unless doing so would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant Entry</a>.</p>
</div>

You can make it easier to reuse names through one of these methods:

- pre-populate name fields with the previously entered name
- show any previously entered names as an option for the user to select

Continue to give users the option to enter a new address.

### Do not spellcheck user's names

Sometimes, browsers will spellcheck the information a user enters into a text input. To make sure user's names will not be spellchecked, set the `spellcheck` attribute to `false` as shown in this example.

{{ example({ group: "patterns", item: "names", example: "default", html: true, nunjucks: true, open: true, displayExample: false, titleSuffix: "third" }) }}

### Avoid asking for a person’s title

Avoid asking users for their title.

It’s extra work for them and you’re asking them to potentially reveal their gender and marital status, which they may not want to do.

It’s also hard to predict the range of titles your users will have. If you have to ask for someone’s title, use an optional [text input](/components/text-input/) not a [select](/components/select/).

Remember to correctly use people’s names in any resulting correspondence.

### Allow users to change their name

If your service stores personal information, you should allow users to update their details, including their name.

Allowing users to change their name helps your service respect their personal identity. It also means they can continue using your service without having to start over.

People change their name for many reasons. For example, because of a change in marital status, family situation or gender.

Avoid making it hard for users to change their name. As well as causing them distress, it may make them reluctant to use your service.

### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "names", example: "error", html: true, nunjucks: true, open: true }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

## Research on this pattern

If you’ve used this pattern, get in touch to share your user research findings.

You can also read these articles to learn more about asking for users’ names:

- [Personal names around the world (W3C)](https://www.w3.org/International/questions/qa-personal-names)
- [Avoid splitting single input entities (Baymard)](https://baymard.com/blog/mobile-form-usability-single-input-fields)
- [Falsehoods about names (Kalzumeus)](http://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
