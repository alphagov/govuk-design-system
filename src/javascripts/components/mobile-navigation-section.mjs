import { Component } from 'govuk-frontend'

/**
 * Mobile Navigation enhancement for Service Navigation component
 */
class MobileNavigationSection extends Component {
  static moduleName = 'app-mobile-navigation-section'

  /**
   * @returns {boolean} Whether the section is expanded
   */
  get expanded() {
    return this.$button.getAttribute('aria-expanded') === 'true'
  }

  /**
   * @param {boolean} value - Whether the section is expanded
   */
  set expanded(value) {
    this.$button.setAttribute('aria-expanded', `${value}`)

    if (value) {
      this.$subnav.removeAttribute('hidden')
    } else {
      this.$subnav.setAttribute('hidden', '')
    }
  }

  /**
   * @param {Element} $root - HTML element
   */
  constructor($root) {
    super($root)

    this.$button = this.createButton()
    this.$subnav = this.createSubNav()

    this.$root.insertAdjacentElement('afterEnd', this.$subnav)
    this.$root.insertAdjacentElement('afterEnd', this.$button)

    // Initialise whether the section should be expanded or not first
    // so that showing/hiding the mobile navigation based on viewport
    // keeps the section open appropriately if it's the current section
    if (this.$root.hasAttribute('aria-current')) {
      this.expanded = true
    }

    // Check if the section should be visible or not
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

    // Finally, get ready for user interactions
    this.$button.addEventListener('click', () => {
      this.expanded = !this.expanded
    })
  }

  /**
   * Creates the button that will toggle the sub navigation
   *
   * @returns {HTMLButtonElement} The button that toggles the sub navigation
   */
  createButton() {
    const $button = document.createElement('button')
    $button.textContent = this.$root.textContent
    $button.setAttribute('aria-expanded', 'false')
    $button.hidden = true

    return $button
  }

  /**
   * Creates the sub-navigation from the `<template>` element
   *
   * @returns {HTMLElement} The sub-navigation
   */
  createSubNav() {
    const $template = this.$root.querySelector('template')
    return $template.content.cloneNode(true).children[0]
  }

  /**
   * Reveals or hides the sub navigation
   * depending on the viewport width
   */
  setHiddenStates() {
    if (!this.mql.matches) {
      this.$root.setAttribute('hidden', '')
      if (this.expanded) {
        this.$subnav.removeAttribute('hidden')
      }
      this.$button.removeAttribute('hidden')
    } else {
      this.$button.setAttribute('hidden', '')
      this.$subnav.setAttribute('hidden', '')
      this.$root.removeAttribute('hidden')
    }
  }
}

export default MobileNavigationSection
