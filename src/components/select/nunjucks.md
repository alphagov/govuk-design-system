---
title: Select Nunjucks macro options
parent: Select
layout: layout-pane.njk
---

{% from "_nunjucks-options-table.njk" import nunjucksOptionsTable %}

{{ nunjucksOptionsTable({ item: "select" }) }}
