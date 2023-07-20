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

import Analytics from './analytics.mjs'

/* Name of the cookie to save users cookie preferences to. */
const CONSENT_COOKIE_NAME = 'design_system_cookies_policy'

/* Google Analytics tracking IDs for preview and live environments. */
const TRACKING_PREVIEW_ID = '26179049-17'
const TRACKING_LIVE_ID = '116229859-1'

/* Users can (dis)allow different groups of cookies. */
const COOKIE_CATEGORIES = {
  analytics: ['_ga', '_gid', '_gat_UA-' + TRACKING_PREVIEW_ID, '_gat_UA-' + TRACKING_LIVE_ID],
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
  analytics: false
}

/*
 * Set, get, and delete cookies.
 *
 * Usage:
 *
 *   Setting a cookie:
 *   Cookie('hobnob', 'tasty', { days: 30 })
 *
 *   Reading a cookie:
 *   Cookie('hobnob')
 *
 *   Deleting a cookie:
 *   Cookie('hobnob', null)
 */
export function Cookie (name, value, options) {
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

/** Return the user's cookie preferences.
 *
 * If the consent cookie is malformed, or not present,
 * returns null.
 */
export function getConsentCookie () {
  const consentCookie = getCookie(CONSENT_COOKIE_NAME)
  let consentCookieObj

  if (consentCookie) {
    try {
      consentCookieObj = JSON.parse(consentCookie)
    } catch (err) {
      return null
    }
  } else {
    return null
  }

  return consentCookieObj
}

/** Check the cookie preferences object.
 *
 * If the consent object is not present, malformed, or incorrect version,
 * returns false, otherwise returns true.
 *
 * This is also duplicated in cookie-banner.njk - the two need to be kept in sync
 */
export function isValidConsentCookie (options) {
  return (options && options.version >= window.GDS_CONSENT_COOKIE_VERSION)
}

/** Update the user's cookie preferences. */
export function setConsentCookie (options) {
  let cookieConsent = getConsentCookie()

  if (!cookieConsent) {
    cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
  }

  // Merge current cookie preferences and new preferences
  for (const option in options) {
    cookieConsent[option] = options[option]
  }

  // Essential cookies cannot be deselected, ignore this cookie type
  delete cookieConsent.essential

  cookieConsent.version = window.GDS_CONSENT_COOKIE_VERSION

  // Set the consent cookie
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(cookieConsent), { days: 365 })

  // Update the other cookies
  resetCookies()
}

/** Apply the user's cookie preferences
 *
 * Deletes any cookies the user has not consented to.
 */
export function resetCookies () {
  let options = getConsentCookie()

  // If no preferences or old version use the default
  if (!isValidConsentCookie(options)) {
    options = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
  }

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
      window['ga-disable-UA-' + TRACKING_PREVIEW_ID] = false
      window['ga-disable-UA-' + TRACKING_LIVE_ID] = false
      Analytics()
    } else {
      // Disable GA if not allowed
      window['ga-disable-UA-' + TRACKING_PREVIEW_ID] = true
      window['ga-disable-UA-' + TRACKING_LIVE_ID] = true
    }

    if (!options[cookieType]) {
      // Fetch the cookies in that category
      const cookiesInCategory = COOKIE_CATEGORIES[cookieType]

      cookiesInCategory.forEach(function (cookie) {
        // Delete cookie
        Cookie(cookie, null)
      })
    }
  }
}

function userAllowsCookieCategory (cookieCategory, cookiePreferences) {
  // Essential cookies are always allowed
  if (cookieCategory === 'essential') {
    return true
  }

  // Sometimes cookiePreferences is malformed in some of the tests, so we need to handle these
  try {
    return cookiePreferences[cookieCategory]
  } catch (e) {
    console.error(e)
    return false
  }
}

function userAllowsCookie (cookieName) {
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

function getCookie (name) {
  const nameEQ = name + '='
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

function setCookie (name, value, options) {
  if (userAllowsCookie(name)) {
    if (typeof options === 'undefined') {
      options = {}
    }
    let cookieString = name + '=' + value + '; path=/'
    if (options.days) {
      const date = new Date()
      date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000))
      cookieString = cookieString + '; expires=' + date.toGMTString()
    }
    if (document.location.protocol === 'https:') {
      cookieString = cookieString + '; Secure'
    }
    document.cookie = cookieString
  }
}

function deleteCookie (name) {
  if (Cookie(name)) {
    // Cookies need to be deleted in the same level of specificity in which they were set
    // If a cookie was set with a specified domain, it needs to be specified when deleted
    // If a cookie wasn't set with the domain attribute, it shouldn't be there when deleted
    // You can't tell if a cookie was set with a domain attribute or not, so try both options
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=' + window.location.hostname + ';path=/'
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.' + window.location.hostname + ';path=/'
  }
}
