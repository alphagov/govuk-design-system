/**
 * @jest-environment jsdom
 */
import * as CookieHelpers from '../../helpers/cookie/cookie-functions'

describe('Cookie settings', () => {
  describe('getCookie', () => {
    afterEach(() => {
      // Delete _ga cookie
      document.cookie = '_ga=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('returns null if no cookie present', async () => {
      expect(CookieHelpers.getCookie('_ga')).toEqual(null)
    })

    it('returns cookie if present', async () => {
      CookieHelpers.setCookie('_ga', 'foo')
      expect(CookieHelpers.getCookie('_ga')).toEqual('foo')
    })
  })

  describe('setCookie', () => {
    afterEach(() => {
      // Delete test cookies
      document.cookie = 'myCookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
      document.cookie = 'dm_cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('doesnt set a cookie with a value if not a recognised name', async () => {
      CookieHelpers.setCookie('myCookie', 'myValue')

      expect(document.cookie).toEqual('')
    })

    it('allows deletion of any cookie even if not recognised', async () => {
      CookieHelpers.setCookie('myCookie', null)

      expect(document.cookie).toEqual('myCookie=null')
    })

    it('sets allowed cookie with no options', async () => {
      CookieHelpers.setCookie('dm_cookies_policy', '{"analytics":false}')

      expect(document.cookie).toEqual('dm_cookies_policy={"analytics":false}')
    })

    it('sets allowed cookie with options', async () => {
      CookieHelpers.setCookie('dm_cookies_policy', '{"analytics":false}', { days: 100 })

      // Annoyingly JS can't retrieve expiry date directly from document.cookie, this is all we can assert
      expect(document.cookie).toEqual('dm_cookies_policy={"analytics":false}')
    })
  })

  describe('getConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'dm_cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('returns null if consent cookie not present', async () => {
      expect(CookieHelpers.getConsentCookie()).toEqual(null)
    })

    it('returns consent cookie object if present', async () => {
      document.cookie = 'dm_cookies_policy={"analytics":false}'

      expect(CookieHelpers.getConsentCookie()).toEqual({ analytics: false })
    })
  })

  describe('setConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'dm_cookies_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    describe('to false', () => {
      it('changes existing cookie value to false', async () => {
        document.cookie = 'dm_cookies_policy={"analytics":true};'

        CookieHelpers.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('dm_cookies_policy={"analytics":false}')
      })

      it('deletes existing analytics cookies', async () => {
        document.cookie = '_ga=test;_gid=test;_gat_govuk_shared=test'

        CookieHelpers.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('dm_cookies_policy={"analytics":false}')
        // Make sure those analytics cookies are definitely gone
        expect(CookieHelpers.getCookie('_ga')).toEqual(null)
        expect(CookieHelpers.getCookie('_gid')).toEqual(null)
        expect(CookieHelpers.getCookie('_gat_govuk_shared')).toEqual(null)
      })
    })

    describe('to true', () => {
      it('sets existing cookie policy cookie to true', async () => {
        document.cookie = 'dm_cookies_policy={"analytics":false};'

        CookieHelpers.setConsentCookie({ analytics: true })

        expect(document.cookie).toEqual('dm_cookies_policy={"analytics":true}')
      })
    })
  })
})
