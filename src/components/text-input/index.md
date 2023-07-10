---
title: Text input
description: Help users enter information with the text input component
section: Components
aliases: text box, text field, input field, text entry box
backlog_issue_id: 51
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({group: "components", item: "text-input", example: "default", html: true, nunjucks: true, open: false, size: "s"}) }}

## When to use this component

Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number.

## When not to use this component

Do not use the text input component if you need to let users enter longer answers that might span multiple lines. In this case, you should use the [textarea](/components/textarea/) component.

## How it works

All text inputs must have labels, and in most cases the label should be visible.

You should align labels above the text input they refer to. They should be short, direct and written in sentence case. Do not use colons at the end of labels.

### Avoid placeholder text

Do not use placeholder text in place of a label, or for hints or examples, as:

- it vanishes when the user starts typing, which can cause problems for users with memory conditions or when reviewing answers
- not all screen readers read it out
- its browser default styles often do not meet [minimum contrast requirements](https://www.w3.org/TR/WCAG22/#contrast-minimum)

### If you're asking one question on the page

If you’re asking just [one question per page](/patterns/question-pages/#start-by-asking-one-question-per-page) as recommended, you can set the contents of the `<label>` as the page heading. This is good practice as it means that users of screen readers will only hear the contents once.

Read more about [why and how to set legends as headings](/get-started/labels-legends-headings/).

There are 2 ways to use the text input component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({group: "components", item: "text-input", example: "default", html: true, nunjucks: true, open: false, size: "s", titleSuffix: "second"}) }}

### If you’re asking more than one question on the page

If you're asking more than one question on the page, do not set the contents of the `<label>` as the page heading. Read more about [asking multiple questions on question pages](/patterns/question-pages/#asking-multiple-questions-on-a-page).

{{ example({group: "components", item: "text-input", example: "without-heading", html: true, nunjucks: true, open: false, size: "s"}) }}

### Use appropriately-sized text inputs

Help users understand what they should enter by making text inputs the right size for the content they’re intended for.

By default, the width of text inputs is fluid and will fit the full width of the container they are placed into.

If you want to make the input smaller, you can either use a fixed width input, or use the width override classes to create a smaller, fluid width input.

#### Fixed width inputs

Use fixed width inputs for content that has a specific, known length. Postcode inputs should be postcode-sized, telephone number inputs should be telephone number-sized.

The widths are designed for specific character lengths and to be consistent across a range of browsers. They include extra padding to fit icons that some browsers might insert into the input (for example to show or generate a password).

On fixed width inputs, the width will remain fixed on all screens unless it is wider than the viewport, in which case it will shrink to fit.

{{ example({group: "components", item: "text-input", example: "input-fixed-width", html: true, nunjucks: true, open: false, size: "l"}) }}

#### Fluid width inputs

Use the width override classes to reduce the width of an input in relation to its parent container, for example, to two-thirds.

Fluid width inputs will resize with the viewport.

{{ example({group: "components", item: "text-input", example: "input-fluid-width", html: true, nunjucks: true, open: false, size: "xl"}) }}

### Hint text

Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.

{{ example({group: "components", item: "text-input", example: "input-hint-text", html: true, nunjucks: true, open: false, size: "s"}) }}

#### When not to use hint text

Do not use long paragraphs and lists in hint text. Screen readers read out the entire text when users interact with the form element. This could frustrate users if the text is long.

#### Avoid links

Do not include links within hint text. While screen readers will read out the link text when describing the field, they will not tell users that the text is a link.

### Numbers

#### Asking for whole numbers

If you're asking the user to enter a whole number, set the `inputmode` attribute to `numeric` to use the numeric keypad on devices with on-screen keyboards.

See how to do this by opening the HTML and Nunjucks tabs in this example:

{{ example({group: "components", item: "text-input", example: "number-input", html: true, nunjucks: true, open: false, size: "m"}) }}

There is specific guidance on how to ask for:

- [dates](/patterns/dates/)
- [telephone numbers](/patterns/telephone-numbers/)

#### Asking for decimal numbers

If you're asking the user to enter a number that might include decimal places, use `input type="text"`.

Do not set the `inputmode` attribute to `decimal` as it causes some devices to bring up a keypad without a key for the decimal separator.

{{ example({group: "components", item: "text-input", example: "decimal-input", html: true, nunjucks: true, open: false, size: "m"}) }}

#### Avoid using inputs with a type of number

Do not use `<input type="number">` unless your user research shows that there’s a need for it. With `<input type="number">` there’s a risk of users accidentally incrementing a number when they’re trying to do something else - for example, scroll up or down the page. And if the user tries to enter something that’s not a number, there’s no explicit feedback about what they’re doing wrong.

### Codes and sequences

Help the user visually check the code they've typed is correct by styling the input's text to visually separate each character. This is important if you're asking the user to enter a code or sequence they're unlikely to have memorised, such as an application reference ID, account number or security code.

You do not need to do this for memorable information, such as phone numbers and postcodes.

{{ example({group: "components", item: "text-input", example: "code-sequence", html: true, nunjucks: true, open: false, size: "m"}) }}

There is specific guidance on how to:

- [ask for bank account details](/patterns/bank-details/)
- [ask for National Insurance numbers](/patterns/national-insurance-numbers/)
- [confirm a phone number](/patterns/confirm-a-phone-number/)

### Prefixes and suffixes

Use prefixes and suffixes to help users enter things like currencies and measurements.

{{ example({group: "components", item: "text-input", example: "input-prefix-suffix", html: true, nunjucks: true, closed: true, size: "s"}) }}

