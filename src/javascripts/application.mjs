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
import EmbedCard from './components/embed-card.mjs'
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
const $cookieBanners = document.querySelectorAll(
  '[data-module="govuk-cookie-banner"]'
)
$cookieBanners.forEach(($cookieBanner) => new CookieBanner($cookieBanner))

// Initialise analytics if consent is given
const userConsent = getConsentCookie()
if (userConsent && isValidConsentCookie(userConsent) && userConsent.analytics) {
  loadAnalytics()

  // Remove UA cookies if the user previously had them set or Google attempts
  // to set them
  removeUACookies()
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

const $embedCards = document.querySelectorAll('[data-module="app-embed-card"]')

const lazyEmbedObserver = new IntersectionObserver(function (
  entries,
  observer
) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      new EmbedCard(entry.target)
    }
  })
})

$embedCards.forEach(function (lazyEmbed) {
  lazyEmbedObserver.observe(lazyEmbed)
})

const campaignCookieBanner = document.querySelector(
  '[data-cookie-category="campaign"]'
)

if (campaignCookieBanner) {
  const callback = (mutationList, observer) => {
    if (mutationList.length) {
      $embedCards.forEach(function (lazyEmbed) {
        lazyEmbedObserver.unobserve(lazyEmbed)
        lazyEmbedObserver.observe(lazyEmbed)
      })
    }
  }

  const observer = new MutationObserver(callback)
  observer.observe(campaignCookieBanner, {
    attributes: true,
    childList: true,
    subtree: true
  })
}
