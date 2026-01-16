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
    ).getPropertyValue('--govuk-breakpoint-tablet')

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
    this.$button.addEventListener('click', (event) => {
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
    $button.classList.add('app-mobile-navigation-section__toggle')
    // `trim()` ensures no whitespace coming from the server rendered Service Navigation
    // link gets into the button as it would mess the underline on hover
    // The `<span>` allows to only apply the focus style to the text and chevron
    // rather than having it take the whole width
    $button.innerHTML = `<span>${this.$root.textContent.trim()}</span>`
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
      this.$root.parentElement.classList.add(
        'app-mobile-navigation-section__service-navigation-item'
      )
      if (this.expanded) {
        this.$subnav.removeAttribute('hidden')
      }
      removeAttributes(this.$button, Object.keys(attributesForHidingButton))
    } else {
      this.$root.parentElement.classList.remove(
        'app-mobile-navigation-section__service-navigation-item'
      )
      setAttributes(this.$button, attributesForHidingButton)
      this.$subnav.setAttribute('hidden', '')
      this.$root.removeAttribute('hidden')
    }
  }
}

/**
 * Collection of attributes that needs setting on a `<button>`
 * to fully hide it, both visually and from screen-readers,
 * and prevent its activation while hidden
 */
const attributesForHidingButton = {
  hidden: '',
  // Prevent activating the button with JavaScript APIs while hidden
  disabled: '',
  // Fix button still appearing in VoiceOver's form control's menu despite being hidden,
  // as well as remaining focusable through VoiceOver on iPadOS and iOS
  // https://bugs.webkit.org/show_bug.cgi?id=300899
  'aria-hidden': 'true'
}

/**
 * Sets a group of attributes on the given element
 *
 * @param {Element} $element - The element to set the attribute on
 * @param {{[attributeName: string]: string}} attributes - The attributes to set
 */
function setAttributes($element, attributes) {
  for (const attributeName in attributes) {
    $element.setAttribute(attributeName, attributes[attributeName])
  }
}

/**
 * Removes a list of attributes from the given element
 *
 * @param {Element} $element - The element to remove the attributes from
 * @param {string[]} attributeNames - The names of the attributes to remove
 */
function removeAttributes($element, attributeNames) {
  for (const attributeName of attributeNames) {
    $element.removeAttribute(attributeName)
  }
}

export default MobileNavigationSection
