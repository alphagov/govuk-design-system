---
title: Addresses
description: Help users provide an address
section: Patterns
theme: Ask users for…
aliases:
backlogIssueId: 31
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

Help users provide an address using one of the following:

- Multiple text inputs
- Address lookup
- Textarea

## Multiple text inputs

{{ example({ group: "patterns", item: "addresses", example: "multiple", html: true, nunjucks: true, open: true, size: "xl", loading: "eager" }) }}

### When to use multiple text inputs

Only use multiple text inputs when you know which countries the addresses will come from and can find a format that supports them all. This can be difficult to know if you’re asking for addresses outside of the UK.

Using multiple text inputs means:

- you can easily extract and use specific parts of an address
- you can give help for individual text inputs
- you can validate each part of the address separately
- users can complete the form using their browser’s autocomplete function

The disadvantages of using multiple text inputs are that:

- it’s hard to find a single format that works for all addresses
- there’s no guarantee that users will use the text inputs the way you think they will
- users cannot easily paste addresses from their clipboards

### How multiple text inputs work

If you use multiple text inputs, you should:

- only make individual text inputs mandatory if you really need the information
- make the text inputs the appropriate length for the content – it helps people understand the form, for example, make postcode text inputs shorter than street text inputs
- <a href="#allow-different-postcode-formats">let users enter postcodes in different formats</a>

Make sure there are enough text inputs to accommodate longer addresses if you know your users will need them. For example, allow users to include a company name or flat&nbsp;number.

Make it optional for users to enter their county (such as Berkshire or Cumbria). It’s not part of a correct UK address, according to Royal Mail, and it’s not used to deliver post.

Remove the county field if you’re sure your users will not need it, and your service will not use it.

#### Use the autocomplete attribute on multiple address fields

Use the `autocomplete` attribute on each individual address field to help users enter their address more quickly. This lets you specify each input’s purpose so browsers can autofill the information on a user’s behalf if they’ve entered it previously.

[Check which input purpose to use](https://www.w3.org/TR/WCAG21/#input-purposes) for each field.

In production, you’ll need to do this to meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html). You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

#### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "addresses", example: "error-messages", html: true, nunjucks: true, open: false, size: "xl" }) }}

If a postcode entered is not a real postcode, use a message like this:

{{ example({ group: "patterns", item: "addresses", example: "error-postcode", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

## Address lookup

An address lookup helps users find a full address from partial information such as a postcode.

### When to use an address lookup

Use an address lookup when you’re asking users for a UK address.

### When not to use an address lookup

Address lookups generally only work for UK addresses. Use a manual option such as multiple text inputs or a textarea when you are collecting mostly or only international&nbsp;addresses

### How an address lookup works

An address lookup lets users specify a UK address by entering their postcode and selecting their address from a list. There is also an option to enter a street name or&nbsp;number.

When using an address lookup, you should:

- make it clear that it will only work for UK addresses
- provide a manual option for people with international addresses or addresses that are missing or not properly listed in the address lookup
- let people enter their postcodes in upper or lower case and with or without spaces

#### Allow different postcode formats

It's easier for users if you accept and ignore unwanted characters. This is better than rejecting the input and telling the user they have not provided a valid postcode.

You should let users enter postcodes that contain:

- upper and lower case letters
- no spaces
- additional spaces at the beginning, middle or end
- punctuation like hyphens, brackets, dashes and full stops

## Textarea

{{ example({ group: "patterns", item: "addresses", example: "textarea", html: true, nunjucks: true, open: true, size: "s" }) }}

### When to use textarea

Use a textarea if you expect a broad range of address formats and you do not need to format the address for print or use specific sub-parts of the address (for example, street or postcode).

### When not to use textarea

You should not use a textarea if you:

- need to separate an address into accurate sub-parts (for example, street or postcode)
- need to help users look up an address

### How a textarea works

Textareas let users enter an address in any format and make it easy to copy and paste addresses from their clipboard.

#### Use the autocomplete attribute on a textarea

Use the `autocomplete` attribute on the textarea component when you're asking for an address. This lets browsers autofill the information on a user's behalf if they’ve entered it previously.

To do this, set the `autocomplete` attribute to `street-address` as shown in the HTML and Nunjucks tabs in the textarea example above.

If you are working in production you’ll need to do this to meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html).

You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.
