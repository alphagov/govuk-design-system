---
title: Table Nunjucks macro options
parent: Table
layout: layout-pane.njk
---

{% from "_nunjucks-options-table.njk" import nunjucksOptionsTable %}

{{ nunjucksOptionsTable({ item: "table" }) }}
