import common from 'govuk-frontend/govuk/common'
import Accordion from 'govuk-frontend/govuk/components/accordion/accordion'
import Button from 'govuk-frontend/govuk/components/button/button'
import Details from 'govuk-frontend/govuk/components/details/details'
import CharacterCount from 'govuk-frontend/govuk/components/character-count/character-count'
import Checkboxes from 'govuk-frontend/govuk/components/checkboxes/checkboxes'
import ErrorSummary from 'govuk-frontend/govuk/components/error-summary/error-summary'
import NotificationBanner from 'govuk-frontend/govuk/components/notification-banner/notification-banner'
import Radios from 'govuk-frontend/govuk/components/radios/radios'
import Header from 'govuk-frontend/govuk/components/header/header'
import HideThisPage from 'govuk-frontend/govuk/components/hide-this-page/hide-this-page'
import Tabs from 'govuk-frontend/govuk/components/tabs/tabs'
import SkipLink from 'govuk-frontend/govuk/components/skip-link/skip-link'

var nodeListForEach = common.nodeListForEach

var $buttons = document.querySelectorAll('[data-module="govuk-button"]')
nodeListForEach($buttons, function ($button) {
  new Button($button).init()
})

var $accordions = document.querySelectorAll('[data-module="govuk-accordion"]')
nodeListForEach($accordions, function ($accordion) {
  new Accordion($accordion).init()
})

var $details = document.querySelectorAll('[data-module="govuk-details"]')
nodeListForEach($details, function ($detail) {
  new Details($detail).init()
})

var $errorSummaries = document.querySelectorAll('[data-module="govuk-error-summary"]')
nodeListForEach($errorSummaries, function ($errorSummary) {
  var errorSummary = new ErrorSummary($errorSummary)
  errorSummary.init()
})

var $characterCounts = document.querySelectorAll('[data-module="govuk-character-count"]')
nodeListForEach($characterCounts, function ($characterCount) {
  new CharacterCount($characterCount).init()
})

var $checkboxes = document.querySelectorAll('[data-module="govuk-checkboxes"]')
nodeListForEach($checkboxes, function ($checkbox) {
  new Checkboxes($checkbox).init()
})

var $notificationBanners = document.querySelectorAll('[data-module="govuk-notification-banner"]')
nodeListForEach($notificationBanners, function ($notificationBanner) {
  new NotificationBanner($notificationBanner).init()
})

var $radios = document.querySelectorAll('[data-module="govuk-radios"]')
nodeListForEach($radios, function ($radio) {
  new Radios($radio).init()
})

var $headers = document.querySelectorAll('[data-module="govuk-header"]')
nodeListForEach($headers, function ($header) {
  new Header($header).init()
})

var $hideThisPageButtons = document.querySelectorAll('[data-module="govuk-hide-this-page"]')
new HideThisPage($hideThisPageButtons).init()

var $tabs = document.querySelectorAll('[data-module="govuk-tabs"]')
nodeListForEach($tabs, function ($tab) {
  new Tabs($tab).init()
})

// Find first skip link module to enhance.
var $skipLink = document.querySelector('[data-module="govuk-skip-link"]')
new SkipLink($skipLink).init()
