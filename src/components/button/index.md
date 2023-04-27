---
title: Button
description: Use the button component to help users carry out an action
section: Components
aliases:
backlog_issue_id: 34
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

{{ example({group: "components", item: "button", example: "default", html: true, nunjucks: true, open: false}) }}

## When to use this component

Use the button component to help users carry out an action like starting an application or saving their information.

## How it works

Write button text in sentence case, describing the action it performs. For example:

- ‘Start now’ at the [start of the service](/patterns/start-using-a-service/)
- ‘Sign in’ to an account a user has already created
- ‘Continue’ when the service does not save a user’s information
- ‘Save and continue’ when the service does save a user’s information
- ‘Save and come back later’ when a user can save their information and come back later
- ‘Add another’ to add another item to a list or group
- ‘Pay’ to make a payment
- ‘Confirm and send’ on a [check answers](/patterns/check-answers/) page that does not have any legal content a user must agree to
- ‘Accept and send’ on a [check answers](/patterns/check-answers/) page that has legal content a user must agree to
- ‘Sign out’ when a user is signed in to an account

You may need to include more or different words to better describe the action. For example, ‘Add another address’ and ‘Accept and claim a tax refund’.

Align the primary action button to the left edge of your form.

There are 2 ways to use the button component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

### Default buttons

Use a default button for the main call to action on a page.

Avoid using multiple default buttons on a single page. Having more than one main call to action reduces their impact, and makes it harder for users to know what to do next.

{{ example({group: "components", item: "button", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second"}) }}

### Start buttons

Use a start button for the main call to action on your service’s [start page](/patterns/start-using-a-service/).
Start buttons do not usually submit form data, so use a link tag instead of a button tag.

{{ example({group: "components", item: "button", example: "start", html: true, nunjucks: true, open: false}) }}

### Secondary buttons

Use secondary buttons for secondary calls to action on a page.

Pages with too many calls to action make it hard for users to know what to do next. Before adding lots of secondary buttons, try to simplify the page or break the content down across multiple pages.

{{ example({group: "components", item: "button", example: "secondary", html: true, nunjucks: true, open: false}) }}

You can also [group default and secondary buttons together](#grouping-buttons).

### Warning buttons

Warning buttons are designed to make users think carefully before they use them. They only work if used very sparingly. Most services should not need one.

{{ example({group: "components", item: "button", example: "warning", html: true, nunjucks: true, open: false}) }}

Only use warning buttons for actions with serious destructive consequences that cannot be easily undone by a user. For example, permanently deleting an account.

When letting users carry out an action like this, it's a good idea to include an additional step which asks them to confirm it.

In this instance, use another style of button for the initial call to action, and a warning button for the final confirmation.

Do not only rely on the red colour of a warning button to communicate the serious nature of the action. This is because not all users will be able to see the colour or will understand what it signifies. Make sure the context and button text make clear what will happen if the user selects it.

### Buttons on dark backgrounds

Use the `govuk-button--inverse` modifier class to show white buttons on dark backgrounds — for example, in headers, custom components, and patterns with darker backgrounds.

Make sure all users can see the button — the white button and background colour [must have a contrast ratio of at least 3:1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html).

{{ example({group: "components", item: "button", example: "inverse", html: true, nunjucks: true, open: false}) }}

### Disabled buttons

Disabled buttons have poor contrast and can confuse some users, so avoid them if&nbsp;possible.

Only use disabled buttons if research shows it makes the user interface easier to&nbsp;understand.

{{ example({group: "components", item: "button", example: "disabled", html: true, nunjucks: true, open: false}) }}

### Grouping buttons

Use a button group when two or more buttons are placed together.

{{ example({group: "components", item: "button", example: "secondary-combo", html: true, nunjucks: true, open: false}) }}

Any links within a button group will automatically align with the buttons.

{{ example({group: "components", item: "button", example: "button-group", html: true, nunjucks: true, open: false}) }}

### Stop users from accidentally sending information more than once

Sometimes, users double click buttons because they:

- have used operating systems where they have to double click items to make them work
- are experiencing a slow connection which means they are not given feedback on their action quickly enough
- have motor impairments such as hand tremors which cause them to click the button involuntarily

In some cases, this can mean their information is sent twice.

For example, the GOV.UK Notify team discovered that a number of users were receiving invitations twice, because the person sending them was double clicking the 'send' button.

If you are working in production and research shows that users are frequently sending information twice, you can configure the button to ignore the second click.

To do this, set the `data-prevent-double-click` attribute to `true`. You can do this directly in the HTML or, if you’re using Nunjucks, you can use the Nunjucks macro as shown in this example.

{{ example({group: "components", item: "button", example: "prevent-double-click", html: true, nunjucks: true, open: false}) }}

This feature will prevent double clicks for users that have JavaScript enabled, however you should also think about the issue server-side to protect against attacks.

In the case of slow connections, aim to give the user information about what’s happening, for example, by showing a loading spinner or a modal, before using `data-prevent-double-click`.


## Research on this component

Testing on GOV.UK has shown that [the green colour of start buttons has improved click-through rates](https://github.com/alphagov/govuk-design-system-backlog/issues/34#issuecomment-699537400).
