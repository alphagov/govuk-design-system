---
title: Change history
layout: layout-pane.njk
---

{% set data = getChangelog("text-input") %}
{{ data | dump }}
