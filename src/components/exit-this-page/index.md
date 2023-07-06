---
title: Exit this page
description: Give users a way to quickly and safely exit a service, website or application.
section: Components
aliases:
backlog_issue_id: 213
layout: layout-pane.njk
status: Experimental
statusMessage: This component is currently experimental. <a class="govuk-link" href="#known-issues-and-gaps">You'll need to do your own research</a> to decide whether to add this component to your service.
---
{% from "_example.njk" import example %}

Give users a way to quickly and safely exit a service, website or application.

For service journeys, you must use this component with the pattern to help a user [Exit a page quickly](/patterns/exit-a-page-quickly/).

{{ example({group: "components", item: "exit-this-page", example: "default", html: true, nunjucks: true, open: false, size: "s"}) }}

## When to use this component

Use the component on pages with sensitive information that could:
- put someone at risk of abuse or retaliation
- reveal someone’s plans to avoid or escape from harm

For example, when a potential victim is using a service to help them leave a domestic abuser.

You can use this component on either:
- all the pages in a service
- parts of the journey with sensitive information

You can also use this component for standalone content pages, such as dashboards and guidance.

## When not to use this component

Do not use this component if the service or content is unlikely to put a user at risk. See the [Exit a page quickly](/patterns/exit-a-page-quickly/) pattern for examples of at-risk and sensitive topics.

The 'Exit this page' component is a [button component](/components/button/) that has been marked up with addtional CSS and JavaScript functionality, to make it work in a specific way. 

Keep in mind that seeing this component might discourage certain users from using your service. If the user does not identify themselves as being at risk, they might see the button on a service and decide it’s not relevant to them.

## How it works

There are 2 ways to use this component. You can use HTML or, if you're using Nunjucks or the GOV.UK Prototype Kit, you can use the Nunjucks macro.

### Adding the button

Position the component at the top of your page, above the beginning of the grid (`<div class="govuk-grid-row">`) but still within the width container (`<div class="govuk-width-container">`).

### Choosing a different website to load

When activated, the component by default will take the user to the [homepage of BBC Weather](https://www.bbc.co.uk/weather). You can change this if there’s a more appropriate site for your users.

Avoid websites that might show personalised pages (such as frequently visited, last visited or suggested links), as this content could put the user at risk.
### Adding the secondary link

Add the code for the 'secondary link' into the layout file of your service. The 'secondary link' is an additional `govuk-skip-link` that works in a similar way. Place it under the page template's default skip link at the very top of the body.

When the user interacts with the 'secondary link', it will perform the same action as pressing the button to activate Exit this Page.

{{ example({group: "components", item: "exit-this-page", example: "secondary-link", html: true, nunjucks: true, open: false, size: "s"}) }}

The `href` for the 'secondary link' should be the same as the URL used for the button.

The component will still work if the 'secondary link' is not added, but it'll be less accessible overall.

## Consider what to do with user session data

You’ll need to decide if your service will store the user’s session data after they’ve activated the Exit this page component and left your service.

For example, you could do this in 2 steps:
1. replace the default website link to a URL in your service, that when visited, will clear the user's session data
2. redirect the user to another website, such as BBC Weather


## Enhancement features

These features are included in the component and should work automatically, as long as the user has enabled Javascript in their browser. You do not need to do anything to make these work.

### Loading overlay

The 'loading overlay' will appear immediately when the user activates Exit this page.

The overlay helps users with slow connections clear their screen until the browser loads the next page.

### Showing progress for 'shift key' presses

To show the user the number of times they’ve pressed the shift button, there’s a series of 3 progress dots under the button, provided as a visual enhancement. Each time the shift key is pressed, one of the dots will be filled.

The user has 5 seconds to press the shift key 3 times. After that, the sequence and progress dots will reset.

## Accessibility features and considerations

In addition to the Exit this page button itself, users have 2 other options to activate the component. We've tested and iterated both of these options to be accessible, reliable and as discreet as possible for users.

The keyboard option, where the user can press shift 3 times, gives users a discreet way to activate the component, particularly keyboard-only users. We considered options that used a single key press (such as the 'esc' key), but we could not be confident that this would not interfere with other user actions.

The 'secondary link' option is a hidden link in the tab order of the page. This gives users of assistive technology and easier way to reliably activate the component.

To help users of speech recognition software activate the 'secondary link' more discreetly, we considered changing the link text to something else that hid its real purpose. 

However, we decided this was more likely to confuse users. We're also confident about the other ways users can use speech recognition software to activate the 'secondary link' without saying the text out loud, such choosing the link as an item number on a list.

## Research on this component

The design of this component is based on research with people with a lived experience of domestic abuse and people with accessibility needs, and in consultation with the Ministry of Justice, Department for Work and Pensions and the Scottish Government.

We plan to show more information about how many services use this component.

### Known issues and gaps

We've tested this component mainly with users at risk of domestic abuse. However we've not done extensive testing with any other user groups.

Before using this component, you should do research with your users. If you do, we'd welcome any feedback and findings you can share with us.

We're particularly interested in investigations into how well this component works on static pages of information ('flat content').

Share your feedback, use cases and research findings on the [Exit this page discussion space on GitHub](https://github.com/alphagov/govuk-design-system/discussions/categories/exit-this-page). 

We also share notes about our decisions, work and research in the GitHub discussion space and welcome your feedback on those.
