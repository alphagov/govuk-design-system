---
title: Tag
description: The tag component indicates the status of something, such as an item on a task list or a phase banner
section: Components
aliases: chip, badge, flag, token
backlogIssueId: 62
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use the tag component to show users the status of something.

{{ example({group: "components", item: "tag", example: "default", html: true, nunjucks: true, open: false }) }}

## When to use this component

Use the tag component when it’s possible for something to have more than one status and it’s useful for the user to know about that status. For example, you can use a tag to show whether an item in a [task list](/patterns/task-list-pages/) has been ‘completed’.

## How it works

There are two ways to use the tag component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

Tags are just used to indicate a status, so do not add links. Use adjectives rather than verbs for the names of your tags. Using a verb might make a user think that clicking on them will do something.

## Showing one or two statuses

Sometimes a single status is enough. For example if you need to tell users which parts of an application they’ve finished and which they have not, you may only need a ‘Completed’ tag. Because the user understands that if something does not have a tag, that means it’s incomplete.

The [task list pattern](/patterns/task-list-pages/) has an example of how to show one status using tags.

Or it can make sense to have two statuses. For example you may find that there’s a need to have one tag for ‘Active’ users and one for ‘Inactive’ users.

{{ example({group: "components", item: "tag", example: "multiple-tags", html: true, nunjucks: true, open: false }) }}

## Showing multiple statuses

Tags should be helpful to users. The more you add, the harder it is for users to remember them. So start with the smallest number of statuses you think might work, then add more if your user research shows there’s a need for them.

{{ example({group: "components", item: "tag", example: "coloured-tags", html: true, nunjucks: true, open: false }) }}

## Using colour with tags

You can use colour to help distinguish between different tags – or to help draw the user’s attention to a tag if it’s especially important. For example, it probably makes sense to use  `govuk-tag--red` for a tag that reads ‘Urgent’.

[Do not use colour alone to convey information](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html) because it’s not accessible. If you use the same tag in more than one place, make sure you keep the colour consistent.

Because tags with solid colours tend to stand out more, it’s usually best to avoid mixing solid colours and tints: use one or the other. This matters less if you’re only using two colours. For example, it's okay to use the tint `govuk-tag--grey` and solid blue tags together if you only need two statuses.

### Additional colours

If you need more tag colours, you can use the following tints.

{{ example({group: "components", item: "tag", example: "all-colours", html: true, nunjucks: true, open: false }) }}

## Research on this component

The Department for Education contributed the coloured tags. They’re being used in:

- apply for teacher training (used by citizens)
- manage teacher training applications (used by teacher training providers)
