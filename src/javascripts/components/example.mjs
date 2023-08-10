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

    const $placeholder = $module.querySelector('.js-example-placeholder')
    const $iframe = document.createElement('iframe')

    // Configure iframe
    $iframe.className = 'app-example__frame app-example__frame--resizable'
    $iframe.title = $placeholder.getAttribute('data-title')
    $iframe.src = $placeholder.getAttribute('data-src')
    $iframe.loading = $placeholder.getAttribute('data-lazy')

    // Optional preview size
    const previewSize = $placeholder.getAttribute('data-size')
    if (previewSize) {
      $iframe.className += ` app-example__frame--${previewSize}`
    }

    // Replace placeholder with preview iframe
    $placeholder.replaceWith($iframe)

    // Resize once loaded
    $iframe.addEventListener('load', () => {
      try {
        iFrameResize({ scrolling: 'omit' }, $iframe)
      } catch (err) {
        if (err) {
          console.error(err.message)
        }
      }
    })
  }
}

export default Example
