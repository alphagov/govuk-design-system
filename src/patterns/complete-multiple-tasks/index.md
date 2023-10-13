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

Help users understand:

- the tasks involved in completing a transaction
- the order they should complete tasks in
- when they've completed tasks

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

### Group related actions into tasks

Group related activities and questions into tasks, for example, ‘Provide financial evidence’ and ‘Give medical information’. This will help users understand and plan what they need to do.

Where possible, task names should:

- describe what the task or activity will involve
- start with verbs, for example, ‘check’, ‘declare’, ‘report’

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

{{ example({ group: "patterns", item: "complete-multiple-tasks", example: "have-you-completed-this-section", html: true, nunjucks: true, open: false }) }}

Always allow users to go back into a task to change their answer.

#### Error messages

If the user does not select an option, show an [error message](/components/error-message/) to say: 'Select whether you’ve completed this section'.

{{ example({ group: "patterns", item: "complete-multiple-tasks", example: "have-you-completed-this-section-error", html: true, nunjucks: true, open: false }) }}

## Research on this pattern

This pattern was originally developed and tested by a team at the Government Digital Service (GDS).

The team built prototypes of task lists for 3 services, Register as a childminder, Learn to drive and Transport goods and tested them with 34 users over 5 rounds of research.

The pattern was iterated after each round of testing.

You can read more about [testing and iterating the task list page pattern](https://designnotes.blog.gov.uk/2017/04/04/weve-published-the-task-list-pattern/).

In the original pattern only completed tasks were labelled. Some users did not realise they had to complete all the tasks before they could continue, or [thought that they had completed the whole transaction](https://github.com/alphagov/govuk-design-system-backlog/issues/72#issuecomment-413159884).

The pattern has now been iterated to include labels for all statuses and a summary above the list.

### Known issues and gaps

User research and feedback on this pattern has shown that:

- some screen reader users are frustrated by having to tab through every section each time they return to the task list after completing a task
- some users currently click on task statuses, thinking they are buttons or links
- the use of uppercase in task statuses may make them harder to read
- some services need users to complete tasks in a particular order, for example, a user must fill in an application before they can pay
- once a few tasks have been completed it becomes harder to scan the page and spot incomplete tasks

More user research is needed to find out:

- whether or not users of screen readers struggle to perceive tasks that cannot be started yet, because they are not marked up with hyperlinks
- how to help screen reader users to get an overview of the progress they have made through the task list
- whether to return users to the task list after each task or take them straight to the next task in the sequence
- the best way to show when tasks must be completed in a fixed order
- how to ensure users can see which tasks have been completed and which they still need to do

### Services using this pattern

This pattern has been used in a number of services, including the following.

**Ministry of Justice**<br>
Apply for probate<br>
Money claims

**Ofsted**<br>
Register as a childminder

### Next steps

Since September 2021, a cross-government group have been collaborating on work to co-design an update to this pattern and introduce it as a component.

The next step is to [build the prototype component](https://github.com/alphagov/govuk-frontend/pull/2261).

This work is open to anyone that wants to help us. [Join the 'task-list-collab' Slack to find out how you can help](https://join.slack.com/t/task-list-collab/shared_invite/zt-us1bwvm8-VVemg6XFZFhdbCtedNXBSQ).

If you’ve used this pattern, you can also help by [sharing your user research on GitHub](https://github.com/alphagov/govuk-design-system-backlog/issues/72).
