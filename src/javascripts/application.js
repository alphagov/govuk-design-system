import BackToTop from './components/back-to-top.js'
import common from 'govuk-frontend/govuk/common'
import Example from './components/example.js'
import AppTabs from './components/tabs.js'
import Copy from './components/copy.js'
import MobileNav from './components/mobile-navigation.js'
import Search from './components/search.js'
import OptionsTable from './components/options-table.js'
import Analytics from './components/analytics.js'

var nodeListForEach = common.nodeListForEach

// Initialise analytics tracking
new Analytics('GTM-KGHVVHV').init()

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
var $backToTop = document.querySelector('[data-module="app-back-to-top"]')
new BackToTop($backToTop).init()
