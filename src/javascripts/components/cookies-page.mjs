import { getConsentCookie, setConsentCookie } from './cookie-functions.mjs'

function CookiesPage($module) {
  this.$module = $module
}

CookiesPage.prototype.init = function () {
  this.$cookiePage = this.$module

  if (!this.$cookiePage) {
    return
  }

  this.$cookieForm = this.$cookiePage.querySelector('.js-cookies-page-form')
  this.$cookieFormFieldsets = this.$cookieForm.querySelectorAll(
    '.js-cookies-page-form-fieldset'
  )
  this.$successNotification = this.$cookiePage.querySelector(
    '.js-cookies-page-success'
  )

  this.$cookieFormFieldsets.forEach(
    function ($cookieFormFieldset) {
      this.showUserPreference($cookieFormFieldset, getConsentCookie())
      $cookieFormFieldset.removeAttribute('hidden')
    }.bind(this)
  )

  // Show submit button
  this.$cookieForm
    .querySelector('.js-cookies-form-button')
    .removeAttribute('hidden')

  this.$cookieForm.addEventListener('submit', this.savePreferences.bind(this))
}

CookiesPage.prototype.savePreferences = function (event) {
  // Stop default form submission behaviour
  event.preventDefault()

  const preferences = {}

  this.$cookieFormFieldsets.forEach(
    function ($cookieFormFieldset) {
      const cookieType = this.getCookieType($cookieFormFieldset)
      const selectedItem = $cookieFormFieldset.querySelector(
        `input[name="cookies[${cookieType}]"]:checked`
      ).value

      preferences[cookieType] = selectedItem === 'yes'
    }.bind(this)
  )

  // Save preferences to cookie and show success notification
  setConsentCookie(preferences)
  this.showSuccessNotification()
}

CookiesPage.prototype.showUserPreference = function (
  $cookieFormFieldset,
  preferences
) {
  const cookieType = this.getCookieType($cookieFormFieldset)
  let preference = false

  if (cookieType && preferences && preferences[cookieType] !== undefined) {
    preference = preferences[cookieType]
  }

  const radioValue = preference ? 'yes' : 'no'
  const radio = $cookieFormFieldset.querySelector(
    `input[name="cookies[${cookieType}]"][value=${radioValue}]`
  )
  radio.checked = true
}

CookiesPage.prototype.showSuccessNotification = function () {
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

CookiesPage.prototype.getCookieType = function ($cookieFormFieldset) {
  return $cookieFormFieldset.getAttribute('data-cookie-type')
}

export default CookiesPage
