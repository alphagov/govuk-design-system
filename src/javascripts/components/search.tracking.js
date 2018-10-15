function addToDataLayer (payload) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

function stripPossiblePII (string) {
    // Try to detect emails and redact it.
  string = string.replace(/\S*@\S*\s?/g, '[blocked]')
    // If someone has typed in a number it's likely not related so redact it
  string = string.replace(/0|1|2|3|4|5|6|7|8|9/g, '[blocked]')
  return string
}

function trackConfirm (searchQuery, searchResults, result) {
  if (window.DO_NOT_TRACK_ENABLED) {
    return
  }

  var searchTerm = stripPossiblePII(searchQuery)
  var products =
    searchResults
      .map(function (result, key) {
        return {
          name: result.title,
          category: result.section,
          list: searchTerm, // Used to match an searchTerm with results
          position: (key + 1)
        }
      })
      .filter(function (product) {
        // Only return the product that matches what was clicked
        return product.name === result.title
      })

  addToDataLayer({
    event: 'site-search',
    eventDetails: {
      category: 'site search',
      action: 'click',
      label: searchTerm + ' | ' + result.title
    },
    ecommerce: {
      click: {
        actionField: { list: searchTerm },
        products: products
      }
    }
  })
}

function trackSearchResults (searchQuery, searchResults) {
  if (window.DO_NOT_TRACK_ENABLED) {
    return
  }

  var searchTerm = stripPossiblePII(searchQuery)

  var hasResults = (searchResults.length > 0)
  // Impressions is Google Analytics lingo for what people have seen.
  var impressions = searchResults.map(function (result, key) {
    return {
      name: result.title,
      category: result.section,
      list: searchTerm, // Used to match an searchTerm with results
      position: (key + 1)
    }
  })

  addToDataLayer({
    event: 'site-search',
    eventDetails: {
      category: 'site search',
      action: hasResults ? 'results' : 'no result',
      label: searchTerm
    },
    ecommerce: {
      impressions: impressions
    }
  })
}

export { trackConfirm, trackSearchResults }
