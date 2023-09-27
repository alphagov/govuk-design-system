import ClipboardJS from 'clipboard'

function Copy($module) {
  this.$module = $module
}

Copy.prototype.init = function () {
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
Copy.prototype.copyAction = function () {
  // Copy to clipboard
  try {
    new ClipboardJS('.js-copy-button', {
      target: (trigger) => trigger.nextElementSibling
    }).on('success', (event) => {
      event.trigger.textContent = 'Code copied'
      event.clearSelection()
      setTimeout(function () {
        event.trigger.textContent = 'Copy code'
      }, 5000)
    })
  } catch (err) {
    if (err) {
      console.log(err.message)
    }
  }
}

export default Copy
