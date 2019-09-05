import 'govuk-frontend/govuk/vendor/polyfills/Element/prototype/classList'

import common from 'govuk-frontend/govuk/common'
var nodeListForEach = common.nodeListForEach

var navActiveClass = 'app-mobile-nav--active'
var navTogglerActiveClass = 'app-header-mobile-nav-toggler--active'
var subNavActiveClass = 'app-mobile-nav__subnav--active'
var subNavTogglerActiveClass = 'app-mobile-nav__subnav-toggler--active'

function MobileNav ($module) {
  this.$module = $module || document
  this.$nav = this.$module.querySelector('.js-app-mobile-nav')
  this.$navToggler = this.$module.querySelector('.js-app-mobile-nav-toggler')
}

MobileNav.prototype.bindUIEvents = function () {
  var $nav = this.$nav
  var $navToggler = this.$navToggler

  $navToggler.addEventListener('click', function (event) {
    if ($nav.classList.contains(navActiveClass)) {
      $nav.classList.remove(navActiveClass)
      $nav.setAttribute('aria-hidden', 'true')

      $navToggler.classList.remove(navTogglerActiveClass)
      $navToggler.setAttribute('aria-expanded', 'false')
      $navToggler.setAttribute('aria-label', 'Show top-level navigation')
    } else {
      $nav.classList.add(navActiveClass)
      $nav.setAttribute('aria-hidden', 'false')

      $navToggler.setAttribute('aria-expanded', 'true')
      $navToggler.setAttribute('aria-label', 'Hide top-level navigation')
      $navToggler.classList.add(navTogglerActiveClass)
    }
  })

  $nav.addEventListener('click', function (event) {
    var $toggler = event.target
    if (!$toggler.classList.contains('js-mobile-nav-subnav-toggler')) {
      return
    }
    // The presentational touch area of the toggler is on it's parent.
    var $togglerLinkArea = $toggler.parentNode

    var $nextSubNav = $togglerLinkArea.parentNode.querySelector('.js-app-mobile-nav-subnav')

    if ($nextSubNav) {
      if ($nextSubNav.classList.contains(subNavActiveClass)) {
        $nextSubNav.classList.remove(subNavActiveClass)
        $togglerLinkArea.classList.remove(subNavTogglerActiveClass)

        $nextSubNav.setAttribute('aria-hidden', 'true')
        $toggler.setAttribute('aria-expanded', 'false')
        $toggler.setAttribute('aria-label', 'Show pages within ' + $toggler.innerText.trim())
      } else {
        $nextSubNav.classList.add(subNavActiveClass)
        $togglerLinkArea.classList.add(subNavTogglerActiveClass)

        $nextSubNav.setAttribute('aria-hidden', 'false')
        $toggler.setAttribute('aria-expanded', 'true')
        $toggler.setAttribute('aria-label', 'Hide pages within ' + $toggler.innerText.trim())
      }
      event.preventDefault()
    }
  })
}

MobileNav.prototype.includeAria = function () {
  this.$nav.setAttribute('aria-hidden', 'true')
  this.$nav.setAttribute('aria-label', 'Top-level')

  var $navToggler = this.$navToggler
  $navToggler.setAttribute('aria-label', 'Show top-level navigation')
  $navToggler.setAttribute('aria-expanded', 'false')
  $navToggler.setAttribute('aria-controls', 'app-mobile-nav')

  var $subNavTogglers = this.$module.querySelectorAll('.js-mobile-nav-subnav-toggler')

  nodeListForEach($subNavTogglers, function ($toggler, index) {
    var $nextSubNav = $toggler.parentNode.parentNode.querySelector('.js-app-mobile-nav-subnav')

    if ($nextSubNav) {
      var navIsOpen = $nextSubNav.classList.contains(subNavActiveClass)
      var subNavTogglerId = 'js-mobile-nav-subnav-toggler-' + index
      var nextSubNavId = 'js-mobile-nav__subnav-' + index

      $nextSubNav.setAttribute('id', nextSubNavId)
      $nextSubNav.setAttribute('aria-hidden', navIsOpen ? 'false' : 'true')
      $nextSubNav.setAttribute('aria-labelledby', subNavTogglerId)

      $toggler.setAttribute('id', subNavTogglerId)
      $toggler.setAttribute('aria-label', (navIsOpen ? 'Hide' : 'Show') + ' pages within ' + $toggler.innerText.trim())
      $toggler.setAttribute('aria-expanded', navIsOpen ? 'true' : 'false')
      $toggler.setAttribute('aria-controls', nextSubNavId)
    }
  })
}

MobileNav.prototype.init = function () {
  // Since the Mobile navigation is not included in IE8
  // We detect features we need to use only available in IE9+ https://caniuse.com/#feat=addeventlistener
  // http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
  var featuresNeeded = (
    'querySelector' in document &&
    'addEventListener' in window
  )

  if (!featuresNeeded) {
    return
  }

  this.includeAria()
  this.bindUIEvents()
}

export default MobileNav
