---
layout: layout-pane.njk
title: Replace variables, functions and mixins from our old frameworks
section: Get started
theme: How to guides
order: 3
description: Updating variables, functions and mixins when you migrate to GOV.UK Frontend
---

This is part of [migrating from our old frameworks to GOV.UK Frontend](https://frontend.design-system.service.gov.uk/migrating-from-legacy-products/).

The tables below show the old and new names for components, classes and mixins, to help you find what you need.

### Nunjucks

Where possible we have kept the new page template the same as GOV.UK Template.

The main change is changing variables from [snake_case](https://en.wikipedia.org/wiki/Snake_case) to [camelCase](https://en.wikipedia.org/wiki/Camel_case).

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Nunjucks Template</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Template</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:top_of_page</td>
      <td class="govuk-table__cell">Deprecated: putting content above the <code>&lt;!DOCTYPE html&gt;</code> will result in broken pages for users of older Internet Explorer versions.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:html_lang</td>
      <td class="govuk-table__cell">htmlLang</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:page_title</td>
      <td class="govuk-table__cell">pageTitle</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:asset_path</td>
      <td class="govuk-table__cell">assetPath</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:head</td>
      <td class="govuk-table__cell">head</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:body_classes</td>
      <td class="govuk-table__cell">bodyClasses</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:body_start</td>
      <td class="govuk-table__cell">bodyStart</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:skip_link_message</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the skip link by rendering your own,
          which can include custom <code>text</code>
        </p>

```javascript
{% raw %}
{% block skipLink %}
  {{ govukSkipLink({ text: "custom text" }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/skip-link/">skip link component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:cookie_message</td>
      <td class="govuk-table__cell">
        See the <a class="govuk-link" href="/components/cookie-banner/">cookie banner component</a> for more details.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">header_class</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the header component by rendering your own,
          which can include custom <code>classes</code>
        </p>

```javascript
{% raw %}
{% block header %}
  {{ govukHeader({ classes: "app-custom-classes" }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/header/">header component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">homepage_url</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the header component by rendering your own,
          which can include custom <code>homepageUrl</code>
        </p>

```javascript
{% raw %}
{% block header %}
  {{ govukHeader({ homepageUrl: "/custom-url" }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/header/">header component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">global_header_text</td>
      <td class="govuk-table__cell">
        No equivalent. <a href="https://github.com/alphagov/govuk-frontend/issues/new/choose">Raise an issue</a> if you need this.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">inside_header</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the header component by rendering your own,
          which can include a custom <code>serviceName</code>
        </p>

```javascript
{% raw %}
{% block header %}
  {{ govukHeader({ serviceName: "Custom service name" }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/header/">header component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">proposition_header</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the header component by rendering your own,
          which can include a custom <code>navigation</code>
        </p>

```javascript
{% raw %}
{% block header %}
  {{ govukHeader({ navigation: [] }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/header/">header component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:after_header</td>
      <td class="govuk-table__cell">beforeContent</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:content</td>
      <td class="govuk-table__cell">
        <p>
          main
        </p>
        <p>
          Setting <code>content</code> in the new template will put it inside a  <code>&lt;main&gt;</code> element.
        </p>
        <p>
          In the old GOV.UK Template there was no default <code>&lt;main&gt;</code> element.
        </p>
        <p>
          You can restructure your content so that it does not use a <code>&lt;main&gt;</code> element, or override the <code>main</code> block.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:footer_top</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the footer component by rendering your own,
          which can include a custom <code>navigation</code>
        </p>

```javascript
{% raw %}
{% block footer %}
  {{ govukFooter({ navigation: [] }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/footer/">footer component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:footer_support_links</td>
      <td class="govuk-table__cell">
        <p>
          You can now entirely replace the footer component by rendering your own,
          which can include custom <code>meta</code> links
        </p>

```javascript
{% raw %}
{% block footer %}
  {{ govukFooter({ meta: [] }) }}
{% endblock %}
{% endraw %}
```

        <p>
          See the <a class="govuk-link" href="/components/footer/">footer component</a> for more details.
        </p>
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:licence_message</td>
      <td class="govuk-table__cell">
        No equivalent. <a href="https://github.com/alphagov/govuk-frontend/issues/new/choose">Raise an issue</a> if you need this.
      </td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">:body_end</td>
      <td class="govuk-table__cell">bodyEnd</td>
    </tr>
  </tbody>
</table>

## Component names

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Component names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">link-back</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/back-link/">Back link component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Button</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/button/">Button component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Checkboxes</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/checkboxes/">Checkboxes component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Date pattern</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/date-input/">Date input component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Hidden text (Progressive disclosure)</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/details/">Details component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Errors and validation</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/error-message/">Error message component</a><br><a class="govuk-link" href="/components/error-summary/">Error summary component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">&lt;fieldset&gt;</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/fieldset/">Fieldset component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">File upload</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/file-upload/">File upload component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Alpha and beta banners</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/phase-banner/">Phase banner component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Radio buttons</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/radios/">Radios component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Select boxes</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/select/">Select component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Phase tag</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/tag/">Tag component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Form fields</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/text-input/">Text input component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">&lt;textarea&gt;</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/textarea/">Textarea component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Warning text (previously Legal text)</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/text-input/">Warning text component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">govuk-box-highlight</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/panel/">Panel component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">Inset text</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/components/inset-text/">Inset text component</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">panel (object)<br>
        panel-border-wide<br>panel-border-narrow</td>
      <td class="govuk-table__cell ">Deprecated: this style is now contained within each component that needs it </td>
    </tr>
  </tbody>
</table>

## Class names

GOV.UK Frontend uses ["Block, Element, Modifier" (BEM)](http://getbem.com/) and [Inverted Triangle CSS (ITCSS)](https://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514731) to structure CSS and define class names. This means all of the existing class names have changed.

### Typography class names

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Typography class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">heading-xlarge</td>
      <td class="govuk-table__cell ">govuk-heading-xl</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">heading-large</td>
      <td class="govuk-table__cell ">govuk-heading-l</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">heading-medium</td>
      <td class="govuk-table__cell ">govuk-heading-m</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">heading-small</td>
      <td class="govuk-table__cell ">govuk-heading-s</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">lede</td>
      <td class="govuk-table__cell ">govuk-body-l</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">&lt;p&gt;<br>body-text</td>
      <td class="govuk-table__cell ">govuk-body</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-xsmall</td>
      <td class="govuk-table__cell ">govuk-body-s</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">&lt;a&gt;</td>
      <td class="govuk-table__cell ">govuk-link</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">&lt;hr&gt;</td>
      <td class="govuk-table__cell ">govuk-section-break<br>govuk-section-break--visible<br>govuk-section-break--xl<br>govuk-section-break--l<br>govuk-section-break--m</td>
    </tr>
  </tbody>
</table>

### Lists

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Lists</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">list</td>
      <td class="govuk-table__cell ">govuk-list</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">list<br>list-bullet</td>
      <td class="govuk-table__cell ">govuk-list<br>govuk-list--bullet</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">list<br>list-number</td>
      <td class="govuk-table__cell ">govuk-list<br>govuk-list--number</td>
    </tr>
  </tbody>
</table>


### Layout and grid system class names

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Grid system class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">grid-row</td>
      <td class="govuk-table__cell ">govuk-grid-row</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">column-full</td>
      <td class="govuk-table__cell ">govuk-grid-column-full</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">column-one-half</td>
      <td class="govuk-table__cell ">govuk-grid-column-one-half</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">column-one-third</td>
      <td class="govuk-table__cell ">govuk-grid-column-one-third</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">column-two-thirds</td>
      <td class="govuk-table__cell ">govuk-grid-column-two-thirds</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">column-one-quarter</td>
      <td class="govuk-table__cell ">govuk-grid-column-one-quarter</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">#content</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/styles/layout/#page-wrappers">Page wrappers</a></td>
    </tr>

  </tbody>
</table>


### Form related class names

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-group</td>
      <td class="govuk-table__cell ">govuk-form-group</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-hint</td>
      <td class="govuk-table__cell ">Specific to component, for example<br>govuk-label__hint</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-label</td>
      <td class="govuk-table__cell ">Specific to component, for example<br>govuk-label<br>govuk-radios__label</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-label-bold</td>
      <td class="govuk-table__cell ">govuk-label--s</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-control<br>form-control-3-4<br>form-control-2-3<br>form-control-1-2<br>form-control-1-3<br>form-control-1-4<br>form-control-1-8</td>
      <td class="govuk-table__cell "><a class="govuk-link" href="/styles/layout/#width-override-classes">Width override classes</a></td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-section</td>
      <td class="govuk-table__cell ">Deprecated: not required with new spacing implementation</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-group-related</td>
      <td class="govuk-table__cell ">Deprecated: not required with new spacing implementation</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">form-group-compound</td>
      <td class="govuk-table__cell ">Deprecated: not required with new spacing implementation</td>
    </tr>
  </tbody>
</table>


### Helper class names

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">visually-hidden, visuallyhidden</td>
      <td class="govuk-table__cell ">govuk-visually-hidden<br>govuk-visually-hidden-focusable</td>
    </tr>

  </tbody>
</table>

### Override class names

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Override class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Elements</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-xxlarge</td>
      <td class="govuk-table__cell ">govuk-!-font-size-80</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-xlarge</td>
      <td class="govuk-table__cell ">govuk-!-font-size-48</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-large</td>
      <td class="govuk-table__cell ">govuk-!-font-size-36</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-medium</td>
      <td class="govuk-table__cell ">govuk-!-font-size-24</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-small</td>
      <td class="govuk-table__cell ">govuk-!-font-size-19</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">font-xsmall</td>
      <td class="govuk-table__cell ">govuk-!-font-size-16</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold-xxlarge</td>
      <td class="govuk-table__cell ">govuk-!-font-size-80<br>govuk-!-font-weight-bold</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold-xlarge</td>
      <td class="govuk-table__cell ">govuk-!-font-size-48<br>govuk-!-font-weight-bold</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold-large</td>
      <td class="govuk-table__cell ">govuk-!-font-size-36<br>govuk-!-font-weight-bold</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold-medium</td>
      <td class="govuk-table__cell ">govuk-!-font-size-24<br>govuk-!-font-weight-bold</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold-small</td>
      <td class="govuk-table__cell ">govuk-!-font-size-19<br>govuk-!-font-weight-bold</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold-xsmall</td>
      <td class="govuk-table__cell ">govuk-!-font-size-16<br>govuk-!-font-weight-bold</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">bold</td>
      <td class="govuk-table__cell ">govuk-!-font-weight-bold</td>
    </tr>
  </tbody>
</table>

## Mixins and variables


### Typography
<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Frontend Toolkit</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-80</td>
      <td class="govuk-table__cell ">@include govuk-font(80)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-48</td>
      <td class="govuk-table__cell ">@include govuk-font(48)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-36</td>
      <td class="govuk-table__cell ">@include govuk-font(36)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-27</td>
      <td class="govuk-table__cell ">@include govuk-font(27)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-24</td>
      <td class="govuk-table__cell ">@include govuk-font(24)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-19</td>
      <td class="govuk-table__cell ">@include govuk-font(19)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-16</td>
      <td class="govuk-table__cell ">@include govuk-font(16)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include core-14</td>
      <td class="govuk-table__cell ">@include govuk-font(14)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-80</td>
      <td class="govuk-table__cell ">@include govuk-font(80, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-48</td>
      <td class="govuk-table__cell ">@include govuk-font(48, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-36</td>
      <td class="govuk-table__cell ">@include govuk-font(36, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-27</td>
      <td class="govuk-table__cell ">@include govuk-font(27, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-24</td>
      <td class="govuk-table__cell ">@include govuk-font(24, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-19</td>
      <td class="govuk-table__cell ">@include govuk-font(19, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-16</td>
      <td class="govuk-table__cell ">@include govuk-font(16, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include bold-14</td>
      <td class="govuk-table__cell ">@include govuk-font(14, $weight: bold)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include heading-80</td>
      <td class="govuk-table__cell ">Deprecated: 80px headings are not used, @include govuk-font(80, $weight: bold) should be used instead</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include heading-48</td>
      <td class="govuk-table__cell ">@extend %govuk-heading-xl</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include heading-36</td>
      <td class="govuk-table__cell ">@extend %govuk-heading-l</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include heading-27</td>
      <td class="govuk-table__cell ">Deprecated: 27px headings are not used, @include govuk-font(27, $weight: bold) should be used instead</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include heading-24</td>
      <td class="govuk-table__cell ">@extend %govuk-heading-m</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include copy-19</td>
      <td class="govuk-table__cell ">@extend %govuk-body-m</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include copy-14</td>
      <td class="govuk-table__cell ">@extend %govuk-body-xs</td>
    </tr>
  </tbody>
</table>

### Layout
<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Frontend Toolkit</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@extend site-width-container</td>
      <td class="govuk-table__cell ">@include govuk-width-container</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include grid-column( 1/4 )</td>
      <td class="govuk-table__cell ">Deprecated: you cannot apply grid properties to other elements using GOV.UK Frontend</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include grid-column( 1/2 )</td>
      <td class="govuk-table__cell ">Deprecated: you cannot apply grid properties to other elements using GOV.UK Frontend</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include grid-column( 1/3 )</td>
      <td class="govuk-table__cell ">Deprecated: you cannot apply grid properties to other elements using GOV.UK Frontend</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include grid-column( 2/3 )</td>
      <td class="govuk-table__cell ">Deprecated: you cannot apply grid properties to other elements using GOV.UK Frontend</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell "> @include grid-column( 1/3, $full-width: desktop );</td>
      <td class="govuk-table__cell ">Deprecated: you cannot apply grid properties to other elements using GOV.UK Frontend</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">$gutter</td>
      <td class="govuk-table__cell ">$govuk-gutter, only use for the gaps in between grid columns, otherwise use the <a class="govuk-link" href="/styles/spacing/#spacing-on-custom-components">spacing scale</a>.</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">$gutter-half</td>
      <td class="govuk-table__cell ">$govuk-gutter-half, only use for the gaps in between grid columns, otherwise use the <a class="govuk-link" href="/styles/spacing/#spacing-on-custom-components">spacing scale</a>.</td>
    </tr>
  </tbody>
</table>

### Media queries
<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Frontend Toolkit</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include media(desktop)</td>
      <td class="govuk-table__cell ">@include govuk-media-query($from: desktop)<br>@include govuk-media-query($until: desktop)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include media(tablet)</td>
      <td class="govuk-table__cell ">@include govuk-media-query($from: tablet)<br>@include govuk-media-query($until: tablet)</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include media(mobile)</td>
      <td class="govuk-table__cell ">@include govuk-media-query($from: mobile)<br>@include govuk-media-query($until: mobile)</td>
    </tr>
  </tbody>
</table>

### Images
<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Frontend Toolkit</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include device-pixel-ratio($ratio: 2)</td>
      <td class="govuk-table__cell ">@include govuk-device-pixel-ratio($ratio: 2)</td>
    </tr>
  </tbody>
</table>

### Shims

<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Frontend Toolkit</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include inline-block</td>
      <td class="govuk-table__cell ">Deprecated: inline-block is now the default for any components</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@extend %contain-floats</td>
      <td class="govuk-table__cell ">@include govuk-clearfix</td>
    </tr>
  </tbody>
</table>

### Internet Explorer
<table class="govuk-table app-table--fixed">
  <caption class="govuk-table__caption govuk-visually-hidden">Helper class names</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col">GOV.UK Frontend Toolkit</th>
      <th class="govuk-table__header" scope="col">GOV.UK Frontend</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell ">@include ie(8)</td>
      <td class="govuk-table__cell ">@include govuk-if-ie8</td>
    </tr>
  </tbody>
</table>
