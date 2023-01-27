---
title: Share user research findings
description: Find out how to share information on how styles, components and patterns are performing
section: Community
theme: Ways to get involved
layout: layout-pane.njk
order: 2
---

<style>
	code {
		white-space : pre-wrap !important;
	}
</style>

We rely on feedback from users to improve the Design System – we want to hear how styles, components and patterns are performing in your service. You can do this by sharing your research findings on Github.

Your service might be in the alpha or beta phases, or you might be iterating the service after going live. Feedback from any phase helps us keep improving the Design System in line with evolving user needs.

## Adding research findings to Github

Go to our [list of discussions on Github](https://github.com/orgs/alphagov/projects/43/views/1). Select the component or pattern you want to share findings about. Alternatively, there are links at the bottom of each component or pattern page on the Design System website.

Once you’ve selected the right thing, add your findings in a comment at the bottom of the page. 

{% from "govuk/components/warning-text/macro.njk" import govukWarningText %}

<p>
{% set callout %}
Do not share any personally identifiable information about your participants or sensitive information about your service. All the information on our Github repos is open to the public.
{% endset %}

{{ govukWarningText({
html: callout,
iconFallbackText: "Warning"
}) }}
</p>

If you can't find what you're looking for on the list, read about how to [propose a component or pattern](/community/propose-a-component-or-pattern/). 

### Research template

To help you structure your findings, we’ve listed some questions that would help our community understand and learn from your work. Copy and paste the template below and fill in your findings.

```markdown
## Context

Answer each of the following questions:

### Which service(s) did you test the component in?
e.g. Apply for a passport

### When did you do it?
e.g. June 2022

### What were you trying to learn?
e.g. testing the entire application process

### Did you test with users of assistive technology?
e.g. Yes

### If yes, which assistive technologies did they use?
e.g. JAWS, NVDA, screen magnifier


## Methods

Briefly explain who you researched with and how you did it.


## Main findings

What have you learned about how end users use and understand the component? Tell us how it helped or hindered users’ journeys, using specific observations. Include any metrics or hypotheses that helped you measure success.

Include screenshots if it helps get your points across.


## Remaining questions

If you still have questions that weren’t answered by your research, please note them here.


## Further information

Share links to any prototypes you used or in-depth research documents.

```

## What happens next

Other members of the community may respond to your findings on Github – feel free to take part in the conversation.

The Design System team reads all new comments on Github. We usually don’t act immediately on feedback – we need to grow a clear body of evidence before we can be sure that something is a problem.

### Acting on feedback

Most additions to the Design System are chosen through a regular prioritisation process with the community. [Read a blog post about how we prioritise new additions to the Design System](https://designnotes.blog.gov.uk/2022/09/07/how-we-prioritise-additions-to-the-gov-uk-design-system/). We share the top priorities on the [Upcoming components and patterns](/community/upcoming-components-patterns/) page.

We will also prioritise improvements to an existing part of the Design System if we see repeated evidence that it’s not working well. It depends on the severity of the issue, but we will usually investigate something if we hear similar findings from 4 or more different services.
