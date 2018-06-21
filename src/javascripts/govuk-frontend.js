import Button from 'govuk-frontend/components/button/button'
import Details from 'govuk-frontend/components/details/details'
import Checkboxes from 'govuk-frontend/components/checkboxes/checkboxes'
// Intentionally avoid importing ErrorSummary since it will steal focus, scrolling example pages.
// import ErrorSummary from 'govuk-frontend/components/error-summary/error-summary'
import Radios from 'govuk-frontend/components/radios/radios'
import Header from 'govuk-frontend/components/header/header'
import Tabs from 'govuk-frontend/components/tabs/tabs'

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

var $header = document.querySelector('[data-module="header"]')
if ($header) {
  new Header($header).init()
}

var $tabs = document.querySelector('[data-module="tabs"]')
if ($tabs) {
  new Tabs($tabs).init()
}
