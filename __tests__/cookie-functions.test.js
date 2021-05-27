/**
 * @jest-environment jsdom
 */

/* eslint-env jest */

import * as CookieHelpers from '../src/javascripts/cookie-functions'

describe('Cookie settings', () => {
  describe('Reading a cookie', () => {
    afterEach(() => {
      // Delete _ga cookie
      document.cookie = '_ga=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
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
      document.cookie = 'cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('doesnt set a cookie with a value if not a recognised name', async () => {
      CookieHelpers.Cookie('myCookie', 'myValue')

      expect(document.cookie).toEqual('')
    })

    it('allows deletion of any cookie even if not recognised', async () => {
      CookieHelpers.Cookie('myCookie', null)

      expect(document.cookie).toEqual('myCookie=null')
    })

    it('sets allowed cookie with no options', async () => {
      CookieHelpers.Cookie('cookies_policy', '{"analytics":false}')

      expect(document.cookie).toEqual('cookies_policy={"analytics":false}')
    })

    it('sets allowed cookie with options', async () => {
      CookieHelpers.Cookie('cookies_policy', '{"analytics":false}', { days: 100 })

      // Annoyingly JS can't retrieve expiry date directly from document.cookie, this is all we can assert
      expect(document.cookie).toEqual('cookies_policy={"analytics":false}')
    })
  })

  describe('getConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('returns null if consent cookie not present', async () => {
      expect(CookieHelpers.getConsentCookie()).toEqual(null)
    })

    it('returns consent cookie object if present', async () => {
      document.cookie = 'cookies_policy={"analytics":false}'

      expect(CookieHelpers.getConsentCookie()).toEqual({ analytics: false })
    })
  })

  describe('setConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    describe('to false', () => {
      it('changes existing cookie value to false', async () => {
        document.cookie = 'cookies_policy={"analytics":true};'

        CookieHelpers.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('cookies_policy={"analytics":false}')
      })

      it('deletes existing analytics cookies', async () => {
        document.cookie = '_ga=test;_gid=test;_gat_govuk_shared=test'

        CookieHelpers.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('cookies_policy={"analytics":false}')
        // Make sure those analytics cookies are definitely gone
        expect(CookieHelpers.Cookie('_ga')).toEqual(null)
        expect(CookieHelpers.Cookie('_gid')).toEqual(null)
        expect(CookieHelpers.Cookie('_gat_govuk_shared')).toEqual(null)
      })
    })

    describe('to true', () => {
      it('sets existing cookie policy cookie to true', async () => {
        document.cookie = 'cookies_policy={"analytics":false};'

        CookieHelpers.setConsentCookie({ analytics: true })

        expect(document.cookie).toEqual('cookies_policy={"analytics":true}')
      })
    })
  })
})
