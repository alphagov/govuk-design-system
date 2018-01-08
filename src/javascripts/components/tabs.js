;(function (global) {
  'use strict'
  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.tabs = {

    // Reset tabs and containers
    resetTabs: function (id) {
      var $example = $(id).parent()

      // Reset state
      $example.find('.app-c-tabs__item').removeClass('app-c-tabs__item--current')
      $example.find('.app-c-tabs__heading').removeClass('app-c-tabs__heading--current')
      $example.find('.app-c-tabs__item a').removeAttr('aria-selected')
      $example.find('.app-c-tabs__container').hide().attr('aria-hidden', 'true')
    },

    // Activate current tab
    activateCurrentTab: function (id) {
      // Reset tabs
      GOVUK.tabs.resetTabs(id)

      // Set current active tab for both tabs and accordion links
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

    // Tabs mode
    clickTabItem: function (e) {
      e.preventDefault()

      // Get tab container ID
      var id = $(this).attr('href')

      // Activate current tab
      GOVUK.tabs.activateCurrentTab(id)
    },

    // Close current container on click
    clickCloseContainer: function (e) {
      e.preventDefault()

      // Get tab container ID and save example object
      var id = $(this).parent().attr('id')

      // Reset tabs
      GOVUK.tabs.resetTabs('#' + id)
    },

    init: function () {
      // If more than one container
      var $examples = $('.app-c-example-wrapper')
      $.each($examples, function (key, obj) {
        if ($(obj).find('.app-c-tabs__container').length > 1) {
          // Hide all containers
          $(obj).find('.app-c-tabs__container').hide()

          // Add close button to each container
          $(obj).find('.app-c-tabs__container').append('<a class="app-c-link--close app-o-chevron--top" href="#close">Close</a>')
          $(obj).find('.app-c-tabs__container').addClass('app-c-tabs__container--with-close-button')
        }
      })

      // Bind tab item click
      $('.app-c-tabs__item a').click(GOVUK.tabs.clickTabItem)

      // Bind accordion item click
      $('.app-c-tabs__heading a').click(GOVUK.tabs.clickTabItem)

      // Bind close container link
      $('.app-c-link--close').click(GOVUK.tabs.clickCloseContainer)

      // Show open containers
      $('.app-c-tabs__heading a[open]').click()
    }
  }

  global.GOVUK = GOVUK
})(window); // eslint-disable-line semi
