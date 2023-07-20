/* global XMLHttpRequest */
import accessibleAutocomplete from 'accessible-autocomplete'
import lunr from 'lunr'

import { trackSearchResults, trackConfirm } from './search.tracking.mjs'

// CONSTANTS
const TIMEOUT = 10 // Time to wait before giving up fetching the search index
const STATE_DONE = 4 // XHR client readyState DONE

// LunrJS Search index
let searchIndex = null
let documentStore = null

let statusMessage = null
let searchQuery = ''
let searchCallback = function () {}
// Results that are rendered by the autocomplete
let searchResults = []

// Timer that allows us to only fire events after a user has finished typing
let inputDebounceTimer = null

// We want to wait a bit before firing events to indicate that
// someone is looking at a result and not that it's come up in passing.
const DEBOUNCE_TIME_TO_WAIT = function () {
  // We want to be able to reduce this timeout in order to make sure
  // our tests do not run very slowly.
  const timeout = window.__SITE_SEARCH_TRACKING_TIMEOUT
  return typeof timeout !== 'undefined' ? timeout : 2000 // milliseconds
}

function Search($module) {
  this.$module = $module
}

Search.prototype.fetchSearchIndex = function (indexUrl, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', indexUrl, true)
  request.timeout = TIMEOUT * 1000
  statusMessage = 'Loading search index'
  request.onreadystatechange = function () {
    if (request.readyState === STATE_DONE) {
      if (request.status === 200) {
        const response = request.responseText
        const json = JSON.parse(response)
        statusMessage = 'No results found'
        searchIndex = lunr.Index.load(json.index)
        documentStore = json.store
        callback(json)
      } else {
        statusMessage = 'Failed to load the search index'
      }
    }
  }
  request.send()
}

Search.prototype.renderResults = function () {
  if (!searchIndex || !documentStore) {
    return searchCallback(searchResults)
  }
  const lunrSearchResults = searchIndex.query(function (q) {
    q.term(lunr.tokenizer(searchQuery), {
      wildcard: lunr.Query.wildcard.TRAILING
    })
  })
  searchResults = lunrSearchResults.map(function (result) {
    return documentStore[result.ref]
  })
  searchCallback(searchResults)
}

Search.prototype.handleSearchQuery = function (query, callback) {
  searchQuery = query
  searchCallback = callback

  clearTimeout(inputDebounceTimer)
  inputDebounceTimer = setTimeout(function () {
    trackSearchResults(searchQuery, searchResults)
  }, DEBOUNCE_TIME_TO_WAIT())

  this.renderResults()
}

Search.prototype.handleOnConfirm = function (result) {
  const permalink = result.permalink
  if (!permalink) {
    return
  }
  trackConfirm(searchQuery, searchResults, result)
  window.location.href = '/' + permalink
}

Search.prototype.inputValueTemplate = function (result) {
  if (result) {
    return result.title
  }
}

Search.prototype.resultTemplate = function (result) {
  function startsWithFilter(words, query) {
    return words.filter(function (word) {
      return word.trim().toLowerCase().indexOf(query.toLowerCase()) === 0
    })
  }

  // Add rest of the data here to build the item
  if (result) {
    const elem = document.createElement('span')
    elem.textContent = result.title

    // Title split into words
    const words = result.title.match(/\w+/g) || []

    // Title words that start with the query
    const matchedWords = startsWithFilter(words, searchQuery)

    // Only show a matching alias if there are no matches in the title
    if (!matchedWords.length && result.aliases) {
      const aliases = result.aliases.split(', ')

      // Aliases containing words that start with the query
      const matchedAliases = aliases.reduce(function (aliasesFiltered, alias) {
        const aliasWordsMatched = startsWithFilter(
          alias.match(/\w+/g) || [],
          searchQuery
        )

        return aliasWordsMatched.length
          ? aliasesFiltered.concat([alias])
          : aliasesFiltered
      }, [])

      if (matchedAliases.length) {
        const aliasesContainer = document.createElement('span')
        aliasesContainer.className = 'app-site-search__aliases'
        aliasesContainer.textContent = matchedAliases.join(', ')
        elem.appendChild(aliasesContainer)
      }
    }

    const section = document.createElement('span')
    section.className = 'app-site-search--section'
    section.innerHTML = result.section

    elem.appendChild(section)
    return elem.innerHTML
  }
}

Search.prototype.init = function () {
  const $module = this.$module
  if (!$module) {
    return
  }

  accessibleAutocomplete({
    element: $module,
    id: 'app-site-search__input',
    cssNamespace: 'app-site-search',
    displayMenu: 'overlay',
    placeholder: 'Search Design System',
    confirmOnBlur: false,
    autoselect: true,
    source: this.handleSearchQuery.bind(this),
    onConfirm: this.handleOnConfirm,
    templates: {
      inputValue: this.inputValueTemplate,
      suggestion: this.resultTemplate
    },
    tNoResults: function () {
      return statusMessage
    }
  })

  const $input = $module.querySelector('.app-site-search__input')

  // Ensure if the user stops using the search that we do not send tracking events
  $input.addEventListener('blur', function (event) {
    clearTimeout(inputDebounceTimer)
  })

  const searchIndexUrl = $module.getAttribute('data-search-index')
  this.fetchSearchIndex(
    searchIndexUrl,
    function () {
      this.renderResults()
    }.bind(this)
  )
}

export default Search
