---
title: Task list Nunjucks macro options
parent: Task list
layout: layout-pane.njk
---

{% from "_nunjucks-options-table.njk" import nunjucksOptionsTable %}

{{ nunjucksOptionsTable({ item: "task-list" }) }}
