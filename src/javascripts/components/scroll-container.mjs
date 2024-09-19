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
class ScrollContainer {
  static moduleName = 'app-scroll-container'

  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    if (
      !($module instanceof HTMLElement) ||
      !document.body.classList.contains('govuk-frontend-supported') ||
      !('ResizeObserver' in window)
    ) {
      return this
    }

    scrollContainerResizeObserver.observe($module)
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
