import 'govuk-frontend/vendor/polyfills/Element/prototype/classList'

import common from 'govuk-frontend/common'
var nodeListForEach = common.nodeListForEach

var mobileNavActiveClass = 'app-mobile-nav--active'
var mobileNavTogglerActiveClass = 'app-header-mobile-nav-toggler--active'
var subNavActiveClass = 'app-mobile-nav__subnav--active'
var subNavTogglerActiveClass = 'app-mobile-nav__subnav-toggler--active'

function MobileNav ($module) {
  this.$module = $module || document
  this.$mobileNav = this.$module.querySelector('.js-app-mobile-nav')
  this.$mobileNavToggler = this.$module.querySelector('.js-app-mobile-nav-toggler')
}

MobileNav.prototype.bindUIEvents = function () {
  var $mobileNav = this.$mobileNav
  var $mobileNavToggler = this.$mobileNavToggler

  $mobileNavToggler.addEventListener('click', function (e) {
    if ($mobileNav.classList.contains(mobileNavActiveClass)) {
      $mobileNav.classList.remove(mobileNavActiveClass)
      $mobileNav.setAttribute('aria-hidden', 'true')

      $mobileNavToggler.classList.remove(mobileNavTogglerActiveClass)
      $mobileNavToggler.setAttribute('aria-expanded', 'false')
    } else {
      $mobileNav.classList.add(mobileNavActiveClass)
      $mobileNav.setAttribute('aria-hidden', 'false')

      $mobileNavToggler.setAttribute('aria-expanded', 'true')
      $mobileNavToggler.classList.add(mobileNavTogglerActiveClass)
    }
  })

  $mobileNav.addEventListener('click', function (event) {
    var $toggler = event.target
    if (!$toggler.classList.contains('js-mobile-nav-subnav-toggler')) {
      return
    }
    var $nextSubNav = $toggler.parentNode.querySelector('.js-app-mobile-nav-subnav')

    if ($nextSubNav) {
      if ($nextSubNav.classList.contains(subNavActiveClass)) {
        $nextSubNav.classList.remove(subNavActiveClass)
        $toggler.classList.remove(subNavTogglerActiveClass)

        $nextSubNav.setAttribute('aria-hidden', 'true')
        $toggler.setAttribute('aria-expanded', 'false')
      } else {
        $nextSubNav.classList.add(subNavActiveClass)
        $toggler.classList.add(subNavTogglerActiveClass)

        $nextSubNav.setAttribute('aria-hidden', 'false')
        $toggler.setAttribute('aria-expanded', 'true')
      }
      event.preventDefault()
    }
  })
}

MobileNav.prototype.includeAria = function () {
  this.$mobileNav.setAttribute('aria-hidden', 'true')
  this.$mobileNav.setAttribute('aria-labelledby', 'app-header-mobile-nav-toggler')

  var $mobileNavToggler = this.$mobileNavToggler
  $mobileNavToggler.setAttribute('aria-label', 'Toggle mobile menu')
  $mobileNavToggler.setAttribute('aria-expanded', 'false')
  $mobileNavToggler.setAttribute('aria-controls', 'app-mobile-nav')

  var $subNavTogglers = this.$module.querySelectorAll('.js-mobile-nav-subnav-toggler')

  nodeListForEach($subNavTogglers, function ($toggler, index) {
    var $nextSubNav = $toggler.parentNode.querySelector('.js-app-mobile-nav-subnav')

    if ($nextSubNav) {
      var navIsOpen = $nextSubNav.classList.contains(subNavActiveClass)
      var subNavTogglerId = 'js-mobile-nav-subnav-toggler-' + index
      var nextSubNavId = 'js-mobile-nav__subnav-' + index

      $nextSubNav.setAttribute('id', nextSubNavId)
      $nextSubNav.setAttribute('aria-hidden', navIsOpen ? 'false' : 'true')
      $nextSubNav.setAttribute('aria-labelledby', subNavTogglerId)

      $toggler.setAttribute('id', subNavTogglerId)
      $toggler.setAttribute('aria-label', 'Toggle subnavigation for ' + $toggler.innerText)
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
