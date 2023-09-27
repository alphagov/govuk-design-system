/**
 * Push to Google Analytics
 *
 * @param {object} payload - Google Analytics payload
 */
function addToDataLayer(payload) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

/**
 * Strip possible personally identifiable information (PII)
 *
 * @param {string} string - Input string
 * @returns {string} Output string
 */
function stripPossiblePII(string) {
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

/**
 * Track confirmed autocomplete result
 *
 * @param {string} searchQuery - Search query
 * @param {object[]} searchResults - Search results
 * @param {object} result - Search result
 */
export function trackConfirm(searchQuery, searchResults, result) {
  if (window.DO_NOT_TRACK_ENABLED) {
    return
  }

  const searchTerm = stripPossiblePII(searchQuery)
  const products = searchResults
    .map((result, key) => ({
      name: result.title,
      category: result.section,
      list: searchTerm, // Used to match an searchTerm with results
      position: key + 1
    }))
    // Only return the product that matches what was clicked
    .filter((product) => product.name === result.title)

  addToDataLayer({
    event: 'site-search',
    eventDetails: {
      category: 'site search',
      action: 'click',
      label: `${searchTerm} | ${result.title}`
    },
    ecommerce: {
      click: {
        actionField: { list: searchTerm },
        products
      }
    }
  })
}

/**
 * Track autocomplete results
 *
 * @param {string} searchQuery - Search query
 * @param {object[]} searchResults - Search results
 */
export function trackSearchResults(searchQuery, searchResults) {
  if (window.DO_NOT_TRACK_ENABLED) {
    return
  }

  const searchTerm = stripPossiblePII(searchQuery)

  const hasResults = searchResults.length > 0
  // Impressions is Google Analytics lingo for what people have seen.
  const impressions = searchResults.map((result, key) => ({
    name: result.title,
    category: result.section,
    list: searchTerm, // Used to match an searchTerm with results
    position: key + 1
  }))

  addToDataLayer({
    event: 'site-search',
    eventDetails: {
      category: 'site search',
      action: hasResults ? 'results' : 'no result',
      label: searchTerm
    },
    ecommerce: {
      impressions
    }
  })
}
