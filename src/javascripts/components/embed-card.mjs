import { getConsentCookie } from './cookie-functions.mjs'

/**
 * Embed Card Youtube functionality
 */
class EmbedCard {
  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    if (
      !($module instanceof HTMLElement) ||
      !document.body.classList.contains('govuk-frontend-supported')
    ) {
      return this
    }

    this.$module = $module

    this.replacePlaceholder()
  }

  /**
   * Replace placeholder
   *
   * Replaces the placeholder with the iframe if cookies are set.
   */
  replacePlaceholder() {
    if (this.$module.querySelector('iframe')) {
      return
    }

    const consentCookie = getConsentCookie()

    if (consentCookie && consentCookie.campaign) {
      const placeholder = this.$module.querySelector(
        '.app-embed-card__placeholder'
      )
      const placeholderText = this.$module.querySelector(
        '.app-embed-card__placeholder-text'
      )

      const title = placeholderText ? placeholderText.textContent : ''

      const ytHref = placeholder.getAttribute('href')
      const ytId = ytHref.match(
        /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/
      )[5]

      const iframe = this.createIframe(ytId, title)

      placeholder.remove()

      const iframeContainer = this.$module.querySelector(
        '.app-embed-card__placeholder-iframe-container'
      )
      iframeContainer.appendChild(iframe)
    }
  }

  /**
   * Create the iframe
   *
   * Create the iframe for YouTube embed
   *
   * @param {string} ytId - YouTube ID
   * @param {string} title - Title for iFrame (for screen readers)
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
