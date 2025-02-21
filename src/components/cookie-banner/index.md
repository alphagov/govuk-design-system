---
title: Cookie banner
description: Allow users to accept or reject cookies which are not essential to making your service work.
section: Components
aliases: Cookies banner, consent banner, GDPR banner, tracking banner, analytics banner
backlogIssueId: 12
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

Allow users to accept or reject cookies which are not essential to making your service work.

{{ wcagCallout({
  type: "component",
  introAction: "use the",
  name: "Cookie banner",
  criteria: [
    {
      text: "make sure that items in focus can be seen all times",
      anchor: "wcag-see-focus"
    },
    {
      text: "make sure users can interact with buttons and links in the Cookie banner component",
      anchor: "wcag-interact-cookie-banner"
    }
  ]
}) }}

{{ example({ group: "components", item: "cookie-banner", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use this component if your service sets any cookies on a user’s device.

Remember, you must:

- tell users about the cookies your service sets on their device
- let users accept or reject any cookies that are not essential to providing your service

The term ‘non-essential cookies’ includes:

- HTML5 local storage
- service workers
- any other technologies that store files on the user’s device

This cookie banner and the [Cookies page pattern](/patterns/cookies-page/) are based on the approach to getting cookie consent used on the GOV.UK website.

This component page shows several options for using a cookie banner, based on the types of cookies you’re using in the service. We also tell you what to cover in your cookie banner, with some text examples.

### Before you start

[Audit and categorise your cookies](/patterns/cookies-page/#auditing-and-categorising-your-cookies) as shown in the cookies page pattern to help you choose the best option for your service.

You must not take the information on this page as legal advice. Your organisation is responsible and accountable for what they do to comply with data protection legislation, such as:

- Privacy and Electronic Communications Regulations (PECR)
- General Data Protection Regulation (GDPR)

Check with your organisation's privacy expert to see how data protection legislation affects your website and service.

## How it works

Show the cookie banner every time the user accesses your service until they either:

- accept or reject cookies using the buttons in the cookie banner
- save their cookie preferences on [your service’s Cookies page](/patterns/cookies-page/)

Once the user has accepted or rejected cookies, the cookie banner should:

- hide the cookie banner message
- show a confirmation message – and a 'hide' button to let the user close the banner
- set a cookie to save the user’s preferences for 1 year

Make sure the cookie banner does not:

- show when the user visits again, once their preferences have been saved
- set any non-essential cookies unless the user accepted them on a previous visit

Position the cookie banner after the opening `<body>` tag and before the ’skip to main content‘ link. If you're using the Nunjucks page template, use the `bodyStart` block.

{% call wcagNote({id: "wcag-see-focus"}) %}

<p>Do not make the Cookie banner component ‘sticky’ to the top of the page by using `position: fixed` or any other method. This is to make sure it does not cover or obscure any content which has a focus applied. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html">WCAG 2.2 success criterion 2.4.11 Focus not obscured (minimum)</a>.</p>
{% endcall %}

{% call wcagNote({id: "wcag-interact-cookie-banner"}) %}

<p>Do not change the padding or margins of buttons and links within the Cookie banner component. This is to make sure there’s adequate space for the user to interact with the buttons and links. This relates to <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">WCAG 2.2 success criterion 2.5.8 Target size (minimum)</a>.</p>
{% endcall %}

### Option 1: If you’re only using essential cookies

You can choose not to have a cookie banner if the service only sets essential or 'strictly necessary' cookies, as these do not need user consent.

However, you must tell users that you set essential cookies. You can do this with a cookies page – link to this page in the footer.

### Option 2: If you set non-essential cookies for users (with or without JavaScript)

You can choose this option if your service sets non-essential cookies on the server – your service may also set non-essential cookies on the client.

To get consent from the user, display the cookie banner inside a form that lets them submit their choice to accept or reject cookies.

All users will be able to see the banner as this approach does not rely on JavaScript.

Here's an example of a cookie banner inside a form:

{{ example({ group: "components", item: "cookie-banner", example: "server-side", html: true, nunjucks: true, open: false }) }}

Once the user has accepted or rejected cookies and set their cookie preferences, reload the page to show a confirmation message.

Here's an example of a confirmation message inside a form:

{{ example({ group: "components", item: "cookie-banner", example: "server-side-confirmation", html: true, nunjucks: true, open: false }) }}

#### Show the same message to all users

In the cookie banner, tell the user about all the cookies you’re using in the service – whether they've enabled JavaScript or not. This way, you will not need to ask the user to give their consent again on their next visit.

#### Help users keep their place using progressive enhancement

If the user is entering information into a form as part of the service, they might lose their place when they submit their choice to accept or reject cookies.

To help users running JavaScript on their device, you can write some JavaScript code to let them submit their choice and prevent the page from reloading.

Include all possible messages that the user could see in the cookie banner when the page loads. Hide these with the `hidden` HTML attribute where needed.

Here's an example of a progressively enhanced cookie banner that includes all possible messages which are hidden using HTML – the cookie banner message is shown using JavaScript to remove the `hidden` attribute:

{{ example({ group: "components", item: "cookie-banner", example: "server-side-multiple-messages-question-visible", html: true, nunjucks: true, open: false }) }}

Here's the same example of a progressively enhanced cookie banner, with the confirmation message shown instead:

{{ example({ group: "components", item: "cookie-banner", example: "server-side-multiple-messages-confirmation-visible", html: true, nunjucks: true, open: false }) }}

### Option 3: If you set non-essential cookies, but only using client-side JavaScript

You can choose to make your banner only work with JavaScript if your service only needs to set non-essential cookies on the client.

When the page loads, the `hidden` html attribute hides the component, as well as all the cookie banner messages it contains, which the user might otherwise see.

#### Show the cookie banner only to users that have enabled JavaScript

Use JavaScript to show cookie banner messages to users that have not accepted or rejected cookies by removing the `hidden` attribute as needed.

Write your own JavaScript code so that when the user accepts or rejects cookies, the cookie banner will:

- hide the cookie message by adding the hidden attribute
- show a confirmation message by removing its hidden attribute
- give the confirmation message the `tabindex="-1"` and `role="alert"` attributes – this will allow the element to be focused so assistive technology can read the message
- shift focus to the confirmation message

Here’s an example:

{{ example({ group: "components", item: "cookie-banner", example: "client-side", html: true, nunjucks: true, open: false }) }}

#### When the user has accepted cookies

Show a confirmation message confirming that the user has either accepted or rejected cookies by removing the `hidden` attribute.

{{ example({ group: "components", item: "cookie-banner", example: "client-side-accepted", html: true, nunjucks: true, open: false }) }}

#### When the user has rejected cookies

{{ example({ group: "components", item: "cookie-banner", example: "client-side-rejected", html: true, nunjucks: true, open: false }) }}

## What to cover in your cookie banner

Include the name of the service in the banner heading to help users understand that the cookies you’re talking about are different from the ones set by the main GOV.UK platform.

You’ll need to change the example cookie banner text if your service:

- allows third parties to set cookies (tell the user that both your organisation and other organisations will be setting cookies)
- uses cookies for reasons other than collecting analytics information or remembering the user’s settings

Keep the text as short as possible while making sure it’s an accurate description of how you use cookies. For example, if you use more than one ‘functional’ cookie and there’s not enough space to mention what each of them does, you could ask for permission to set cookies so ‘you can use as many of the service’s features as possible’.

[See the Cookies page pattern for more advice on writing about cookies](/patterns/cookies-page/).

### If you’re using essential cookies and analytics cookies

You can use this example text for a service which sets essential and analytics cookies. Analytics cookies are those set by your organisation to collect information about how people are using your digital service.

{{ example({ group: "components", item: "cookie-banner", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### If you’re using more than one type of non-essential cookie

You can use this example text for a service that set:

- essential cookies
- analytics cookies
- functional cookies to remember the user’s settings but are not essential

{{ example({ group: "components", item: "cookie-banner", example: "multiple-cookies", html: true, nunjucks: true, open: false }) }}

## Creating a cookies page

You’ll need a [Cookies page in your service](/patterns/cookies-page/) as well as a cookie banner.

## Research on this component

When the user accepts or rejects cookies, a confirmation message will display. For example, "Your cookie preferences have been saved." The focus also shifts to this new message.

However, a visible focus indicator does not display around the confirmation message. This is different from the notification banner, which does display a visible focus indicator.

We decided to remove the visible focus indicator from the confirmation message for a few reasons, as:

- a user cannot interact with it
- it's the first element, at the very top of the page
- it displays in place of the cookie message, which is the last thing the user interacted with

In this scenario, we assume that a visible focus indicator would be more likely to confuse users than to help them. However, we need more research to prove this.
