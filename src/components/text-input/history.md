---
preTitle: Text input
title: Update history
description: Help users enter information with the text input component
layout: layout-pane.njk
---

## 21 June 2018 (GOV.UK Frontend 1.0.0)

Component introduced.

## 19 November 2018 (GOV.UK Frontend 2.4.0)

Added support for setting `classes` on the input's `formGroup`.

## 31 January 2019 (GOV.UK Frontend 2.6.0)

Added `autocomplete` parameter.

## 6 February 2019

Introduced new guidance on supporting autofill using the `autocomplete` HTML attribute.

## 18 February 2019

Introduced new guidance on supporting spellchecking.

## 28 July 2019 (GOV.UK Frontend 3.0.0)

Updated the component's focus style to comply with WCAG 2.1.

## 2 September 2019 (GOV.UK Frontend 3.1.0)

Added `inputmode` parameter.

## 3 February 2020

Introduced new guidance about asking for numbers.

## 9 June 2020

Introduced guidance advising against using `<input type="decimal">` due to inconsistent support across Android vendors.

## 29 July 2020 (GOV.UK Frontend 3.8.0)

Added `spellcheck` parameter.

Updated the input's border when in the error state to match the non-error border width.

## 14 September 2020 (GOV.UK Frontend 3.9.0)

Added support for input prefixes and suffixes.

## 17 April 2022

Introduced new guidance on the use of placeholder text.

## 19 August 2022

Removed guidance on using the `pattern` attribute to coerce iOS into showing a numpad. iOS has since introduced support for the `inputmode` attribute. Use `inputmode="numeric"` instead.

## 9 August 2022 (GOV.UK Frontend 4.3.0)

Updated input width modifier classes to use `em` units. This has resulted in a minor change to the widths of these inputs.

## 20 April 2023 (GOV.UK Frontend 4.6.0)

Added `disabled` parameter and updated the component's disabled styles.

Added a modifier class for accepting codes and sequences, with associated guidance.

## 14 August 2023

Introduced new guidance advising against using `maxlength` to restrict the length of a user's input.

## 5 February 2024 (GOV.UK Frontend 5.1.0)

Updated the positioning of input prefixes and suffixes to match the text baseline of the text input.

## 21 February 2024 (GOV.UK Frontend 5.2.0)

Added `beforeInput` and `afterInput` slots to the Nunjucks macro.

## 17 May 2024 (GOV.UK Frontend 5.4.0)

Fixed an issue with the Nunjucks macro where users were unable to define a default `value` if the value was '0'.

## 4 October 2024

Updated the guidance on writing and formatting hint text.

## 4 March 2025 (GOV.UK Frontend 5.9.0)

The Nunjucks `id` parameter now defaults to be the same as `name` if an `id` hasn't been provided.

## 2 March 2026 (GOV.UK Frontend 6.1.0)

Fixed the component's focus state using wrong shade of black.
