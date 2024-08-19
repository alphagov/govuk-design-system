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

// Cookies and analytics
createAll(CookieBanner)
createAll(CookiesPage)

// Check for consent before initialising analytics
const userConsent = getConsentCookie()
if (userConsent && isValidConsentCookie(userConsent) && userConsent.analytics) {
  loadAnalytics()

  // Remove UA cookies if the user previously had them set or Google attempts
  // to set them
  removeUACookies()
}

// Code examples
createAll(Example)
createAll(AppTabs)
// Do this after initialising tabs
createAll(Copy)
new OptionsTable()

// Initialise mobile navigation
new Navigation(document)

// Initialise search
createAll(Search)

// Initialise back to top
createAll(BackToTop)
