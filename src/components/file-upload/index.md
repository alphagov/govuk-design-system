---
title: File upload
description: Help users select and upload a file
section: Components
aliases:
backlogIssueId: 49
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/).

Help users select and upload a file.

{{ example({ group: "components", item: "file-upload", example: "default", html: true, nunjucks: true, open: false, loading: "eager" }) }}

## When to use this component

You should only ask users to upload something if it’s critical to the delivery of your service.

We improved the component in March 2025, so you’ll need to enable the [improved File upload component](#using-the-improved-file-upload-component) as a new feature.

Read a blog post about [design tips for helping users upload things](https://designnotes.blog.gov.uk/2017/02/14/some-design-tips-for-uploading-things/).

## How it works

To upload a file, the user can either:

- use the ‘Choose file’ button
- drag and drop a file into the file upload input area

### Let users reuse uploaded files

Make sure users can easily reuse a previously uploaded file within a single journey, unless doing so would be a major security or privacy concern.

For example, a user might need to upload a photo of their driving licence to prove their identity, and again to prove their address.

You can make it easier for the user to reuse a file by showing it as an option for the user to select so they do not need to upload it again. Consider users on public devices before choosing to make the file available to preview or download.

There are 2 ways to use the file upload component. You can use HTML or, if you’re using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk), you can use the Nunjucks macro.

{{ example({ group: "components", item: "file-upload", example: "default", html: true, nunjucks: true, open: false, titleSuffix: "second" }) }}

### Error messages

Error messages should be styled like this:

{{ example({ group: "components", item: "file-upload", example: "error", html: true, nunjucks: true, open: false, size: "m" }) }}

Make sure errors follow the guidance in the [Error message component](/components/error-message/) and have specific error messages for specific error states.

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

## Using the improved File upload component

In March 2025, we introduced changes to the File upload component that service teams can opt in to as part of GOV.UK Frontend 5.9.0.

The improved component is intended to:

- fix accessibility issues
- improve the user experience
- allow text in the component to be translated

We recommend service teams start using the latest component to improve the experience for users. However, it's a visual change from the previous component and might affect existing designs and layouts.

To let teams migrate at their own pace, the improvements are only enabled if you use the `javascript` macro option or extra markup in your HTML.

This example shows you how to enable the improved File upload component:

{{ example({ group: "components", item: "file-upload", example: "enhanced", html: true, nunjucks: true, open: false, size: "m" }) }}

### Changes in the improved component

To make it easier for users to drag and drop files, we’ve made the drop zone:

- bigger
- visible at all times
- more visually responsive to user interactions

We’ve also changed the ‘Choose file’ button to be more consistent with the secondary button in the [Button component](/components/button).

Service teams can change the text on the button and in the ‘No file chosen’ message. We decided to make this text changeable for translation purposes and to let teams be specific about the file to upload. However, teams should aim to keep the text as short as possible for accessibility purposes. For example, screen reader users might find it difficult to use the component if the text is too long.

All the text in the component can now be translated to match the language of the page content when JavaScript is running.

#### Improvements for assistive technology users

Users of Dragon, a speech recognition tool, [cannot activate their browser’s native file inputs](https://github.com/alphagov/govuk-frontend/issues/3686) by using commands for interacting with [web page controls](https://www.nuance.com/products/help/dragon/dragon-for-pc/enx/professionalgroup/main/Content/Web/working_with_chrome.htm?Highlight=click%20button). They have to rely on [mouse commands](https://www.nuance.com/products/help/dragon/dragon-for-pc/enx/professionalgroup/main/Content/CommandandControl/using_your_mouse.htm) or [keyboard commands](https://www.nuance.com/products/help/dragon/dragon-for-pc/enx/professionalgroup/main/Content/CommandandControl/using_your_keyboard.htm), which take multiple steps to activate the component.

With the improved File upload component, users can say commands for interacting with web page controls to choose files.

However, due to [browser security features](https://developer.mozilla.org/en-US/docs/Web/Security/User_activation), this may not work on subsequent interactions on the same page. If the component needs to be used more than once (for example, to correct a mistake), users will first need to perform another action, such as a mouse click.

## Research on this component

An accessibility audit has shown some users have encountered a problem when using File upload.

### Known issues and gaps

The earlier version of the File upload component does not show a visual target area when dragging and dropping a file. The component inherits and uses the browser’s default behaviour. More detail on the findings can be found in the [GitHub issue: ‘Upload file component has no visual target area when dragging and dropping a file’](https://github.com/alphagov/govuk-frontend/issues/3685).

We revisited this issue in March 2025 and have published an improved File upload component to improve accessibility. Although we’re confident the new component is an improvement on the browser’s default behaviour, teams can continue to use the existing component until the next major release, when the new version will be enabled by default.
