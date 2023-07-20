class ExamplePage {
  constructor($module) {
    this.$module = $module
  }

  init() {
    if (!this.$module) {
      return
    }

    const $form = this.$module.querySelector('form[action="/form-handler"]')
    this.preventFormSubmission($form)
  }

  preventFormSubmission($form) {
    // we should only have one form per example
    if (!$form) {
      return false
    }

    $form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }
}

export default ExamplePage
