import Button from '@govuk-frontend/frontend/components/button/button'
import Details from '@govuk-frontend/frontend/components/details/details'
import Checkboxes from '@govuk-frontend/frontend/components/checkboxes/checkboxes'
// Intentionally avoid importing ErrorSummary since it will steal focus, scrolling example pages.
// import ErrorSummary from '@govuk-frontend/frontend/components/error-summary/error-summary'
import Radios from '@govuk-frontend/frontend/components/radios/radios'

new Button(document).init()

var $details = document.querySelector('details')
if ($details) {
  new Details($details).init()
}

var $checkbox = document.querySelector('[data-module="checkboxes"]')
if ($checkbox) {
  new Checkboxes($checkbox).init()
}

var $radio = document.querySelector('[data-module="radios"]')
if ($radio) {
  new Radios($radio).init()
}
