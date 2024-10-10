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
  /**
   * Returns the root element
   *
   * @returns {any}
   */
  get $root() {
    // Unfortunately, govuk-frontend does not provide type definitions
    // so TypeScript does not know of `this._$root`
    // @ts-expect-error
    return this._$root
  }

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
