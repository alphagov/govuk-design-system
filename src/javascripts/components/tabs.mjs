/**
 * The naming of things is a little complicated in here.
 * For reference:
 *
 * - AppTabs - this JS module
 * - app-tabs, js-tabs - groups of classes used by the tabs component
 * - mobile tabs - the controls to show or hide panels on mobile; these are functionally closer to being an accordion than tabs
 * - desktop tabs - the controls to show, hide or switch panels on tablet/desktop
 * - panels - the content that is shown/hidden/switched; same across all breakpoints
 */

function AppTabs($module) {
  this.$module = $module
  this.$mobileTabs = this.$module.querySelectorAll('.js-tabs__heading a')
  this.$desktopTabs = this.$module.querySelectorAll('.js-tabs__item a')
  this.$panels = this.$module.querySelectorAll('.js-tabs__container')
}

AppTabs.prototype.init = function () {
  // Exit if no module has been defined
  if (!this.$module) {
    return
  }

  // Enhance mobile tabs into buttons
  this.enhanceMobileTabs()

  // Add bindings to desktop tabs
  this.$desktopTabs.forEach(
    function ($tab) {
      $tab.addEventListener('click', this.onClick.bind(this))
    }.bind(this)
  )

  // Reset all tabs and panels to closed state
  // We also add all our default ARIA goodness here
  this.resetTabs()

  // Show the first panel already open if the `open` attribute is present
  if (this.$module.hasAttribute('data-open')) {
    this.openPanel(this.$panels[0].id)
  }
}

/**
 *
 */
AppTabs.prototype.onClick = function (event) {
  event.preventDefault()
  var $currentTab = event.target
  var panelId = $currentTab.getAttribute('aria-controls')
  var $panel = this.getPanel(panelId)
  var isTabAlreadyOpen = $currentTab.getAttribute('aria-expanded') === 'true'

  if (!$panel) {
    throw new Error('Invalid example ID given: ' + panelId)
  }

  // If the panel that's been called is already open, close it.
  // Otherwise, close all panels and open the one requested.
  if (isTabAlreadyOpen) {
    this.closePanel(panelId)
  } else {
    this.resetTabs()
    this.openPanel(panelId)
  }
}

/**
 * Enhances mobile tab anchors to buttons elements
 *
 * On mobile, tabs act like an accordion and are semantically more similar to
 * buttons than links, so let's use the appropriate element
 */
AppTabs.prototype.enhanceMobileTabs = function () {
  // Loop through mobile tabs...
  this.$mobileTabs.forEach(
    function ($tab) {
      // ...construct a button equivalent of each anchor...
      var $button = document.createElement('button')
      $button.setAttribute('aria-controls', $tab.getAttribute('aria-controls'))
      $button.setAttribute('data-track', $tab.getAttribute('data-track'))
      $button.classList.add('app-tabs__heading-button')
      $button.innerHTML = $tab.innerHTML
      // ...bind controls...
      $button.bindClick = this.onClick.bind(this)
      $button.addEventListener('click', $button.bindClick)
      // ...and replace the anchor with the button
      $tab.parentNode.appendChild($button)
      $tab.parentNode.removeChild($tab)
    }.bind(this)
  )

  // Replace the value of $mobileTabs with the new buttons
  this.$mobileTabs = this.$module.querySelectorAll('.js-tabs__heading button')
}

/**
 * Reset tabs and panels to closed state
 */
AppTabs.prototype.resetTabs = function () {
  this.$panels.forEach(
    function ($panel) {
      // We don't want to hide the panel if there are no tabs present to show it
      if (!$panel.classList.contains('js-tabs__container--no-tabs')) {
        this.closePanel($panel.id)
      }
    }.bind(this)
  )
}

/**
 * Open a panel and set the associated controls and styles
 */
AppTabs.prototype.openPanel = function (panelId) {
  var $mobileTab = this.getMobileTab(panelId)
  var $desktopTab = this.getDesktopTab(panelId)

  // Panels can exist without associated tabs—for example if there's a single
  // panel that's open by default—so make sure they actually exist before use
  if ($mobileTab && $desktopTab) {
    $mobileTab.setAttribute('aria-expanded', 'true')
    $mobileTab.parentNode.classList.add('app-tabs__heading--current')
    $desktopTab.setAttribute('aria-expanded', 'true')
    $desktopTab.parentNode.classList.add('app-tabs__item--current')
  }

  this.getPanel(panelId).removeAttribute('hidden')
}

/**
 * Close a panel and set the associated controls and styles
 */
AppTabs.prototype.closePanel = function (panelId) {
  var $mobileTab = this.getMobileTab(panelId)
  var $desktopTab = this.getDesktopTab(panelId)
  $mobileTab.setAttribute('aria-expanded', 'false')
  $desktopTab.setAttribute('aria-expanded', 'false')
  $mobileTab.parentNode.classList.remove('app-tabs__heading--current')
  $desktopTab.parentNode.classList.remove('app-tabs__item--current')
  this.getPanel(panelId).setAttribute('hidden', 'hidden')
}

/**
 * Helper function to get a specific mobile tab by the associated panel ID
 */
AppTabs.prototype.getMobileTab = function (panelId) {
  var result = null
  this.$mobileTabs.forEach(function ($tab) {
    if ($tab.getAttribute('aria-controls') === panelId) {
      result = $tab
    }
  })
  return result
}

/**
 * Helper function to get a specific desktop tab by the associated panel ID
 */
AppTabs.prototype.getDesktopTab = function (panelId) {
  var $desktopTabContainer = this.$module.querySelector('.app-tabs')
  if ($desktopTabContainer) {
    return $desktopTabContainer.querySelector(
      '[aria-controls="' + panelId + '"]'
    )
  }
  return null
}

/**
 * Helper function to get a specific panel by ID
 */
AppTabs.prototype.getPanel = function (panelId) {
  return document.getElementById(panelId)
}

export default AppTabs
