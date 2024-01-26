---
title: Tag
description: The tag component indicates the status of something, such as an item on a task list or a phase banner
section: Components
aliases: chip, badge, flag, token
backlogIssueId: 62
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Use the tag component to show users the status of something.

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria affects this component

To use the ‘Tag' and meet the new Web Content Accessibility Guidelines (WCAG) 2.2 criteria, make sure that users can successfully:

- [interact with tags without relying on 'click and drag' movements (if you choose to add functionality to reorder tags)](/components/tag/#wcag-tag-no-dragging-reorder)

See the full list of [components and patterns affected by WCAG 2.2](/accessibility/wcag-2.2/#components-and-patterns-affected-in-the-design-system).
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  classes: "app-inset-text"
}) }}

{{ example({ group: "components", item: "tag", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

Use the tag component when it’s possible for something to have more than one status and it’s useful for the user to know about that status. For example, you can use a tag to show whether an item in a [task list](/components/task-list/) has been ‘completed’.

## How it works

There are two ways to use the tag component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

Tags are only used to indicate a status. Do not make a tag interactive by making it into a link or button. Use adjectives (descriptive words) and not verbs (action words) for the names of your tags. Using a verb might make a user think that clicking on them will do something.

Do not use tags to create links, buttons or other interactive elements, as users:

- are unlikely to identify the tags as something they’re meant to interact with
- would see no visual difference between interactive and non-interactive tags

## Showing one or two statuses

Sometimes a single status is enough. For example if you need to tell users which parts of an application they’ve finished and which they have not, you may only need a ‘Completed’ tag. Because the user understands that if something does not have a tag, that means it’s incomplete.

The [complete multiple tasks pattern](/patterns/complete-multiple-tasks/) has an example of how to show one status using tags.

Or it can make sense to have two statuses. For example you may find that there’s a need to have one tag for ‘Active’ users and one for ‘Inactive’ users.

{{ example({ group: "components", item: "tag", example: "multiple-tags", html: true, nunjucks: true, open: false }) }}

## Showing multiple statuses

Tags should be helpful to users. The more you add, the harder it is for users to remember them. So start with the smallest number of statuses you think might work, then add more if your user research shows there’s a need for them.

{{ example({ group: "components", item: "tag", example: "coloured-tags", html: true, nunjucks: true, open: false }) }}

<div class="app-wcag-22" id="wcag-tag-no-dragging-reorder" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>Any tag implementation that allows the user to change the order of tags must offer a way to do so without relying on ‘click and drag’ movements. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html">2.5.7 Dragging Movements</a>.</p>
</div>

## Using colour with tags

You can use colour to help distinguish between different tags – or to help draw the user’s attention to a tag if it’s especially important. For example, it probably makes sense to use `govuk-tag--red` for a tag that reads ‘Urgent’.

[Do not use colour alone to convey information](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html) because it’s not accessible. If you use the same tag in more than one place, make sure you keep the colour consistent.

### Additional colours

If you need more tag colours, you can use the following colours.

{{ example({ group: "components", item: "tag", example: "all-colours", html: true, nunjucks: true, open: false }) }}

## Research on this component

The Department for Education contributed the coloured tags. They’re being used in:

- apply for teacher training (used by citizens)
- manage teacher training applications (used by teacher training providers)

The tag component previously used uppercase bold text for the tags. This was changed as some research has shown that uppercase text can be harder to read, particularly for longer tag text.

The tag component previously used white text on a dark coloured background. Research from multiple teams found that some users perceived these as buttons and tried to click on them. The design was changed to try and avoid this, by using a lighter background colour and darker text.
