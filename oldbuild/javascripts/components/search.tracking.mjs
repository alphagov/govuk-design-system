import {
  addToDataLayer,
  stripPossiblePII,
  translateToItems
} from './analytics.mjs'

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

  // Only return the product that matches what was clicked
  const items = translateToItems(searchResults, searchTerm).filter(
    (product) => product.name === result.title
  )

  addToDataLayer({
    event: 'site_search',
    event_data: {
      action: 'click',
      text: searchTerm,
      section: result.title
    }
  })

  // Each time the ecommerce object is pushed to the dataLayer,
  // it needs to be nullified first. Nullifying the ecommerce
  // object clears it and prevents multiple ecommerce events on a
  // page from affecting each other.
  addToDataLayer({ ecommerce: null })
  addToDataLayer({
    event: 'select_item',
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
  const items = translateToItems(searchResults, searchTerm)

  addToDataLayer({
    event: 'site_search',
    event_data: {
      action: hasResults ? 'results' : 'no result',
      text: searchTerm
    }
  })

  // Each time the ecommerce object is pushed to the dataLayer,
  // it needs to be nullified first. Nullifying the ecommerce
  // object clears it and prevents multiple ecommerce events on a
  // page from affecting each other.
  addToDataLayer({ ecommerce: null })
  addToDataLayer({
    event: 'view_item_list',
    ecommerce: {
      items
    }
  })
}
