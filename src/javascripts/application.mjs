import { initAll } from 'govuk-frontend'

import Analytics from './components/analytics.mjs'
import BackToTop from './components/back-to-top.mjs'
import CookieBanner from './components/cookie-banner.mjs'
import { getConsentCookie, isValidConsentCookie } from './components/cookie-functions.mjs'
import CookiesPage from './components/cookies-page.mjs'
import Copy from './components/copy.mjs'
import Example from './components/example.mjs'
import Navigation from './components/navigation.mjs'
import OptionsTable from './components/options-table.mjs'
import Search from './components/search.mjs'
import AppTabs from './components/tabs.mjs'

// Initialise GOV.UK Frontend
initAll()

// Initialise cookie banner
const $cookieBanner = document.querySelector('[data-module="govuk-cookie-banner"]')
if ($cookieBanner) {
  new CookieBanner($cookieBanner).init()
}

// Initialise analytics if consent is given
const userConsent = getConsentCookie()
if (userConsent && isValidConsentCookie(userConsent) && userConsent.analytics) {
  Analytics()
}

// Initialise example frames
const $examples = document.querySelectorAll('[data-module="app-example-frame"]')
$examples.forEach(($example) => {
  new Example($example).init()
})

// Initialise tabs
const $tabs = document.querySelectorAll('[data-module="app-tabs"]')
$tabs.forEach(($tabs) => {
  new AppTabs($tabs).init()
})

// Do this after initialising tabs
new OptionsTable().init()

// Add copy to clipboard to code blocks inside tab containers
const $codeBlocks = document.querySelectorAll('[data-module="app-copy"] pre')
$codeBlocks.forEach(($codeBlock) => {
  new Copy($codeBlock).init()
})

// Initialise mobile navigation
new Navigation(document).init()

// Initialise search
const $searchContainer = document.querySelector('[data-module="app-search"]')
if ($searchContainer) {
  new Search($searchContainer).init()
}

// Initialise back to top
const $backToTop = document.querySelector('[data-module="app-back-to-top"]')
if ($backToTop) {
  new BackToTop($backToTop).init()
}

// Initialise cookie page
const $cookiesPage = document.querySelector('[data-module="app-cookies-page"]')
if ($cookiesPage) {
  new CookiesPage($cookiesPage).init()
}
