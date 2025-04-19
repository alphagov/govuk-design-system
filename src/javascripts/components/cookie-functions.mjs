/**
 * Cookie functions
 * ================
 *
 * Used by the cookie banner component and cookies page pattern.
 *
 * Includes function `Cookie()` for getting, setting, and deleting cookies, and
 * functions to manage the users' consent to cookies.
 *
 * Note: there is an inline script in cookie-banner.njk to show the banner
 * as soon as possible, to avoid a high Cumulative Layout Shift (CLS) score.
 * The consent cookie version is defined in cookie-banner.njk
 */

import { loadAnalytics } from './analytics.mjs'

/* Name of the cookie to save users cookie preferences to. */
const CONSENT_COOKIE_NAME = 'design_system_cookies_policy'

/* Google Analytics tracking IDs for preview and live environments. */
const TRACKING_PREVIEW_ID = '8F2EMQL51V'
const TRACKING_LIVE_ID = 'GHT8W0QGD9'

/* Users can (dis)allow different groups of cookies. */
const COOKIE_CATEGORIES = {
  analytics: ['_ga', `_ga_${TRACKING_PREVIEW_ID}`, `_ga_${TRACKING_LIVE_ID}`],
  /* Campaign cookies
   *
   * Cookies for campaign pages, so that we can embed YouTube videos and other
   * embeddable content that sets cookies.
   *
   */
  campaign: ['campaign'],
  /* Essential cookies
   *
   * Essential cookies cannot be deselected, but we want our cookie code to
   * only allow adding cookies that are documented in this object, so they need
   * to be added here.
   */
  essential: ['design_system_cookies_policy']
}

/*
 * Default cookie preferences if user has no cookie preferences.
 *
 * Note that this doesn't include a key for essential cookies, essential
 * cookies cannot be disallowed. If the object contains { essential: false }
 * this will be ignored.
 */
const DEFAULT_COOKIE_CONSENT = {
  analytics: null, // tracks if has been asked at all
  campaign: null // tracks if has been asked at all
}

/**
 * Set, get, and delete cookies.
 *
 *   Setting a cookie:
 *   Cookie('hobnob', 'tasty', { days: 30 })
 *
 *   Reading a cookie:
 *   Cookie('hobnob')
 *
 *   Deleting a cookie:
 *   Cookie('hobnob', null)
 *
 * @param {string} name - Cookie name
 * @param {string | false | null} [value] - Cookie value
 * @param {{ days?: number }} [options] - Cookie options
 * @returns {string | null | undefined} - Returns value when setting or deleting
 */
export function Cookie(name, value, options) {
  if (typeof value !== 'undefined') {
    if (value === false || value === null) {
      deleteCookie(name)
    } else {
      // Default expiry date of 30 days
      if (typeof options === 'undefined') {
        options = { days: 30 }
      }
      setCookie(name, value, options)
    }
  } else {
    return getCookie(name)
  }
}

/**
 * Return the user's cookie preferences.
 *
 * If the consent cookie is malformed, or not present,
 * returns null.
 *
 * @returns {ConsentPreferences | null} Consent preferences
 */
export function getConsentCookie() {
  const consentCookie = getCookie(CONSENT_COOKIE_NAME)
  let consentCookieObj

  if (consentCookie) {
    try {
      consentCookieObj = JSON.parse(consentCookie)
    } catch (error) {
      return null
    }
  } else {
    return null
  }

  return consentCookieObj
}

/**
 * Check the cookie preferences object.
 *
 * If the consent object is not present, malformed, or incorrect version,
 * returns false, otherwise returns true.
 *
 * This is also duplicated in cookie-banner.njk - the two need to be kept in sync
 *
 * @param {ConsentPreferences | null} options - Consent preferences
 * @returns {boolean} True if consent cookie is valid
 */
export function isValidConsentCookie(options) {
  // @ts-expect-error Property does not exist on window
  return options && options.version >= window.GDS_CONSENT_COOKIE_VERSION
}

/**
 * Update the user's cookie preferences.
 *
 * @param {ConsentPreferences} options - Consent options to parse
 */
export function setConsentCookie(options) {
  const cookieConsent =
    getConsentCookie() ||
    // If no preferences or old version use the default
    JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))

  // Merge current cookie preferences and new preferences
  for (const option in options) {
    cookieConsent[option] = options[option]
  }

  // Essential cookies cannot be deselected, ignore this cookie type
  delete cookieConsent.essential

  // @ts-expect-error Property does not exist on window
  cookieConsent.version = window.GDS_CONSENT_COOKIE_VERSION

  // Set the consent cookie
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(cookieConsent), { days: 365 })

  // Update the other cookies
  resetCookies()
}

/**
 * Apply the user's cookie preferences
 *
 * Deletes any cookies the user has not consented to.
 */
