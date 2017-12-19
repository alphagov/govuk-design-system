$(document).ready(function () {
  // Initialise example frames
  GOVUK.example.init('.js-example__frame')

  // Initialise tabs
  GOVUK.tabs.init()

  // Add copy to clipboard to code blocks inside tab containers
  GOVUK.copy.init('.app-c-tabs__container pre')

  // Initialise mobile navigation
  GOVUK.mobileNav.init()
})
