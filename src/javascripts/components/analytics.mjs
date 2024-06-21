// @ts-nocheck

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
  string = string.replace(/[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g, '[REDACTED EMAIL]')
  string = string.replace(
    /\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,
    '[REDACTED POSTCODE]'
  )
  string = string.replace(
    /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/g,
    '[REDACTED NI NUMBER]'
  )
  // If someone has typed in a number it's likely not related so redact it
  string = string.replace(/[0-9]+/g, '[REDACTED NUMBER]')
  return string
}
