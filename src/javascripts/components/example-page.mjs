class ExamplePage {
  constructor ($module) {
    this.$module = $module
  }

  init () {
    const $module = this.$module

    if (!$module) {
      return
    }

    const $form = $module.querySelector('form[action="/form-handler"]')
    this.preventFormSubmission($form)
  }

  preventFormSubmission ($form) {
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
