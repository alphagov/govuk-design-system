import $ from 'jquery'

var Tabs = {

  // Reset tabs and containers
  resetTabs: function (id) {
    // Check if we have an id
    if (!id) {
      console.error('id is undefined')
      return
    }

    var $example = $(id).parent()

    // Reset state
    $example.find('.js-tabs__item').removeClass('app-tabs__item--current')
    $example.find('.js-tabs__heading').removeClass('app-tabs__heading--current')
    $example.find('.js-tabs__item a').attr('aria-expanded', 'false')
    $example.find('.js-tabs__container').hide().attr('aria-hidden', 'true')
  },

  // Attach aria attributes on load based on whether tabs have been set to open or closed
  attachAriaAttributes: function (container) {
    // Check if we have an id
    if (!container) {
      console.error('container is undefined')
      return
    }

    var $example = $(container).parent()
    var isTabOpen = $example.find('.js-tabs__item a').attr('aria-expanded')

    if (!isTabOpen) {
      $example.find('.js-tabs__item a').attr('aria-expanded', 'false')
      $example.find('.js-tabs__container').hide().attr('aria-hidden', 'true')
    } else {
      $example.find('.js-tabs__item a').attr('aria-expanded', 'true')
      $example.find('.js-tabs__container').hide().attr('aria-hidden', 'false')
    }
  },

  // Activate current tab
  activateAndToggleCurrentTab: function (id) {
    // Check if we have an id
    if (!id) {
      console.error('id is undefined')
      return
    }

    var $target = $('[href="' + id + '"]')
    var isTargetOpen = $target.attr('aria-expanded') === 'true'
    var $targetParent = $target.parent()

    if (isTargetOpen) {
      $target.attr('aria-expanded', 'false')
      $(id).hide().attr('aria-hidden', 'true')

      if ($targetParent.hasClass('app-tabs__item--current')) {
        $targetParent.removeClass('app-tabs__item--current')
      } else if ($targetParent.hasClass('app-tabs__heading--current')) {
        $targetParent.removeClass('app-tabs__heading--current')
      }
    } else {
      // Reset tabs
      Tabs.resetTabs(id)

      // Set current active tab for both tabs and accordion links
      $target.attr('aria-expanded', 'true')
      $.each($targetParent, function (key, obj) {
        if ($(obj).hasClass('app-tabs__item')) {
          $(obj).addClass('app-tabs__item--current')
        } else if ($(obj).hasClass('app-tabs__heading')) {
          $(obj).addClass('app-tabs__heading--current')
        }
      })

      // Set current container
      $(id).show().attr('aria-hidden', 'false')
    }
  },

  // Tabs mode
  clickTabItem: function (e) {
    e.preventDefault()

    // Get tab container ID
    var id = $(this).attr('href')

    // Activate current tab
    Tabs.activateAndToggleCurrentTab(id)
  },

  // Close current container on click
  clickCloseContainer: function (e) {
    e.preventDefault()

    // Get tab container ID and save example object
    var id = $(this).parent().attr('id')

    // Reset tabs
    Tabs.resetTabs('#' + id)
  },

  init: function (selector) {
    // If more than one container
    var $examples = $(selector)
    $.each($examples, function (key, obj) {
      var tabsContainer = $(obj).find('.js-tabs__container')
      if (tabsContainer.length > 0 && !tabsContainer.hasClass('js-tabs__container--no-tabs')) {
        // Hide all containers
        tabsContainer.hide()
        Tabs.attachAriaAttributes(tabsContainer)
        // Add close button to each container
        tabsContainer.append('<button class="app-tabs__close js-tabs__close">Close</button>')
        tabsContainer.addClass('app-tabs__container--with-close-button')
      }
    })

    // Bind tab item click
    $('.js-tabs__item a').click(Tabs.clickTabItem)

    // Bind accordion item click
    $('.js-tabs__heading a').click(Tabs.clickTabItem)

    // Bind close container link
    $('.js-tabs__close').click(Tabs.clickCloseContainer)

    // Show open containers
    $('.js-tabs__heading--open a').click()
  }
}

export default Tabs
