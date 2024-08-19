import { getConsentCookie, setConsentCookie } from './cookie-functions.mjs'

/**
 * Website cookies page
 */
class CookiesPage {
  static moduleName = 'app-cookies-page'
  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    if (
      !($module instanceof HTMLElement) ||
      !document.body.classList.contains('govuk-frontend-supported')
    ) {
      return this
    }

    this.$page = $module

    const $cookieForm = this.$page.querySelector('.js-cookies-page-form')
    if (!($cookieForm instanceof HTMLFormElement)) {
      return this
    }

    this.$cookieForm = $cookieForm

    /** @satisfies {NodeListOf<HTMLFieldSetElement>} */
    const $cookieFormFieldsets = this.$cookieForm.querySelectorAll(
      '.js-cookies-page-form-fieldset'
    )
    const $cookieFormButton = this.$cookieForm.querySelector(
      '.js-cookies-form-button'
    )

    if (
      !$cookieFormFieldsets.length ||
      !($cookieFormButton instanceof HTMLButtonElement)
    ) {
      return this
    }

    this.$cookieFormFieldsets = $cookieFormFieldsets
    this.$cookieFormButton = $cookieFormButton

    const $successNotification = this.$page.querySelector(
      '.js-cookies-page-success'
    )
    if ($successNotification instanceof HTMLElement) {
      this.$successNotification = $successNotification
    }

    const cookieConsent = getConsentCookie()

    this.$cookieFormFieldsets.forEach(($cookieFormFieldset) => {
      this.showUserPreference($cookieFormFieldset, cookieConsent)
      $cookieFormFieldset.removeAttribute('hidden')
    })

    // Show submit button
    this.$cookieFormButton.removeAttribute('hidden')

    this.$cookieForm.addEventListener('submit', (event) =>
      this.savePreferences(event)
    )
  }

  /**
   * Save preferences
   *
   * @param {SubmitEvent} event - Form submit event
   */
  savePreferences(event) {
    // Stop default form submission behaviour
    event.preventDefault()

    const preferences = {}

    this.$cookieFormFieldsets.forEach(($cookieFormFieldset) => {
      const cookieType = this.getCookieType($cookieFormFieldset)
      if (!cookieType) {
        return
      }

      const $selectedItem = $cookieFormFieldset.querySelector(
        `input[name="cookies[${cookieType}]"]:checked`
      )

      if ($selectedItem instanceof HTMLInputElement) {
        preferences[cookieType] = $selectedItem.value === 'yes'
      }
    })

    // Save preferences to cookie and show success notification
    setConsentCookie(preferences)
    this.showSuccessNotification()
  }

  /**
   * Show user preference
   *
   * @param {HTMLFieldSetElement} $cookieFormFieldset - Cookie form fieldset
   * @param {import('./cookie-functions.mjs').ConsentPreferences | null} preferences - Consent preferences
   */
  showUserPreference($cookieFormFieldset, preferences) {
    const cookieType = this.getCookieType($cookieFormFieldset)
    let preference = false

    if (cookieType && preferences && preferences[cookieType] !== undefined) {
      preference = preferences[cookieType]
    }

    const radioValue = preference ? 'yes' : 'no'

    /** @satisfies {HTMLInputElement | null} */
    const $radio = $cookieFormFieldset.querySelector(
      `input[name="cookies[${cookieType}]"][value=${radioValue}]`
    )
    if (!$radio) {
      return
    }

    $radio.checked = true
  }

  /**
   * Show success notification
   */
  showSuccessNotification() {
    if (!this.$successNotification) {
      return
    }

    this.$successNotification.removeAttribute('hidden')

    // Set tabindex to -1 to make the element focusable with JavaScript.
    // GOV.UK Frontend will remove the tabindex on blur as the component doesn't
    // need to be focusable after the user has read the text.
    if (!this.$successNotification.getAttribute('tabindex')) {
      this.$successNotification.setAttribute('tabindex', '-1')
    }

    this.$successNotification.focus()

    // scroll to the top of the page
    window.scrollTo(0, 0)
  }

  /**
   * Get cookie type
   *
   * @param {HTMLFieldSetElement} $cookieFormFieldset - Cookie form fieldset
   * @returns {string | null} Cookie type
   */
  getCookieType($cookieFormFieldset) {
    return $cookieFormFieldset.getAttribute('data-cookie-type')
  }
}

export default CookiesPage
