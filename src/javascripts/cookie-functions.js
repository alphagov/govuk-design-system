/**
 * Cookie functions
 * ================
 *
 * Used by the cookie banner component and cookies page pattern.
 *
 * Includes function `Cookie()` for getting, setting, and deleting cookies, and
 * functions to manage the users' consent to cookies.
 */

import Analytics from './components/analytics.js'

/* Name of the cookie to save users cookie preferences to. */
var CONSENT_COOKIE_NAME = 'design_system_cookies_policy'

/* If cookie policy changes and/or the user preferences object format needs to
 * change, bump this version up afterwards. The user should then be shown the
 * banner again to consent to the new policy.
 *
 * Note that because isValidCookieConsent checks that the version in the user's
 * cookie is equal to or greater than this number, you should be careful to
 * check backwards compatibility when changing the object format.
 */
var CONSENT_COOKIE_VERSION = 1

/* Users can (dis)allow different groups of cookies. */
var COOKIE_CATEGORIES = {
  _ga: 'analytics',
  _gid: 'analytics',

  /* Essential cookies
   *
   * Essential cookies cannot be deselected, but we want our cookie code to
   * only allow adding cookies that are documented in this object, so they need
   * to be added here.
   */
  'design_system_cookies_policy': 'essential'
}

/*
 * Default cookie preferences if user has no cookie preferences.
 *
 * Note that this doesn't include a key for essential cookies, essential
 * cookies cannot be disallowed. If the object contains { essential: false }
 * this will be ignored.
 */
var DEFAULT_COOKIE_CONSENT = {
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
      return deleteCookie(name)
    } else {
      // Default expiry date of 30 days
      if (typeof options === 'undefined') {
        options = { days: 30 }
      }
      return setCookie(name, value, options)
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
  var consentCookie = getCookie(CONSENT_COOKIE_NAME)
  var consentCookieObj

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
 */
export function isValidConsentCookie (options) {
  return (options && options.version >= CONSENT_COOKIE_VERSION)
}

/** Update the user's cookie preferences. */
export function setConsentCookie (options) {
  var cookieConsent = getConsentCookie()

  if (!cookieConsent) {
    cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
  }

  // Merge current cookie preferences and new preferences
  for (var option in options) {
    cookieConsent[option] = options[option]
  }

  // Essential cookies cannot be deselected, ignore this cookie type
  delete cookieConsent.essential

  cookieConsent.version = CONSENT_COOKIE_VERSION

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
  var options = getConsentCookie()

  // If no preferences or old version use the default
  if (!isValidConsentCookie(options)) {
    options = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
  }

  for (var cookieType in options) {
    if (cookieType === 'version') {
      continue
    }

    // Essential cookies cannot be deselected, ignore this cookie type
    if (cookieType === 'essential') {
      continue
    }

    // Initialise analytics if allowed
    if (cookieType === 'analytics' && options[cookieType]) {
      Analytics()
    }

    // Delete cookies of that type if consent is false
    if (!options[cookieType]) {
      for (var cookie in COOKIE_CATEGORIES) {
        if (COOKIE_CATEGORIES[cookie] === cookieType) {
          Cookie(cookie, null)

          if (Cookie(cookie)) {
            document.cookie = cookie + '=;expires=' + new Date() + ';domain=' + window.location.hostname.replace(/^www\./, '.') + ';path=/'
          }
        }
      }
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

  if (COOKIE_CATEGORIES[cookieName]) {
    var cookieCategory = COOKIE_CATEGORIES[cookieName]

    // Get the current cookie preferences
    var cookiePreferences = getConsentCookie()

    // If no preferences or old version use the default
    if (!isValidConsentCookie(cookiePreferences)) {
      cookiePreferences = DEFAULT_COOKIE_CONSENT
    }

    return userAllowsCookieCategory(cookieCategory, cookiePreferences)
  } else {
    // Deny the cookie if it is not known to us
    return false
  }
}

function getCookie (name) {
  var nameEQ = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0, len = cookies.length; i < len; i++) {
    var cookie = cookies[i]
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
    var cookieString = name + '=' + value + '; path=/'
    if (options.days) {
      var date = new Date()
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
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  return null
}
