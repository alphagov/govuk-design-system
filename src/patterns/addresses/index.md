---
title: Addresses
description: Help users provide an address
section: Patterns
theme: Ask users for…
aliases: postcode
backlogIssueId: 31
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

Help users provide an address using one of the following:

- address lookup
- multiple text inputs
- textarea

## Address lookup

An address lookup helps users find a full address from partial information such as a postcode.

### When to use an address lookup

Use an address lookup to collect UK addresses where possible.

### When not to use an address lookup

Address lookups generally only work for UK addresses. 

If both UK and international addresses are expected, give users to the option to either search for a UK address or manually enter an international address.

### How an address lookup works

An address lookup lets users specify a UK address by entering their postcode and selecting their address from a list. There is also an option to enter a street name or number.

When using an address lookup, you should:

- make it clear that it will only work for UK addresses
- provide a manual option for people with international addresses or addresses that are missing or not properly listed in the address lookup
- let people enter their postcodes in upper or lower case and with or without spaces

### Identify and match addresses with UPRN identifiers

Use an address lookup that can [identify addresses with Unique Property Reference Numbers (UPRNs)](https://www.gov.uk/government/publications/open-standards-for-government/identifying-property-and-street-information). UPRNs are 12-digit unique identifiers for every addressable location across the UK.

Open standards for government mandates that [all public sector systems and projects which include address data should include UPRNs](https://technology.blog.gov.uk/2020/04/02/identifying-properties-and-streets-in-government-data/). This is to help government share consistent data, reduce errors and avoid the need for manual address matching in future.

Your address lookup should only use data from one API so it is consistent and accurate. One option for this is the [Ordnance Survey Places API](https://www.ordnancesurvey.co.uk/products/os-places-api).

### Allow different postcode formats

It's easier for users if you accept and ignore unwanted characters. This is better than rejecting the input and telling the user they have not provided a valid postcode.

You should let users enter postcodes that contain:

- upper and lower case letters
- no spaces
- additional spaces at the beginning, middle or end
- punctuation like hyphens, brackets, dashes and full stops

## Multiple text inputs

{{ example({ group: "patterns", item: "addresses", example: "multiple", html: true, nunjucks: true, open: true, size: "xl", loading: "eager" }) }}

### When to use multiple text inputs

Use multiple text inputs to offer users a manual option to enter an address, such as for international addresses or when users cannot find their address using an address lookup.

You'll need to know which countries the addresses will come from and find a format that supports them. This can be difficult for addresses outside of the UK.

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

[Check which input purpose to use](https://www.w3.org/TR/WCAG22/#input-purposes) for each field.

In production, you’ll need to do this to meet [WCAG 2.2 success criterion 1.3.5 Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html). You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

#### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "addresses", example: "error-messages", html: true, nunjucks: true, open: false, size: "xl" }) }}

If a postcode entered is not a real postcode, use a message like this:

{{ example({ group: "patterns", item: "addresses", example: "error-postcode", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in the [Error message component](/components/error-message/) and have specific error messages for specific error states.

## Textarea

{{ example({ group: "patterns", item: "addresses", example: "textarea", html: true, nunjucks: true, open: true, size: "s" }) }}

### When to use textarea

Use a textarea to offer users a manual option to enter an address, such as for international addresses or when users cannot find their address using an address lookup.

A textarea is useful when you expect a broad range of address formats and you do not need to format the address for print or use specific sub-parts of the address (for example, street or postcode).

### When not to use textarea

You should not use a textarea if you need to separate an address into accurate sub-parts (for example, street or postcode).

### How a textarea works

Textareas let users enter an address in any format and make it easy to copy and paste addresses from their clipboard.

#### Use the autocomplete attribute on a textarea

Use the `autocomplete` attribute on the textarea component when you're asking for an address. This lets browsers autofill the information on a user's behalf if they’ve entered it previously.

To do this, set the `autocomplete` attribute to `street-address` as shown in the HTML and Nunjucks tabs in the textarea example above.

If you are working in production you’ll need to do this to meet [WCAG 2.2 success criterion 1.3.5 Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html).

You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.
