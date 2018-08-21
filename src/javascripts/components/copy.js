import $ from 'jquery'
import ClipboardJS from 'clipboard'

var Copy = {
  init: function (selector) {
    $(selector).parent().prepend('<button class="app-copy-button js-copy-button" aria-live="assertive">Copy</button>')
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
}

export default Copy
