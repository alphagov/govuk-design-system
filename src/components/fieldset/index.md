---
title: Fieldset
description: Use the fieldset component to group related form inputs
section: Components
aliases:
backlogIssueId: 48
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

Use the fieldset component to group related form inputs.

## When to use this component

Use the fieldset component when you need to show a relationship between multiple form inputs. For example, you may need to group a set of text inputs into a single fieldset when [asking for an address](/patterns/addresses/).

{{ example({ group: "components", item: "fieldset", example: "address-group", html: true, nunjucks: true, open: false, size: "xl", loading: "eager" }) }}

If you’re using the examples or macros for a [Radios component](/components/radios/), [Checkboxes component](/components/checkboxes/) or [Date input component](/components/date-input/), the fieldset will already be included.

## How it works

The first element inside a fieldset must be a `legend` which describes the group of inputs. This could be a question, such as ‘What is your current address?’ or a statement like ‘Personal details’.

If you’re asking just [one question per page](/patterns/question-pages/#start-by-asking-one-question-per-page) as recommended, you can set the contents of the `<legend>` as the page heading, as shown in the example below. This is good practice as it means that users of screen readers will only hear the contents once.

Read more about [why and how to set legends as headings](/get-started/labels-legends-headings/).

{{ example({ group: "components", item: "fieldset", example: "default", html: true, nunjucks: true, open: false }) }}

On [Question pages in your service](/patterns/question-pages/) containing a group of inputs, including the question as the legend helps users of screen readers to understand that the inputs are all related to that&nbsp;question.

Include general help text in the legend if it would help the user fill in the form, and you cannot write it as [hint text](/components/text-input/#hint-text). However, try to keep it as short as possible.
