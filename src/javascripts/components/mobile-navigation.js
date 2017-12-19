;(function (global) {
  'use strict'

  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.mobileNav = {
    $mobileNav: $('.js-app-mobile-nav'),
    $mobileNavToggler: $('.js-app-mobile-nav-toggler'),
    mobileNavActiveClass: 'app-c-mobile-nav--active',
    mobileNavTogglerActiveClass: 'app-c-header-mobile-nav-toggler--active',
    $subNav: $('.js-app-mobile-nav-subnav'),
    $subNavToggler: $('.js-mobile-nav-subnav-toggler'),
    subNavActiveClass: 'app-c-mobile-nav__subnav--active',
    subNavTogglerActiveClass: 'app-c-mobile-nav__subnav-toggler--active',

    bindUIEvents: function () {
      GOVUK.mobileNav.$mobileNavToggler.on('click', function (e) {
        if (GOVUK.mobileNav.$mobileNav.hasClass(GOVUK.mobileNav.mobileNavActiveClass)) {
          GOVUK.mobileNav.$mobileNav.removeClass(GOVUK.mobileNav.mobileNavActiveClass)
          GOVUK.mobileNav.$mobileNav.attr('aria-hidden', 'true')

          GOVUK.mobileNav.$mobileNavToggler.removeClass(GOVUK.mobileNav.mobileNavTogglerActiveClass)
          GOVUK.mobileNav.$mobileNavToggler.attr('aria-expanded', 'false')
        } else {
          GOVUK.mobileNav.$mobileNav.addClass(GOVUK.mobileNav.mobileNavActiveClass)
          GOVUK.mobileNav.$mobileNav.attr('aria-hidden', 'false')

          GOVUK.mobileNav.$mobileNavToggler.attr('aria-expanded', 'true')
          GOVUK.mobileNav.$mobileNavToggler.addClass(GOVUK.mobileNav.mobileNavTogglerActiveClass)
        }
      })

      GOVUK.mobileNav.$subNavToggler.on('click', function () {
        var $toggler = $(this)
        var $nextSubNav = $(this).next(GOVUK.mobileNav.$subNav)

        if ($nextSubNav.length > 0) {
          if ($nextSubNav.hasClass(GOVUK.mobileNav.subNavActiveClass)) {
            $nextSubNav.removeClass(GOVUK.mobileNav.subNavActiveClass)
            $toggler.removeClass(GOVUK.mobileNav.subNavTogglerActiveClass)

            $nextSubNav.attr('aria-hidden', 'true')
            $toggler.attr('aria-expanded', 'false')
          } else {
            $nextSubNav.addClass(GOVUK.mobileNav.subNavActiveClass)
            $toggler.addClass(GOVUK.mobileNav.subNavTogglerActiveClass)

            $nextSubNav.attr('aria-hidden', 'false')
            $toggler.attr('aria-expanded', 'true')
          }
          return false
        } else {
          return true // Go to achor link URL
        }
      })
    },

    includeAria: function () {
      GOVUK.mobileNav.$mobileNav.attr('aria-hidden', 'true')
      GOVUK.mobileNav.$mobileNav.attr('aria-labelledby', 'app-c-header-mobile-nav-toggler')

      GOVUK.mobileNav.$mobileNavToggler.attr('aria-label', 'Toggle mobile menu')
      GOVUK.mobileNav.$mobileNavToggler.attr('aria-expanded', 'false')
      GOVUK.mobileNav.$mobileNavToggler.attr('aria-controls', 'app-c-mobile-nav')

      GOVUK.mobileNav.$subNavToggler.each(function (index) {
        var $toggler = $(this)
        var $nextSubNav = $toggler.next(GOVUK.mobileNav.$subNav) //

        if ($nextSubNav.length > 0) {
          var subNavTogglerId = 'js-mobile-nav-subnav-toggler-' + index
          var nextSubNavId = 'js-mobile-nav__subnav-' + index

          $nextSubNav.attr('id', nextSubNavId)
          $nextSubNav.attr('aria-hidden', 'true')
          $nextSubNav.attr('aria-labelledby', subNavTogglerId)

          $toggler.attr('id', subNavTogglerId)
          $toggler.attr('aria-label', 'Toggle subnavigation for ' + $toggler.text())
          $toggler.attr('aria-expanded', 'false')
          $toggler.attr('aria-controls', nextSubNavId)
        }
      })
    },
    init: function () {
      GOVUK.mobileNav.includeAria()
      GOVUK.mobileNav.bindUIEvents()
    }
  }
  global.GOVUK = GOVUK
})(window); // eslint-disable-line semi
