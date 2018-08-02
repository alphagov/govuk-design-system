/* global XMLHttpRequest */
import accessibleAutocomplete from 'accessible-autocomplete'
import lunr from 'lunr'

// CONSTANTS
var TIMEOUT = 10 // Time to wait before giving up fetching the search index
var STATE_DONE = 4 // XHR client readyState DONE

// LunrJS Seach index
var searchIndex = null
var documentStore = null

var statusMessage = null
var searchQuery = ''
var searchCallback = function () {}

var AppSearch = {
  fetchSearchIndex: function (callback) {
    var request = new XMLHttpRequest()
    request.open('GET', '/search-index.json', true)
    request.timeout = TIMEOUT * 1000
    statusMessage = 'Loading search index'
    request.onreadystatechange = function () {
      if (request.readyState === STATE_DONE) {
        if (request.status === 200) {
          var response = request.responseText
          var json = JSON.parse(response)
          statusMessage = 'No results found'
          searchIndex = lunr.Index.load(json.index)
          documentStore = json.store
          callback(json)
        } else {
          statusMessage = 'Failed to load the search index'
          // Log to analytics?
        }
      }
    }
    request.open('GET', '/search-index.json', true)
    request.send()
  },
  renderResults: function () {
    var matchedResults = []
    if (!searchIndex || !documentStore) {
      return searchCallback(matchedResults)
    }
    var searchResults = searchIndex.query(function (q) {
      q.term(lunr.tokenizer(searchQuery), {
        wildcard: lunr.Query.wildcard.TRAILING,
        presence: lunr.Query.presence.REQUIRED
      })
    })
    matchedResults = searchResults.map(function (result) {
      return documentStore[result.ref]
    })
    searchCallback(matchedResults)
  },
  handleSearchQuery: function (query, callback) {
    searchQuery = query
    searchCallback = callback
    this.renderResults()
  },
  handleOnConfirm: function (result) {
    var path = result.path
    if (path) {
      window.location.pathname = path
    }
  },
  inputValueTemplate: function (result) {
    if (result) {
      return result.title
    }
  },
  resultTemplate: function (result) {
    if (result) {
      // add rest of the data here to build the item
      var itemTemplate = result.title
      return itemTemplate
    }
  },
  init: function (container, input) {
    if (!document.querySelector(container)) {
      return
    }
    accessibleAutocomplete({
      element: document.querySelector(container),
      id: input,
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
      tNoResults: function () { return statusMessage }
    })
    this.fetchSearchIndex(function () {
      this.renderResults()
    }.bind(this))
  }
}
export default AppSearch
