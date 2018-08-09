;(function (global) {
  'use strict'
  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}
  var ClipboardJS = window.ClipboardJS

  // This module is dependent on /vendor/clipboard.js
  GOVUK.copy = {
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
  global.GOVUK = GOVUK
})(window); // eslint-disable-line semi
