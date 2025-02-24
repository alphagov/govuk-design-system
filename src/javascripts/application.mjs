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
import ExampleFrame from './components/example-frame.mjs'
import Navigation from './components/navigation.mjs'
import OptionsTable from './components/options-table.mjs'
import ScrollContainer from './components/scroll-container.mjs'
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
createAll(ExampleFrame)
createAll(AppTabs)

// Do this after initialising tabs
createAll(Copy)
new OptionsTable()

// Initialise mobile navigation
createAll(Navigation)

// Initialise scrollable container handling
createAll(ScrollContainer)

// Initialise search
createAll(Search)

// Initialise back to top
createAll(BackToTop)

// Initialise cookie page
createAll(CookiesPage)

if ('IntersectionObserver' in window) {
  const $embedCards = document.querySelectorAll(
    '[data-module="app-embed-card"]'
  )

  const lazyEmbedObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        try {
          new EmbedCard(entry.target)
        } catch (error) {
          console.log(error)
        }
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
}