Prefixes and suffixes are useful when there's a commonly understood symbol or abbreviation for the type of information you're asking for. Do not rely on prefixes or suffixes alone, because screen readers will not read them out.

If you need a specific type of information, say so in the input label or hint text as well. For example, put 'Cost, in pounds' in the input label and use the '£' symbol in the prefix.

Position prefixes and suffixes so that they're outside of their input. This is to avoid interfering with some browsers that might insert an icon into the input (for example to show or generate a password).

Some users may miss that the input already has a suffix or prefix, and enter a prefix or suffix into the input. Allow for this in your validation and do not show an error.

#### Text inputs with a prefix

{{ example({group: "components", item: "text-input", example: "input-prefix", html: true, nunjucks: true, closed: true, size: "s"}) }}

#### Text inputs with a suffix

{{ example({group: "components", item: "text-input", example: "input-suffix", html: true, nunjucks: true, closed: true, size: "s"}) }}

### Use the autocomplete attribute

Use the `autocomplete` attribute on text inputs to help users complete forms more quickly. This lets you specify an input's purpose so browsers can autofill the information on a user's behalf if they’ve entered it previously.

For example, to enable autofill on a postcode field, set the `autocomplete` attribute to `postal-code`. See how to do this in the HTML and Nunjucks tabs in the following example.

{{ example({group: "components", item: "text-input", example: "input-autocomplete-attribute", displayExample: false, html: true, nunjucks: true, open: true, size: "s"}) }}

If you are working in production and there is a relevant [input purpose](https://www.w3.org/TR/WCAG21/#input-purposes), you'll need to use the `autocomplete` attribute to meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html).

You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

### Do not disable copy and paste

Users often need to copy and paste information into a text input, so do not stop them from doing this.

### How and when to spellcheck a user’s input

Sometimes, browsers will spellcheck the information a user puts into a text input. If a user enters something which is recognised as a spelling error, sighted users will see a red line under the word.

If you are asking users for information which is not appropriate to spellcheck, like a reference number, name, email address or National Insurance number, disable the spellcheck.

To do this set the `spellcheck` attribute to `false` as shown in this example.

{{ example({group: "components", item: "text-input", example: "input-spellcheck-disabled", html: true, nunjucks: true, displayExample: false, open: true, size: "s"}) }}

Browsers do not consistently spellcheck user’s input by default. If you are asking a question where spellcheck would be useful, set the `spellcheck` attribute to `true`.

### Error messages

Error messages should be styled like this:

{{ example({group: "components", item: "text-input", example: "error", html: true, nunjucks: true, closed: true, size: "s"}) }}

#### If the input has a prefix or a suffix

{{ example({group: "components", item: "text-input", example: "input-prefix-suffix-error", html: true, nunjucks: true, closed: true, size: "s"}) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

#### If the input is empty

Say ‘Enter [whatever it is]’.<br>
For example, ‘Enter your first name’.

#### If the input is too long

Say ‘[whatever it is] must be [number] characters or less’.<br>
For example, ‘Address line 1 must be 35 characters or less’.

#### If the input is too short

Say ‘[whatever it is] must be [number] characters or more’.<br>
For example, ‘Full name must be 2 characters or more’.

#### If the input has both a minimum and maximum length

Say ‘[whatever it is] must be between [number] and [number] characters’.<br>
For example, ‘Last name must be between 2 and 35 characters’.

#### If the input uses characters that are not allowed and you know what the characters are

Say ‘[whatever it is] must not include [characters]’.<br>
For example, ‘Town or city must not include è and £’.

Support all the characters the user might need to enter, including numbers and symbols.

#### If the input uses characters that are not allowed and you do not know what the characters are

Say ‘[whatever it is] must only include [list of allowed characters]’.<br>
For example, ‘Full name must only include letters a to z, and special characters such as hyphens, spaces and apostrophes’.

Support all the characters the user might need to enter, including numbers and symbols.

#### If the input is not a number

Say ‘[whatever it is] must be a number [optional example]’.<br>
For example, ‘Hours worked a week must be a number, like 30’.

If the input requires a decimal, use a decimal in the example. If the input allows both whole numbers and decimals, use both in the example.

#### If the input is not a whole number

Say ‘[whatever it is] must be a whole number [optional example]’.<br>
For example, ‘Hours worked a week must be a whole number, like 30’.

#### If the number is too low

Say ‘[whatever it is] must be [lowest] or more’.<br>
For example, ‘Hours worked a week must be 16 or more’.

#### If the number is too high

Say ‘[whatever it is] must be [highest] or fewer’.<br>
For example, ‘Hours worked a week must be 99 or fewer’.

#### If the input must be between 2 numbers

Say ‘[whatever it is] must be between [lowest] and [highest]’.<br>
For example, ‘Hours worked a week must be between 16 and 99’.

#### If the input is an amount of money that needs decimals

Say ‘[whatever it is] must include pence, like 123.45 or 156.00’.<br>
For example, ‘How much you earn a week must include pence, like 123.45 or 156.00’.

#### If the input is an amount of money that must not have decimals

Say ‘[whatever it is] must not include pence, like 123 or 156’.<br>
For example, ‘How much you earn a week must not include pence, like 123 or 156’.

## Research on this component

Read a blog post about [the problems we discovered with input type="number"](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/).

The prefix and suffix design has tested well in a number of services, but [some users have been observed clicking on prefixes](https://github.com/alphagov/govuk-design-system-backlog/issues/134#issuecomment-655615251), on the assumption that this would do something.
