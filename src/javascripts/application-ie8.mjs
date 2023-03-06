import { nodeListForEach } from './components/helpers.mjs'
import Example from './components/example.mjs'
import AppTabs from './components/tabs.mjs'
import OptionsTable from './components/options-table.mjs'

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

// Open options table when detected in URL hash
// Do this after initialising tabs
OptionsTable.init()
