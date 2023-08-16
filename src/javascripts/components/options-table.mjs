const OptionsTable = {
  init: function () {
    OptionsTable.expandMacroOptions()
  },
  // Open Nunjucks tab and expand macro options details when URL hash is '#options-[exampleName]'
  expandMacroOptions: function () {
    const hash = window.location.hash

    if (hash.match('^#options-')) {
      let exampleName = hash.split('#options-')[1]

      // Is hash for a specific options table? eg. #options-checkboxes-example--hint
      const isLinkToTable = hash.indexOf('--') > -1
      if (isLinkToTable) {
        exampleName = exampleName.split('--')[0]
      }

      if (exampleName) {
        const tabLink = document.querySelector(
          `a[href="#${exampleName}-nunjucks"]`
        )
        const optionsDetailsElement = document.getElementById(
          `options-${exampleName}-details`
        )

        if (!tabLink || !optionsDetailsElement) {
          return
        }

        tabLink.setAttribute('aria-expanded', 'true')
        tabLink.parentNode.className += ' app-tabs__item--current'

        optionsDetailsElement.parentNode.removeAttribute('hidden')
        optionsDetailsElement.open = true

        window.setTimeout(function () {
          tabLink.focus()
          if (isLinkToTable) document.querySelector(hash).scrollIntoView()
        }, 0)
      }
    }
  }
}

export default OptionsTable
