import common from 'govuk-frontend/common'
import CookieBanner from './components/cookie-banner.js'
import Example from './components/example.js'
import AppTabs from './components/tabs.js'
import Copy from './components/copy.js'
import MobileNav from './components/mobile-navigation.js'
import Search from './components/search.js'

var nodeListForEach = common.nodeListForEach

// Add cookie message
CookieBanner.addCookieMessage()

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
