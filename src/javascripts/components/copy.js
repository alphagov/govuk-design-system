;(function (global) {
  'use strict'
  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  // This module is dependent on /vendor/clipboard.js
  GOVUK.copy = {
    init: function (selector) {
      $(selector).parent().prepend('<a class="govuk-c-link app-c-link--copy" href="#copy">Copy</a>')
      // Copy to clipboard
      try {
        new Clipboard('.app-c-link--copy', {
          target: function (trigger) {
            return trigger.nextElementSibling
          }
        }).on('success', function (e) {
          e.clearSelection()
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
