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
var $examples = document.querySelectorAll('[data-module="app-example-frame"]')
nodeListForEach($examples, function ($example) {
  new Example($example).init()
})

// Initialise tabs
Tabs.init('.js-example')

// Add copy to clipboard to code blocks inside tab containers
Copy.init('.app-tabs__container pre')

// Initialise mobile navigation
MobileNav.init()

// Initialise search
Search.init('.app-site-search', 'app-site-search__input')
