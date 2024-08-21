---
title: File upload
description: Help users select and upload a file
section: Components
aliases:
backlogIssueId: 49
layout: layout-pane.njk
---

{% from "_example.njk" import example %}
{% from "_wcag-callout.njk" import wcagCallout %}
{% from "_wcag-note.njk" import wcagNote %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

{{ wcagCallout({
  type: "component",
  introAction: "use the",
  name: "File upload",
  criteria: [
    {
      text: "upload a file without relying on 'drag and drop' movements",
      anchor: "wcag-multi-method-drag-drop"
    },
    {
      text: "reuse files they've uploaded",
      anchor: "wcag-use-previous-uploads"
    }
  ]
}) }}

Help users select and upload a file.

{{ example({ group: "components", item: "file-upload", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

You should only ask users to upload something if it’s critical to the delivery of your&nbsp;service.

## How it works

To upload a file, the user can either:

- use the ‘Choose file’ button
- ‘drag and drop’ a file into the file upload input area

{% call wcagNote({id: "wcag-multi-method-drag-drop"}) %}

<p>Do not use ‘drag and drop’ as the only way to upload files. You must provide another method, such as the ‘Choose file’ button. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html">2.5.7 Dragging movements</a>.</p>
{% endcall %}

{% call wcagNote({id: "wcag-use-previous-uploads"}) %}

<p>Make sure users can easily reuse a previously uploaded file within a single journey, unless doing so would be a major security or privacy concern.</p>
<p>For example, a user might need to upload a photo of their driving licence to prove their identity, and again to prove their address.</p>
<p>You can make it easier for the user to reuse a file by showing it as an option for the user to select instead of the file upload. Consider users on public devices before choosing to make the file available to preview or download. This is to comply with WCAG 2.2 success criterion <a href="https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html">3.3.7 Redundant entry</a>.</p>
{% endcall %}

There are 2 ways to use the file upload component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "file-upload", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Error messages

Error messages should be styled like this:

{{ example({ group: "components", item: "file-upload", example: "error", html: true, nunjucks: true, open: false, size: "m" }) }}

Make sure errors follow the guidance in [error message](/components/error-message/) and have specific error messages for specific error states.

#### If no file has been selected

Say ‘Select a [whatever they need to select]’.<br>
For example, ‘Select a report’.

#### If the file is the wrong file type

Say ‘The selected file must be a [list of file types]’.<br>
For example, ‘The selected file must be a CSV or ODS’ or ‘The selected file must be a JPG, BMP, PNG, TIF or PDF’.

#### If the file is too big

Say ‘The selected file must be smaller than [largest file size]’.<br>
For example, ‘The selected file must be smaller than 2MB’.

#### If the file is empty

Say ‘The selected file is empty’.

#### If the file contains a virus

Say ‘The selected file contains a virus’.

#### If the file is password protected

Say ‘The selected file is password protected’.

#### If there was a problem and the file was not uploaded

Say ‘The selected file could not be uploaded – try again’.

#### If there is a limit on how many files the user can select

Say ‘You can only select up to [highest number] files at the same time’.<br>
For example, ‘You can only select up to 10 files at the same time’.

#### If the file is not in a template that must be used or the template has been changed

Say ‘The selected file must use the template’.

## Research on this component

An accessibility audit has shown some users have encountered a problem when using file upload.

### Known issues and gaps

The file upload component does not show a visual target area when dragging and dropping a file. We do not plan on fixing this at the moment, as the component inherits and uses the browser's default behaviour. We will revisit this issue if we publish a custom file upload component. More detail on the findings can be found in the [GitHub issue: ‘Upload file component has no visual target area when dragging and dropping a file’](https://github.com/alphagov/govuk-frontend/issues/3685).

Read a blog post about [design tips for helping users upload things](https://designnotes.blog.gov.uk/2017/02/14/some-design-tips-for-uploading-things/).
