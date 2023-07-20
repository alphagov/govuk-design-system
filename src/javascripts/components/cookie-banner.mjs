import * as CookieFunctions from './cookie-functions.mjs'

var cookieBannerAcceptSelector = '.js-cookie-banner-accept'
var cookieBannerRejectSelector = '.js-cookie-banner-reject'
var cookieBannerHideButtonSelector = '.js-cookie-banner-hide'
var cookieMessageSelector = '.js-cookie-banner-message'
var cookieConfirmationAcceptSelector = '.js-cookie-banner-confirmation-accept'
var cookieConfirmationRejectSelector = '.js-cookie-banner-confirmation-reject'

function CookieBanner ($module) {
  this.$module = $module
}

CookieBanner.prototype.init = function () {
  this.$cookieBanner = this.$module
  this.$acceptButton = this.$module.querySelector(cookieBannerAcceptSelector)
  this.$rejectButton = this.$module.querySelector(cookieBannerRejectSelector)
  this.$cookieMessage = this.$module.querySelector(cookieMessageSelector)
  this.$cookieConfirmationAccept = this.$module.querySelector(cookieConfirmationAcceptSelector)
  this.$cookieConfirmationReject = this.$module.querySelector(cookieConfirmationRejectSelector)
  this.$cookieBannerHideButtons = this.$module.querySelectorAll(cookieBannerHideButtonSelector)

  // Exit if no cookie banner module
  // or if we're on the cookies page to avoid circular journeys
  if (!this.$cookieBanner || this.onCookiesPage()) {
    return
  }

  // Show the cookie banner to users who have not consented or have an
  // outdated consent cookie
  var currentConsentCookie = CookieFunctions.getConsentCookie()

  if (!currentConsentCookie || !CookieFunctions.isValidConsentCookie(currentConsentCookie)) {
    // If the consent cookie version is not valid, we need to remove any cookies which have been
    // set previously
    CookieFunctions.resetCookies()

    this.$cookieBanner.removeAttribute('hidden')
  }

  this.$acceptButton.addEventListener('click', this.acceptCookies.bind(this))
  this.$rejectButton.addEventListener('click', this.rejectCookies.bind(this))

  this.$cookieBannerHideButtons.forEach(function ($cookieBannerHideButton) {
    $cookieBannerHideButton.addEventListener('click', this.hideBanner.bind(this))
  }.bind(this))
}

CookieBanner.prototype.hideBanner = function () {
  this.$cookieBanner.setAttribute('hidden', true)
}

CookieBanner.prototype.acceptCookies = function () {
  // Do actual cookie consent bit
  CookieFunctions.setConsentCookie({ analytics: true })

  // Hide banner and show confirmation message
  this.$cookieMessage.setAttribute('hidden', true)
  this.revealConfirmationMessage(this.$cookieConfirmationAccept)
}

CookieBanner.prototype.rejectCookies = function () {
  // Do actual cookie consent bit
  CookieFunctions.setConsentCookie({ analytics: false })

  // Hide banner and show confirmation message
  this.$cookieMessage.setAttribute('hidden', true)
  this.revealConfirmationMessage(this.$cookieConfirmationReject)
}

CookieBanner.prototype.revealConfirmationMessage = function (confirmationMessage) {
  confirmationMessage.removeAttribute('hidden')

  // Set tabindex to -1 to make the confirmation banner focusable with JavaScript
  if (!confirmationMessage.getAttribute('tabindex')) {
    confirmationMessage.setAttribute('tabindex', '-1')

    confirmationMessage.addEventListener('blur', function () {
      confirmationMessage.removeAttribute('tabindex')
    })
  }

  confirmationMessage.focus()
}

CookieBanner.prototype.onCookiesPage = function () {
  return window.location.pathname === '/cookies/'
}

export default CookieBanner
