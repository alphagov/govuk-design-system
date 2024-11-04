---
title: Create a username
description: Help users to create a unique and memorable username to sign into a service with
section: Patterns
theme: Help users to…
aliases:
backlogIssueId: 63
layout: layout-pane.njk
---

Help users to create a unique and memorable username to sign into a service with.

## When to use this pattern

Before using this pattern, you should consider whether you really need users to [create accounts in your service](/patterns/create-accounts/) in the first place.

## How it works

Where possible, use email addresses for usernames because they are:

- memorable
- unique
- often required by the service anyway

However, not everyone has or wants to use an email address. The number of users without access to email will differ from service to service.

You should do research to understand this group and have a plan for helping them to use your service.

### Custom usernames

You should only ask users to create their own custom usernames if your service contains user-generated content that requires attributing, for example, a blog with comments. Allowing custom usernames lets users hide their identity if they want to.

User-generated usernames are harder to create and easier to forget than email addresses.

You need to:

- tell the user whether their proposed username is unique
- suggest a unique username for them, in some cases
- make sure the user can retrieve or reset their username
- ignore letter case when accepting usernames - for example, if the actual username is ‘Mary<i></i>@example.com’, the user can still sign in with ‘mary<i></i>@example.com’

### Always let people make changes

Whatever approach to usernames you take, make sure you let people change their email address or username.
