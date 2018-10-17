import $ from 'jquery'

var mobileNavActiveClass = 'app-mobile-nav--active'
var mobileNavTogglerActiveClass = 'app-header-mobile-nav-toggler--active'
var subNavActiveClass = 'app-mobile-nav__subnav--active'
var subNavTogglerActiveClass = 'app-mobile-nav__subnav-toggler--active'

function MobileNav ($module) {
  this.$module = $module
  this.$mobileNav = $('.js-app-mobile-nav')
  this.$mobileNavToggler = $('.js-app-mobile-nav-toggler')
  this.$subNav = $('.js-app-mobile-nav-subnav')
  this.$subNavToggler = $('.js-mobile-nav-subnav-toggler')
}

MobileNav.prototype.bindUIEvents = function () {
  var self = this
  self.$mobileNavToggler.on('click', function (e) {
    if (self.$mobileNav.hasClass(mobileNavActiveClass)) {
      self.$mobileNav.removeClass(mobileNavActiveClass)
      self.$mobileNav.attr('aria-hidden', 'true')

      self.$mobileNavToggler.removeClass(mobileNavTogglerActiveClass)
      self.$mobileNavToggler.attr('aria-expanded', 'false')
    } else {
      self.$mobileNav.addClass(mobileNavActiveClass)
      self.$mobileNav.attr('aria-hidden', 'false')

      self.$mobileNavToggler.attr('aria-expanded', 'true')
      self.$mobileNavToggler.addClass(mobileNavTogglerActiveClass)
    }
  })

  self.$subNavToggler.on('click', function () {
    var $toggler = $(this)
    var $nextSubNav = $(this).next(self.$subNav)

    if ($nextSubNav.length > 0) {
      if ($nextSubNav.hasClass(subNavActiveClass)) {
        $nextSubNav.removeClass(subNavActiveClass)
        $toggler.removeClass(subNavTogglerActiveClass)

        $nextSubNav.attr('aria-hidden', 'true')
        $toggler.attr('aria-expanded', 'false')
      } else {
        $nextSubNav.addClass(subNavActiveClass)
        $toggler.addClass(subNavTogglerActiveClass)

        $nextSubNav.attr('aria-hidden', 'false')
        $toggler.attr('aria-expanded', 'true')
      }
      return false
    } else {
      return true // Go to anchor link URL
    }
  })
}

MobileNav.prototype.includeAria = function () {
  var self = this
  self.$mobileNav.attr('aria-hidden', 'true')
  self.$mobileNav.attr('aria-labelledby', 'app-header-mobile-nav-toggler')

  self.$mobileNavToggler.attr('aria-label', 'Toggle mobile menu')
  self.$mobileNavToggler.attr('aria-expanded', 'false')
  self.$mobileNavToggler.attr('aria-controls', 'app-mobile-nav')

  self.$subNavToggler.each(function (index) {
    var $toggler = $(this)
    var $nextSubNav = $toggler.next(self.$subNav)

    if ($nextSubNav.length > 0) {
      var navIsOpen = $nextSubNav.hasClass(subNavActiveClass)
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
}
MobileNav.prototype.init = function () {
  this.includeAria()
  this.bindUIEvents()
}

export default MobileNav
