---
title: Check a service is suitable
description: Ask users questions to help them work out if they can or should use your service
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 35
layout: layout-pane.njk
---

{% from "_callout.njk" import callout %}
{% from "_wcag-note.njk" import wcagNote %}

Ask users questions to help them work out if they can or should use your service.

{{ callout({
  wcag: "true",
  colour: "blue",
  type: "pattern",
  introAction: "help users to",
  name: "Check a service is suitable",
  criteria: [
    {
      text: "make sure users do not need to repeat answers that they've already given",
      anchor: "wcag-avoid-repeating-questions"
    }
  ]
}) }}

Doing this helps users save time as it tells them upfront whether they are eligible to use it and if they need it.

It can also help reduce time and money spent processing queries from users confused about whether they’re eligible to use your service, or if it’s suitable for them.

{% call wcagNote({id: "wcag-avoid-repeating-questions"}) %}

<p>Make sure to not repeat questions or request information the user will need to re-provide later.</p>
<p>If during the process a service is determined to be suitable, consider offering a secure method to carry forward relevant responses into the service journey, unless carrying forward would be a major safety concern.</p>
<p>You can make it easier to enter the same information within the service through one of these methods:</p>
<ul>
  <li>pre-populating the relevant fields</li>
  <li>showing carried-forward responses as an option for the user to select</li>
</ul>
<p>This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">WCAG 2.2 success criterion 3.3.7 Redundant entry</a>.</p>
{% endcall %}

![‘Check a service is suitable’ flow diagram. Contains an introduction page followed by a series of simple questions. If at any point a user is deemed not eligible for the service they will be pointed to a page that explains why they are not eligible. Otherwise they will be presented an ‘application complete’ page. ](check-a-service-is-suitable-new.svg)

## When to use this pattern

If you have complicated eligibility requirements you should follow this pattern. This will save users from having to read through large amounts of documentation outside of your service to work out if they can use it.

Use this pattern to help users work out:

- if they’re eligible to use your service
- how much it will cost them to use
- how much money they will get
- how long it will take to get something

Read guidance about designing your service so you [give users information at the point they need it](https://www.gov.uk/service-manual/design/govuk-content-transactions) in the GOV.UK Service Manual.

## When not to use this pattern

Do not use this pattern if you can reasonably include information users need to know about your service and its eligibility requirements on a start page.

## How it works

You should help people find out whether your service is right for them as soon as you&nbsp;can.

When using this pattern you need to:

- ask a series of simple questions
- automatically work out what a user needs to know
- present the user with a ‘results’ page

If there are general rules about whether a service can or cannot be used such as an age limit or fixed deadline, include these on the start page.

### Presenting results

Your results page should show the user if they’re eligible to use it. Where applicable, it should also show them:

- if they have to use your service
- how much it will cost them to use it
- how much money they’ll get from using it
- how long the whole process will take

If a user is not eligible to use your service, explain why and, if possible, tell them what they should do instead.

Here’s an example of a results page:

![Screenshot of a results page, includes a heading that explains if the user is eligible, a summary of why, and a button to continue.](check-a-service-is-suitable-result.png)

## Research on this pattern

Read a blog post about [testing and iterating this pattern](https://designnotes.blog.gov.uk/2017/03/30/weve-published-the-check-before-you-start-pattern/).

Please note this pattern used to be called ‘Check before you start’.
