import Accordion from 'govuk-frontend/govuk/components/accordion/accordion'
import Button from 'govuk-frontend/govuk/components/button/button'
import Details from 'govuk-frontend/govuk/components/details/details'
import CharacterCount from 'govuk-frontend/govuk/components/character-count/character-count'
import Checkboxes from 'govuk-frontend/govuk/components/checkboxes/checkboxes'
import ErrorSummary from 'govuk-frontend/govuk/components/error-summary/error-summary'
import Radios from 'govuk-frontend/govuk/components/radios/radios'
import Header from 'govuk-frontend/govuk/components/header/header'
import Tabs from 'govuk-frontend/govuk/components/tabs/tabs'

var $button = document.querySelector('[data-module="govuk-button"]')
if ($button) {
  new Button($button).init()
}

var $accordion = document.querySelector('[data-module="accordion"]')
if ($accordion) {
  new Accordion($accordion).init()
}

var $details = document.querySelector('[data-module="govuk-details"]')
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
