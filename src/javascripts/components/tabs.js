;(function (global) {
  'use strict'
  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.tabs = {

    // Tabs mode
    clickTabItem: function (e) {
      e.preventDefault()

      // Get tab container ID
      var id = $(this).attr('href')

      // Reset state
      $('.app-c-tabs__item').removeClass('app-c-tabs__item--current')
      $('.app-c-tabs__heading').removeClass('app-c-tabs__heading--current')
      $('.app-c-tabs__item a').removeAttr('aria-selected')
      $('.app-c-tabs__container').hide().attr('aria-hidden', 'true')

      // Set current active tab
      $('[href="' + id + '"]').attr('aria-selected', 'true')
      var $parents = $('[href="' + id + '"]').parent()
      $.each($parents, function (key, obj) {
        if ($(obj).hasClass('app-c-tabs__item')) {
          $(obj).addClass('app-c-tabs__item--current')
        } else if ($(obj).hasClass('app-c-tabs__heading')) {
          $(obj).addClass('app-c-tabs__heading--current')
        }
      })

      // Set current container
      $(id).show().removeAttr('aria-hidden')
    },

    // Accordion mode
    clickAccordionItem: function (e) {
      e.preventDefault()

      var id = $(this).attr('href')

      // Let the main tabs deal with the states
      $('.app-c-tabs__item a[href="' + id + '"]').click()
    },

    // Close current container on click
    clickCloseContainer: function (e) {
      e.preventDefault()
      $('.app-c-tabs__item').removeClass('app-c-tabs__item--current')
      $('.app-c-tabs__heading').removeClass('app-c-tabs__heading--current')
      $('.app-c-tabs__container').hide().attr('aria-selected', 'true')
    },

    init: function () {
      // If more than one container
      if ($('.app-c-tabs__container').length > 1) {
        // Hide all containers
        $('.app-c-tabs__container').hide()

        // Add close button to each container
        $('.app-c-tabs__container').append('<a class="app-c-link--close app-o-chevron--top" href="#close">Close</a>')
      }

      // Bind tab item click
      $('.app-c-tabs__item a').click(GOVUK.tabs.clickTabItem)

      // Bind accordion item click
      $('.app-c-tabs__heading a').click(GOVUK.tabs.clickAccordionItem)

      // Bind close container link
      $('.app-c-link--close').click(GOVUK.tabs.clickCloseContainer)

      // Show open containers
      $('.app-c-tabs a[open]').click()
    }
  }

  global.GOVUK = GOVUK
})(window); // eslint-disable-line semi
