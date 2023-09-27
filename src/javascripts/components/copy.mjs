import ClipboardJS from 'clipboard'

class Copy {
  constructor($module) {
    this.$module = $module
    this.$button = null
  }

  init() {
    if (!this.$module) {
      return
    }

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
    } catch (err) {
      if (err) {
        console.log(err.message)
      }
    }
  }
}

export default Copy
