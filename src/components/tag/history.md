---
title: Tag change history
layout: layout-pane.njk
---

{% from "_changelog.njk" import changelog %}

{{ changelog({ group: "components", item: "tag" }) }}
