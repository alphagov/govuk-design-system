/**
 * @jest-environment jsdom
 */

import * as Analytics from '../src/javascripts/components/analytics.mjs'
import * as CookieHelpers from '../src/javascripts/components/cookie-functions.mjs'

jest.mock('../src/javascripts/components/analytics')

describe('Cookie settings', () => {
  beforeEach(() => {
    window.GDS_CONSENT_COOKIE_VERSION = 1
  })

  afterEach(() => {
    // Delete test cookies
    const cookies = document.cookie.split(';')
    cookies.forEach(function (cookie) {
      const name = cookie.split('=')[0]
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${window.location.hostname};path=/`
    })
  })

  describe('Reading a cookie', () => {
    beforeEach(() => {
      // Allow setting _ga cookie
      CookieHelpers.setConsentCookie({ analytics: true })
    })

    it('returns null if no cookie present', async () => {
      expect(CookieHelpers.Cookie('_ga')).toEqual(null)
    })

    it('returns cookie if present', async () => {
      CookieHelpers.Cookie('_ga', 'foo')
      expect(CookieHelpers.Cookie('_ga')).toEqual('foo')
    })
  })

  describe('Setting a cookie', () => {
    afterEach(() => {
      // Delete test cookies
      document.cookie = 'myCookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
      document.cookie = 'design_system_cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('doesnt set a cookie with a value if not a recognised name', async () => {
      CookieHelpers.Cookie('myCookie', 'myValue')

      expect(document.cookie).toEqual('')
    })

    it('allows deletion of any cookie even if not recognised', async () => {
      document.cookie = 'myCookie=hello; path=/'
      document.cookie = 'otherCookie=world; path=/'

      CookieHelpers.Cookie('otherCookie', null)

      expect(document.cookie).toEqual('myCookie=hello')
    })

    it('sets allowed cookie with no options', async () => {
      CookieHelpers.Cookie('design_system_cookies_policy', '{"analytics":false}')

      expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false}')
    })

    it('sets allowed cookie with options', async () => {
      CookieHelpers.Cookie('design_system_cookies_policy', '{"analytics":false}', { days: 100 })

      // Annoyingly JS can't retrieve expiry date directly from document.cookie, this is all we can assert
      expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false}')
    })
  })

  describe('getConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'design_system_cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('returns null if consent cookie not present', async () => {
      expect(CookieHelpers.getConsentCookie()).toEqual(null)
    })

    it('returns consent cookie object if present', async () => {
      document.cookie = 'design_system_cookies_policy={"analytics":false,"version":1}'

      expect(CookieHelpers.getConsentCookie()).toEqual({ analytics: false, version: 1 })
    })
  })

  describe('setConsentCookie', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      Analytics.default.mockClear()
    })

    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'design_system_cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    describe('to false', () => {
      it('changes existing cookie value to false', async () => {
        document.cookie = 'design_system_cookies_policy={"analytics":true};'

        CookieHelpers.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false,"version":1}')
      })

      it('does not load the analytics script', async () => {
        CookieHelpers.setConsentCookie({ analytics: false })

        expect(Analytics.default).toHaveBeenCalledTimes(0)
      })

      it('deletes existing analytics cookies', async () => {
        document.cookie = '_ga=test;_gid=test;_gat_govuk_shared=test'

        CookieHelpers.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false,"version":1}')
        // Make sure those analytics cookies are definitely gone
        expect(CookieHelpers.Cookie('_ga')).toEqual(null)
        expect(CookieHelpers.Cookie('_gid')).toEqual(null)
        expect(CookieHelpers.Cookie('_gat_govuk_shared')).toEqual(null)
      })
    })

    describe('to true', () => {
      it('sets existing cookie policy cookie to true', async () => {
        document.cookie = 'design_system_cookies_policy={"analytics":false};'

        CookieHelpers.setConsentCookie({ analytics: true })

        expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":true,"version":1}')
      })

      it('loads analytics script if consenting to analytics cookies', async () => {
        CookieHelpers.setConsentCookie({ analytics: true })

        expect(Analytics.default).toHaveBeenCalledTimes(1)
      })
    })

    describe('default', () => {
      it('sets consent cookie to default if no options are provided', async () => {
        CookieHelpers.setConsentCookie()

        expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false,"version":1}')
      })
    })
  })

  describe('resetCookies', () => {
    it('deletes cookies the user has not consented to', async () => {
      document.cookie = '_ga=test'
      document.cookie = '_gid=test'
      document.cookie = 'design_system_cookies_policy={"analytics":false,"version":1}'

      CookieHelpers.resetCookies()

      expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false,"version":1}')
    })

    it('deletes cookies if the consent cookie is not present', async () => {
      document.cookie = '_ga=test'
      document.cookie = '_gid=test'

      CookieHelpers.resetCookies()

      expect(document.cookie).toEqual('')
    })

    it('loads analytics script if user consented to analytics', async () => {
      document.cookie = 'design_system_cookies_policy={"analytics":true,"version":1}'

      CookieHelpers.resetCookies()

      expect(Analytics.default).toHaveBeenCalledTimes(1)
    })

    it('disables analytics by setting a window property', async () => {
      document.cookie = '_ga=test'
      document.cookie = '_gid=test'

      CookieHelpers.resetCookies()

      expect(window['ga-disable-UA-26179049-17']).toEqual(true)
      expect(window['ga-disable-UA-116229859-1']).toEqual(true)
    })

    it('re-enables analytics by setting a window property', async () => {
      document.cookie = 'design_system_cookies_policy={"analytics":true,"version":1}'

      CookieHelpers.resetCookies()

      expect(window['ga-disable-UA-26179049-17']).toEqual(false)
      expect(window['ga-disable-UA-116229859-1']).toEqual(false)
    })
  })

  describe('consent cookie version', () => {
    it('version is an integer property of the consent cookie object', async () => {
      CookieHelpers.setConsentCookie()

      expect(CookieHelpers.getConsentCookie().version).toEqual(1)
    })

    it('Cookie will not set cookies if consent cookie is old version', async () => {
      document.cookie = 'design_system_cookies_policy={"analytics":true,"version":0}'

      CookieHelpers.Cookie('_ga', 'foo')
      expect(CookieHelpers.Cookie('_ga')).toEqual(null)
    })

    it('resetCookies deletes cookies if consent cookie is old version', async () => {
      document.cookie = '_ga=test'
      document.cookie = '_gid=test'
      document.cookie = 'design_system_cookies_policy={"analytics":false,"version":0}'

      CookieHelpers.resetCookies()

      expect(document.cookie).toEqual('design_system_cookies_policy={"analytics":false,"version":0}')
    })
  })

  describe('isValidConsentCookie', () => {
    it('isValidConsentCookie returns true if consent cookie is current version', async () => {
      const cookieOptions = { analytics: true, version: 1 }

      expect(CookieHelpers.isValidConsentCookie(cookieOptions)).toEqual(true)
    })

    it('isValidConsentCookie returns true if consent cookie is newer than current version', async () => {
      const cookieOptions = { analytics: true, version: 2 }

      expect(CookieHelpers.isValidConsentCookie(cookieOptions)).toEqual(true)
    })

    it('isValidConsentCookie returns false if consent cookie is older than current version', async () => {
      const cookieOptions = { analytics: true, version: 0 }

      expect(CookieHelpers.isValidConsentCookie(cookieOptions)).toEqual(false)
    })

    it('isValidConsentCookie returns false if consent cookie version is not a number', async () => {
      const cookieOptions = { analytics: true, version: 'foobar' }

      expect(CookieHelpers.isValidConsentCookie(cookieOptions)).toEqual(false)
    })
  })

  describe('deleteCookie', () => {
    it('deletes cookies set with a domain attribute', async () => {
      document.cookie = 'my_cookie=test;domain=design-system.service.gov.uk'

      CookieHelpers.Cookie('my_cookie', null)

      expect(document.cookie).toEqual('')
    })

    it('deletes cookies set without a domain attribute', async () => {
      document.cookie = 'my_cookie_2=test'

      CookieHelpers.Cookie('my_cookie_2', null)

      expect(document.cookie).toEqual('')
    })
  })
})
