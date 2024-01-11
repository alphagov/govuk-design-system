---
title: Complete multiple tasks
description: Task lists help users understand tasks involved in completing a transaction, the order they should complete tasks in and when they have completed tasks
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 72
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{% from "govuk/components/tag/macro.njk" import govukTag %}

Help users understand:

- the tasks involved in completing a transaction
- the order they should complete tasks in
- when they've completed tasks

{% set wcagCallout %}

{{ govukTag({
  text: "WCAG 2.2",
  classes: "app-tag"
}) }}

### New WCAG 2.2 criteria might affect this pattern

To help users to 'Complete multiple tasks' and meet the new WCAG 2.2 criteria, make sure that users can successfully:

- [interact with tasks without relying on 'click and drag' movements (if you choose to add functionality to reorder tasks)](/patterns/complete-multiple-tasks/#wcag-interact-without-click-drag-task)
- [edit information they've given when going back to a previous task](/patterns/complete-multiple-tasks/#wcag-edit-information-previous-task)

See the full list of components and patterns affected on our '[Changes to meet WCAG 2.2 page](/accessibility/WCAG-2.2/#components-and-patterns-affected-in-the-design-system)'.
{% endset %}

{{ govukInsetText({
  html: wcagCallout,
  attributes: {
    style: 'border-left-color: #1d70b8;'
  }
})}}

{{ example({ group: "patterns", item: "complete-multiple-tasks", example: "default", html: true, nunjucks: true, open: false }) }}

Complete multiple tasks pages use a [task list component](/components/task-list) for each group of tasks on the page.

## When to use this pattern

Only use a complete multiple tasks page for longer transactions involving multiple tasks that users may need to complete over a number of sessions.

Try to simplify the transaction before you use a complete multiple tasks page. If you’re able to reduce the number of tasks or steps involved, you might not need one.

## How it works

You should show a complete multiple tasks page:

- at the start of the transaction
- at the start of each returning session

If you use a complete multiple tasks page in your service, you'll need to:

- group related actions into tasks
- show the status of the tasks

If there are lots of tasks to complete, you might also need to group them further into steps.

### Show related actions as a task

Summarise a set of related activities and questions into a task, for example, ‘Provide financial evidence’ and ‘Give medical information’. This will help users understand and plan what they need to do.

Where possible, task names should:

- describe what the task or activity will involve
- start with verbs, for example, ‘check’, ‘declare’, ‘report’

<div class="app-wcag-22" id="wcag-interact-without-click-drag-task" role="note">
    {{ govukTag({
        text: "WCAG 2.2",
        classes: "app-tag"
    }) }}
    <p>Any task list that allows the user to rearrange the order that tasks are shown must offer a way to do so without relying on ‘click and drag’ movements. This is to comply with <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html">WCAG 2.2 success criterion 2.5.7 Dragging Movements</a>.</p>
</div>

### Show the status of the tasks

Make it clear to users which tasks they’ve completed and which still need their attention, by labelling them using statuses.

{{ example({ group: "patterns", item: "complete-multiple-tasks", example: "task-list-statuses", html: true, nunjucks: true, open: false }) }}

Statuses should be helpful to users. The more you add, the harder it is for users to remember them. Start with the smallest number of different statuses you think might work, for example ‘Completed’ and ‘Incomplete’, then add more if your user research shows there’s a need for them.

Once the user has completed the task, the status should show as ‘Completed’ and be black text with no background colour. This will draw more attention to tasks that require action.

#### Tasks that are in progress

You may find you need additional statuses if your user research shows that users want to be able to distinguish between the tasks they haven’t started at all, and those they’ve started but not completed.

In this instance, instead of ‘Incomplete’, you may want to use ‘Not yet started’ to show which tasks they are yet to start. You should then use ‘In progress’ for tasks they have started but are yet to complete.

‘Not yet started’ uses a blue background, and ‘In progress’ uses a light blue background.

{{ example({ group: "components", item: "task-list", example: "in-progress", html: true, nunjucks: true, open: false }) }}

#### Tasks that cannot yet be started

If the user cannot start the task yet, for example because another task must be completed first, use the ‘Cannot start yet’ status. This should be grey text with no background colour, and the ‘task row’ should not be linked.

{{ example({ group: "components", item: "task-list", example: "cannot-start-yet", html: true, nunjucks: true, open: false }) }}

#### Tasks containing an error

You should avoid tasks having an error status by using the [error summary](/components/error-summary/) and [error messages](/components/error-message/) displayed at the point that the error is made, so that the user can fix it straight away.

If it is unavoidable that a task may end up saved but containing an error, use the status text ‘There is a problem’ and a red background.

Do not use the red background colour for any status text except errors.

{{ example({ group: "components", item: "task-list", example: "error", html: true, nunjucks: true, open: false }) }}

#### Status text

Although we recommend using consistent wording across task lists, you can change it if research shows that different text is more suitable to your service or users.

If you are creating your own statuses, use adjectives rather than verbs. Use sentence case, and keep it short, so that it can be easily read and understood.

#### Additional statuses

If your user research shows that there is a need for additional status tags, you can use other colours to help distinguish between them.

{{ example({ group: "components", item: "task-list", example: "all-colours", html: true, nunjucks: true, open: false }) }}

### Group tasks into steps

If your transaction involves lots of tasks, make it manageable by splitting it up into steps that represent stages in the process.

For example, you could group all tasks which help users find out if your service is right for them in a step called ‘Check before you start’.

Where possible, allow users to complete tasks in any order. This will help them plan their time and complete sections as and when they can.

### Marking tasks as completed

Sometimes, it’s better to let the user decide when a task is completed.

This can be helpful when a task involves:

- some questions that are optional
- writing a long answer (such as in a [textarea](/components/textarea/))
- looking up information, such as details about previous jobs
- answers that need to be checked carefully with someone else

Do this by asking a radio question at the end of the task — either as the last question (if the task is a single page) or on the [‘Check answers’ page](/patterns/check-answers/) (if the task uses multiple [question pages](/patterns/question-pages/)).

Ask ‘Have you completed this section?’ with the radio options ‘Yes, I’ve completed this section’ or ‘No, I’ll come back later’.

If the user selects ‘No, I’ll come back to it later,’ mark the task as 'Incomplete' or 'In progress'.

If the user selects ‘Yes, I’ve completed this section,’ mark the task as 'Completed'.

<div class="app-wcag-22" id="wcag-edit-information-previous-task" role="note">
  {{ govukTag({
    text: "WCAG 2.2",
    classes: "app-tag"
  }) }}
  <p>If a user decides to go back to a previous task, make sure information they have already entered is pre-populated.</p>
  <p>Do not pre-populate if the information is no longer valid, or when pre-populating would be a major safety or security concern. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant Entry</a>.</p>
</div>

{{ example({ group: "patterns", item: "complete-multiple-tasks", example: "have-you-completed-this-section", html: true, nunjucks: true, open: false }) }}

Always allow users to go back into a task to change their answer.

#### Error messages

If the user does not select an option, show an [error message](/components/error-message/) to say: 'Select whether you’ve completed this section'.

{{ example({ group: "patterns", item: "complete-multiple-tasks", example: "have-you-completed-this-section-error", html: true, nunjucks: true, open: false }) }}

## Research on this pattern

This pattern was previously named ‘Task list’ and was [developed by a team at the Government Digital Service (GDS)](https://designnotes.blog.gov.uk/2017/04/04/weve-published-the-task-list-pattern/).

It was then iterated by a cross-government collaboration and published as a new [task list component](/patterns/equality-information/) with updated guidance and research.

See the [research on the new task list component](/components/task-list#research-on-this-component) for details of research done, and known issues and gaps.
