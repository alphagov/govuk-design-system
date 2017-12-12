;(function (global) {
  'use strict'
  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.example = {
    init: function (selector) {
      // Example iframe; set the height equal to the body height
      $(selector).on('load', function () {
        this.style.height = this.contentDocument.body.scrollHeight + 'px'
      })
    }
  }
  global.GOVUK = GOVUK
})(window); // eslint-disable-line semi
