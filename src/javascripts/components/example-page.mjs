/* eslint-disable import-x/no-unassigned-import --
 * We just want the content window js here but this file doesn't have an export,
 * so we need to import it unassigned so it just runs.s
 **/
import 'iframe-resizer/js/iframeResizer.contentWindow.js'

/**
 * Website example page
 */
class ExamplePage {
  /**
   * @param {Document} $module - HTML document
   */
  constructor($module) {
    if (
      !($module instanceof Document) ||
      !document.body.classList.contains('govuk-frontend-supported')
    ) {
      return this
    }

    this.$module = $module

    /** @satisfies {HTMLFormElement | null} */
    const $form = this.$module.querySelector('form[action="/form-handler"]')
    this.preventFormSubmission($form)
  }

  /**
   * Prevent form submission
   *
   * @param {HTMLFormElement | null} $form - Form
   * @returns {false | undefined} Returns false for examples without forms
   */
  preventFormSubmission($form) {
    // We should only have one form per example
    if (!$form) {
      return false
    }

    $form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }
}

export default ExamplePage
