import { Component } from 'govuk-frontend'

import * as CookieFunctions from './cookie-functions.mjs'

const cookieBannerAcceptSelector = '.js-cookie-banner-accept'
const cookieBannerRejectSelector = '.js-cookie-banner-reject'
const cookieBannerHideButtonSelector = '.js-cookie-banner-hide'
const cookieMessageSelector = '.js-cookie-banner-message'
const cookieConfirmationAcceptSelector = '.js-cookie-banner-confirmation-accept'
const cookieConfirmationRejectSelector = '.js-cookie-banner-confirmation-reject'

/**
 * Website cookie banner
 */
class CookieBanner extends Component {
  /**
   * Returns the root element of the component
   *
   * @returns {any} - the root element of component
   */
  get $root() {
    // Unfortunately, govuk-frontend does not provide type definitions
    // so TypeScript does not know of `this._$root`
    // @ts-expect-error
    return this._$root
  }

  static moduleName = 'govuk-cookie-banner'
  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    super($module)

    if (
      // Exit if we're on the cookies page to avoid circular journeys
      this.onCookiesPage()
    ) {
      return this
    }

    this.$cookieBanner = this.$root
    this.cookieCategory =
      (this.$cookieBanner.dataset &&
        this.$cookieBanner.dataset.cookieCategory) ||
      'analytics'

    const $acceptButton = $module.querySelector(cookieBannerAcceptSelector)
    const $rejectButton = $module.querySelector(cookieBannerRejectSelector)
    const $cookieMessage = $module.querySelector(cookieMessageSelector)
    const $cookieConfirmationAccept = $module.querySelector(
      cookieConfirmationAcceptSelector
    )
    const $cookieConfirmationReject = $module.querySelector(
      cookieConfirmationRejectSelector
    )
    const $cookieBannerHideButtons = $module.querySelectorAll(
      cookieBannerHideButtonSelector
    )

    if (
      !($acceptButton instanceof HTMLButtonElement) ||
      !($rejectButton instanceof HTMLButtonElement) ||
      !($cookieMessage instanceof HTMLElement) ||
      !($cookieConfirmationAccept instanceof HTMLElement) ||
      !($cookieConfirmationReject instanceof HTMLElement) ||
      !$cookieBannerHideButtons.length
    ) {
      return this
    }

    this.$acceptButton = $acceptButton
    this.$rejectButton = $rejectButton
    this.$cookieMessage = $cookieMessage
    this.$cookieConfirmationAccept = $cookieConfirmationAccept
    this.$cookieConfirmationReject = $cookieConfirmationReject
    this.$cookieBannerHideButtons = $cookieBannerHideButtons

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
    CookieFunctions.setConsentCookie({ [this.cookieCategory]: true })

    // Hide banner and show confirmation message
    this.$cookieMessage.setAttribute('hidden', 'true')
    this.revealConfirmationMessage(this.$cookieConfirmationAccept)
  }

  /**
   * Reject cookies
   */
  rejectCookies() {
    // Do actual cookie consent bit
    CookieFunctions.setConsentCookie({ [this.cookieCategory]: false })

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
