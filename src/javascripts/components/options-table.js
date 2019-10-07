import 'govuk-frontend/govuk/vendor/polyfills/Element/prototype/classList'

var OptionsTable = {
  init: function () {
    OptionsTable.expandMacroOptions()
  },
  // Open Nunjucks tab and expand macro options details when URL hash is '#options-[exampleName]'
  expandMacroOptions: function () {
    var hash = window.location.hash

    if (hash.match('^#options-')) {
      var exampleName = hash.split('#options-')[1]

      // Is hash for a specific options table? eg. #options-checkboxes-example--hint
      var isLinkToTable = hash.indexOf('--') > -1
      if (isLinkToTable) {
        exampleName = exampleName.split('--')[0]
      }

      if (exampleName) {
        var tabLink = document.querySelector('a[href="#' + exampleName + '-nunjucks"]')
        var tabHeading = tabLink ? tabLink.parentNode : null
        var optionsDetailsElement = document.getElementById('options-' + exampleName + '-details')

        if (tabHeading && optionsDetailsElement) {
          var tabsElement = optionsDetailsElement.parentNode
          var detailsSummary = optionsDetailsElement.querySelector('.govuk-details__summary')
          var detailsText = optionsDetailsElement.querySelector('.govuk-details__text')

          if (detailsSummary && detailsText) {
            tabLink.setAttribute('aria-expanded', true)
            tabHeading.className += ' app-tabs__item--current'
            tabsElement.classList.remove('app-tabs__container--hidden')
            tabsElement.setAttribute('aria-hidden', false)

            optionsDetailsElement.setAttribute('open', 'open')
            detailsSummary.setAttribute('aria-expanded', true)
            detailsText.setAttribute('aria-hidden', false)
            detailsText.style.display = ''
            window.setTimeout(function () {
              tabLink.focus()
              if (isLinkToTable) document.querySelector(hash).scrollIntoView()
            }, 0)
          }
        }
      }
    }
  }
}

export default OptionsTable
