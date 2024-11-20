---
title: Phone numbers
description: Help users enter a valid phone number
section: Patterns
theme: Ask users for…
aliases: phone numbers, telephone
backlogIssueId: 101
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{{ example({ group: "patterns", item: "phone-numbers", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this pattern

Only collect phone numbers from people if you genuinely need them. Not everyone has or can use a phone, so make sure you give users a choice about how they can be contacted.

## How it works

### Allow different formats

Let users enter phone numbers in whatever format is familiar to them. Allow for additional spaces, hyphens, dashes and brackets, and be able to accommodate country and area codes.

### Validate phone numbers

You should validate phone numbers so you can let users know if they have entered one incorrectly. Google’s [libphonenumber](https://github.com/googlei18n/libphonenumber) library can validate phone numbers from most countries.

### Use the autocomplete attribute

Use the `autocomplete` attribute on phone number inputs. This lets browsers autofill the information on a user's behalf if they’ve entered it previously.

To do this, set the `autocomplete` attribute to `tel`, as shown in the HTML and Nunjucks tabs in the examples on this page.

If you are working in production you’ll need to do this to meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html).

You will not normally need to use the `autocomplete` attribute in prototypes, as users will not generally be using their own devices.

### Error messages

Error messages should be styled like this:

{{ example({ group: "patterns", item: "phone-numbers", example: "error-empty-field", html: true, nunjucks: true, open: false, size: "s" }) }}

Make sure errors follow the guidance in the [Error message component](/components/error-message/) and have specific error messages for specific error states.

#### If the phone number is not in the correct format and there is no example

Say ‘Enter a phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192’.

#### If the phone number is not in the correct format and there is an example

Say ‘Enter a phone number in the correct format’.

### Make it clear what type of phone number you need

Use the form label or hint text to tell users if you specifically need a UK, international or mobile phone number.

{{ example({ group: "patterns", item: "phone-numbers", example: "international", html: true, nunjucks: true, open: false, size: "s" }) }}

### Using example phone numbers

If you wish to include an example phone number (in hint text for example), [Ofcom maintains a list of numbers](https://www.ofcom.org.uk/phones-telecoms-and-internet/information-for-industry/numbering/numbers-for-drama) that are reserved for use in media. These are:

- UK non-geographic: 01632 960000 to 960999
- UK London: 020 7946 0000 to 7946 0999
- UK mobile: 07700 900000 to 900999

### Explain why you need a phone number

Tell users why you might contact them and when.

### Do not display phone numbers as links on devices that cannot make calls

It’s possible to mark up phone numbers as links, like this:

```html
<a href="tel:+442079476330">020 7947 6330</a>
```

However, doing this will style phone numbers as links, which is confusing on devices that do not support phone calls.

It might also not be necessary - some modern mobile browsers automatically detect phone numbers and display them as links anyway.

If you do need to mark up your phone numbers as links, for example, to support a device that cannot automatically detect them, make sure they do not display as links on devices that cannot make calls.

When you look at your service's user journey, remember that phone numbers as links might behave in unexpected ways for the user. For example, unless the user sets a default app to handle `tel:` links, some browsers and operating systems will automatically start a setup process.

### Write phone numbers in the GOV.UK style

See the [GOV.UK style for writing telephone numbers](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#telephone-numbers).

### Avoid input masking

Avoid 'input masking', or showing placeholder answer, because it makes it harder for users to:

- type a number in their preferred way
- transcribe a number from another place and check that they’ve got it right

### Avoid reformatting phone numbers

The GOV.UK Notify team have observed some users becoming confused when presented with a reformatted version of a phone number that they provided, for example, with the +44 country code added.

## Research on this pattern

More research is needed on the best way to handle:

- international numbers
- extensions
- SMS shortcodes
