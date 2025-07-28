---
title: Exit a page quickly
description: Give users a way to quickly and safely exit a service, website or application.
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 213
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Give users a way to quickly and safely exit a service, website or application.
Use this pattern to add the [Exit this page component](/components/exit-this-page/) to your service and keep users safe by helping them to protect their privacy.

## When to use this pattern

Use this pattern to help the user protect their privacy when your service contains sensitive information that could:

- put someone at risk of abuse or retaliation
- reveal someone’s plans to avoid or escape from harm

For example, a potential victim using a service to help them leave domestic abuse.

Other situations and topics where sensitive information could put users at risk might include:

- rape or sexual assault
- child abuse and neglect
- any other type of abuse
- stalking and harassment
- reporting crime or fraud (whistleblowing)

## When not to use this pattern

You should not use this pattern for standalone content pages, such as dashboards and guidance. In these cases, use the Exit this page component on its own.

## How it works

First, you’ll need to add the [Exit this page component](/components/exit-this-page/) to your service and decide how it should work within your service.

The component has several parts, including:

- a button, that when activated, will take the user to another website
- a secondary link, to give people that use assistive technologies another way to activate the component
- a loading overlay, to immediately clear any content off the browser until the next website loads

Next, you’ll need to create new content pages in your service.

The purpose of these pages are to:

- tell the users how to use ‘Exit this page’ to protect their privacy (this called the interruption page)
- give users information they need to stay safe online (this is called the safety content page)

This pattern is not a complete solution to eliminating all possible risk to the user. Perpetrators can monitor potential victims through other methods, such as malicious software.

## Interruption page

Create a page to explain Exit this page to users.

You must show this page after the start point of your service, but before the page where the user will see the Exit this page button for the first time.

On longer services, you might need more than one interruption page.

The page should tell the user:

- about the Exit this page button and what it’s for
- what happens when they press it
- they can also activate Exit this page by pressing shift 3 times or by using the secondary link

The page should also tell the user that:

- their internet browsing history will not be erased, which can still put them at risk
- any information they’ve entered will not be saved, depending on what you’ve [decided to do with your service's user session data](/components/exit-this-page/#consider-what-to-do-with-user-session-data)
- to return to the service, they can search for the site they were using, or find it in their internet browsing history
- there are other things they can do to stay safe online (include a link to a ‘safety content page’ where the user can learn more)

## Safety content page

Create a page to give users important information they need to stay safe online.

Generally, this page should tell the user other steps they can take to protect their privacy.

What you include will depend on your service and who uses it. But wherever practical, you should recommend the user takes some basic steps such as:

- only using your service on a public device, such as in a library
- using private browsing
- clearing their internet browsing history and cookies

### Example of a safety content page

{{ example({ group: "patterns", item: "exit-a-page-quickly", example: "safety-content-example", html: true, nunjucks: true, open: false, size: "xl" }) }}

Useful resources to help write this safety advice include:

- [Refuge: Secure your tech](https://refugetechsafety.org/secure-your-tech/)
- [Women’s Aid: Cover your tracks online](https://www.womensaid.org.uk/information-support/what-is-domestic-abuse/cover-your-tracks-online/)
- [National Cyber Security Centre: Information for individuals and families](https://www.ncsc.gov.uk/section/advice-guidance/you-your-family)

Let us know of any other useful resources we should add to the list.

## Research on this pattern

The design of this pattern is based on research from a specialist provider of services to survivors of domestic abuse, and in consultation with the Ministry of Justice, Department for Work and Pensions and the Scottish Government.

Live examples of similar components can be found on these websites:

- [GOV.UK: Check if you can get legal aid](https://www.gov.uk/check-legal-aid)
- [GOV.UK: Apply for help arranging child maintenance](https://child-maintenance.service.gov.uk/apply/)
- [mygov.scot: Domestic abuse support](https://www.mygov.scot/domestic-abuse)
- [Women’s aid website](https://www.womensaid.org.uk/)
- [Refuge website](https://www.nationaldahelpline.org.uk/)
