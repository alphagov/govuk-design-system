import { Component } from 'govuk-frontend'

const scrollContainerResizeObserver = new window.ResizeObserver((entries) => {
  for (const entry of entries) {
    if (ScrollContainer.isOverflowing(entry.target)) {
      entry.target.setAttribute('tabindex', '0')
    } else {
      entry.target.removeAttribute('tabindex')
    }
  }
})

/**
 *
 */
class ScrollContainer extends Component {
  static moduleName = 'app-scroll-container'

  /**
   * Checks if ResizeObserver supported
   */
  static isSupported() {
    Component.checkSupport()

    if (!('ResizeObserver' in window)) {
      throw Error('Browser does not support ResizeObserver')
    }
  }

  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    super($module)
    scrollContainerResizeObserver.observe(this.$root)
  }

  /**
   * Checks if the elements scrollable width or height is greater than the
   * width or height the element is being rendered at.
   *
   * @param {Element} $element - The element to check
   * @returns {boolean} - Returns `true` if the given element is overflowing
   *   in either dimension, otherwise returns `false`
   * @static
   */
  static isOverflowing($element) {
    return (
      $element.scrollHeight > $element.clientHeight ||
      $element.scrollWidth > $element.clientWidth
    )
  }
}

export default ScrollContainer
