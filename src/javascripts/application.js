import common from 'govuk-frontend/common'
import CookieBanner from './components/cookie-banner.js'
import Example from './components/example.js'
import Tabs from './components/tabs.js'
import Copy from './components/copy.js'
import MobileNav from './components/mobile-navigation.js'
import Search from './components/search.js'

var nodeListForEach = common.nodeListForEach

// Add cookie message
CookieBanner.addCookieMessage()

// Initialise example frames
Example.init('.js-example__frame')

// Initialise tabs
Tabs.init('.js-example')

// Add copy to clipboard to code blocks inside tab containers
var $codeBlocks = document.querySelectorAll('[data-module="app-copy"]')
nodeListForEach($codeBlocks, function ($codeBlock) {
  new Copy($codeBlock).init()
})

// Initialise mobile navigation
MobileNav.init()

// Initialise search
Search.init('.app-site-search', 'app-site-search__input')
