---
layout: layout-pane.njk
title: Component lifecycle
section: Get started
theme: Setup guides
order: 3
description: How we iterate components in the Design System.
---

This content is placeholder right now. Dolore esse elit anim consequat eu. Dolor eu laborum deserunt ea esse duis. Cillum sint eiusmod dolore anim fugiat.

## Component statuses

### Trial

**Trial** components are being actively iterated upon and may change significantly before graduating to stable.

If we decide that an trial component isn't worth pursuing further, it may move to being deprecated and eventually withdrawn from the Design System without becoming a stable component.

Services using trial components should be prepared to make ongoing updates to them.

### Stable

**Stable** components have been thoroughly tested and are unlikely to change all that much.

We may still make incremental changes and bug fixes, but they're otherwise... stable.

### Deprecated

If we believe a component has reached the end of its useful life, we will mark it as being **deprecated**.

Deprecated components remain part of the Design System but will not receive further changes or bug fixes, except to resolve major issues. Deprecated components will be withdrawn in a future major version of GOV.UK Frontend.

New services should not use deprecated components and existing services should make plans to stop using them.

### Withdrawn

Components that have been **withdrawn** are no longer part of the GOV.UK Design System or GOV.UK Frontend.

Both new and existing services should not use withdrawn components. Any documentation provided is for users of older versions of the Design System who are unable to update.
