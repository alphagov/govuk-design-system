/* eslint-disable no-new */

// Import directly from the modules in govuk-frontend because our treeshaking
// currently doesn't work when importing directly from govuk-frontend
//
// See https://github.com/alphagov/govuk-frontend/issues/4957
import { Button } from 'govuk-frontend/dist/govuk/components/button/button.mjs'
import { NotificationBanner } from 'govuk-frontend/dist/govuk/components/notification-banner/notification-banner.mjs'
import { SkipLink } from 'govuk-frontend/dist/govuk/components/skip-link/skip-link.mjs'

import Analytics from './components/analytics.mjs'
import BackToTop from './components/back-to-top.mjs'
import CookieBanner from './components/cookie-banner.mjs'
import {
  getConsentCookie,
  isValidConsentCookie
} from './components/cookie-functions.mjs'
import CookiesPage from './components/cookies-page.mjs'
import Copy from './components/copy.mjs'
import Example from './components/example.mjs'
import Navigation from './components/navigation.mjs'
import OptionsTable from './components/options-table.mjs'
import Search from './components/search.mjs'
import AppTabs from './components/tabs.mjs'

// Initialise GOV.UK Frontend
// Button
const $buttons = document.querySelectorAll('[data-module="govuk-button"]')

$buttons.forEach(($button) => {
  new Button($button)
})

// Notification Banner
const $notificationBanner = document.querySelector(
  '[data-module="govuk-notification-banner"]'
)

if ($notificationBanner) {
  new NotificationBanner($notificationBanner)
}

// Skip link
const $skipLink = document.querySelector('[data-module="govuk-skip-link"]')

// No checking if it exists because we can safely assume there will always be
// a skip link on a page
new SkipLink($skipLink)

// Initialise cookie banner
const $cookieBanner = document.querySelector(
  '[data-module="govuk-cookie-banner"]'
)
if ($cookieBanner) {
  new CookieBanner($cookieBanner)
}

// Initialise analytics if consent is given
const userConsent = getConsentCookie()
if (userConsent && isValidConsentCookie(userConsent) && userConsent.analytics) {
  Analytics()
}

// Initialise example frames
const $examples = document.querySelectorAll('[data-module="app-example-frame"]')
$examples.forEach(($example) => {
  new Example($example)
})

// Initialise tabs
const $tabs = document.querySelectorAll('[data-module="app-tabs"]')
$tabs.forEach(($tabs) => {
  new AppTabs($tabs)
})

// Do this after initialising tabs
new OptionsTable()

// Add copy to clipboard to code blocks inside tab containers
const $codeBlocks = document.querySelectorAll('[data-module="app-copy"] pre')
$codeBlocks.forEach(($codeBlock) => {
  new Copy($codeBlock)
})

// Initialise mobile navigation
new Navigation(document)

// Initialise search
const $searchContainer = document.querySelector('[data-module="app-search"]')
if ($searchContainer) {
  new Search($searchContainer)
}

// Initialise back to top
const $backToTop = document.querySelector('[data-module="app-back-to-top"]')
if ($backToTop) {
  new BackToTop($backToTop)
}

// Initialise cookie page
const $cookiesPage = document.querySelector('[data-module="app-cookies-page"]')
if ($cookiesPage) {
  new CookiesPage($cookiesPage)
}
