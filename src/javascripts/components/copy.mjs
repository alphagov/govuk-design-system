import ClipboardJS from 'clipboard'

class Copy {
  /**
   * @param {Element} $module - HTML element
   */
  constructor ($module) {
    if (!($module instanceof HTMLElement)) {
      return this
    }

    this.$module = $module
  }

  init () {
    if (!this.$module) {
      return
    }

    const $button = document.createElement('button')
    $button.className = 'app-copy-button js-copy-button'
    $button.setAttribute('aria-live', 'assertive')
    $button.textContent = 'Copy code'

    this.$module.insertAdjacentElement('beforebegin', $button)
    this.copyAction()
  }

  copyAction () {
    // Copy to clipboard
    try {
      new ClipboardJS('.js-copy-button', {
        target: function (trigger) {
          return trigger.nextElementSibling
        }
      }).on('success', function (e) {
        e.trigger.textContent = 'Code copied'
        e.clearSelection()
        setTimeout(() => {
          e.trigger.textContent = 'Copy code'
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
