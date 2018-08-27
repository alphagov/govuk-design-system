/* global XMLHttpRequest */
import accessibleAutocomplete from 'accessible-autocomplete'
import lunr from 'lunr'

// CONSTANTS
var TIMEOUT = 10 // Time to wait before giving up fetching the search index
var STATE_DONE = 4 // XHR client readyState DONE

// LunrJS Search index
var searchIndex = null
var documentStore = null

var statusMessage = null
var searchQuery = ''
var searchCallback = function () {}

var AppSearch = {
  fetchSearchIndex: function (indexUrl, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', indexUrl, true)
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
    request.send()
  },
  renderResults: function () {
    var matchedResults = []
    if (!searchIndex || !documentStore) {
      return searchCallback(matchedResults)
    }
    var searchResults = searchIndex.query(function (q) {
      q.term(lunr.tokenizer(searchQuery), {
        wildcard: lunr.Query.wildcard.TRAILING
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
    // add rest of the data here to build the item
    if (result) {
      var elem = document.createElement('span')
      var resultTitle = result.title
      elem.textContent = resultTitle
      if (result.aliases) {
        var aliases = result.aliases.split(',').map(function (item) {
          return item.trim()
        })
        var matchedAliases = []
        // only show a matching alias if there are no matches in the title
        if (resultTitle.toLowerCase().indexOf(searchQuery) === -1) {
          // it would be confusing to show the user
          // aliases that don't match the typed query
          matchedAliases = aliases.filter(function (alias) {
            return alias.indexOf(searchQuery) !== -1
          })
        }
        if (matchedAliases.length > 0) {
          var aliasesContainer = document.createElement('span')
          aliasesContainer.className = 'app-site-search__aliases'
          aliasesContainer.textContent = matchedAliases.join(', ')
          elem.appendChild(aliasesContainer)
        }
      }
      var section = document.createElement('span')
      section.className = 'app-site-search--section'
      section.textContent = result.section

      elem.appendChild(section)
      return elem.innerHTML
    }
  },
  init: function (selector, input) {
    var $container = document.querySelector(selector)
    if (!$container) {
      return
    }
    accessibleAutocomplete({
      element: $container,
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
    // Ensure the Button (which is a background image of the wrapper) focuses the input when clicked.
    var $wrapper = $container.querySelector('.app-site-search__wrapper')
    $wrapper.addEventListener('click', function (event) {
      // Only focus the input if the user clicks the wrapper and not the input.
      if (event.target === $wrapper) {
        $container.querySelector('.app-site-search__input').focus()
      }
    })

    var searchIndexUrl = $container.getAttribute('data-search-index')
    this.fetchSearchIndex(searchIndexUrl, function () {
      this.renderResults()
    }.bind(this))
  }
}
export default AppSearch
