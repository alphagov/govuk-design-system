function ExamplePage ($module) {
  this.$module = $module
}

ExamplePage.prototype.init = function () {
  const $module = this.$module
  if (!$module) {
    return
  }
  const $form = $module.querySelector('form[action="/form-handler"]')
  this.preventFormSubmission($form)
}

ExamplePage.prototype.preventFormSubmission = function ($form) {
  // we should only have one form per example
  if (!$form) {
    return false
  }
  $form.addEventListener('submit', function (e) {
    e.preventDefault()
  })
}

export default ExamplePage
