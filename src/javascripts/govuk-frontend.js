import Button from 'govuk-frontend/components/button/button'
import Details from 'govuk-frontend/components/details/details'
import CharacterCount from 'govuk-frontend/components/character-count/character-count'
import Checkboxes from 'govuk-frontend/components/checkboxes/checkboxes'
import ErrorSummary from 'govuk-frontend/components/error-summary/error-summary'
import Radios from 'govuk-frontend/components/radios/radios'
import Header from 'govuk-frontend/components/header/header'
import Tabs from 'govuk-frontend/components/tabs/tabs'

new Button(document).init()

var $details = document.querySelector('details')
if ($details) {
  new Details($details).init()
}

var $errorSummary = document.querySelector('[data-module="error-summary"]')
if ($errorSummary) {
  var errorSummary = new ErrorSummary($errorSummary)
  // Override the `init` method since it automatically focuses the ErrorSummary.
  // This is not ideal when showing examples for this component
  // TODO: Allow option for ErrorSummary to avoid this hack
  errorSummary.init = function () {
    this.$module.addEventListener('click', ErrorSummary.prototype.handleClick.bind(this))
  }
  errorSummary.init()
}

var $characterCount = document.querySelector('[data-module="character-count"]')
if ($characterCount) {
  new CharacterCount($characterCount).init()
}

var $checkbox = document.querySelector('[data-module="checkboxes"]')
if ($checkbox) {
  new Checkboxes($checkbox).init()
}

var $radio = document.querySelector('[data-module="radios"]')
if ($radio) {
  new Radios($radio).init()
}

var $header = document.querySelector('[data-module="header"]')
if ($header) {
  new Header($header).init()
}

var $tabs = document.querySelector('[data-module="tabs"]')
if ($tabs) {
  new Tabs($tabs).init()
}
