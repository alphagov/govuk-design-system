import ClipboardJS from 'clipboard'

/**
 * Copy button for code examples
 */
class Copy {
  static moduleName = 'app-copy'

  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    if (
      !($module instanceof HTMLElement) ||
      !document.body.classList.contains('govuk-frontend-supported') ||
      !ClipboardJS.isSupported()
    ) {
      return this
    }

    this.$module = $module

    this.$pre = this.$module.querySelector('pre')
    // TODO: Throw once GOV.UK Frontend exports its errors

    /** @type {number | null} */
    this.resetTimeoutId = null

    this.$button = document.createElement('button')
    this.$button.className = 'app-copy-button'
    this.$button.textContent = 'Copy code'

    this.$status = document.createElement('span')
    this.$status.className = 'govuk-visually-hidden'
    this.$status.setAttribute('aria-live', 'assertive')

    this.$module.prepend(this.$status)
    this.$module.prepend(this.$button)

    const $clipboard = new ClipboardJS(this.$button, {
      target: () => this.$pre
    })

    $clipboard.on('success', (event) => this.successAction(event))
    $clipboard.on('error', (event) => this.resetAction(event))
  }

  /**
   * Copy to clipboard success
   *
   * @param {import('clipboard').Event} event - Clipboard event
   */
  successAction(event) {
    this.$button.textContent = this.$status.textContent = 'Code copied'
    // Reset button after 5 seconds
    this.resetAction(event, 5000)
  }

  /**
   * Copy to clipboard reset
   *
   * @param {import('clipboard').Event} event - Clipboard event
   * @param {number} [timeout] - Button text reset timeout
   */
  resetAction(event, timeout = 0) {
    event.clearSelection()

    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId)
    }

    // Reset button after timeout
    this.resetTimeoutId = window.setTimeout(() => {
      this.$button.textContent = 'Copy code'
      this.$status.textContent = ''
    }, timeout)
  }
}

export default Copy
