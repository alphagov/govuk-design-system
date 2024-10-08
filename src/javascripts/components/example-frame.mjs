import iFrameResize from 'iframe-resizer/js/iframeResizer.js'

/**
 * Example component
 *
 * This allows automatic resizing of the iFrame pages contained within Example
 * template wrappers.
 *
 * @param {Element} $module - HTML element to use for example
 */
class ExampleFrame {
  static moduleName = 'app-example-frame'
  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    if (
      !($module instanceof HTMLIFrameElement) ||
      !document.body.classList.contains('govuk-frontend-supported')
    ) {
      return
    }

    this.$module = $module

    // Initialise asap for eager iframes or browsers which don't support lazy loading
    if (!('loading' in this.$module) || this.$module.loading !== 'lazy') {
      return iFrameResize({ scrolling: 'omit' }, this.$module)
    }

    this.$module.addEventListener('load', () => {
      try {
        iFrameResize({ scrolling: 'omit' }, this.$module)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })
  }
}

export default ExampleFrame
