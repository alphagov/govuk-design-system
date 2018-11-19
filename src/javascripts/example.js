import 'govuk-frontend/vendor/polyfills/Event'

function ExamplePage ($module) {
  this.$module = $module
}
ExamplePage.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }
  var $form = $module.querySelector('form[action="/form-handler"]')
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

var $examplePageContainer = document.querySelector('.app-example-page')
new ExamplePage($examplePageContainer).init()
