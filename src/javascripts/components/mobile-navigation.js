import $ from 'jquery'

var MobileNav = {
  $mobileNav: $('.js-app-mobile-nav'),
  $mobileNavToggler: $('.js-app-mobile-nav-toggler'),
  mobileNavActiveClass: 'app-mobile-nav--active',
  mobileNavTogglerActiveClass: 'app-header-mobile-nav-toggler--active',
  $subNav: $('.js-app-mobile-nav-subnav'),
  $subNavToggler: $('.js-mobile-nav-subnav-toggler'),
  subNavActiveClass: 'app-mobile-nav__subnav--active',
  subNavTogglerActiveClass: 'app-mobile-nav__subnav-toggler--active',

  bindUIEvents: function () {
    MobileNav.$mobileNavToggler.on('click', function (e) {
      if (MobileNav.$mobileNav.hasClass(MobileNav.mobileNavActiveClass)) {
        MobileNav.$mobileNav.removeClass(MobileNav.mobileNavActiveClass)
        MobileNav.$mobileNav.attr('aria-hidden', 'true')

        MobileNav.$mobileNavToggler.removeClass(MobileNav.mobileNavTogglerActiveClass)
        MobileNav.$mobileNavToggler.attr('aria-expanded', 'false')
      } else {
        MobileNav.$mobileNav.addClass(MobileNav.mobileNavActiveClass)
        MobileNav.$mobileNav.attr('aria-hidden', 'false')

        MobileNav.$mobileNavToggler.attr('aria-expanded', 'true')
        MobileNav.$mobileNavToggler.addClass(MobileNav.mobileNavTogglerActiveClass)
      }
    })

    MobileNav.$subNavToggler.on('click', function () {
      var $toggler = $(this)
      var $nextSubNav = $(this).next(MobileNav.$subNav)

      if ($nextSubNav.length > 0) {
        if ($nextSubNav.hasClass(MobileNav.subNavActiveClass)) {
          $nextSubNav.removeClass(MobileNav.subNavActiveClass)
          $toggler.removeClass(MobileNav.subNavTogglerActiveClass)

          $nextSubNav.attr('aria-hidden', 'true')
          $toggler.attr('aria-expanded', 'false')
        } else {
          $nextSubNav.addClass(MobileNav.subNavActiveClass)
          $toggler.addClass(MobileNav.subNavTogglerActiveClass)

          $nextSubNav.attr('aria-hidden', 'false')
          $toggler.attr('aria-expanded', 'true')
        }
        return false
      } else {
        return true // Go to anchor link URL
      }
    })
  },

  includeAria: function () {
    MobileNav.$mobileNav.attr('aria-hidden', 'true')
    MobileNav.$mobileNav.attr('aria-labelledby', 'app-header-mobile-nav-toggler')

    MobileNav.$mobileNavToggler.attr('aria-label', 'Toggle mobile menu')
    MobileNav.$mobileNavToggler.attr('aria-expanded', 'false')
    MobileNav.$mobileNavToggler.attr('aria-controls', 'app-mobile-nav')

    MobileNav.$subNavToggler.each(function (index) {
      var $toggler = $(this)
      var $nextSubNav = $toggler.next(MobileNav.$subNav) //

      if ($nextSubNav.length > 0) {
        var navIsOpen = $nextSubNav.hasClass(MobileNav.subNavActiveClass)
        var subNavTogglerId = 'js-mobile-nav-subnav-toggler-' + index
        var nextSubNavId = 'js-mobile-nav__subnav-' + index

        $nextSubNav.attr('id', nextSubNavId)
        $nextSubNav.attr('aria-hidden', navIsOpen ? 'false' : 'true')
        $nextSubNav.attr('aria-labelledby', subNavTogglerId)

        $toggler.attr('id', subNavTogglerId)
        $toggler.attr('aria-label', 'Toggle subnavigation for ' + $toggler.text())
        $toggler.attr('aria-expanded', navIsOpen ? 'true' : 'false')
        $toggler.attr('aria-controls', nextSubNavId)
      }
    })
  },
  init: function () {
    MobileNav.includeAria()
    MobileNav.bindUIEvents()
  }
}

export default MobileNav
