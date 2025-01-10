import { Component } from 'govuk-frontend'

/**
 * Mobile Navigation enhancement for Service Navigation component
 */
class MobileNavigation extends Component {
  static moduleName = 'app-mobile-navigation'

  /**
   * @param {Element} $root - HTML element
   */
  constructor($root) {
    super($root)

    this.templates = this.$root.querySelectorAll(
      '.app-mobile-navigation__template'
    )
    this.links = this.$root.querySelectorAll('a')

    Array.from(this.templates).forEach((template) => {
      const templateClone = template.content.cloneNode(true)
      let link

      if (template.parentNode.tagName === 'A') {
        link = template.parentNode
        link.removeChild(template)
      } else {
        link = template.parentNode.parentNode
        template.parentNode.removeChild(template)
      }

      const button = document.createElement('button')
      button.classList.add('govuk-service-navigation__link')
      button.classList.add('app-mobile-navigation__toggle-button')
      button.setAttribute(
        'aria-expanded',
        String(
          link.parentNode.classList.contains(
            'govuk-service-navigation__item--active'
          )
        )
      )
      button.textContent = link.textContent

      link.insertAdjacentElement('afterend', templateClone.firstElementChild)
      link.insertAdjacentElement('afterend', button)
    })

    const currentLink = Array.from(
      this.$root.querySelectorAll(
        `.app-navigation__subnav-item a[href="${window.location.pathname.slice(0, -1)}"]`
      )
    ).pop()

    if (currentLink) {
      currentLink.classList.add('app-mobile-navigation__link--active')
    }

    this.subNavs = $root.querySelectorAll('.app-mobile-navigation__list')

    // A global const for storing a matchMedia instance which we'll use to detect when a screen size change happens
    // Set the matchMedia to the govuk-frontend tablet breakpoint

    const breakPoint = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--govuk-frontend-breakpoint-tablet')

    this.mql = window.matchMedia(`(min-width: ${breakPoint})`)

    // MediaQueryList.addEventListener isn't supported by Safari < 14 so we need
    // to be able to fall back to the deprecated MediaQueryList.addListener
    if ('addEventListener' in this.mql) {
      this.mql.addEventListener('change', () => this.setHiddenStates())
    } else {
      // @ts-expect-error Property 'addListener' does not exist
      this.mql.addListener(() => this.setHiddenStates())
    }

    this.setHiddenStates()
    this.setEventListener()
  }

  /**
   * Set up event delegation for button clicks
   */
  setEventListener() {
    this.$root.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const ariaExpanded = e.target.getAttribute('aria-expanded') === 'true'

        e.target.setAttribute('aria-expanded', !ariaExpanded)

        const subNav = e.target.nextSibling

        if (
          subNav &&
          subNav.classList &&
          subNav.classList.contains('app-mobile-navigation__list')
        ) {
          if (ariaExpanded) {
            subNav.setAttribute('hidden', '')
          } else {
            subNav.removeAttribute('hidden')
          }
        }
      }
    })
  }

  /**
   * Hide links if viewport is below tablet
   */
  setHiddenStates() {
    if (!this.mql.matches) {
      this.links.forEach((a) => a.setAttribute('hidden', ''))
      this.subNavs.forEach((subNav) => {
        if (subNav.previousSibling.getAttribute('aria-expanded') === 'true') {
          subNav.removeAttribute('hidden')
        }
      })
    } else {
      this.subNavs.forEach((x) => x.setAttribute('hidden', ''))
      this.links.forEach((a) => a.removeAttribute('hidden'))
    }
  }
}

export default MobileNavigation
