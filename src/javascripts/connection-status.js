/* eslint no-unused-vars: 0 */
/**
 * Script used to detect when a user goes offline and the Service Worker takes over.
 * This will show a small visual update to the user.
 */
// IIFE
var ConnectionStatus = (function () {
  var messageWrapper

  function init () {
    // generate the message wrapper
    messageWrapper = document.createElement('div')
    messageWrapper.style.cssText = 'position:fixed; bottom:0; right: 0; display:none; z-index: 10;'
    messageWrapper.className = 'govuk-tag app-tag--review govuk-message-wrapper'

    // append the wrapper to the page
    document.body.appendChild(messageWrapper)
  }

  var showMessage = function (message) {
    messageWrapper.innerHTML = message
    messageWrapper.style.display = 'block'
  }

  var hideMessage = function () {
    messageWrapper.innerHTML = ''
    messageWrapper.style.display = 'none'
  }

  var update = function () {
    if (navigator.onLine) { // online
      // hide the message
      hideMessage()
    } else { // offline
      showMessage('Offline')
    }
  }

  // initialise the module
  init()

  // expose methods publicly
  return {
    update: update
  }
}())
