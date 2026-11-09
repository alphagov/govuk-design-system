/* eslint-disable-next-line jsdoc/ts-ban-ts-comment */
// @ts-nocheck

/* eslint-disable max-params */

// eslint-disable-next-line jsdoc/require-jsdoc
export function loadAnalytics() {
  if (!window.ga || !window.ga.loaded) {
    // Load gtm script
    // Script based on snippet at https://developers.google.com/tag-manager/quickstart
    // prettier-ignore
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })

      const j = d.createElement(s)
      const dl = l !== 'dataLayer' ? `&l=${l}` : ''

      j.async = true
      j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`
      document.head.appendChild(j)
    })(window, document, 'script', 'dataLayer', 'GTM-53XG2JT')
  }
}

/* eslint-enable max-params */

/**
 * Push to Google Analytics
 *
 * @param {object} payload - Google Analytics payload
 */
export function addToDataLayer(payload) {
  // @ts-expect-error Property does not exist on window
  window.dataLayer = window.dataLayer || []
  // @ts-expect-error Property does not exist on window
  window.dataLayer.push(payload)
}

/**
 * Strip possible personally identifiable information (PII)
 *
 * @param {string} string - Input string
 * @returns {string} Output string
 */
export function stripPossiblePII(string) {
  // Try to detect emails, postcodes, and NI numbers, and redact them.
  // Regexes copied from GTM variable 'JS - Remove PII from Hit Payload'
  string = string.replace(/[^\s&/=?]+(?:@|%40)[^\s&/=?]+/g, '[REDACTED EMAIL]')
  string = string.replace(
    /\b[a-pr-uwyz][a-hj-z]?[0-9][0-9a-hjkmnpr-y]?(?:[\s+]|%20)*[0-9](?!refund)[abd-hjlnp-z]{2,3}\b/gi,
    '[REDACTED POSTCODE]'
  )
  string = string.replace(
    /^\s*[a-z]{2}(?:\s*\d\s*){6}[a-z]?\s*$/gi,
    '[REDACTED NI NUMBER]'
  )
  // If someone has typed in a number it's likely not related so redact it
  string = string.replace(/\d+/g, '[REDACTED NUMBER]')
  return string
}

/**
 * Translate list of search results to
 * format compatiable with GA4 ecommerce
 * `items` attribute
 *
 * @param {Array} searchResults - Array of search results
 * @param {string} searchTerm - Search string entered by user
 * @returns {Array} items - Array of `items`
 */
export function translateToItems(searchResults, searchTerm) {
  const items = searchResults.map((result, key) => ({
    name: result.title,
    category: result.section,
    list: searchTerm, // Used to match an searchTerm with results
    position: key + 1
  }))

  return items
}
