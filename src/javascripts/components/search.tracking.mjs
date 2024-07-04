import { addToDataLayer, stripPossiblePII } from './analytics.mjs'

/**
 * Track confirmed autocomplete result
 *
 * @param {string} searchQuery - Search query
 * @param {object[]} searchResults - Search results
 * @param {object} result - Search result
 */
export function trackConfirm(searchQuery, searchResults, result) {
  if ('DO_NOT_TRACK_ENABLED' in window && window.DO_NOT_TRACK_ENABLED) {
    return
  }

  const searchTerm = stripPossiblePII(searchQuery)
  const items = searchResults
    .map((result, key) => ({
      name: result.title,
      category: result.section,
      list: searchTerm, // Used to match an searchTerm with results
      position: key + 1
    }))
    // Only return the product that matches what was clicked
    .filter((product) => product.name === result.title)

  addToDataLayer({
    event: 'site_search',
    eventDetails: {
      section: result.title,
      action: 'click',
      text: searchTerm
    },
    ecommerce: {
      items
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
  if ('DO_NOT_TRACK_ENABLED' in window && window.DO_NOT_TRACK_ENABLED) {
    return
  }

  const searchTerm = stripPossiblePII(searchQuery)

  const hasResults = searchResults.length > 0
  // Impressions is Google Analytics lingo for what people have seen.
  const items = searchResults.map((result, key) => ({
    name: result.title,
    category: result.section,
    list: searchTerm, // Used to match an searchTerm with results
    position: key + 1
  }))

  addToDataLayer({
    event: 'site_search',
    eventDetails: {
      action: hasResults ? 'results' : 'no result',
      text: searchTerm
    },
    ecommerce: {
      items
    }
  })
}