export function resetCookies() {
  const options =
    getConsentCookie() ||
    // If no preferences or old version use the default
    JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))

  for (const cookieType in options) {
    if (cookieType === 'version') {
      continue
    }

    // Essential cookies cannot be deselected, ignore this cookie type
    if (cookieType === 'essential') {
      continue
    }

    // Initialise analytics if allowed
    if (cookieType === 'analytics' && options[cookieType]) {
      // Enable GA if allowed
      window[`ga-disable-G-${TRACKING_PREVIEW_ID}`] = false
      window[`ga-disable-G-${TRACKING_LIVE_ID}`] = false
      loadAnalytics()

      // Unset UA cookies if they've been set by GTM
      removeUACookies()
    } else {
      // Disable GA if not allowed
      window[`ga-disable-G-${TRACKING_PREVIEW_ID}`] = true
      window[`ga-disable-G-${TRACKING_LIVE_ID}`] = true
    }

    if (cookieType === 'campaign') {
      window[cookieType] = options[cookieType]
    }

    if (!options[cookieType]) {
      // Fetch the cookies in that category
      const cookiesInCategory = COOKIE_CATEGORIES[cookieType]

      cookiesInCategory.forEach((cookie) => {
        // Delete cookie
        Cookie(cookie, null)
      })
    }
  }
}

/**
 * Remove UA cookies for user and prevent Google setting them.
 *
 * We've migrated our analytics from UA (Universal Analytics) to GA4, however
 * users may still have the UA cookie set from our previous implementation.
 * Additionally, our UA properties are scheduled for deletion but until they are
 * entirely deleted, GTM is still setting UA cookies.
 */
export function removeUACookies() {
  for (const UACookie of [
    '_gid',
    '_gat_UA-26179049-17',
    '_gat_UA-116229859-1'
  ]) {
    Cookie(UACookie, null)
  }
}

/**
 * Check if user allows cookie category
 *
 * @param {string} cookieCategory - Cookie type
 * @param {ConsentPreferences} cookiePreferences - Consent preferences
 * @returns {string | boolean} Cookie type value
 */
function userAllowsCookieCategory(cookieCategory, cookiePreferences) {
  // Essential cookies are always allowed
  if (cookieCategory === 'essential') {
    return true
  }

  // Sometimes cookiePreferences is malformed in some of the tests, so we need to handle these
  try {
    return cookiePreferences[cookieCategory]
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * Check if user allows cookie
 *
 * @param {string} cookieName - Cookie name
 * @returns {string | boolean} Cookie type value
 */
function userAllowsCookie(cookieName) {
  // Always allow setting the consent cookie
  if (cookieName === CONSENT_COOKIE_NAME) {
    return true
  }

  // Get the current cookie preferences
  let cookiePreferences = getConsentCookie()

  // If no preferences or old version use the default
  if (!isValidConsentCookie(cookiePreferences)) {
    cookiePreferences = DEFAULT_COOKIE_CONSENT
  }

  for (const category in COOKIE_CATEGORIES) {
    const cookiesInCategory = COOKIE_CATEGORIES[category]

    if (cookiesInCategory.indexOf(cookieName) !== '-1') {
      return userAllowsCookieCategory(category, cookiePreferences)
    }
  }

  // Deny the cookie if it is not known to us
  return false
}

/**
 * Get cookie by name
 *
 * @param {string} name - Cookie name
 * @returns {string | null} Cookie value
 */
function getCookie(name) {
  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')
  for (let i = 0, len = cookies.length; i < len; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }
  return null
}

/**
 * Set cookie by name, value and options
 *
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {{ days?: number }} [options] - Cookie options
 */
function setCookie(name, value, options) {
  if (userAllowsCookie(name)) {
    if (typeof options === 'undefined') {
      options = {}
    }
    let cookieString = `${name}=${value}; path=/`
    if (options.days) {
      const date = new Date()
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000)
      cookieString = `${cookieString}; expires=${date.toUTCString()}`
    }
    if (document.location.protocol === 'https:') {
      cookieString = `${cookieString}; Secure`
    }
    document.cookie = cookieString
  }
}

/**
 * Delete cookie by name
 *
 * @param {string} name - Cookie name
 */
function deleteCookie(name) {
  if (Cookie(name)) {
    // Cookies need to be deleted in the same level of specificity in which they were set
    // If a cookie was set with a specified domain, it needs to be specified when deleted
    // If a cookie wasn't set with the domain attribute, it shouldn't be there when deleted
    // You can't tell if a cookie was set with a domain attribute or not, so try both options
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${window.location.hostname};path=/`
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.hostname};path=/`
  }
}

/**
 * @typedef {object} ConsentPreferences
 * @property {boolean} [analytics] - Accept analytics cookies
 * @property {boolean} [essential] - Accept essential cookies
 * @property {boolean} [campaign] - Accept essential cookies
 * @property {string} [version] - Content cookie version
 */
