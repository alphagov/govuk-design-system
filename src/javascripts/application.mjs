/* eslint-disable no-new */

import { createAll, Button, NotificationBanner, SkipLink } from 'govuk-frontend'

import { loadAnalytics } from './components/analytics.mjs'
import BackToTop from './components/back-to-top.mjs'
import CookieBanner from './components/cookie-banner.mjs'
import {
  getConsentCookie,
  isValidConsentCookie,
  removeUACookies
} from './components/cookie-functions.mjs'
import CookiesPage from './components/cookies-page.mjs'
import Copy from './components/copy.mjs'
import Example from './components/example.mjs'
import Navigation from './components/navigation.mjs'
import OptionsTable from './components/options-table.mjs'
import Search from './components/search.mjs'
import AppTabs from './components/tabs.mjs'

// Initialise GOV.UK Frontend
createAll(Button)
createAll(NotificationBanner)
createAll(SkipLink)

// Initialise cookie banner
createAll(CookieBanner)

// Initialise analytics if consent is given
const userConsent = getConsentCookie()
if (userConsent && isValidConsentCookie(userConsent) && userConsent.analytics) {
  loadAnalytics()

  // Remove UA cookies if the user previously had them set or Google attempts
  // to set them
  removeUACookies()
}

// Initialise example frames
createAll(Example)

// Initialise tabs
createAll(AppTabs)

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
createAll(Search)

// Initialise back to top
createAll(BackToTop)

// Initialise cookie page
const $cookiesPage = document.querySelector('[data-module="app-cookies-page"]')
if ($cookiesPage) {
  new CookiesPage($cookiesPage)
}
