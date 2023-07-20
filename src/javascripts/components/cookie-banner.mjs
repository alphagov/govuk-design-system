import * as CookieFunctions from './cookie-functions.mjs'

const cookieBannerAcceptSelector = '.js-cookie-banner-accept'
const cookieBannerRejectSelector = '.js-cookie-banner-reject'
const cookieBannerHideButtonSelector = '.js-cookie-banner-hide'
const cookieMessageSelector = '.js-cookie-banner-message'
const cookieConfirmationAcceptSelector = '.js-cookie-banner-confirmation-accept'
const cookieConfirmationRejectSelector = '.js-cookie-banner-confirmation-reject'

class CookieBanner {
  constructor($module) {
    this.$module = $module
  }

  init() {
    this.$cookieBanner = this.$module
    this.$acceptButton = this.$module.querySelector(cookieBannerAcceptSelector)
    this.$rejectButton = this.$module.querySelector(cookieBannerRejectSelector)
    this.$cookieMessage = this.$module.querySelector(cookieMessageSelector)
    this.$cookieConfirmationAccept = this.$module.querySelector(
      cookieConfirmationAcceptSelector
    )
    this.$cookieConfirmationReject = this.$module.querySelector(
      cookieConfirmationRejectSelector
    )
    this.$cookieBannerHideButtons = this.$module.querySelectorAll(
      cookieBannerHideButtonSelector
    )

    // Exit if no cookie banner module
    // or if we're on the cookies page to avoid circular journeys
    if (!this.$cookieBanner || this.onCookiesPage()) {
      return
    }

    // Show the cookie banner to users who have not consented or have an
    // outdated consent cookie
    const currentConsentCookie = CookieFunctions.getConsentCookie()

    if (
      !currentConsentCookie ||
      !CookieFunctions.isValidConsentCookie(currentConsentCookie)
    ) {
      // If the consent cookie version is not valid, we need to remove any cookies which have been
      // set previously
      CookieFunctions.resetCookies()

      this.$cookieBanner.removeAttribute('hidden')
    }

    this.$acceptButton.addEventListener('click', () => this.acceptCookies())
    this.$rejectButton.addEventListener('click', () => this.rejectCookies())

    this.$cookieBannerHideButtons.forEach(($cookieBannerHideButton) => {
      $cookieBannerHideButton.addEventListener('click', () => this.hideBanner())
    })
  }

  /**
   * Hide banner
   */
  hideBanner() {
    this.$cookieBanner.setAttribute('hidden', 'true')
  }

  /**
   * Accept cookies
   */
  acceptCookies() {
    // Do actual cookie consent bit
    CookieFunctions.setConsentCookie({ analytics: true })

    // Hide banner and show confirmation message
    this.$cookieMessage.setAttribute('hidden', 'true')
    this.revealConfirmationMessage(this.$cookieConfirmationAccept)
  }

  /**
   * Reject cookies
   */
  rejectCookies() {
    // Do actual cookie consent bit
    CookieFunctions.setConsentCookie({ analytics: false })

    // Hide banner and show confirmation message
    this.$cookieMessage.setAttribute('hidden', 'true')
    this.revealConfirmationMessage(this.$cookieConfirmationReject)
  }

  /**
   * Reveal confirmation message
   *
   * @param {HTMLElement} confirmationMessage - Confirmation message
   */
  revealConfirmationMessage(confirmationMessage) {
    confirmationMessage.removeAttribute('hidden')

    // Set tabindex to -1 to make the confirmation banner focusable with JavaScript
    if (!confirmationMessage.getAttribute('tabindex')) {
      confirmationMessage.setAttribute('tabindex', '-1')

      confirmationMessage.addEventListener('blur', () => {
        confirmationMessage.removeAttribute('tabindex')
      })
    }

    confirmationMessage.focus()
  }

  /**
   * Check if on the Cookies page
   *
   * @returns {boolean} Returns true if on the Cookies page
   */
  onCookiesPage() {
    return window.location.pathname === '/cookies/'
  }
}

export default CookieBanner
