/**
 * Open Nunjucks tab and expand macro options details
 */
class OptionsTable {
  init() {
    this.expandMacroOptions()
  }

  /**
   * Check URL hash is '#options-[exampleName]' and focus
   * known tab link, optionally scrolling to options table
   */
  expandMacroOptions() {
    const hash = window.location.hash

    if (hash.match('^#options-')) {
      const $optionsElement = document.querySelector(hash)
      if (!$optionsElement) {
        return
      }

      // Is hash for a specific options table? eg. #options-checkboxes-example--hint
      const isLinkToTable = hash.indexOf('--') > -1

      const exampleName = isLinkToTable
        ? hash.split('#options-')[1].split('--')[0]
        : hash.split('#options-')[1]

      if (exampleName) {
        const $tabLink = document.querySelector(
          `a[href="#${exampleName}-nunjucks"]`
        )

        const $optionsDetailsElement = document.getElementById(
          `options-${exampleName}-details`
        )

        if (
          !($tabLink instanceof HTMLAnchorElement) ||
          !($optionsDetailsElement instanceof HTMLDetailsElement)
        ) {
          return
        }

        $tabLink.setAttribute('aria-expanded', 'true')
        $tabLink.parentElement.className += ' app-tabs__item--current'

        $optionsDetailsElement.parentElement.removeAttribute('hidden')
        $optionsDetailsElement.open = true

        window.setTimeout(() => {
          $tabLink.focus()
          if (isLinkToTable) $optionsElement.scrollIntoView()
        }, 0)
      }
    }
  }
}

export default OptionsTable
