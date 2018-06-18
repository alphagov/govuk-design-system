const $ = window.jQuery
const GOVUK = window.GOVUK

$(document).ready(function () {
  // Initialise example frames
  GOVUK.example.init('.js-example__frame')

  // Initialise tabs
  GOVUK.tabs.init('.js-example')

  // Add copy to clipboard to code blocks inside tab containers
  GOVUK.copy.init('.app-tabs__container pre')

  // Initialise mobile navigation
  GOVUK.mobileNav.init()
})
