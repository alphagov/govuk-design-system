import 'govuk-frontend/vendor/polyfills/Event'
import ClipboardJS from 'clipboard'

function Copy ($module) {
  this.$module = $module
}

Copy.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }
  var $button = document.createElement('button')
  $button.className = 'app-copy-button js-copy-button'
  $button.setAttribute('aria-live', 'assertive')
  $button.textContent = 'Copy'

  var $parent = $module.parentNode
  $parent.insertBefore($button, $parent.firstChild)
  this.copyAction()
}
Copy.prototype.copyAction = function () {
  // Copy to clipboard
  try {
    new ClipboardJS('.js-copy-button', {
      target: function (trigger) {
        return trigger.nextElementSibling
      }
    }).on('success', function (e) {
      e.trigger.textContent = 'Copied'
      e.clearSelection()
      setTimeout(function () {
        e.trigger.textContent = 'Copy'
      }, 5000)
    })
  } catch (err) {
    if (err) {
      console.log(err.message)
    }
  }
}

export default Copy
