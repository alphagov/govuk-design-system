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

let searchCallback = (searchResults) => {}

// Results that are rendered by the autocomplete
let searchResults = []

// Timer that allows us to only fire events after a user has finished typing
let inputDebounceTimer = null

// We want to wait a bit before firing events to indicate that
// someone is looking at a result and not that it's come up in passing.
const DEBOUNCE_TIME_TO_WAIT = () => {
  // We want to be able to reduce this timeout in order to make sure
  // our tests do not run very slowly.
  // @ts-expect-error Property does not exist on window
  const timeout = window.__SITE_SEARCH_TRACKING_TIMEOUT
  return typeof timeout !== 'undefined' ? timeout : 2000 // milliseconds
}

/**
 * Website search
 */
class Search {
  constructor($module) {
    this.$module = $module
  }

  /**
   * Fetch search index
   *
   * @param {string} indexUrl - Search index URL
   * @param {(object) => void} callback - Fetch search index callback
   */
  fetchSearchIndex(indexUrl, callback) {
    const request = new XMLHttpRequest()
    request.open('GET', indexUrl, true)
    request.timeout = TIMEOUT * 1000
    statusMessage = 'Loading search index'

    request.onreadystatechange = () => {
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

  /**
   * Render search results
   */
  renderResults() {
    if (!searchIndex || !documentStore) {
      searchCallback(searchResults)
      return
    }

    const lunrSearchResults = searchIndex.query((q) => {
      q.term(lunr.tokenizer(searchQuery), {
        wildcard: lunr.Query.wildcard.TRAILING
      })
    })

    searchResults = lunrSearchResults.map((result) => {
      return documentStore[result.ref]
    })
    searchCallback(searchResults)
  }

  /**
   * Handle search query
   *
   * @param {string} query - Search query
   * @param {(object) => void} callback - Search query callback
   */
  handleSearchQuery(query, callback) {
    searchQuery = query
    searchCallback = callback

    clearTimeout(inputDebounceTimer)
    inputDebounceTimer = setTimeout(() => {
      trackSearchResults(searchQuery, searchResults)
    }, DEBOUNCE_TIME_TO_WAIT())

    this.renderResults()
  }

  /**
   * Handle confirmed result
   *
   * @param {object} result - Search result
   */
  handleOnConfirm(result) {
    const permalink = result.permalink

    if (!permalink) {
      return
    }

    trackConfirm(searchQuery, searchResults, result)
    window.location.href = `/${permalink}`
  }

  /**
   * Format input value
   *
   * @param {object} result - Search result
   * @returns {string | undefined} Formatted value
   */
  inputValueTemplate(result) {
    if (result) {
      return result.title
    }
  }

  /**
   * Format result value
   *
   * @param {object} result - Search result
   * @returns {string | undefined} Formatted value
   */
  resultTemplate(result) {
    /**
     * Filter only words starting with query
     *
     * @param {string[]} words - Search words
     * @param {string} query - Search query
     * @returns {string[]} - Search words starting with query
     */
    function startsWithFilter(words, query) {
      return words.filter((word) => {
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
        const matchedAliases = aliases.reduce((aliasesFiltered, alias) => {
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

  init() {
    if (!this.$module) {
      return
    }

    accessibleAutocomplete({
      element: this.$module,
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
      tNoResults: () => statusMessage
    })

    const $input = this.$module.querySelector('.app-site-search__input')

    // Ensure if the user stops using the search that we do not send tracking events
    $input.addEventListener('blur', () => {
      clearTimeout(inputDebounceTimer)
    })

    const searchIndexUrl = this.$module.getAttribute('data-search-index')
    this.fetchSearchIndex(searchIndexUrl, () => {
      this.renderResults()
    })
  }
}

export default Search
