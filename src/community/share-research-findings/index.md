---
title: Share findings about your users
description: Find out how to share information on how styles, components and patterns are performing
section: Community
theme: Ways to get involved
layout: layout-pane.njk
order: 2
---

We want to hear how styles, components and patterns perform in your service – it helps us improve the Design System. You can do this by taking part in discussions on GitHub.

Useful findings to share might be things like:

- summaries of user research you’ve done
- prototypes or ideas that you’ve tested
- analytics from your service
- responses to any calls for information we give in the 'Research on this...' section of our pages

Your service might be in the alpha or beta phases, or you might be iterating the service after going live.

Feedback from any phase helps us iterate the Design System in line with evolving user needs.

## Where to add findings

Go to our [list of discussions on GitHub](https://github.com/orgs/alphagov/projects/43/views/1). There are 2 tabs, each showing a list of discussion pages about:

- things already in the Design System
- things that could be added in the future

Feedback on both is useful to us. You’ll need to [create a GitHub account](https://github.com/join) to add comments.

Select the thing you want to share findings about. If what you’re looking for isn’t on the list, read about [how to propose a component or pattern](https://design-system.service.gov.uk/community/propose-a-component-or-pattern/).

Once you’ve selected the right discussion, use the template below to add your findings.

{% from "govuk/components/warning-text/macro.njk" import govukWarningText %}

{% set callout %}
Share information responsibly. <a href="https://www.gov.uk/service-manual/user-research/getting-users-consent-for-research">You must get informed consent from your participants</a> before you can share findings of any research they’ve participated in.
{% endset %}

{{ govukWarningText({
  html: callout,
  iconFallbackText: "Warning"
}) }}

Remember that all the information on GitHub is open to the public. Do not share any personally identifiable information about your participants or sensitive information about your service.

## Research template

Use this template to give the community useful context about your findings. Copy and paste it into the GitHub comments box and add your findings.

```markdown
## Key insights

What are your key insights about how people use the style, pattern or component?

Try to include:
- how it helped or hindered users’ journeys, using specific observations
- any metrics or hypotheses that helped you measure success
- screenshots of how you implemented it in your service

## Methods

Give us some context and briefly explain how you gathered the findings.

Try to include:
- which service you used the pattern or component in
- when you did your user research or test
- whether you tested with users with access needs, noting any assistive technologies they - used

## More information

Add links to any prototypes or research documents.
```

You can edit your comment after you post it, so do not worry if you get something wrong or want to change it later.

Community members might respond to your findings on GitHub. Feel free to take part in the conversation.

For example, you could:
compare findings
learn about each other’s users and their needs
see what’s worked to improve things, and what has not

You’ll usually be subscribed to get notifications from GitHub when there’s a new comment in the discussion. [Find out how to check your notification settings in GitHub](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications).

## Acting on feedback

The Design System team reads all new comments on our GitHub pages. We do not usually act immediately on feedback – we need to grow a clear body of evidence before we can be sure that something is a problem.

Even if your findings do not lead to a change to the Design System, it’s really useful to share anyway. People across government read the discussions on GitHub to see how others have approached things and what they’ve learned.

We’ll prioritise improvements to an existing part of the Design System if we see repeated evidence that it’s not working well. It depends on the severity of the issue, but we will usually investigate something if we hear similar findings from 4 or more different services. We also make iterative improvements where we can, but we’ll prioritise fixing known issues first.

Most major additions to the Design System team are chosen through a regular prioritisation process with the community. [Read a blog post about how we prioritise new additions to the Design System](https://designnotes.blog.gov.uk/2022/09/07/how-we-prioritise-additions-to-the-gov-uk-design-system/).

We share the chosen priorities on the [Upcoming components and patterns page](https://design-system.service.gov.uk/community/upcoming-components-patterns/).
