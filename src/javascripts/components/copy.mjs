import ClipboardJS from 'clipboard'

/**
 * Copy button for code examples
 */
class Copy {
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

    this.$button = document.createElement('button')
    this.$button.className = 'app-copy-button'
    this.$button.setAttribute('aria-live', 'assertive')
    this.$button.textContent = 'Copy code'

    this.$module.insertAdjacentElement('beforebegin', this.$button)
    this.copyAction()
  }

  /**
   * Set up button copy action
   */
  copyAction() {
    // Copy to clipboard
    try {
      new ClipboardJS(this.$button, {
        target: (trigger) => trigger.nextElementSibling
      }).on('success', (event) => {
        this.$button.textContent = 'Code copied'
        event.clearSelection()
        setTimeout(() => {
          this.$button.textContent = 'Copy code'
        }, 5000)
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }
}

export default Copy
