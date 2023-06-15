import Analytics from './components/analytics.mjs'
import BackToTop from './components/back-to-top.mjs'
import CookieBanner from './components/cookie-banner.mjs'
import { getConsentCookie, isValidConsentCookie } from './components/cookie-functions.mjs'
import CookiesPage from './components/cookies-page.mjs'
import Copy from './components/copy.mjs'
import Example from './components/example.mjs'
import { nodeListForEach } from './components/helpers.mjs'
import Navigation from './components/navigation.mjs'
import OptionsTable from './components/options-table.mjs'
import Search from './components/search.mjs'
import AppTabs from './components/tabs.mjs'

// Initialise cookie banner
var $cookieBanner = document.querySelector('[data-module="govuk-cookie-banner"]')
new CookieBanner($cookieBanner).init()

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

// Do this after initialising tabs
OptionsTable.init()

// Add copy to clipboard to code blocks inside tab containers
var $codeBlocks = document.querySelectorAll('[data-module="app-copy"] pre')
nodeListForEach($codeBlocks, function ($codeBlock) {
  new Copy($codeBlock).init()
})

// Initialise mobile navigation
new Navigation().init()

// Initialise search
var $searchContainer = document.querySelector('[data-module="app-search"]')
new Search($searchContainer).init()

// Initialise back to top
var $backToTop = document.querySelector('[data-module="app-back-to-top"]')
new BackToTop($backToTop).init()

// Initialise cookie page
var $cookiesPage = document.querySelector('[data-module="app-cookies-page"]')
new CookiesPage($cookiesPage).init()
