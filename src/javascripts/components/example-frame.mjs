import { Component } from 'govuk-frontend'
import iFrameResize from 'iframe-resizer/js/iframeResizer.js'

/**
 * Example component
 *
 * This allows automatic resizing of the iFrame pages contained within Example
 * template wrappers.
 *
 * @param {Element} $module - HTML element to use for example
 * @augments Component<HTMLIFrameElement>
 */
class ExampleFrame extends Component {
  static moduleName = 'app-example-frame'
  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    super($module)

    // Initialise asap for eager iframes or browsers which don't support lazy loading
    if (!('loading' in this.$root) || this.$root.loading !== 'lazy') {
      return iFrameResize({ scrolling: 'omit' }, this.$root)
    }

    this.$root.addEventListener('load', () => {
      try {
        iFrameResize({ scrolling: 'omit' }, this.$root)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })
  }
}

export default ExampleFrame
