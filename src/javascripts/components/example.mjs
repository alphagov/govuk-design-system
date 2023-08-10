import iFrameResize from 'iframe-resizer/js/iframeResizer.js'

/**
 * Example component
 *
 * This allows automatic resizing of the iFrame pages contained within Example
 * template wrappers.
 *
 * @param {Element} $module - HTML element to use for example
 */
class Example {
  /**
   * @param {Element} $module - HTML element
   */
  constructor ($module) {
    if (!($module instanceof HTMLElement) || !document.body.classList.contains('govuk-frontend-supported')) {
      return
    }

    this.$module = $module
    this.$placeholder = this.$module.querySelector('.js-example-placeholder')

    this.init()
  }

  init () {
    if (this.$iframe || !this.$placeholder) {
      return
    }

    // Create iframe
    this.$iframe = document.createElement('iframe')

    // Configure iframe
    this.$iframe.className = 'app-example__frame app-example__frame--resizable'
    this.$iframe.title = this.$placeholder.getAttribute('data-title')
    this.$iframe.src = this.$placeholder.getAttribute('data-src')
    this.$iframe.loading = this.$placeholder.getAttribute('data-lazy')

    // Optional preview size
    const previewSize = this.$placeholder.getAttribute('data-size')
    if (previewSize) {
      this.$iframe.className += ` app-example__frame--${previewSize}`
    }

    // Replace placeholder with preview iframe
    this.$placeholder.replaceWith(this.$iframe)

    // Resize once loaded
    this.$iframe.addEventListener('load', () => {
      try {
        iFrameResize({ scrolling: 'omit' }, this.$iframe)
      } catch (err) {
        if (err) {
          console.error(err.message)
        }
      }
    })
  }
}

export default Example
