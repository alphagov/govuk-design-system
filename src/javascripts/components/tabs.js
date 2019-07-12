import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'
import 'govuk-frontend/govuk/vendor/polyfills/Element/prototype/classList'
import 'govuk-frontend/govuk/vendor/polyfills/Event'
import common from 'govuk-frontend/govuk/common'

var nodeListForEach = common.nodeListForEach

var tabsItemClass = 'app-tabs__item'
var tabsItemCurrentClass = tabsItemClass + '--current'
var tabsItemJsClass = 'js-tabs__item'
var headingItemClass = 'app-tabs__heading'
var headingItemCurrentClass = headingItemClass + '--current'
var headingItemJsClass = 'js-tabs__heading'
var tabContainerHiddenClass = 'app-tabs__container--hidden'
var tabContainerJsClass = '.js-tabs__container'
var tabContainerNoTabsJsClass = 'js-tabs__container--no-tabs'
var allTabTogglers = '.' + tabsItemJsClass + ' a, ' + '.' + headingItemJsClass + ' a'
var tabTogglersMarkedOpenClass = '.js-tabs__item--open a'

function AppTabs ($module) {
  this.$module = $module
  this.$allTabContainers = this.$module.querySelectorAll(tabContainerJsClass)
  this.$allTabTogglers = this.$module.querySelectorAll(allTabTogglers)
  this.$allTabTogglersMarkedOpen = this.$module.querySelectorAll(tabTogglersMarkedOpenClass)
}

AppTabs.prototype.init = function () {
  if (!this.$module) {
    return
  }
  // reset all tabs
  this.resetTabs()
  // add close to each tab
  this.$module.addEventListener('click', this.handleClick.bind(this))

  nodeListForEach(this.$allTabTogglersMarkedOpen, function ($tabToggler) {
    $tabToggler.click()
  })
}

// expand and collapse functionality
AppTabs.prototype.activateAndToggle = function (event) {
  event.preventDefault()
  var $currentToggler = event.target
  var $currentTogglerSiblings = this.$module.querySelectorAll('[href="' + $currentToggler.hash + '"]')
  var $tabContainer

  try {
    $tabContainer = this.$module.querySelector($currentToggler.hash)
  } catch (exception) {
    throw new Error('Invalid example ID given: ' + exception)
  }
  var isTabAlreadyOpen = $currentToggler.getAttribute('aria-expanded') === 'true'

  if (!$tabContainer) {
    return
  }

  if (isTabAlreadyOpen) {
    $tabContainer.classList.add(tabContainerHiddenClass)
    $tabContainer.setAttribute('aria-hidden', 'true')
    nodeListForEach($currentTogglerSiblings, function ($tabToggler) {
      $tabToggler.setAttribute('aria-expanded', 'false')
      // desktop and mobile
      $tabToggler.parentNode.classList.remove(tabsItemCurrentClass, headingItemCurrentClass)
    })
  } else {
    // Reset tabs
    this.resetTabs()
    // make current active
    $tabContainer.classList.remove(tabContainerHiddenClass)
    $tabContainer.setAttribute('aria-hidden', 'false')

    nodeListForEach($currentTogglerSiblings, function ($tabToggler) {
      $tabToggler.setAttribute('aria-expanded', 'true')
      if ($tabToggler.parentNode.classList.contains(tabsItemClass)) {
        $tabToggler.parentNode.classList.add(tabsItemCurrentClass)
      } else if ($tabToggler.parentNode.classList.contains(headingItemClass)) {
        $tabToggler.parentNode.classList.add(headingItemCurrentClass)
      }
    })
  }
}
// reset aria attributes to default and close the tab content container
AppTabs.prototype.resetTabs = function () {
  nodeListForEach(this.$allTabContainers, function ($tabContainer) {
    // unless the tab content has not tabs and it's been set as open
    if (!$tabContainer.classList.contains(tabContainerNoTabsJsClass)) {
      $tabContainer.classList.add(tabContainerHiddenClass)
      $tabContainer.setAttribute('aria-hidden', 'true')
    }
  })

  nodeListForEach(this.$allTabTogglers, function ($tabToggler) {
    $tabToggler.setAttribute('aria-expanded', 'false')
    // desktop and mobile
    $tabToggler.parentNode.classList.remove(tabsItemCurrentClass, headingItemCurrentClass)
  })
}

AppTabs.prototype.handleClick = function (event) {
  // toggle and active selected tab and heading (on mobile)
  if (event.target.parentNode.classList.contains(tabsItemJsClass) ||
    event.target.parentNode.classList.contains(headingItemJsClass)) {
    this.activateAndToggle(event)
  }
}

export default AppTabs
