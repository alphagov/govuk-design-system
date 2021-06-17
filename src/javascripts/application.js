import BackToTop from './components/back-to-top.js'
import common from 'govuk-frontend/govuk/common'
import Example from './components/example.js'
import AppTabs from './components/tabs.js'
import Copy from './components/copy.js'
import MobileNav from './components/mobile-navigation.js'
import Search from './components/search.js'
import OptionsTable from './components/options-table.js'

var nodeListForEach = common.nodeListForEach

// Initialise example frames
var $examples = document.querySelectorAll('[data-module="app-example-frame"]')
nodeListForEach($examples, function ($example) {
  new Example($example).init()
})

// Initialise tabs
var $tabs = document.querySelectorAll('[data-module="app-tabs"]')
nodeListForEach($tabs, function ($tabs) {
  new AppTabs($tabs).init()
})

// Do this after initialising tabs
OptionsTable.init()

// Add copy to clipboard to code blocks inside tab containers
var $codeBlocks = document.querySelectorAll('[data-module="app-copy"]')
nodeListForEach($codeBlocks, function ($codeBlock) {
  new Copy($codeBlock).init()
})

// Initialise mobile navigation
new MobileNav().init()

// Initialise search
var $searchContainer = document.querySelector('[data-module="app-search"]')
new Search($searchContainer).init()

// Initialise back to top
// var $backToTop = document.querySelector('[data-module="app-back-to-top"]')
// new BackToTop($backToTop).init()

// Select the email signup form that will be observed for mutations
var targetNode = document.getElementById('mc-embedded-subscribe-form')

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true }

// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
  for(var i = 0; i < mutationsList.length; i++) {
    var mutation = mutationsList[i]
    if (mutation.type === 'childList') {
      // We can only focus one message so take the first one
      var message = document.querySelector('#mce-success-response', '#mce-error-response')

      if (message) {
        message.setAttribute('role', 'alert')
        message.setAttribute('tabindex', '-1')
        message.focus()
      }
    }
  }
}

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
