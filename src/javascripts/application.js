import CookieBanner from './components/cookie-banner.js'
import Example from './components/example.js'
import Tabs from './components/tabs.js'
import Copy from './components/copy.js'
import MobileNav from './components/mobile-navigation.js'

// Add cookie message
CookieBanner.addCookieMessage()

// Initialise example frames
Example.init('.js-example__frame')

// Initialise tabs
Tabs.init('.js-example')

// Add copy to clipboard to code blocks inside tab containers
Copy.init('.app-tabs__container pre')

// Initialise mobile navigation
MobileNav.init()
