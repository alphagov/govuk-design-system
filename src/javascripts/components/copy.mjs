import ClipboardJS from 'clipboard'

class Copy {
  constructor ($module) {
    this.$module = $module
  }

  init () {
    const $module = this.$module

    if (!$module) {
      return
    }

    const $button = document.createElement('button')
    $button.className = 'app-copy-button js-copy-button'
    $button.setAttribute('aria-live', 'assertive')
    $button.textContent = 'Copy code'

    $module.insertAdjacentElement('beforebegin', $button)
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
