import common from 'govuk-frontend/govuk/common'
import CookieBanner from './components/cookie-banner.js'
import Example from './components/example.js'
import AppTabs from './components/tabs.js'
import OptionsTable from './components/options-table.js'
import { getConsentCookie, isValidConsentCookie } from './cookie-functions.js'
import Analytics from './components/analytics.js'

var nodeListForEach = common.nodeListForEach

// Initialise analytics if consent is given
var userConsent = getConsentCookie()
if (userConsent && isValidConsentCookie(userConsent) && userConsent.analytics) {
  Analytics()
}

// Initialise example frames
var $examples = document.querySelectorAll('[data-module="app-example-frame"]')
nodeListForEach($examples, function ($example) {
  new Example($example).init()
})

// Initialise tabs
var $tabs = document.querySelectorAll('[data-module="app-tabs"]')
nodeListForEach($tabs, function ($tabs) {
  new AppTabs($tabs).init()
})

// Open options table when detected in URL hash
// Do this after initialising tabs
OptionsTable.init()

// Initialise cookie banner
var $cookieBanner = document.querySelector('[data-module="govuk-cookie-banner"]')
new CookieBanner($cookieBanner).init()
