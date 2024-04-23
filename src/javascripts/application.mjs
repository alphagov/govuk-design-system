/* eslint-disable no-new */

import { initAll } from 'govuk-frontend'

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
initAll()

initModules([
  [CookieBanner, 'govuk-cookie-banner'], // Why is this not 'app-cookie-banner' ?
  [Analytics, hasUserConsentedToAnalytics],
  [Example, 'app-example-frame'], // Why do we not match the module name ?
  [AppTabs, 'app-tabs'],
  OptionsTable,
  [Copy, 'app-copy', {selector: 'pre'}], // Should probably be the responsibility of the Copy module to lookup the `<pre>`
  Navigation,
  [Search, 'app-search', {single: true}], // Could error if there's more than one
  [BackToTop, 'app-back-to-top', {single: true}],
  [CookiesPage, 'app-cookies-page', {single: true}]
])

/**
 * Checks if user has consented to run analytics
 *
 * @returns {boolean}
 */
function hasUserConsentedToAnalytics() {
  const userConsent = getConsentCookie();
  return (
    userConsent && isValidConsentCookie(userConsent) && userConsent.analytics
  )
}

/**
 * Initialises the given list of modules, according to the provided options
 *
 * @param {Array<ModulesToInitialise>} modulesToInitialise
 */
function initModules(modulesToInitialise) {
  for(const moduleToInitialise of modulesToInitialise) {
    if (Array.isArray(moduleToInitialise)) {
      initModule(...moduleToInitialise)
    } else {
      initModules(moduleToInitialise)
    }
  }
}



/**
 *
 * @param {Function} ModuleClass
 * @param {string} moduleName
 * @param {{single?: boolean, selector?: string}} options
 */
function initModule(ModuleClass, moduleName, options) {
  if (!moduleName) {
    runInitialisation(ModuleClass);
  }

  const elements = document.querySelectorAll(`[data-module=${moduleName}]`);
  for(const element of elements) {
    if (options.selector) {
      runInitialisation(ModuleClass, element.querySelector(options.selector));
    } else {
      runInitialisation(ModuleClass, element)
    }
  }
}

/**
 * Initialises the given Module, passing it the given `element`
 * if provided, logging errors if they happen
 *
 * @param {Function} ModuleClass
 * @param {Element} [element]
 * @returns {object} The initialised instance of the module
 */
function runInitialisation(ModuleClass, element) {
  try {
    if (element) {
      return new ModuleClass(element)
    } else {
      return new ModuleClass()
    }
  } catch (error) {
    console.error(error);
  }
}
