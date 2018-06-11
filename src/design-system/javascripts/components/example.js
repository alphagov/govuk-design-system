;(function (global) {
  'use strict'
  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.example = {
    init: function (selector) {
      try {
        // Example iframe; set the height equal to the body height
        $(selector).iFrameResize({scrolling: 'auto', autoResize: true})
      } catch (err) {
        if (err) {
          console.error(err.message)
        }
      }
    }
  }
  global.GOVUK = GOVUK
})(window); // eslint-disable-line semi
