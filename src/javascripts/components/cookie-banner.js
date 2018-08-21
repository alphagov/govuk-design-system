/*
  Cookie methods
  ==============
  Usage:
    Setting a cookie:
    CookieBanner.init('hobnob', 'tasty', { days: 30 });
    Reading a cookie:
    CookieBanner.init('hobnob');
    Deleting a cookie:
    CookieBanner.init('hobnob', null);
*/
var CookieBanner = {
  init: function (name, value, options) {
    if (typeof value !== 'undefined') {
      if (value === false || value === null) {
        return CookieBanner.setCookie(name, '', { days: -1 })
      } else {
        return CookieBanner.setCookie(name, value, options)
      }
    } else {
      return CookieBanner.getCookie(name)
    }
  },
  setCookie: function (name, value, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    var cookieString = name + '=' + value + '; path=/'
    if (options.days) {
      var date = new Date()
      date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000))
      cookieString = cookieString + '; expires=' + date.toGMTString()
    }
    if (document.location.protocol === 'https:') {
      cookieString = cookieString + '; Secure'
    }
    document.cookie = cookieString
  },
  getCookie: function (name) {
    var nameEQ = name + '='
    var cookies = document.cookie.split(';')
    for (var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length)
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length))
      }
    }
    return null
  },
  addCookieMessage: function () {
    var message = document.querySelector('.js-cookie-banner')
    var hasCookieMessage = (message && CookieBanner.init('seen_cookie_message') === null)

    if (hasCookieMessage) {
      message.style.display = 'block'
      CookieBanner.init('seen_cookie_message', 'yes', { days: 28 })
    }
  }
}

export default CookieBanner
