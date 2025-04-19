---
title: Task list
description: The task list component displays all the tasks a user needs to do, and allows users to easily identify which ones are done and which they still need to do.
section: Components
aliases:
backlogIssueId: 72
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The task list component displays all the tasks a user needs to do, and allows users to easily identify which ones are done and which they still need to do.

{{ example({ group: "components", item: "task-list", example: "default", id: "default-1", html: true, nunjucks: true, rails: true, open: false, loading: "eager" }) }}

## When to use this component

Use the task list to give users more control over how they complete long, complex services.

Only use the task list if there’s evidence that users:

- do not want to, or cannot, complete all the tasks in one sitting
- need to be able to choose the order they complete the tasks in

## When not to use this component

Try to simplify the service before you use a task list. If you’re able to reduce the number of tasks or steps involved, you might not need one.

Do not use the task list for a long service that needs to be completed in a specific order. If it needs to be completed over multiple sessions, consider allowing users to save their progress, and then to continue where they left off when they return. Use the start page to explain what users will be expected to do during the service.

The task list should not be used as a way of showing users their answers. For this, you should use a [Summary list component](/components/summary-list/) instead.

## How it works

There are 2 ways to use the task list component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com), you can use the Nunjucks macro.

{{ example({ group: "components", item: "task-list", example: "default", html: true, nunjucks: true, rails: true, open: false, titleSuffix: "second" }) }}

Users should be able to complete tasks in whatever order they like.

The status alongside the task indicates whether they can start it. Users can select a task to start completing it. Once they have completed it and returned to the task list, the status for that task will have changed to ‘Completed’.

Users can only move on from the task list when all tasks are shown as ‘Completed’.

Read the [Complete multiple tasks pattern guidance](/patterns/complete-multiple-tasks/) for more information on how to use the task list within a service.

### Tasks

Tasks are usually actions that the user needs to take to complete a service. In a task list, the user should be able to choose to complete tasks in any order that works for them.

Each task within a task list includes a task name and a status. It can also include hint text if you decide this is needed.

The whole row is linked, allowing users to select anywhere within it to start the task.

#### Write clear task descriptions

The task name gives users a reasonable expectation of what that task is about. For example, ‘Your contact details’ or ‘Upload evidence’. Use sentence case, and keep it short. Users of screen readers might find it difficult to navigate the task list if the task names are too long.

If you’re finding it difficult to come up with a clear and concise task name, it might be because the task itself is too complex and may need to be separated into smaller tasks. Group questions and actions into tasks in a way that makes sense to users, based on their needs.

#### Adding hint text

Only use hint text if there is evidence that the user needs more information about what the task will include.

Keep hint text to a single short sentence, without any full stops. Screen readers will read out the entire text when users interact with the task link. This could frustrate users if the text is long.

Do not include links within the hint text. The whole task row links users to the task itself, so any links within the hint text will not work.

#### Grouping tasks

If there are a lot of tasks to complete, you might find that grouping them makes it easier for users to understand and plan what they need to do. Tasks can be grouped into separate task lists on a page. Give each task list a short heading that clearly explains the grouping.

Read the [Complete multiple tasks pattern guidance](/patterns/complete-multiple-tasks/) for more information on grouping tasks.

### Statuses

Statuses use colour and a short descriptor to give users a quick overview of how much of the task list they have completed, and how much is left to do.

Read the [Complete multiple tasks pattern guidance](/patterns/complete-multiple-tasks/) for more information on status colours and text.

## Research on this component

This component was created by a cross-government group using research from the previous task list pattern.

### Linking the whole task row to the task

User feedback from the task list pattern has shown that some users currently try to select task statuses, thinking they are buttons or links. The statuses have been redesigned to look less like buttons, and now the whole task row is linked so that users can select anywhere within it to enter and begin the task.

### Formatting of statuses

The use of uppercase in task statuses makes them harder to read. User research has also shown that once a few tasks have been completed, it is harder for users to scan the page and spot incomplete tasks.

Statuses are now written in sentence case to make them easier to read. The ‘Completed’ task now uses black text with no background colour, which will draw more attention to tasks that require action.

We have also introduced a new colour palette for statuses, using colour contrasts that meet accessibility guidance.

### Known issues and gaps

While this new component is based on user research from the task list pattern, we still need to carry out user testing with this new component. In particular, we would like to test the following assumptions:

- the benefits of linking the whole task row outweigh the risks of accidental clicking
- the contrast of the statuses is sufficient
- the suggested wording of the statuses make the most sense to users

If you are using this component in a service, we would like to hear about any user research so that we can identify any potential issues.
