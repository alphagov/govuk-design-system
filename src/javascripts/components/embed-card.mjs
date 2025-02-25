import { Component } from 'govuk-frontend'

import { getConsentCookie } from './cookie-functions.mjs'

/**
 * Embed Card Youtube functionality
 */
class EmbedCard extends Component {
  /**
   * Check EmbedCard support
   */
  static checkSupport() {
    Component.checkSupport()

    const consentCookie = getConsentCookie()

    if (!consentCookie || (consentCookie && !consentCookie.campaign)) {
      throw Error('Campaign consent cookies not accepted')
    }
  }

  static moduleName = 'app-embed-card'

  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    super($module)

    this.replacePlaceholder()
  }

  /**
   * Replace placeholder
   *
   * Replaces the placeholder with the iframe if cookies are set.
   */
  replacePlaceholder() {
    if (this.$root.querySelector('iframe')) {
      return
    }

    const consentCookie = getConsentCookie()

    if (consentCookie && consentCookie.campaign) {
      const placeholder = this.$root.querySelector(
        '.app-embed-card__placeholder'
      )
      const placeholderText = this.$root.querySelector(
        '.app-embed-card__placeholder-text'
      )

      const title = placeholderText ? placeholderText.textContent : ''

      const ytId = this.$root.dataset.ytId

      const divIframeContainer = document.createElement('div')
      divIframeContainer.className = 'app-embed-card__iframe-container'

      const iframe = this.createIframe(ytId, title)

      divIframeContainer.appendChild(iframe)

      placeholder.parentNode.replaceChild(divIframeContainer, placeholder)
    }
  }

  /**
   * Create the iframe
   *
   * Create the iframe for YouTube embed
   *
   * @param {string} ytId - YouTube ID
   * @param {string} title - Title for iFrame (for screen readers)
   * @returns {HTMLElement} - iframe element
   */
  createIframe(ytId, title) {
    const iframe = document.createElement('IFRAME')

    iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${ytId}`)
    iframe.setAttribute('width', '560')
    iframe.setAttribute('height', '315')
    iframe.setAttribute('title', title)
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;'
    )
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
    iframe.setAttribute('allowfullscreen', 'true')
    iframe.setAttribute('frameborder', '0')

    return iframe
  }
}

export default EmbedCard
