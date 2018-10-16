import common from 'govuk-frontend/common'
import CookieBanner from './components/cookie-banner.js'
import Example from './components/example.js'

var nodeListForEach = common.nodeListForEach

// // Add cookie message
CookieBanner.addCookieMessage()

// Initialise example frames
var $examples = document.querySelectorAll('[data-module="app-example-frame"]')
nodeListForEach($examples, function ($example) {
  new Example($example).init()
})
