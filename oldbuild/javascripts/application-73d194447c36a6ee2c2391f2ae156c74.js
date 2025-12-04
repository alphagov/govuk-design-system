!(function () {
  'use strict'
  function e(e, t = {}) {
    var n
    const r = e.getAttribute('tabindex')
    function o() {
      var n
      ;(null == (n = t.onBlur) || n.call(e), r || e.removeAttribute('tabindex'))
    }
    ;(r || e.setAttribute('tabindex', '-1'),
      e.addEventListener(
        'focus',
        function () {
          e.addEventListener('blur', o, { once: !0 })
        },
        { once: !0 }
      ),
      null == (n = t.onBeforeFocus) || n.call(e),
      e.focus())
  }
  function t(e = document.body) {
    return !!e && e.classList.contains('govuk-frontend-supported')
  }
  function n(e) {
    return (
      !!e &&
      'object' == typeof e &&
      !(function (e) {
        return Array.isArray(e)
      })(e)
    )
  }
  function r(e) {
    return !!e && (e instanceof Element || e instanceof Document)
  }
  function o(e, t) {
    return `${e.moduleName}: ${t}`
  }
  class i extends Error {
    constructor(...e) {
      ;(super(...e), (this.name = 'GOVUKFrontendError'))
    }
  }
  class s extends i {
    constructor(e = document.body) {
      const t =
        'noModule' in HTMLScriptElement.prototype
          ? 'GOV.UK Frontend initialised without `<body class="govuk-frontend-supported">` from template `<script>` snippet'
          : 'GOV.UK Frontend is not supported in this browser'
      ;(super(
        e ? t : 'GOV.UK Frontend initialised without `<script type="module">`'
      ),
        (this.name = 'SupportError'))
    }
  }
  class a extends i {
    constructor(...e) {
      ;(super(...e), (this.name = 'ConfigError'))
    }
  }
  class u extends i {
    constructor(e) {
      let t = 'string' == typeof e ? e : ''
      if (n(e)) {
        const { component: n, identifier: r, element: i, expectedType: s } = e
        ;((t = r),
          (t += i
            ? ` is not of type ${null != s ? s : 'HTMLElement'}`
            : ' not found'),
          n && (t = o(n, t)))
      }
      ;(super(t), (this.name = 'ElementError'))
    }
  }
  class c extends i {
    constructor(e) {
      ;(super(
        'string' == typeof e
          ? e
          : o(e, 'Root element (`$root`) already initialised')
      ),
        (this.name = 'InitError'))
    }
  }
  class l {
    get $root() {
      return this._$root
    }
    constructor(e) {
      this._$root = void 0
      const t = this.constructor
      if ('string' != typeof t.moduleName)
        throw new c('`moduleName` not defined in component')
      if (!(e instanceof t.elementType))
        throw new u({
          element: e,
          component: t,
          identifier: 'Root element (`$root`)',
          expectedType: t.elementType.name
        })
      ;((this._$root = e), t.checkSupport(), this.checkInitialised())
      const n = t.moduleName
      this.$root.setAttribute(`data-${n}-init`, '')
    }
    checkInitialised() {
      const e = this.constructor,
        t = e.moduleName
      if (
        t &&
        (function (e, t) {
          return e instanceof HTMLElement && e.hasAttribute(`data-${t}-init`)
        })(this.$root, t)
      )
        throw new c(e)
    }
    static checkSupport() {
      if (!t()) throw new s()
    }
  }
  l.elementType = HTMLElement
  const d = Symbol.for('configOverride')
  class f extends l {
    [d](e) {
      return {}
    }
    get config() {
      return this._config
    }
    constructor(e, t) {
      ;(super(e), (this._config = void 0))
      const r = this.constructor
      if (!n(r.defaults))
        throw new a(
          o(
            r,
            'Config passed as parameter into constructor but no defaults defined'
          )
        )
      const i = (function (e, t) {
        if (!n(e.schema))
          throw new a(
            o(
              e,
              'Config passed as parameter into constructor but no schema defined'
            )
          )
        const r = {},
          i = Object.entries(e.schema.properties)
        for (const n of i) {
          const [o, i] = n,
            s = o.toString()
          ;(s in t && (r[s] = p(t[s], i)),
            'object' === (null == i ? void 0 : i.type) &&
              (r[s] = m(e.schema, t, o)))
        }
        return r
      })(r, this._$root.dataset)
      this._config = h(r.defaults, null != t ? t : {}, this[d](i), i)
    }
  }
  function p(e, t) {
    const n = e ? e.trim() : ''
    let r,
      o = null == t ? void 0 : t.type
    switch (
      (o ||
        (['true', 'false'].includes(n) && (o = 'boolean'),
        n.length > 0 && isFinite(Number(n)) && (o = 'number')),
      o)
    ) {
      case 'boolean':
        r = 'true' === n
        break
      case 'number':
        r = Number(n)
        break
      default:
        r = e
    }
    return r
  }
  function h(...e) {
    const t = {}
    for (const r of e)
      for (const e of Object.keys(r)) {
        const o = t[e],
          i = r[e]
        n(o) && n(i) ? (t[e] = h(o, i)) : (t[e] = i)
      }
    return t
  }
  function m(e, t, r) {
    const o = e.properties[r]
    if ('object' !== (null == o ? void 0 : o.type)) return
    const i = { [r]: {} }
    for (const [s, a] of Object.entries(t)) {
      let e = i
      const t = s.split('.')
      for (const [o, i] of t.entries())
        n(e) &&
          (o < t.length - 1
            ? (n(e[i]) || (e[i] = {}), (e = e[i]))
            : s !== r && (e[i] = p(a)))
    }
    return i[r]
  }
  class v extends f {
    constructor(e, t = {}) {
      ;(super(e, t),
        (this.debounceFormSubmitTimer = null),
        this.$root.addEventListener('keydown', (e) => this.handleKeyDown(e)),
        this.$root.addEventListener('click', (e) => this.debounce(e)))
    }
    handleKeyDown(e) {
      const t = e.target
      ' ' === e.key &&
        t instanceof HTMLElement &&
        'button' === t.getAttribute('role') &&
        (e.preventDefault(), t.click())
    }
    debounce(e) {
      if (this.config.preventDoubleClick)
        return this.debounceFormSubmitTimer
          ? (e.preventDefault(), !1)
          : void (this.debounceFormSubmitTimer = window.setTimeout(() => {
              this.debounceFormSubmitTimer = null
            }, 1e3))
    }
  }
  ;((v.moduleName = 'govuk-button'),
    (v.defaults = Object.freeze({ preventDoubleClick: !1 })),
    (v.schema = Object.freeze({
      properties: { preventDoubleClick: { type: 'boolean' } }
    })))
  class g extends f {
    constructor(t, n = {}) {
      ;(super(t, n),
        'alert' !== this.$root.getAttribute('role') ||
          this.config.disableAutoFocus ||
          e(this.$root))
    }
  }
  ;((g.moduleName = 'govuk-notification-banner'),
    (g.defaults = Object.freeze({ disableAutoFocus: !1 })),
    (g.schema = Object.freeze({
      properties: { disableAutoFocus: { type: 'boolean' } }
    })))
  class y extends l {
    constructor(e) {
      ;(super(e),
        (this.$menuButton = void 0),
        (this.$menu = void 0),
        (this.menuIsOpen = !1),
        (this.mql = null))
      const t = this.$root.querySelector('.govuk-js-service-navigation-toggle')
      if (!t) return this
      const n = t.getAttribute('aria-controls')
      if (!n)
        throw new u({
          component: y,
          identifier:
            'Navigation button (`<button class="govuk-js-service-navigation-toggle">`) attribute (`aria-controls`)'
        })
      const r = document.getElementById(n)
      if (!r)
        throw new u({
          component: y,
          element: r,
          identifier: `Navigation (\`<ul id="${n}">\`)`
        })
      ;((this.$menu = r),
        (this.$menuButton = t),
        this.setupResponsiveChecks(),
        this.$menuButton.addEventListener('click', () =>
          this.handleMenuButtonClick()
        ))
    }
    setupResponsiveChecks() {
      const e = (function (e) {
        const t = `--govuk-breakpoint-${e}`
        return {
          property: t,
          value:
            window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(t) || void 0
        }
      })('tablet')
      if (!e.value)
        throw new u({
          component: y,
          identifier: `CSS custom property (\`${e.property}\`) on pseudo-class \`:root\``
        })
      ;((this.mql = window.matchMedia(`(min-width: ${e.value})`)),
        'addEventListener' in this.mql
          ? this.mql.addEventListener('change', () => this.checkMode())
          : this.mql.addListener(() => this.checkMode()),
        this.checkMode())
    }
    checkMode() {
      this.mql &&
        this.$menu &&
        this.$menuButton &&
        (this.mql.matches
          ? (this.$menu.removeAttribute('hidden'),
            this.$menuButton.setAttribute('hidden', ''))
          : (this.$menuButton.removeAttribute('hidden'),
            this.$menuButton.setAttribute(
              'aria-expanded',
              this.menuIsOpen.toString()
            ),
            this.menuIsOpen
              ? this.$menu.removeAttribute('hidden')
              : this.$menu.setAttribute('hidden', '')))
    }
    handleMenuButtonClick() {
      ;((this.menuIsOpen = !this.menuIsOpen), this.checkMode())
    }
  }
  y.moduleName = 'govuk-service-navigation'
  class b extends l {
    constructor(t) {
      var n
      super(t)
      const r = this.$root.hash,
        o = null != (n = this.$root.getAttribute('href')) ? n : ''
      if (
        this.$root.origin !== window.location.origin ||
        this.$root.pathname !== window.location.pathname
      )
        return
      const i = r.replace('#', '')
      if (!i)
        throw new u(
          `Skip link: Target link (\`href="${o}"\`) has no hash fragment`
        )
      const s = document.getElementById(i)
      if (!s)
        throw new u({
          component: b,
          element: s,
          identifier: `Target content (\`id="${i}"\`)`
        })
      this.$root.addEventListener('click', () =>
        e(s, {
          onBeforeFocus() {
            s.classList.add('govuk-skip-link-focused-element')
          },
          onBlur() {
            s.classList.remove('govuk-skip-link-focused-element')
          }
        })
      )
    }
  }
  function w(e, o, i) {
    let a
    const c = (function (e) {
      let t,
        o = document
      if (n(e)) {
        const n = e
        ;((r(n.scope) || null === n.scope) && (o = n.scope),
          'function' == typeof n.onError && (t = n.onError))
      }
      return (r(e) && (o = e), { scope: o, onError: t })
    })(i)
    try {
      var l
      if (!t()) throw new s()
      if (null === c.scope)
        throw new u({
          element: c.scope,
          component: e,
          identifier: 'Scope element (`$scope`)'
        })
      a =
        null == (l = c.scope)
          ? void 0
          : l.querySelectorAll(`[data-module="${e.moduleName}"]`)
    } catch (d) {
      return (
        c.onError ? c.onError(d, { component: e, config: o }) : console.log(d),
        []
      )
    }
    return Array.from(null != a ? a : [])
      .map((t) => {
        try {
          return void 0 !== o ? new e(t, o) : new e(t)
        } catch (d) {
          return (
            c.onError
              ? c.onError(d, { element: t, component: e, config: o })
              : console.log(d),
            null
          )
        }
      })
      .filter(Boolean)
  }
  function x() {
    ;(window.ga && window.ga.loaded) ||
      (function (e, t, n, r, o) {
        ;((e[r] = e[r] || []),
          e[r].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }))
        const i = t.createElement('script')
        ;((i.async = !0),
          (i.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-53XG2JT'),
          document.head.appendChild(i))
      })(window, document, 0, 'dataLayer')
  }
  function E(e) {
    ;((window.dataLayer = window.dataLayer || []), window.dataLayer.push(e))
  }
  function S(e) {
    return (e = (e = (e = (e = e.replace(
      /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g,
      '[REDACTED EMAIL]'
    )).replace(
      /\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,
      '[REDACTED POSTCODE]'
    )).replace(
      /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/g,
      '[REDACTED NI NUMBER]'
    )).replace(/[0-9]+/g, '[REDACTED NUMBER]'))
  }
  function k(e, t) {
    return e.map((e, n) => ({
      name: e.title,
      category: e.section,
      list: t,
      position: n + 1
    }))
  }
  ;((b.elementType = HTMLAnchorElement), (b.moduleName = 'govuk-skip-link'))
  class O extends l {
    constructor(e) {
      super(e)
      const t = document.querySelector('.app-footer'),
        n = document.querySelector('.app-subnav')
      if (!('IntersectionObserver' in window))
        return (this.$root.classList.remove('app-back-to-top--hidden'), this)
      if (!t || !n) return this
      let r = !1,
        o = !1,
        i = 0
      const s = new window.IntersectionObserver((e) => {
        const s = e.find((e) => e.target === t),
          a = e.find((e) => e.target === n)
        ;(s && (r = s.isIntersecting),
          a && ((o = a.isIntersecting), (i = a.intersectionRatio)),
          o || r
            ? this.$root.classList.remove('app-back-to-top--fixed')
            : this.$root.classList.add('app-back-to-top--fixed'),
          o && 1 === i
            ? this.$root.classList.add('app-back-to-top--hidden')
            : this.$root.classList.remove('app-back-to-top--hidden'))
      })
      ;(s.observe(t), s.observe(n))
    }
  }
  O.moduleName = 'app-back-to-top'
  const T = 'design_system_cookies_policy',
    _ = '8F2EMQL51V',
    C = 'GHT8W0QGD9',
    I = {
      analytics: ['_ga', `_ga_${_}`, `_ga_${C}`],
      campaign: ['campaign'],
      essential: ['design_system_cookies_policy']
    },
    L = { analytics: null, campaign: null }
  function A(e, t, n) {
    if (void 0 === t) return F(e)
    !1 === t || null === t
      ? (function (e) {
          A(e) &&
            ((document.cookie = `${e}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`),
            (document.cookie = `${e}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${window.location.hostname};path=/`),
            (document.cookie = `${e}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.hostname};path=/`))
        })(e)
      : (void 0 === n && (n = { days: 30 }), Q(e, t, n))
  }
  function N() {
    const e = F(T)
    let t
    if (!e) return null
    try {
      t = JSON.parse(e)
    } catch (n) {
      return null
    }
    return t
  }
  function j(e) {
    return e && e.version >= window.GDS_CONSENT_COOKIE_VERSION
  }
  function P(e) {
    const t = N() || JSON.parse(JSON.stringify(L))
    for (const n in e) t[n] = e[n]
    ;(delete t.essential,
      (t.version = window.GDS_CONSENT_COOKIE_VERSION),
      Q(T, JSON.stringify(t), { days: 365 }),
      R())
  }
  function R() {
    const e = N() || JSON.parse(JSON.stringify(L))
    for (const t in e)
      if (
        'version' !== t &&
        'essential' !== t &&
        ('analytics' === t && e[t]
          ? ((window[`ga-disable-G-${_}`] = !1),
            (window[`ga-disable-G-${C}`] = !1),
            x(),
            $())
          : ((window[`ga-disable-G-${_}`] = !0),
            (window[`ga-disable-G-${C}`] = !0)),
        'campaign' === t && (window[t] = e[t]),
        !e[t])
      ) {
        I[t].forEach((e) => {
          A(e, null)
        })
      }
  }
  function $() {
    for (const e of ['_gid', '_gat_UA-26179049-17', '_gat_UA-116229859-1'])
      A(e, null)
  }
  function M(e, t) {
    if ('essential' === e) return !0
    try {
      return t[e]
    } catch (n) {
      return (console.error(n), !1)
    }
  }
  function F(e) {
    const t = `${e}=`,
      n = document.cookie.split(';')
    for (let r = 0, o = n.length; r < o; r++) {
      let e = n[r]
      for (; ' ' === e.charAt(0); ) e = e.substring(1, e.length)
      if (0 === e.indexOf(t)) return decodeURIComponent(e.substring(t.length))
    }
    return null
  }
  function Q(e, t, n) {
    if (
      (function (e) {
        if (e === T) return !0
        let t = N()
        j(t) || (t = L)
        for (const n in I) if ('-1' !== I[n].indexOf(e)) return M(n, t)
        return !1
      })(e)
    ) {
      void 0 === n && (n = {})
      let r = `${e}=${t}; path=/`
      if (n.days) {
        const e = new Date()
        ;(e.setTime(e.getTime() + 24 * n.days * 60 * 60 * 1e3),
          (r = `${r}; expires=${e.toUTCString()}`))
      }
      ;('https:' === document.location.protocol && (r = `${r}; Secure`),
        (document.cookie = r))
    }
  }
  class D extends f {
    static checkSupport() {
      if ((super.checkSupport(), D.onCookiesPage()))
        throw Error('Cancelled initialisation as on cookie page')
    }
    static onCookiesPage() {
      return '/cookies/' === window.location.pathname
    }
    constructor(e, t) {
      super(e, t)
      const n = e.querySelector('.js-cookie-banner-accept'),
        r = e.querySelector('.js-cookie-banner-reject'),
        o = e.querySelector('.js-cookie-banner-message'),
        i = e.querySelector('.js-cookie-banner-confirmation-accept'),
        s = e.querySelector('.js-cookie-banner-confirmation-reject'),
        a = e.querySelectorAll('.js-cookie-banner-hide')
      if (
        !(
          n instanceof HTMLButtonElement &&
          r instanceof HTMLButtonElement &&
          o instanceof HTMLElement &&
          i instanceof HTMLElement &&
          s instanceof HTMLElement &&
          a.length
        )
      )
        return this
      ;((this.$acceptButton = n),
        (this.$rejectButton = r),
        (this.$cookieMessage = o),
        (this.$cookieConfirmationAccept = i),
        (this.$cookieConfirmationReject = s),
        (this.$rootHideButtons = a))
      const u = N()
      ;((u && j(u)) || (R(), this.$root.removeAttribute('hidden')),
        this.$acceptButton.addEventListener('click', () =>
          this.acceptCookies()
        ),
        this.$rejectButton.addEventListener('click', () =>
          this.rejectCookies()
        ),
        this.$rootHideButtons.forEach((e) => {
          e.addEventListener('click', () => this.hideBanner())
        }))
    }
    hideBanner() {
      this.$root.setAttribute('hidden', 'true')
    }
    acceptCookies() {
      ;(P({ [this.config.cookieCategory]: !0 }),
        this.$cookieMessage.setAttribute('hidden', 'true'),
        this.revealConfirmationMessage(this.$cookieConfirmationAccept))
    }
    rejectCookies() {
      ;(P({ [this.config.cookieCategory]: !1 }),
        this.$cookieMessage.setAttribute('hidden', 'true'),
        this.revealConfirmationMessage(this.$cookieConfirmationReject))
    }
    revealConfirmationMessage(e) {
      ;(e.removeAttribute('hidden'),
        e.getAttribute('tabindex') ||
          (e.setAttribute('tabindex', '-1'),
          e.addEventListener('blur', () => {
            e.removeAttribute('tabindex')
          })),
        e.focus())
    }
  }
  ;((D.moduleName = 'govuk-cookie-banner'),
    (D.defaults = { cookieCategory: 'analytics' }),
    (D.schema = { properties: { cookieCategory: { type: 'string' } } }))
  class B extends l {
    constructor(e) {
      super(e)
      const t = this.$root.querySelector('.js-cookies-page-form')
      if (!(t instanceof HTMLFormElement)) return this
      this.$cookieForm = t
      const n = this.$cookieForm.querySelectorAll(
          '.js-cookies-page-form-fieldset'
        ),
        r = this.$cookieForm.querySelector('.js-cookies-form-button')
      if (!(n.length && r instanceof HTMLButtonElement)) return this
      ;((this.$cookieFormFieldsets = n), (this.$cookieFormButton = r))
      const o = this.$root.querySelector('.js-cookies-page-success')
      o instanceof HTMLElement && (this.$successNotification = o)
      const i = N()
      ;(this.$cookieFormFieldsets.forEach((e) => {
        ;(this.showUserPreference(e, i), e.removeAttribute('hidden'))
      }),
        this.$cookieFormButton.removeAttribute('hidden'),
        this.$cookieForm.addEventListener('submit', (e) =>
          this.savePreferences(e)
        ))
    }
    savePreferences(e) {
      e.preventDefault()
      const t = {}
      ;(this.$cookieFormFieldsets.forEach((e) => {
        const n = this.getCookieType(e)
        if (!n) return
        const r = e.querySelector(`input[name="cookies[${n}]"]:checked`)
        r instanceof HTMLInputElement && (t[n] = 'yes' === r.value)
      }),
        P(t),
        this.showSuccessNotification())
    }
    showUserPreference(e, t) {
      const n = this.getCookieType(e)
      let r = !1
      n && t && void 0 !== t[n] && (r = t[n])
      const o = r ? 'yes' : 'no',
        i = e.querySelector(`input[name="cookies[${n}]"][value=${o}]`)
      i && (i.checked = !0)
    }
    showSuccessNotification() {
      this.$successNotification &&
        (this.$successNotification.removeAttribute('hidden'),
        this.$successNotification.getAttribute('tabindex') ||
          this.$successNotification.setAttribute('tabindex', '-1'),
        this.$successNotification.focus(),
        window.scrollTo(0, 0))
    }
    getCookieType(e) {
      return e.getAttribute('data-cookie-type')
    }
  }
  function q(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, 'default')
      ? e.default
      : e
  }
  B.moduleName = 'app-cookies-page'
  var z,
    H = { exports: {} }
  var V,
    W =
      (z ||
        ((z = 1),
        (V = function () {
          return (function () {
            var e = {
                686: function (e, t, n) {
                  n.d(t, {
                    default: function () {
                      return E
                    }
                  })
                  var r = n(279),
                    o = n.n(r),
                    i = n(370),
                    s = n.n(i),
                    a = n(817),
                    u = n.n(a)
                  function c(e) {
                    try {
                      return document.execCommand(e)
                    } catch (t) {
                      return !1
                    }
                  }
                  var l = function (e) {
                      var t = u()(e)
                      return (c('cut'), t)
                    },
                    d = function (e, t) {
                      var n = (function (e) {
                        var t =
                            'rtl' ===
                            document.documentElement.getAttribute('dir'),
                          n = document.createElement('textarea')
                        ;((n.style.fontSize = '12pt'),
                          (n.style.border = '0'),
                          (n.style.padding = '0'),
                          (n.style.margin = '0'),
                          (n.style.position = 'absolute'),
                          (n.style[t ? 'right' : 'left'] = '-9999px'))
                        var r =
                          window.pageYOffset ||
                          document.documentElement.scrollTop
                        return (
                          (n.style.top = ''.concat(r, 'px')),
                          n.setAttribute('readonly', ''),
                          (n.value = e),
                          n
                        )
                      })(e)
                      t.container.appendChild(n)
                      var r = u()(n)
                      return (c('copy'), n.remove(), r)
                    },
                    f = function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : { container: document.body },
                        n = ''
                      return (
                        'string' == typeof e
                          ? (n = d(e, t))
                          : e instanceof HTMLInputElement &&
                              ![
                                'text',
                                'search',
                                'url',
                                'tel',
                                'password'
                              ].includes(null == e ? void 0 : e.type)
                            ? (n = d(e.value, t))
                            : ((n = u()(e)), c('copy')),
                        n
                      )
                    }
                  function p(e) {
                    return (
                      (p =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                          ? function (e) {
                              return typeof e
                            }
                          : function (e) {
                              return e &&
                                'function' == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? 'symbol'
                                : typeof e
                            }),
                      p(e)
                    )
                  }
                  var h = function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = e.action,
                      n = void 0 === t ? 'copy' : t,
                      r = e.container,
                      o = e.target,
                      i = e.text
                    if ('copy' !== n && 'cut' !== n)
                      throw new Error(
                        'Invalid "action" value, use either "copy" or "cut"'
                      )
                    if (void 0 !== o) {
                      if (!o || 'object' !== p(o) || 1 !== o.nodeType)
                        throw new Error(
                          'Invalid "target" value, use a valid Element'
                        )
                      if ('copy' === n && o.hasAttribute('disabled'))
                        throw new Error(
                          'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                        )
                      if (
                        'cut' === n &&
                        (o.hasAttribute('readonly') ||
                          o.hasAttribute('disabled'))
                      )
                        throw new Error(
                          'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                        )
                    }
                    return i
                      ? f(i, { container: r })
                      : o
                        ? 'cut' === n
                          ? l(o)
                          : f(o, { container: r })
                        : void 0
                  }
                  function m(e) {
                    return (
                      (m =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                          ? function (e) {
                              return typeof e
                            }
                          : function (e) {
                              return e &&
                                'function' == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? 'symbol'
                                : typeof e
                            }),
                      m(e)
                    )
                  }
                  function v(e, t) {
                    for (var n = 0; n < t.length; n++) {
                      var r = t[n]
                      ;((r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r))
                    }
                  }
                  function g(e, t) {
                    return (
                      (g =
                        Object.setPrototypeOf ||
                        function (e, t) {
                          return ((e.__proto__ = t), e)
                        }),
                      g(e, t)
                    )
                  }
                  function y(e) {
                    var t = (function () {
                      if ('undefined' == typeof Reflect || !Reflect.construct)
                        return !1
                      if (Reflect.construct.sham) return !1
                      if ('function' == typeof Proxy) return !0
                      try {
                        return (
                          Date.prototype.toString.call(
                            Reflect.construct(Date, [], function () {})
                          ),
                          !0
                        )
                      } catch (e) {
                        return !1
                      }
                    })()
                    return function () {
                      var n,
                        r = b(e)
                      if (t) {
                        var o = b(this).constructor
                        n = Reflect.construct(r, arguments, o)
                      } else n = r.apply(this, arguments)
                      return (function (e, t) {
                        return !t ||
                          ('object' !== m(t) && 'function' != typeof t)
                          ? (function (e) {
                              if (void 0 === e)
                                throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called"
                                )
                              return e
                            })(e)
                          : t
                      })(this, n)
                    }
                  }
                  function b(e) {
                    return (
                      (b = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (e) {
                            return e.__proto__ || Object.getPrototypeOf(e)
                          }),
                      b(e)
                    )
                  }
                  function w(e, t) {
                    var n = 'data-clipboard-'.concat(e)
                    if (t.hasAttribute(n)) return t.getAttribute(n)
                  }
                  var x = (function (e) {
                      !(function (e, t) {
                        if ('function' != typeof t && null !== t)
                          throw new TypeError(
                            'Super expression must either be null or a function'
                          )
                        ;((e.prototype = Object.create(t && t.prototype, {
                          constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                          }
                        })),
                          t && g(e, t))
                      })(i, e)
                      var t,
                        n,
                        r,
                        o = y(i)
                      function i(e, t) {
                        var n
                        return (
                          (function (e, t) {
                            if (!(e instanceof t))
                              throw new TypeError(
                                'Cannot call a class as a function'
                              )
                          })(this, i),
                          (n = o.call(this)).resolveOptions(t),
                          n.listenClick(e),
                          n
                        )
                      }
                      return (
                        (t = i),
                        (n = [
                          {
                            key: 'resolveOptions',
                            value: function () {
                              var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                  ? arguments[0]
                                  : {}
                              ;((this.action =
                                'function' == typeof e.action
                                  ? e.action
                                  : this.defaultAction),
                                (this.target =
                                  'function' == typeof e.target
                                    ? e.target
                                    : this.defaultTarget),
                                (this.text =
                                  'function' == typeof e.text
                                    ? e.text
                                    : this.defaultText),
                                (this.container =
                                  'object' === m(e.container)
                                    ? e.container
                                    : document.body))
                            }
                          },
                          {
                            key: 'listenClick',
                            value: function (e) {
                              var t = this
                              this.listener = s()(e, 'click', function (e) {
                                return t.onClick(e)
                              })
                            }
                          },
                          {
                            key: 'onClick',
                            value: function (e) {
                              var t = e.delegateTarget || e.currentTarget,
                                n = this.action(t) || 'copy',
                                r = h({
                                  action: n,
                                  container: this.container,
                                  target: this.target(t),
                                  text: this.text(t)
                                })
                              this.emit(r ? 'success' : 'error', {
                                action: n,
                                text: r,
                                trigger: t,
                                clearSelection: function () {
                                  ;(t && t.focus(),
                                    window.getSelection().removeAllRanges())
                                }
                              })
                            }
                          },
                          {
                            key: 'defaultAction',
                            value: function (e) {
                              return w('action', e)
                            }
                          },
                          {
                            key: 'defaultTarget',
                            value: function (e) {
                              var t = w('target', e)
                              if (t) return document.querySelector(t)
                            }
                          },
                          {
                            key: 'defaultText',
                            value: function (e) {
                              return w('text', e)
                            }
                          },
                          {
                            key: 'destroy',
                            value: function () {
                              this.listener.destroy()
                            }
                          }
                        ]),
                        (r = [
                          {
                            key: 'copy',
                            value: function (e) {
                              var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                  ? arguments[1]
                                  : { container: document.body }
                              return f(e, t)
                            }
                          },
                          {
                            key: 'cut',
                            value: function (e) {
                              return l(e)
                            }
                          },
                          {
                            key: 'isSupported',
                            value: function () {
                              var e =
                                  arguments.length > 0 &&
                                  void 0 !== arguments[0]
                                    ? arguments[0]
                                    : ['copy', 'cut'],
                                t = 'string' == typeof e ? [e] : e,
                                n = !!document.queryCommandSupported
                              return (
                                t.forEach(function (e) {
                                  n = n && !!document.queryCommandSupported(e)
                                }),
                                n
                              )
                            }
                          }
                        ]),
                        n && v(t.prototype, n),
                        r && v(t, r),
                        i
                      )
                    })(o()),
                    E = x
                },
                828: function (e) {
                  if (
                    'undefined' != typeof Element &&
                    !Element.prototype.matches
                  ) {
                    var t = Element.prototype
                    t.matches =
                      t.matchesSelector ||
                      t.mozMatchesSelector ||
                      t.msMatchesSelector ||
                      t.oMatchesSelector ||
                      t.webkitMatchesSelector
                  }
                  e.exports = function (e, t) {
                    for (; e && 9 !== e.nodeType; ) {
                      if ('function' == typeof e.matches && e.matches(t))
                        return e
                      e = e.parentNode
                    }
                  }
                },
                438: function (e, t, n) {
                  var r = n(828)
                  function o(e, t, n, r, o) {
                    var s = i.apply(this, arguments)
                    return (
                      e.addEventListener(n, s, o),
                      {
                        destroy: function () {
                          e.removeEventListener(n, s, o)
                        }
                      }
                    )
                  }
                  function i(e, t, n, o) {
                    return function (n) {
                      ;((n.delegateTarget = r(n.target, t)),
                        n.delegateTarget && o.call(e, n))
                    }
                  }
                  e.exports = function (e, t, n, r, i) {
                    return 'function' == typeof e.addEventListener
                      ? o.apply(null, arguments)
                      : 'function' == typeof n
                        ? o.bind(null, document).apply(null, arguments)
                        : ('string' == typeof e &&
                            (e = document.querySelectorAll(e)),
                          Array.prototype.map.call(e, function (e) {
                            return o(e, t, n, r, i)
                          }))
                  }
                },
                879: function (e, t) {
                  ;((t.node = function (e) {
                    return (
                      void 0 !== e &&
                      e instanceof HTMLElement &&
                      1 === e.nodeType
                    )
                  }),
                    (t.nodeList = function (e) {
                      var n = Object.prototype.toString.call(e)
                      return (
                        void 0 !== e &&
                        ('[object NodeList]' === n ||
                          '[object HTMLCollection]' === n) &&
                        'length' in e &&
                        (0 === e.length || t.node(e[0]))
                      )
                    }),
                    (t.string = function (e) {
                      return 'string' == typeof e || e instanceof String
                    }),
                    (t.fn = function (e) {
                      return (
                        '[object Function]' ===
                        Object.prototype.toString.call(e)
                      )
                    }))
                },
                370: function (e, t, n) {
                  var r = n(879),
                    o = n(438)
                  e.exports = function (e, t, n) {
                    if (!e && !t && !n)
                      throw new Error('Missing required arguments')
                    if (!r.string(t))
                      throw new TypeError('Second argument must be a String')
                    if (!r.fn(n))
                      throw new TypeError('Third argument must be a Function')
                    if (r.node(e))
                      return (function (e, t, n) {
                        return (
                          e.addEventListener(t, n),
                          {
                            destroy: function () {
                              e.removeEventListener(t, n)
                            }
                          }
                        )
                      })(e, t, n)
                    if (r.nodeList(e))
                      return (function (e, t, n) {
                        return (
                          Array.prototype.forEach.call(e, function (e) {
                            e.addEventListener(t, n)
                          }),
                          {
                            destroy: function () {
                              Array.prototype.forEach.call(e, function (e) {
                                e.removeEventListener(t, n)
                              })
                            }
                          }
                        )
                      })(e, t, n)
                    if (r.string(e))
                      return (function (e, t, n) {
                        return o(document.body, e, t, n)
                      })(e, t, n)
                    throw new TypeError(
                      'First argument must be a String, HTMLElement, HTMLCollection, or NodeList'
                    )
                  }
                },
                817: function (e) {
                  e.exports = function (e) {
                    var t
                    if ('SELECT' === e.nodeName) (e.focus(), (t = e.value))
                    else if (
                      'INPUT' === e.nodeName ||
                      'TEXTAREA' === e.nodeName
                    ) {
                      var n = e.hasAttribute('readonly')
                      ;(n || e.setAttribute('readonly', ''),
                        e.select(),
                        e.setSelectionRange(0, e.value.length),
                        n || e.removeAttribute('readonly'),
                        (t = e.value))
                    } else {
                      e.hasAttribute('contenteditable') && e.focus()
                      var r = window.getSelection(),
                        o = document.createRange()
                      ;(o.selectNodeContents(e),
                        r.removeAllRanges(),
                        r.addRange(o),
                        (t = r.toString()))
                    }
                    return t
                  }
                },
                279: function (e) {
                  function t() {}
                  ;((t.prototype = {
                    on: function (e, t, n) {
                      var r = this.e || (this.e = {})
                      return (
                        (r[e] || (r[e] = [])).push({ fn: t, ctx: n }),
                        this
                      )
                    },
                    once: function (e, t, n) {
                      var r = this
                      function o() {
                        ;(r.off(e, o), t.apply(n, arguments))
                      }
                      return ((o._ = t), this.on(e, o, n))
                    },
                    emit: function (e) {
                      for (
                        var t = [].slice.call(arguments, 1),
                          n = ((this.e || (this.e = {}))[e] || []).slice(),
                          r = 0,
                          o = n.length;
                        r < o;
                        r++
                      )
                        n[r].fn.apply(n[r].ctx, t)
                      return this
                    },
                    off: function (e, t) {
                      var n = this.e || (this.e = {}),
                        r = n[e],
                        o = []
                      if (r && t)
                        for (var i = 0, s = r.length; i < s; i++)
                          r[i].fn !== t && r[i].fn._ !== t && o.push(r[i])
                      return (o.length ? (n[e] = o) : delete n[e], this)
                    }
                  }),
                    (e.exports = t),
                    (e.exports.TinyEmitter = t))
                }
              },
              t = {}
            function n(r) {
              if (t[r]) return t[r].exports
              var o = (t[r] = { exports: {} })
              return (e[r](o, o.exports, n), o.exports)
            }
            return (
              (n.n = function (e) {
                var t =
                  e && e.__esModule
                    ? function () {
                        return e.default
                      }
                    : function () {
                        return e
                      }
                return (n.d(t, { a: t }), t)
              }),
              (n.d = function (e, t) {
                for (var r in t)
                  n.o(t, r) &&
                    !n.o(e, r) &&
                    Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
              }),
              (n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
              }),
              n(686)
            )
          })().default
        }),
        (H.exports = V())),
      H.exports),
    U = q(W)
  class G extends l {
    static checkSupport() {
      if ((l.checkSupport(), !U.isSupported()))
        throw Error('ClipboardJS not supported in this browser')
    }
    constructor(e) {
      ;(super(e),
        (this.$pre = this.$root.querySelector('pre')),
        (this.resetTimeoutId = null),
        (this.$button = document.createElement('button')),
        (this.$button.className = 'app-copy-button'),
        (this.$button.textContent = 'Copy code'),
        (this.$status = document.createElement('span')),
        (this.$status.className = 'govuk-visually-hidden'),
        this.$status.setAttribute('aria-live', 'assertive'),
        this.$root.prepend(this.$status),
        this.$root.prepend(this.$button))
      const t = new U(this.$button, { target: () => this.$pre })
      ;(t.on('success', (e) => this.successAction(e)),
        t.on('error', (e) => this.resetAction(e)))
    }
    successAction(e) {
      ;((this.$button.textContent = this.$status.textContent = 'Code copied'),
        this.resetAction(e, 5e3))
    }
    resetAction(e, t = 0) {
      ;(e.clearSelection(),
        this.resetTimeoutId && window.clearTimeout(this.resetTimeoutId),
        (this.resetTimeoutId = window.setTimeout(() => {
          ;((this.$button.textContent = 'Copy code'),
            (this.$status.textContent = ''))
        }, t)))
    }
  }
  G.moduleName = 'app-copy'
  class K extends l {
    static checkSupport() {
      l.checkSupport()
      const e = N()
      if (!e || (e && !e.campaign))
        throw Error('Campaign consent cookies not accepted')
    }
    constructor(e) {
      ;(super(e), this.replacePlaceholder())
    }
    replacePlaceholder() {
      if (this.$root.querySelector('iframe')) return
      const e = N()
      if (e && e.campaign) {
        const e = this.$root.querySelector('.app-embed-card__placeholder'),
          t = this.$root.querySelector('.app-embed-card__placeholder-text'),
          n = t ? t.textContent : '',
          r = e
            .getAttribute('href')
            .match(
              /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/
            )[5],
          o = this.createIframe(r, n)
        e.remove()
        this.$root
          .querySelector('.app-embed-card__placeholder-iframe-container')
          .appendChild(o)
      }
    }
    createIframe(e, t) {
      const n = document.createElement('IFRAME')
      return (
        n.setAttribute('src', `https://www.youtube-nocookie.com/embed/${e}`),
        n.setAttribute('width', '560'),
        n.setAttribute('height', '315'),
        n.setAttribute('title', t),
        n.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;'
        ),
        n.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin'),
        n.setAttribute('allowfullscreen', 'true'),
        n.setAttribute('frameborder', '0'),
        n
      )
    }
  }
  K.moduleName = 'app-embed-card'
  var J,
    Y = { exports: {} }
  var X,
    Z =
      (J ||
        ((J = 1),
        (X = Y),
        (function (e) {
          if ('undefined' != typeof window) {
            var t,
              n,
              r = 0,
              o = !1,
              i = !1,
              s = 7,
              a = '[iFrameSizer]',
              u = a.length,
              c = null,
              l = window.requestAnimationFrame,
              d = Object.freeze({
                max: 1,
                scroll: 1,
                bodyScroll: 1,
                documentElementScroll: 1
              }),
              f = {},
              p = null,
              h = Object.freeze({
                autoResize: !0,
                bodyBackground: null,
                bodyMargin: null,
                bodyMarginV1: 8,
                bodyPadding: null,
                checkOrigin: !0,
                inPageLinks: !1,
                enablePublicMethods: !0,
                heightCalculationMethod: 'bodyOffset',
                id: 'iFrameResizer',
                interval: 32,
                license: '1jqr0si6pnt',
                log: !1,
                maxHeight: 1 / 0,
                maxWidth: 1 / 0,
                minHeight: 0,
                minWidth: 0,
                mouseEvents: !0,
                resizeFrom: 'parent',
                scrolling: !1,
                sizeHeight: !0,
                sizeWidth: !1,
                warningTimeout: 5e3,
                tolerance: 0,
                widthCalculationMethod: 'scroll',
                onClose: function () {
                  return !0
                },
                onClosed: function () {},
                onInit: function () {},
                onMessage: function () {
                  S('onMessage function not defined')
                },
                onMouseEnter: function () {},
                onMouseLeave: function () {},
                onResized: function () {},
                onScroll: function () {
                  return !0
                }
              }),
              m = {}
            ;(window.jQuery !== e &&
              ((n = window.jQuery).fn
                ? n.fn.iFrameResize ||
                  (n.fn.iFrameResize = function (e) {
                    return this.filter('iframe')
                      .each(function (t, n) {
                        M(n, e)
                      })
                      .end()
                  })
                : E('', 'Unable to bind to jQuery, it is not fully loaded.')),
              (X.exports = q()),
              (window.iFrameResize = window.iFrameResize || q()))
          }
          function v() {
            return (
              window.MutationObserver ||
              window.WebKitMutationObserver ||
              window.MozMutationObserver
            )
          }
          function g(e, t, n) {
            e.addEventListener(t, n, !1)
          }
          function y(e, t, n) {
            e.removeEventListener(t, n, !1)
          }
          function b(e) {
            return (
              a +
              '[' +
              (function (e) {
                var t = 'Host page: ' + e
                return (
                  window.top !== window.self &&
                    (t =
                      window.parentIFrame && window.parentIFrame.getId
                        ? window.parentIFrame.getId() + ': ' + e
                        : 'Nested host page: ' + e),
                  t
                )
              })(e) +
              ']'
            )
          }
          function w(e) {
            return f[e] ? f[e].log : o
          }
          function x(e, t) {
            k('log', e, t, w(e))
          }
          function E(e, t) {
            k('info', e, t, w(e))
          }
          function S(e, t) {
            k('warn', e, t, !0)
          }
          function k(e, t, n, r) {
            !0 === r && 'object' == typeof window.console && console[e](b(t), n)
          }
          function O(e) {
            function t() {
              ;(o('Height'),
                o('Width'),
                P(
                  function () {
                    ;(j(D), L(B), b('onResized', D))
                  },
                  D,
                  'init'
                ))
            }
            function n(e) {
              return 'border-box' !== e.boxSizing
                ? 0
                : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) +
                    (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0)
            }
            function r(e) {
              return 'border-box' !== e.boxSizing
                ? 0
                : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) +
                    (e.borderBottomWidth
                      ? parseInt(e.borderBottomWidth, 10)
                      : 0)
            }
            function o(e) {
              var t = Number(f[B]['max' + e]),
                n = Number(f[B]['min' + e]),
                r = e.toLowerCase(),
                o = Number(D[r])
              ;(x(B, 'Checking ' + r + ' is in range ' + n + '-' + t),
                o < n && ((o = n), x(B, 'Set ' + r + ' to min value')),
                o > t && ((o = t), x(B, 'Set ' + r + ' to max value')),
                (D[r] = '' + o))
            }
            function i(e) {
              return Q.slice(Q.indexOf(':') + s + e)
            }
            function l(e, t) {
              var n, r, o
              ;((n = function () {
                var n, r
                R(
                  'Send Page Info',
                  'pageInfo:' +
                    ((n = document.body.getBoundingClientRect()),
                    (r = D.iframe.getBoundingClientRect()),
                    JSON.stringify({
                      iframeHeight: r.height,
                      iframeWidth: r.width,
                      clientHeight: Math.max(
                        document.documentElement.clientHeight,
                        window.innerHeight || 0
                      ),
                      clientWidth: Math.max(
                        document.documentElement.clientWidth,
                        window.innerWidth || 0
                      ),
                      offsetTop: parseInt(r.top - n.top, 10),
                      offsetLeft: parseInt(r.left - n.left, 10),
                      scrollTop: window.pageYOffset,
                      scrollLeft: window.pageXOffset,
                      documentHeight: document.documentElement.clientHeight,
                      documentWidth: document.documentElement.clientWidth,
                      windowHeight: window.innerHeight,
                      windowWidth: window.innerWidth
                    })),
                  e,
                  t
                )
              }),
                (r = 32),
                m[(o = t)] ||
                  (m[o] = setTimeout(function () {
                    ;((m[o] = null), n())
                  }, r)))
            }
            function d(e) {
              var t = e.getBoundingClientRect()
              return (
                I(B),
                {
                  x: Math.floor(Number(t.left) + Number(c.x)),
                  y: Math.floor(Number(t.top) + Number(c.y))
                }
              )
            }
            function p(e) {
              var t = e ? d(D.iframe) : { x: 0, y: 0 },
                n = { x: Number(D.width) + t.x, y: Number(D.height) + t.y }
              ;(x(
                B,
                'Reposition requested from iFrame (offset x:' +
                  t.x +
                  ' y:' +
                  t.y +
                  ')'
              ),
                window.top === window.self
                  ? ((c = n), h(), x(B, '--'))
                  : window.parentIFrame
                    ? window.parentIFrame['scrollTo' + (e ? 'Offset' : '')](
                        n.x,
                        n.y
                      )
                    : S(
                        B,
                        'Unable to scroll to requested position, window.parentIFrame not found'
                      ))
            }
            function h() {
              !1 === b('onScroll', c) ? A() : L(B)
            }
            function v(e) {
              var t = {}
              if (0 === Number(D.width) && 0 === Number(D.height)) {
                var n = i(9).split(':')
                t = { x: n[1], y: n[0] }
              } else t = { x: D.width, y: D.height }
              b(e, {
                iframe: D.iframe,
                screenX: Number(t.x),
                screenY: Number(t.y),
                type: D.type
              })
            }
            function b(e, t) {
              return T(B, e, t)
            }
            var w,
              k,
              O,
              _,
              M,
              F,
              Q = e.data,
              D = {},
              B = null
            '[iFrameResizerChild]Ready' === Q
              ? (function () {
                  for (var e in f)
                    R('iFrame requested init', $(e), f[e].iframe, e)
                })()
              : a === ('' + Q).slice(0, u) && Q.slice(u).split(':')[0] in f
                ? ((O = Q.slice(u).split(':')),
                  (_ = O[1] ? parseInt(O[1], 10) : 0),
                  (M = f[O[0]] && f[O[0]].iframe),
                  (F = getComputedStyle(M)),
                  (D = {
                    iframe: M,
                    id: O[0],
                    height: _ + n(F) + r(F),
                    width: O[2],
                    type: O[3]
                  }),
                  (B = D.id),
                  f[B] && (f[B].loaded = !0),
                  (k = D.type in { true: 1, false: 1, undefined: 1 }) &&
                    x(B, 'Ignoring init message from meta parent page'),
                  !k &&
                    (function (e) {
                      var t = !0
                      return (
                        f[e] ||
                          ((t = !1),
                          S(
                            D.type +
                              ' No settings for ' +
                              e +
                              '. Message was: ' +
                              Q
                          )),
                        t
                      )
                    })(B) &&
                    (x(B, 'Received: ' + Q),
                    (w = !0),
                    null === D.iframe &&
                      (S(B, 'IFrame (' + D.id + ') not found'), (w = !1)),
                    w &&
                      (function () {
                        var t,
                          n = e.origin,
                          r = f[B] && f[B].checkOrigin
                        if (
                          r &&
                          '' + n != 'null' &&
                          !(r.constructor === Array
                            ? (function () {
                                var e = 0,
                                  t = !1
                                for (
                                  x(
                                    B,
                                    'Checking connection is from allowed list of origins: ' +
                                      r
                                  );
                                  e < r.length;
                                  e++
                                )
                                  if (r[e] === n) {
                                    t = !0
                                    break
                                  }
                                return t
                              })()
                            : ((t = f[B] && f[B].remoteHost),
                              x(B, 'Checking connection is from: ' + t),
                              n === t))
                        )
                          throw new Error(
                            'Unexpected message received from: ' +
                              n +
                              ' for ' +
                              D.iframe.id +
                              '. Message was: ' +
                              e.data +
                              '. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.'
                          )
                        return !0
                      })() &&
                      (function () {
                        switch (
                          (f[B] &&
                            f[B].firstRun &&
                            f[B] &&
                            (f[B].firstRun = !1),
                          D.type)
                        ) {
                          case 'close':
                            C(D.iframe)
                            break
                          case 'message':
                            ;((s = i(6)),
                              x(
                                B,
                                'onMessage passed: {iframe: ' +
                                  D.iframe.id +
                                  ', message: ' +
                                  s +
                                  '}'
                              ),
                              b('onMessage', {
                                iframe: D.iframe,
                                message: JSON.parse(s)
                              }),
                              x(B, '--'))
                            break
                          case 'mouseenter':
                            v('onMouseEnter')
                            break
                          case 'mouseleave':
                            v('onMouseLeave')
                            break
                          case 'autoResize':
                            f[B].autoResize = JSON.parse(i(9))
                            break
                          case 'scrollTo':
                            p(!1)
                            break
                          case 'scrollToOffset':
                            p(!0)
                            break
                          case 'pageInfo':
                            ;(l(f[B] && f[B].iframe, B),
                              (function () {
                                function e(e, r) {
                                  function o() {
                                    f[n] ? l(f[n].iframe, n) : t()
                                  }
                                  ;['scroll', 'resize'].forEach(function (t) {
                                    ;(x(
                                      n,
                                      e + t + ' listener for sendPageInfo'
                                    ),
                                      r(window, t, o))
                                  })
                                }
                                function t() {
                                  e('Remove ', y)
                                }
                                var n = B
                                ;(e('Add ', g), f[n] && (f[n].stopPageInfo = t))
                              })())
                            break
                          case 'pageInfoStop':
                            f[B] &&
                              f[B].stopPageInfo &&
                              (f[B].stopPageInfo(), delete f[B].stopPageInfo)
                            break
                          case 'inPageLink':
                            ;((n = i(9).split('#')[1] || ''),
                              (r = decodeURIComponent(n)),
                              (o =
                                document.getElementById(r) ||
                                document.getElementsByName(r)[0])
                                ? ((e = d(o)),
                                  x(
                                    B,
                                    'Moving to in page link (#' +
                                      n +
                                      ') at x: ' +
                                      e.x +
                                      ' y: ' +
                                      e.y
                                  ),
                                  (c = { x: e.x, y: e.y }),
                                  h(),
                                  x(B, '--'))
                                : window.top === window.self
                                  ? x(B, 'In page link #' + n + ' not found')
                                  : window.parentIFrame
                                    ? window.parentIFrame.moveToAnchor(n)
                                    : x(
                                        B,
                                        'In page link #' +
                                          n +
                                          ' not found and window.parentIFrame not found'
                                      ))
                            break
                          case 'reset':
                            N(D)
                            break
                          case 'init':
                            ;(t(), b('onInit', D.iframe))
                            break
                          default:
                            0 === Number(D.width) && 0 === Number(D.height)
                              ? S(
                                  'Unsupported message received (' +
                                    D.type +
                                    '), this is likely due to the iframe containing a later version of iframe-resizer than the parent page'
                                )
                              : t()
                        }
                        var e, n, r, o, s
                      })()))
                : E(B, 'Ignored: ' + Q)
          }
          function T(e, t, n) {
            var r = null,
              o = null
            if (f[e]) {
              if ('function' != typeof (r = f[e][t]))
                throw new TypeError(
                  t + ' on iFrame[' + e + '] is not a function'
                )
              o = r(n)
            }
            return o
          }
          function _(e) {
            var t = e.id
            delete f[t]
          }
          function C(e) {
            var n = e.id
            if (!1 !== T(n, 'onClose', n)) {
              x(n, 'Removing iFrame: ' + n)
              try {
                e.parentNode && e.parentNode.removeChild(e)
              } catch (r) {
                S(r)
              }
              ;(T(n, 'onClosed', n),
                x(n, '--'),
                _(e),
                t && (t.disconnect(), (t = null)))
            } else x(n, 'Close iframe cancelled by onClose event')
          }
          function I(t) {
            null === c &&
              x(
                t,
                'Get page position: ' +
                  (c = {
                    x:
                      window.pageXOffset === e
                        ? document.documentElement.scrollLeft
                        : window.pageXOffset,
                    y:
                      window.pageYOffset === e
                        ? document.documentElement.scrollTop
                        : window.pageYOffset
                  }).x +
                  ',' +
                  c.y
              )
          }
          function L(e) {
            null !== c &&
              (window.scrollTo(c.x, c.y),
              x(e, 'Set page position: ' + c.x + ',' + c.y),
              A())
          }
          function A() {
            c = null
          }
          function N(e) {
            ;(x(
              e.id,
              'Size reset requested by ' +
                ('init' === e.type ? 'host page' : 'iFrame')
            ),
              I(e.id),
              P(
                function () {
                  ;(j(e), R('reset', 'reset', e.iframe, e.id))
                },
                e,
                'reset'
              ))
          }
          function j(e) {
            function t(t) {
              i ||
                '0' !== e[t] ||
                ((i = !0),
                x(r, 'Hidden iFrame detected, creating visibility listener'),
                (function () {
                  function e() {
                    function e(e) {
                      function t(t) {
                        return '0px' === (f[e] && f[e].iframe.style[t])
                      }
                      function n(e) {
                        return null !== e.offsetParent
                      }
                      f[e] &&
                        n(f[e].iframe) &&
                        (t('height') || t('width')) &&
                        R('Visibility change', 'resize', f[e].iframe, e)
                    }
                    Object.keys(f).forEach(function (t) {
                      e(t)
                    })
                  }
                  function t(t) {
                    ;(x(
                      'window',
                      'Mutation observed: ' + t[0].target + ' ' + t[0].type
                    ),
                      F(e, 16))
                  }
                  function n() {
                    var e = document.querySelector('body'),
                      n = {
                        attributes: !0,
                        attributeOldValue: !1,
                        characterData: !0,
                        characterDataOldValue: !1,
                        childList: !0,
                        subtree: !0
                      }
                    new r(t).observe(e, n)
                  }
                  var r = v()
                  r && n()
                })())
            }
            function n(n) {
              ;(!(function (t) {
                e.id
                  ? ((e.iframe.style[t] = e[t] + 'px'),
                    x(
                      e.id,
                      'IFrame (' + r + ') ' + t + ' set to ' + e[t] + 'px'
                    ))
                  : x('undefined', 'messageData id not set')
              })(n),
                t(n))
            }
            var r = e.iframe.id
            f[r] &&
              (f[r].sizeHeight && n('height'), f[r].sizeWidth && n('width'))
          }
          function P(e, t, n) {
            n !== t.type && l && !window.jasmine
              ? (x(t.id, 'Requesting animation frame'), l(e))
              : e()
          }
          function R(e, t, n, r, o) {
            var i,
              s = !1
            ;((r = r || n.id),
              f[r] &&
                (n && 'contentWindow' in n && null !== n.contentWindow
                  ? ((i = f[r] && f[r].targetOrigin),
                    x(
                      r,
                      '[' +
                        e +
                        '] Sending msg to iframe[' +
                        r +
                        '] (' +
                        t +
                        ') targetOrigin: ' +
                        i
                    ),
                    n.contentWindow.postMessage(a + t, i))
                  : S(r, '[' + e + '] IFrame(' + r + ') not found'),
                o &&
                  f[r] &&
                  f[r].warningTimeout &&
                  (f[r].msgTimeout = setTimeout(function () {
                    !f[r] ||
                      f[r].loaded ||
                      s ||
                      ((s = !0),
                      S(
                        r,
                        'IFrame has not responded within ' +
                          f[r].warningTimeout / 1e3 +
                          ' seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning.'
                      ))
                  }, f[r].warningTimeout))))
          }
          function $(e) {
            return (
              e +
              ':' +
              f[e].bodyMarginV1 +
              ':' +
              f[e].sizeWidth +
              ':' +
              f[e].log +
              ':' +
              f[e].interval +
              ':' +
              f[e].enablePublicMethods +
              ':' +
              f[e].autoResize +
              ':' +
              f[e].bodyMargin +
              ':' +
              f[e].heightCalculationMethod +
              ':' +
              f[e].bodyBackground +
              ':' +
              f[e].bodyPadding +
              ':' +
              f[e].tolerance +
              ':' +
              f[e].inPageLinks +
              ':' +
              f[e].resizeFrom +
              ':' +
              f[e].widthCalculationMethod +
              ':' +
              f[e].mouseEvents
            )
          }
          function M(n, i) {
            function s(e) {
              var t = e.split('Callback')
              if (2 === t.length) {
                var n = 'on' + t[0].charAt(0).toUpperCase() + t[0].slice(1)
                ;((this[n] = this[e]),
                  delete this[e],
                  S(
                    a,
                    "Deprecated: '" +
                      e +
                      "' has been renamed '" +
                      n +
                      "'. The old method will be removed in the next major version."
                  ))
              }
            }
            var a = (function (e) {
              if ('string' != typeof e)
                throw new TypeError('Invaild id for iFrame. Expected String')
              var t
              return (
                '' === e &&
                  ((n.id =
                    ((t = (i && i.id) || h.id + r++),
                    null !== document.getElementById(t) && (t += r++),
                    (e = t))),
                  (o = (i || {}).log),
                  x(e, 'Added missing iframe ID: ' + e + ' (' + n.src + ')')),
                e
              )
            })(n.id)
            a in f && 'iFrameResizer' in n
              ? S(a, 'Ignored iFrame, already setup.')
              : ((function (e) {
                  var t
                  ;((e = e || {}),
                    (f[a] = Object.create(null)),
                    (f[a].iframe = n),
                    (f[a].firstRun = !0),
                    (f[a].remoteHost =
                      n.src && n.src.split('/').slice(0, 3).join('/')),
                    (function (e) {
                      if ('object' != typeof e)
                        throw new TypeError('Options is not an object')
                    })(e),
                    Object.keys(e).forEach(s, e),
                    (function (e) {
                      for (var t in h)
                        Object.prototype.hasOwnProperty.call(h, t) &&
                          (f[a][t] = Object.prototype.hasOwnProperty.call(e, t)
                            ? e[t]
                            : h[t])
                    })(e),
                    f[a] &&
                      (f[a].targetOrigin =
                        !0 === f[a].checkOrigin
                          ? '' === (t = f[a].remoteHost) ||
                            null !==
                              t.match(/^(about:blank|javascript:|file:\/\/)/)
                            ? '*'
                            : t
                          : '*'))
                })(i),
                (function () {
                  switch (
                    (x(
                      a,
                      'IFrame scrolling ' +
                        (f[a] && f[a].scrolling ? 'enabled' : 'disabled') +
                        ' for ' +
                        a
                    ),
                    (n.style.overflow =
                      !1 === (f[a] && f[a].scrolling) ? 'hidden' : 'auto'),
                    f[a] && f[a].scrolling)
                  ) {
                    case 'omit':
                      break
                    case !0:
                      n.scrolling = 'yes'
                      break
                    case !1:
                      n.scrolling = 'no'
                      break
                    default:
                      n.scrolling = f[a] ? f[a].scrolling : 'no'
                  }
                })(),
                (function () {
                  function e(e) {
                    var t = f[a][e]
                    1 / 0 !== t &&
                      0 !== t &&
                      ((n.style[e] = 'number' == typeof t ? t + 'px' : t),
                      x(a, 'Set ' + e + ' = ' + n.style[e]))
                  }
                  function t(e) {
                    if (f[a]['min' + e] > f[a]['max' + e])
                      throw new Error(
                        'Value for min' + e + ' can not be greater than max' + e
                      )
                  }
                  ;(t('Height'),
                    t('Width'),
                    e('maxHeight'),
                    e('minHeight'),
                    e('maxWidth'),
                    e('minWidth'))
                })(),
                ('number' != typeof (f[a] && f[a].bodyMargin) &&
                  '0' !== (f[a] && f[a].bodyMargin)) ||
                  ((f[a].bodyMarginV1 = f[a].bodyMargin),
                  (f[a].bodyMargin = f[a].bodyMargin + 'px')),
                (function (r) {
                  var o = v()
                  ;(o &&
                    (t = (function (e) {
                      if (!n.parentNode) return null
                      var t = new e(function (e) {
                        e.forEach(function (e) {
                          Array.prototype.slice
                            .call(e.removedNodes)
                            .forEach(function (e) {
                              e === n && C(n)
                            })
                        })
                      })
                      return (t.observe(n.parentNode, { childList: !0 }), t)
                    })(o)),
                    g(n, 'load', function () {
                      var t, o
                      ;(R('iFrame.onload', r, n, e, !0),
                        (t = f[a] && f[a].firstRun),
                        (o = f[a] && f[a].heightCalculationMethod in d),
                        !t &&
                          o &&
                          N({ iframe: n, height: 0, width: 0, type: 'init' }))
                    }),
                    R('init', r, n, e, !0))
                })($(a)),
                f[a] &&
                  (f[a].iframe.iFrameResizer = {
                    close: C.bind(null, f[a].iframe),
                    removeListeners: _.bind(null, f[a].iframe),
                    resize: R.bind(
                      null,
                      'Window resize',
                      'resize',
                      f[a].iframe
                    ),
                    moveToAnchor: function (e) {
                      R('Move to anchor', 'moveToAnchor:' + e, f[a].iframe, a)
                    },
                    sendMessage: function (e) {
                      R(
                        'Send Message',
                        'message:' + (e = JSON.stringify(e)),
                        f[a].iframe,
                        a
                      )
                    }
                  }))
          }
          function F(e, t) {
            null === p &&
              (p = setTimeout(function () {
                ;((p = null), e())
              }, t))
          }
          function Q() {
            'hidden' !== document.visibilityState &&
              (x('document', 'Trigger event: Visibility change'),
              F(function () {
                D('Tab Visible', 'resize')
              }, 16))
          }
          function D(e, t) {
            Object.keys(f).forEach(function (n) {
              ;(function (e) {
                return (
                  f[e] &&
                  'parent' === f[e].resizeFrom &&
                  f[e].autoResize &&
                  !f[e].firstRun
                )
              })(n) && R(e, t, f[n].iframe, n)
            })
          }
          function B() {
            ;(g(window, 'message', O),
              g(window, 'resize', function () {
                var e
                ;(x('window', 'Trigger event: ' + (e = 'resize')),
                  F(function () {
                    D('Window ' + e, 'resize')
                  }, 16))
              }),
              g(document, 'visibilitychange', Q),
              g(document, '-webkit-visibilitychange', Q))
          }
          function q() {
            function t(e, t) {
              t &&
                ((function () {
                  if (!t.tagName)
                    throw new TypeError('Object is not a valid DOM element')
                  if ('IFRAME' !== t.tagName.toUpperCase())
                    throw new TypeError(
                      'Expected <IFRAME> tag, found <' + t.tagName + '>'
                    )
                })(),
                M(t, e),
                n.push(t))
            }
            var n
            return (
              (function () {
                var e,
                  t = ['moz', 'webkit', 'o', 'ms']
                for (e = 0; e < t.length && !l; e += 1)
                  l = window[t[e] + 'RequestAnimationFrame']
                l
                  ? (l = l.bind(window))
                  : x('setup', 'RequestAnimationFrame not supported')
              })(),
              B(),
              function (r, o) {
                switch (
                  ((n = []),
                  (function (e) {
                    e &&
                      e.enablePublicMethods &&
                      S(
                        'enablePublicMethods option has been removed, public methods are now always available in the iFrame'
                      )
                  })(r),
                  typeof o)
                ) {
                  case 'undefined':
                  case 'string':
                    Array.prototype.forEach.call(
                      document.querySelectorAll(o || 'iframe'),
                      t.bind(e, r)
                    )
                    break
                  case 'object':
                    t(r, o)
                    break
                  default:
                    throw new TypeError(
                      'Unexpected data type (' + typeof o + ')'
                    )
                }
                return n
              }
            )
          }
        })()),
      Y.exports),
    ee = q(Z)
  class te extends l {
    constructor(e) {
      if (
        (super(e), !('loading' in this.$root) || 'lazy' !== this.$root.loading)
      )
        return ee({ scrolling: 'omit' }, this.$root)
      this.$root.addEventListener('load', () => {
        try {
          ee({ scrolling: 'omit' }, this.$root)
        } catch (e) {
          e instanceof Error && console.error(e.message)
        }
      })
    }
  }
  te.moduleName = 'app-example-frame'
  class ne extends l {
    get expanded() {
      return 'true' === this.$button.getAttribute('aria-expanded')
    }
    set expanded(e) {
      ;(this.$button.setAttribute('aria-expanded', `${e}`),
        e
          ? this.$subnav.removeAttribute('hidden')
          : this.$subnav.setAttribute('hidden', ''))
    }
    constructor(e) {
      ;(super(e),
        (this.$button = this.createButton()),
        (this.$subnav = this.createSubNav()),
        this.$root.insertAdjacentElement('afterEnd', this.$subnav),
        this.$root.insertAdjacentElement('afterEnd', this.$button),
        this.$root.hasAttribute('aria-current') && (this.expanded = !0))
      const t = getComputedStyle(document.documentElement).getPropertyValue(
        '--govuk-breakpoint-tablet'
      )
      ;((this.mql = window.matchMedia(`(min-width: ${t})`)),
        'addEventListener' in this.mql
          ? this.mql.addEventListener('change', () => this.setHiddenStates())
          : this.mql.addListener(() => this.setHiddenStates()),
        this.setHiddenStates(),
        this.$button.addEventListener('click', () => {
          this.expanded = !this.expanded
        }))
    }
    createButton() {
      const e = document.createElement('button')
      return (
        e.classList.add('app-mobile-navigation-section__toggle'),
        (e.innerHTML = `<span>${this.$root.textContent.trim()}</span>`),
        e.setAttribute('aria-expanded', 'false'),
        (e.hidden = !0),
        e
      )
    }
    createSubNav() {
      return this.$root.querySelector('template').content.cloneNode(!0)
        .children[0]
    }
    setHiddenStates() {
      this.mql.matches
        ? (this.$root.parentElement.classList.remove(
            'app-mobile-navigation-section__service-navigation-item'
          ),
          this.$button.setAttribute('hidden', ''),
          this.$subnav.setAttribute('hidden', ''),
          this.$root.removeAttribute('hidden'))
        : (this.$root.setAttribute('hidden', ''),
          this.$root.parentElement.classList.add(
            'app-mobile-navigation-section__service-navigation-item'
          ),
          this.expanded && this.$subnav.removeAttribute('hidden'),
          this.$button.removeAttribute('hidden'))
    }
  }
  ne.moduleName = 'app-mobile-navigation-section'
  const re = new window.ResizeObserver((e) => {
    for (const t of e)
      oe.isOverflowing(t.target)
        ? t.target.setAttribute('tabindex', '0')
        : t.target.removeAttribute('tabindex')
  })
  class oe extends l {
    static isSupported() {
      if ((l.checkSupport(), !('ResizeObserver' in window)))
        throw Error('Browser does not support ResizeObserver')
    }
    constructor(e) {
      ;(super(e), re.observe(this.$root))
    }
    static isOverflowing(e) {
      return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth
    }
  }
  oe.moduleName = 'app-scroll-container'
  var ie,
    se = { exports: {} }
  var ae,
    ue =
      (ie ||
        ((ie = 1),
        (function (e, t) {
          ;(self,
            (e.exports = (function () {
              var e = {
                  8952: function (e, t, n) {
                    var r = n(4328),
                      o = n(36),
                      i = TypeError
                    e.exports = function (e) {
                      if (r(e)) return e
                      throw new i(o(e) + ' is not a function')
                    }
                  },
                  2096: function (e, t, n) {
                    var r = n(2424),
                      o = String,
                      i = TypeError
                    e.exports = function (e) {
                      if (r(e)) return e
                      throw new i("Can't set " + o(e) + ' as a prototype')
                    }
                  },
                  4764: function (e, t, n) {
                    var r = n(9764).charAt
                    e.exports = function (e, t, n) {
                      return t + (n ? r(e, t).length : 1)
                    }
                  },
                  6100: function (e, t, n) {
                    var r = n(7e3),
                      o = TypeError
                    e.exports = function (e, t) {
                      if (r(t, e)) return e
                      throw new o('Incorrect invocation')
                    }
                  },
                  3951: function (e, t, n) {
                    var r = n(1632),
                      o = String,
                      i = TypeError
                    e.exports = function (e) {
                      if (r(e)) return e
                      throw new i(o(e) + ' is not an object')
                    }
                  },
                  2504: function (e, t, n) {
                    var r = n(4096),
                      o = n(2495),
                      i = n(3556),
                      s = function (e) {
                        return function (t, n, s) {
                          var a = r(t),
                            u = i(a)
                          if (0 === u) return !e && -1
                          var c,
                            l = o(s, u)
                          if (e && n != n) {
                            for (; u > l; ) if ((c = a[l++]) != c) return !0
                          } else
                            for (; u > l; l++)
                              if ((e || l in a) && a[l] === n)
                                return e || l || 0
                          return !e && -1
                        }
                      }
                    e.exports = { includes: s(!0), indexOf: s(!1) }
                  },
                  3364: function (e, t, n) {
                    var r = n(8992),
                      o = n(1664),
                      i = n(5712),
                      s = n(4356),
                      a = n(3556),
                      u = n(2568),
                      c = o([].push),
                      l = function (e) {
                        var t = 1 === e,
                          n = 2 === e,
                          o = 3 === e,
                          l = 4 === e,
                          d = 6 === e,
                          f = 7 === e,
                          p = 5 === e || d
                        return function (h, m, v, g) {
                          for (
                            var y,
                              b,
                              w = s(h),
                              x = i(w),
                              E = a(x),
                              S = r(m, v),
                              k = 0,
                              O = g || u,
                              T = t ? O(h, E) : n || f ? O(h, 0) : void 0;
                            E > k;
                            k++
                          )
                            if ((p || k in x) && ((b = S((y = x[k]), k, w)), e))
                              if (t) T[k] = b
                              else if (b)
                                switch (e) {
                                  case 3:
                                    return !0
                                  case 5:
                                    return y
                                  case 6:
                                    return k
                                  case 2:
                                    c(T, y)
                                }
                              else
                                switch (e) {
                                  case 4:
                                    return !1
                                  case 7:
                                    c(T, y)
                                }
                          return d ? -1 : o || l ? l : T
                        }
                      }
                    e.exports = {
                      forEach: l(0),
                      map: l(1),
                      filter: l(2),
                      some: l(3),
                      every: l(4),
                      find: l(5),
                      findIndex: l(6),
                      filterReject: l(7)
                    }
                  },
                  953: function (e, t, n) {
                    var r = n(9957),
                      o = n(9972),
                      i = n(8504),
                      s = o('species')
                    e.exports = function (e) {
                      return (
                        i >= 51 ||
                        !r(function () {
                          var t = []
                          return (
                            ((t.constructor = {})[s] = function () {
                              return { foo: 1 }
                            }),
                            1 !== t[e](Boolean).foo
                          )
                        })
                      )
                    }
                  },
                  1496: function (e, t, n) {
                    var r = n(9957)
                    e.exports = function (e, t) {
                      var n = [][e]
                      return (
                        !!n &&
                        r(function () {
                          n.call(
                            null,
                            t ||
                              function () {
                                return 1
                              },
                            1
                          )
                        })
                      )
                    }
                  },
                  6728: function (e, t, n) {
                    var r = n(3476),
                      o = n(1432),
                      i = TypeError,
                      s = Object.getOwnPropertyDescriptor,
                      a =
                        r &&
                        !(function () {
                          if (void 0 !== this) return !0
                          try {
                            Object.defineProperty([], 'length', {
                              writable: !1
                            }).length = 1
                          } catch (e) {
                            return e instanceof TypeError
                          }
                        })()
                    e.exports = a
                      ? function (e, t) {
                          if (o(e) && !s(e, 'length').writable)
                            throw new i('Cannot set read only .length')
                          return (e.length = t)
                        }
                      : function (e, t) {
                          return (e.length = t)
                        }
                  },
                  6736: function (e, t, n) {
                    var r = n(1432),
                      o = n(6072),
                      i = n(1632),
                      s = n(9972)('species'),
                      a = Array
                    e.exports = function (e) {
                      var t
                      return (
                        r(e) &&
                          ((t = e.constructor),
                          ((o(t) && (t === a || r(t.prototype))) ||
                            (i(t) && null === (t = t[s]))) &&
                            (t = void 0)),
                        void 0 === t ? a : t
                      )
                    }
                  },
                  2568: function (e, t, n) {
                    var r = n(6736)
                    e.exports = function (e, t) {
                      return new (r(e))(0 === t ? 0 : t)
                    }
                  },
                  8696: function (e, t, n) {
                    var r = n(3951),
                      o = n(3112)
                    e.exports = function (e, t, n, i) {
                      try {
                        return i ? t(r(n)[0], n[1]) : t(n)
                      } catch (s) {
                        o(e, 'throw', s)
                      }
                    }
                  },
                  1888: function (e, t, n) {
                    var r = n(1664),
                      o = r({}.toString),
                      i = r(''.slice)
                    e.exports = function (e) {
                      return i(o(e), 8, -1)
                    }
                  },
                  4427: function (e, t, n) {
                    var r = n(16),
                      o = n(4328),
                      i = n(1888),
                      s = n(9972)('toStringTag'),
                      a = Object,
                      u =
                        'Arguments' ===
                        i(
                          (function () {
                            return arguments
                          })()
                        )
                    e.exports = r
                      ? i
                      : function (e) {
                          var t, n, r
                          return void 0 === e
                            ? 'Undefined'
                            : null === e
                              ? 'Null'
                              : 'string' ==
                                  typeof (n = (function (e, t) {
                                    try {
                                      return e[t]
                                    } catch (n) {}
                                  })((t = a(e)), s))
                                ? n
                                : u
                                  ? i(t)
                                  : 'Object' === (r = i(t)) && o(t.callee)
                                    ? 'Arguments'
                                    : r
                        }
                  },
                  9968: function (e, t, n) {
                    var r = n(5152),
                      o = n(9252),
                      i = n(9444),
                      s = n(8352)
                    e.exports = function (e, t, n) {
                      for (
                        var a = o(t), u = s.f, c = i.f, l = 0;
                        l < a.length;
                        l++
                      ) {
                        var d = a[l]
                        r(e, d) || (n && r(n, d)) || u(e, d, c(t, d))
                      }
                    }
                  },
                  2272: function (e, t, n) {
                    var r = n(9957)
                    e.exports = !r(function () {
                      function e() {}
                      return (
                        (e.prototype.constructor = null),
                        Object.getPrototypeOf(new e()) !== e.prototype
                      )
                    })
                  },
                  3336: function (e) {
                    e.exports = function (e, t) {
                      return { value: e, done: t }
                    }
                  },
                  3440: function (e, t, n) {
                    var r = n(3476),
                      o = n(8352),
                      i = n(9728)
                    e.exports = r
                      ? function (e, t, n) {
                          return o.f(e, t, i(1, n))
                        }
                      : function (e, t, n) {
                          return ((e[t] = n), e)
                        }
                  },
                  9728: function (e) {
                    e.exports = function (e, t) {
                      return {
                        enumerable: !(1 & e),
                        configurable: !(2 & e),
                        writable: !(4 & e),
                        value: t
                      }
                    }
                  },
                  92: function (e, t, n) {
                    var r = n(3476),
                      o = n(8352),
                      i = n(9728)
                    e.exports = function (e, t, n) {
                      r ? o.f(e, t, i(0, n)) : (e[t] = n)
                    }
                  },
                  2544: function (e, t, n) {
                    var r = n(5312),
                      o = n(8352)
                    e.exports = function (e, t, n) {
                      return (
                        n.get && r(n.get, t, { getter: !0 }),
                        n.set && r(n.set, t, { setter: !0 }),
                        o.f(e, t, n)
                      )
                    }
                  },
                  6076: function (e, t, n) {
                    var r = n(4328),
                      o = n(8352),
                      i = n(5312),
                      s = n(4636)
                    e.exports = function (e, t, n, a) {
                      a || (a = {})
                      var u = a.enumerable,
                        c = void 0 !== a.name ? a.name : t
                      if ((r(n) && i(n, c, a), a.global))
                        u ? (e[t] = n) : s(t, n)
                      else {
                        try {
                          a.unsafe ? e[t] && (u = !0) : delete e[t]
                        } catch (l) {}
                        u
                          ? (e[t] = n)
                          : o.f(e, t, {
                              value: n,
                              enumerable: !1,
                              configurable: !a.nonConfigurable,
                              writable: !a.nonWritable
                            })
                      }
                      return e
                    }
                  },
                  4036: function (e, t, n) {
                    var r = n(6076)
                    e.exports = function (e, t, n) {
                      for (var o in t) r(e, o, t[o], n)
                      return e
                    }
                  },
                  4636: function (e, t, n) {
                    var r = n(6420),
                      o = Object.defineProperty
                    e.exports = function (e, t) {
                      try {
                        o(r, e, { value: t, configurable: !0, writable: !0 })
                      } catch (n) {
                        r[e] = t
                      }
                      return t
                    }
                  },
                  3476: function (e, t, n) {
                    var r = n(9957)
                    e.exports = !r(function () {
                      return (
                        7 !==
                        Object.defineProperty({}, 1, {
                          get: function () {
                            return 7
                          }
                        })[1]
                      )
                    })
                  },
                  8168: function (e, t, n) {
                    var r = n(6420),
                      o = n(1632),
                      i = r.document,
                      s = o(i) && o(i.createElement)
                    e.exports = function (e) {
                      return s ? i.createElement(e) : {}
                    }
                  },
                  4316: function (e) {
                    var t = TypeError
                    e.exports = function (e) {
                      if (e > 9007199254740991)
                        throw t('Maximum allowed index exceeded')
                      return e
                    }
                  },
                  6064: function (e) {
                    e.exports =
                      ('undefined' != typeof navigator &&
                        String(navigator.userAgent)) ||
                      ''
                  },
                  8504: function (e, t, n) {
                    var r,
                      o,
                      i = n(6420),
                      s = n(6064),
                      a = i.process,
                      u = i.Deno,
                      c = (a && a.versions) || (u && u.version),
                      l = c && c.v8
                    ;(l &&
                      (o =
                        (r = l.split('.'))[0] > 0 && r[0] < 4
                          ? 1
                          : +(r[0] + r[1])),
                      !o &&
                        s &&
                        (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) &&
                        (r = s.match(/Chrome\/(\d+)/)) &&
                        (o = +r[1]),
                      (e.exports = o))
                  },
                  8256: function (e) {
                    e.exports = [
                      'constructor',
                      'hasOwnProperty',
                      'isPrototypeOf',
                      'propertyIsEnumerable',
                      'toLocaleString',
                      'toString',
                      'valueOf'
                    ]
                  },
                  6520: function (e, t, n) {
                    var r = n(1664),
                      o = Error,
                      i = r(''.replace),
                      s = String(new o('zxcasd').stack),
                      a = /\n\s*at [^:]*:[^\n]*/,
                      u = a.test(s)
                    e.exports = function (e, t) {
                      if (u && 'string' == typeof e && !o.prepareStackTrace)
                        for (; t--; ) e = i(e, a, '')
                      return e
                    }
                  },
                  3696: function (e, t, n) {
                    var r = n(3440),
                      o = n(6520),
                      i = n(9184),
                      s = Error.captureStackTrace
                    e.exports = function (e, t, n, a) {
                      i && (s ? s(e, t) : r(e, 'stack', o(n, a)))
                    }
                  },
                  9184: function (e, t, n) {
                    var r = n(9957),
                      o = n(9728)
                    e.exports = !r(function () {
                      var e = new Error('a')
                      return (
                        !('stack' in e) ||
                        (Object.defineProperty(e, 'stack', o(1, 7)),
                        7 !== e.stack)
                      )
                    })
                  },
                  9160: function (e, t, n) {
                    var r = n(6420),
                      o = n(9444).f,
                      i = n(3440),
                      s = n(6076),
                      a = n(4636),
                      u = n(9968),
                      c = n(6704)
                    e.exports = function (e, t) {
                      var n,
                        l,
                        d,
                        f,
                        p,
                        h = e.target,
                        m = e.global,
                        v = e.stat
                      if (
                        (n = m
                          ? r
                          : v
                            ? r[h] || a(h, {})
                            : r[h] && r[h].prototype)
                      )
                        for (l in t) {
                          if (
                            ((f = t[l]),
                            (d = e.dontCallGetSet
                              ? (p = o(n, l)) && p.value
                              : n[l]),
                            !c(m ? l : h + (v ? '.' : '#') + l, e.forced) &&
                              void 0 !== d)
                          ) {
                            if (typeof f == typeof d) continue
                            u(f, d)
                          }
                          ;((e.sham || (d && d.sham)) && i(f, 'sham', !0),
                            s(n, l, f, e))
                        }
                    }
                  },
                  9957: function (e) {
                    e.exports = function (e) {
                      try {
                        return !!e()
                      } catch (t) {
                        return !0
                      }
                    }
                  },
                  7176: function (e, t, n) {
                    n(880)
                    var r = n(8448),
                      o = n(6076),
                      i = n(7680),
                      s = n(9957),
                      a = n(9972),
                      u = n(3440),
                      c = a('species'),
                      l = RegExp.prototype
                    e.exports = function (e, t, n, d) {
                      var f = a(e),
                        p = !s(function () {
                          var t = {}
                          return (
                            (t[f] = function () {
                              return 7
                            }),
                            7 !== ''[e](t)
                          )
                        }),
                        h =
                          p &&
                          !s(function () {
                            var t = !1,
                              n = /a/
                            return (
                              'split' === e &&
                                (((n = {}).constructor = {}),
                                (n.constructor[c] = function () {
                                  return n
                                }),
                                (n.flags = ''),
                                (n[f] = /./[f])),
                              (n.exec = function () {
                                return ((t = !0), null)
                              }),
                              n[f](''),
                              !t
                            )
                          })
                      if (!p || !h || n) {
                        var m = /./[f],
                          v = t(f, ''[e], function (e, t, n, o, s) {
                            var a = t.exec
                            return a === i || a === l.exec
                              ? p && !s
                                ? { done: !0, value: r(m, t, n, o) }
                                : { done: !0, value: r(e, n, t, o) }
                              : { done: !1 }
                          })
                        ;(o(String.prototype, e, v[0]), o(l, f, v[1]))
                      }
                      d && u(l[f], 'sham', !0)
                    }
                  },
                  908: function (e, t, n) {
                    var r = n(7332),
                      o = Function.prototype,
                      i = o.apply,
                      s = o.call
                    e.exports =
                      ('object' == typeof Reflect && Reflect.apply) ||
                      (r
                        ? s.bind(i)
                        : function () {
                            return s.apply(i, arguments)
                          })
                  },
                  8992: function (e, t, n) {
                    var r = n(3180),
                      o = n(8952),
                      i = n(7332),
                      s = r(r.bind)
                    e.exports = function (e, t) {
                      return (
                        o(e),
                        void 0 === t
                          ? e
                          : i
                            ? s(e, t)
                            : function () {
                                return e.apply(t, arguments)
                              }
                      )
                    }
                  },
                  7332: function (e, t, n) {
                    var r = n(9957)
                    e.exports = !r(function () {
                      var e = function () {}.bind()
                      return (
                        'function' != typeof e || e.hasOwnProperty('prototype')
                      )
                    })
                  },
                  8448: function (e, t, n) {
                    var r = n(7332),
                      o = Function.prototype.call
                    e.exports = r
                      ? o.bind(o)
                      : function () {
                          return o.apply(o, arguments)
                        }
                  },
                  6208: function (e, t, n) {
                    var r = n(3476),
                      o = n(5152),
                      i = Function.prototype,
                      s = r && Object.getOwnPropertyDescriptor,
                      a = o(i, 'name'),
                      u = a && 'something' === function () {}.name,
                      c = a && (!r || (r && s(i, 'name').configurable))
                    e.exports = { EXISTS: a, PROPER: u, CONFIGURABLE: c }
                  },
                  5288: function (e, t, n) {
                    var r = n(1664),
                      o = n(8952)
                    e.exports = function (e, t, n) {
                      try {
                        return r(o(Object.getOwnPropertyDescriptor(e, t)[n]))
                      } catch (i) {}
                    }
                  },
                  3180: function (e, t, n) {
                    var r = n(1888),
                      o = n(1664)
                    e.exports = function (e) {
                      if ('Function' === r(e)) return o(e)
                    }
                  },
                  1664: function (e, t, n) {
                    var r = n(7332),
                      o = Function.prototype,
                      i = o.call,
                      s = r && o.bind.bind(i, i)
                    e.exports = r
                      ? s
                      : function (e) {
                          return function () {
                            return i.apply(e, arguments)
                          }
                        }
                  },
                  5232: function (e, t, n) {
                    var r = n(6420),
                      o = n(4328)
                    e.exports = function (e, t) {
                      return arguments.length < 2
                        ? ((n = r[e]), o(n) ? n : void 0)
                        : r[e] && r[e][t]
                      var n
                    }
                  },
                  6752: function (e) {
                    e.exports = function (e) {
                      return { iterator: e, next: e.next, done: !1 }
                    }
                  },
                  4504: function (e, t, n) {
                    var r = n(8952),
                      o = n(9760)
                    e.exports = function (e, t) {
                      var n = e[t]
                      return o(n) ? void 0 : r(n)
                    }
                  },
                  6420: function (e, t, n) {
                    var r = function (e) {
                      return e && e.Math === Math && e
                    }
                    e.exports =
                      r('object' == typeof globalThis && globalThis) ||
                      r('object' == typeof window && window) ||
                      r('object' == typeof self && self) ||
                      r('object' == typeof n.g && n.g) ||
                      r('object' == typeof this && this) ||
                      (function () {
                        return this
                      })() ||
                      Function('return this')()
                  },
                  5152: function (e, t, n) {
                    var r = n(1664),
                      o = n(4356),
                      i = r({}.hasOwnProperty)
                    e.exports =
                      Object.hasOwn ||
                      function (e, t) {
                        return i(o(e), t)
                      }
                  },
                  2560: function (e) {
                    e.exports = {}
                  },
                  4168: function (e, t, n) {
                    var r = n(5232)
                    e.exports = r('document', 'documentElement')
                  },
                  9888: function (e, t, n) {
                    var r = n(3476),
                      o = n(9957),
                      i = n(8168)
                    e.exports =
                      !r &&
                      !o(function () {
                        return (
                          7 !==
                          Object.defineProperty(i('div'), 'a', {
                            get: function () {
                              return 7
                            }
                          }).a
                        )
                      })
                  },
                  5712: function (e, t, n) {
                    var r = n(1664),
                      o = n(9957),
                      i = n(1888),
                      s = Object,
                      a = r(''.split)
                    e.exports = o(function () {
                      return !s('z').propertyIsEnumerable(0)
                    })
                      ? function (e) {
                          return 'String' === i(e) ? a(e, '') : s(e)
                        }
                      : s
                  },
                  7512: function (e, t, n) {
                    var r = n(4328),
                      o = n(1632),
                      i = n(4024)
                    e.exports = function (e, t, n) {
                      var s, a
                      return (
                        i &&
                          r((s = t.constructor)) &&
                          s !== n &&
                          o((a = s.prototype)) &&
                          a !== n.prototype &&
                          i(e, a),
                        e
                      )
                    }
                  },
                  9112: function (e, t, n) {
                    var r = n(1664),
                      o = n(4328),
                      i = n(3976),
                      s = r(Function.toString)
                    ;(o(i.inspectSource) ||
                      (i.inspectSource = function (e) {
                        return s(e)
                      }),
                      (e.exports = i.inspectSource))
                  },
                  3480: function (e, t, n) {
                    var r = n(1632),
                      o = n(3440)
                    e.exports = function (e, t) {
                      r(t) && 'cause' in t && o(e, 'cause', t.cause)
                    }
                  },
                  9104: function (e, t, n) {
                    var r,
                      o,
                      i,
                      s = n(4288),
                      a = n(6420),
                      u = n(1632),
                      c = n(3440),
                      l = n(5152),
                      d = n(3976),
                      f = n(6504),
                      p = n(2560),
                      h = 'Object already initialized',
                      m = a.TypeError,
                      v = a.WeakMap
                    if (s || d.state) {
                      var g = d.state || (d.state = new v())
                      ;((g.get = g.get),
                        (g.has = g.has),
                        (g.set = g.set),
                        (r = function (e, t) {
                          if (g.has(e)) throw new m(h)
                          return ((t.facade = e), g.set(e, t), t)
                        }),
                        (o = function (e) {
                          return g.get(e) || {}
                        }),
                        (i = function (e) {
                          return g.has(e)
                        }))
                    } else {
                      var y = f('state')
                      ;((p[y] = !0),
                        (r = function (e, t) {
                          if (l(e, y)) throw new m(h)
                          return ((t.facade = e), c(e, y, t), t)
                        }),
                        (o = function (e) {
                          return l(e, y) ? e[y] : {}
                        }),
                        (i = function (e) {
                          return l(e, y)
                        }))
                    }
                    e.exports = {
                      set: r,
                      get: o,
                      has: i,
                      enforce: function (e) {
                        return i(e) ? o(e) : r(e, {})
                      },
                      getterFor: function (e) {
                        return function (t) {
                          var n
                          if (!u(t) || (n = o(t)).type !== e)
                            throw new m(
                              'Incompatible receiver, ' + e + ' required'
                            )
                          return n
                        }
                      }
                    }
                  },
                  1432: function (e, t, n) {
                    var r = n(1888)
                    e.exports =
                      Array.isArray ||
                      function (e) {
                        return 'Array' === r(e)
                      }
                  },
                  4328: function (e) {
                    var t = 'object' == typeof document && document.all
                    e.exports =
                      void 0 === t && void 0 !== t
                        ? function (e) {
                            return 'function' == typeof e || e === t
                          }
                        : function (e) {
                            return 'function' == typeof e
                          }
                  },
                  6072: function (e, t, n) {
                    var r = n(1664),
                      o = n(9957),
                      i = n(4328),
                      s = n(4427),
                      a = n(5232),
                      u = n(9112),
                      c = function () {},
                      l = a('Reflect', 'construct'),
                      d = /^\s*(?:class|function)\b/,
                      f = r(d.exec),
                      p = !d.test(c),
                      h = function (e) {
                        if (!i(e)) return !1
                        try {
                          return (l(c, [], e), !0)
                        } catch (t) {
                          return !1
                        }
                      },
                      m = function (e) {
                        if (!i(e)) return !1
                        switch (s(e)) {
                          case 'AsyncFunction':
                          case 'GeneratorFunction':
                          case 'AsyncGeneratorFunction':
                            return !1
                        }
                        try {
                          return p || !!f(d, u(e))
                        } catch (t) {
                          return !0
                        }
                      }
                    ;((m.sham = !0),
                      (e.exports =
                        !l ||
                        o(function () {
                          var e
                          return (
                            h(h.call) ||
                            !h(Object) ||
                            !h(function () {
                              e = !0
                            }) ||
                            e
                          )
                        })
                          ? m
                          : h))
                  },
                  6704: function (e, t, n) {
                    var r = n(9957),
                      o = n(4328),
                      i = /#|\.prototype\./,
                      s = function (e, t) {
                        var n = u[a(e)]
                        return n === l || (n !== c && (o(t) ? r(t) : !!t))
                      },
                      a = (s.normalize = function (e) {
                        return String(e).replace(i, '.').toLowerCase()
                      }),
                      u = (s.data = {}),
                      c = (s.NATIVE = 'N'),
                      l = (s.POLYFILL = 'P')
                    e.exports = s
                  },
                  9760: function (e) {
                    e.exports = function (e) {
                      return null == e
                    }
                  },
                  1632: function (e, t, n) {
                    var r = n(4328)
                    e.exports = function (e) {
                      return 'object' == typeof e ? null !== e : r(e)
                    }
                  },
                  2424: function (e, t, n) {
                    var r = n(1632)
                    e.exports = function (e) {
                      return r(e) || null === e
                    }
                  },
                  7048: function (e) {
                    e.exports = !1
                  },
                  7728: function (e, t, n) {
                    var r = n(5232),
                      o = n(4328),
                      i = n(7e3),
                      s = n(6536),
                      a = Object
                    e.exports = s
                      ? function (e) {
                          return 'symbol' == typeof e
                        }
                      : function (e) {
                          var t = r('Symbol')
                          return o(t) && i(t.prototype, a(e))
                        }
                  },
                  3112: function (e, t, n) {
                    var r = n(8448),
                      o = n(3951),
                      i = n(4504)
                    e.exports = function (e, t, n) {
                      var s, a
                      o(e)
                      try {
                        if (!(s = i(e, 'return'))) {
                          if ('throw' === t) throw n
                          return n
                        }
                        s = r(s, e)
                      } catch (u) {
                        ;((a = !0), (s = u))
                      }
                      if ('throw' === t) throw n
                      if (a) throw s
                      return (o(s), n)
                    }
                  },
                  9724: function (e, t, n) {
                    var r = n(8448),
                      o = n(9368),
                      i = n(3440),
                      s = n(4036),
                      a = n(9972),
                      u = n(9104),
                      c = n(4504),
                      l = n(336).IteratorPrototype,
                      d = n(3336),
                      f = n(3112),
                      p = a('toStringTag'),
                      h = 'IteratorHelper',
                      m = 'WrapForValidIterator',
                      v = u.set,
                      g = function (e) {
                        var t = u.getterFor(e ? m : h)
                        return s(o(l), {
                          next: function () {
                            var n = t(this)
                            if (e) return n.nextHandler()
                            try {
                              var r = n.done ? void 0 : n.nextHandler()
                              return d(r, n.done)
                            } catch (o) {
                              throw ((n.done = !0), o)
                            }
                          },
                          return: function () {
                            var n = t(this),
                              o = n.iterator
                            if (((n.done = !0), e)) {
                              var i = c(o, 'return')
                              return i ? r(i, o) : d(void 0, !0)
                            }
                            if (n.inner)
                              try {
                                f(n.inner.iterator, 'normal')
                              } catch (s) {
                                return f(o, 'throw', s)
                              }
                            return (f(o, 'normal'), d(void 0, !0))
                          }
                        })
                      },
                      y = g(!0),
                      b = g(!1)
                    ;(i(b, p, 'Iterator Helper'),
                      (e.exports = function (e, t) {
                        var n = function (n, r) {
                          ;(r
                            ? ((r.iterator = n.iterator), (r.next = n.next))
                            : (r = n),
                            (r.type = t ? m : h),
                            (r.nextHandler = e),
                            (r.counter = 0),
                            (r.done = !1),
                            v(this, r))
                        }
                        return ((n.prototype = t ? y : b), n)
                      }))
                  },
                  5792: function (e, t, n) {
                    var r = n(8448),
                      o = n(8952),
                      i = n(3951),
                      s = n(6752),
                      a = n(9724),
                      u = n(8696),
                      c = a(function () {
                        var e = this.iterator,
                          t = i(r(this.next, e))
                        if (!(this.done = !!t.done))
                          return u(
                            e,
                            this.mapper,
                            [t.value, this.counter++],
                            !0
                          )
                      })
                    e.exports = function (e) {
                      return (i(this), o(e), new c(s(this), { mapper: e }))
                    }
                  },
                  336: function (e, t, n) {
                    var r,
                      o,
                      i,
                      s = n(9957),
                      a = n(4328),
                      u = n(1632),
                      c = n(9368),
                      l = n(7796),
                      d = n(6076),
                      f = n(9972),
                      p = n(7048),
                      h = f('iterator'),
                      m = !1
                    ;([].keys &&
                      ('next' in (i = [].keys())
                        ? (o = l(l(i))) !== Object.prototype && (r = o)
                        : (m = !0)),
                      !u(r) ||
                      s(function () {
                        var e = {}
                        return r[h].call(e) !== e
                      })
                        ? (r = {})
                        : p && (r = c(r)),
                      a(r[h]) ||
                        d(r, h, function () {
                          return this
                        }),
                      (e.exports = {
                        IteratorPrototype: r,
                        BUGGY_SAFARI_ITERATORS: m
                      }))
                  },
                  3556: function (e, t, n) {
                    var r = n(7584)
                    e.exports = function (e) {
                      return r(e.length)
                    }
                  },
                  5312: function (e, t, n) {
                    var r = n(1664),
                      o = n(9957),
                      i = n(4328),
                      s = n(5152),
                      a = n(3476),
                      u = n(6208).CONFIGURABLE,
                      c = n(9112),
                      l = n(9104),
                      d = l.enforce,
                      f = l.get,
                      p = String,
                      h = Object.defineProperty,
                      m = r(''.slice),
                      v = r(''.replace),
                      g = r([].join),
                      y =
                        a &&
                        !o(function () {
                          return (
                            8 !==
                            h(function () {}, 'length', { value: 8 }).length
                          )
                        }),
                      b = String(String).split('String'),
                      w = (e.exports = function (e, t, n) {
                        ;('Symbol(' === m(p(t), 0, 7) &&
                          (t =
                            '[' + v(p(t), /^Symbol\(([^)]*)\).*$/, '$1') + ']'),
                          n && n.getter && (t = 'get ' + t),
                          n && n.setter && (t = 'set ' + t),
                          (!s(e, 'name') || (u && e.name !== t)) &&
                            (a
                              ? h(e, 'name', { value: t, configurable: !0 })
                              : (e.name = t)),
                          y &&
                            n &&
                            s(n, 'arity') &&
                            e.length !== n.arity &&
                            h(e, 'length', { value: n.arity }))
                        try {
                          n && s(n, 'constructor') && n.constructor
                            ? a && h(e, 'prototype', { writable: !1 })
                            : e.prototype && (e.prototype = void 0)
                        } catch (o) {}
                        var r = d(e)
                        return (
                          s(r, 'source') ||
                            (r.source = g(b, 'string' == typeof t ? t : '')),
                          e
                        )
                      })
                    Function.prototype.toString = w(function () {
                      return (i(this) && f(this).source) || c(this)
                    }, 'toString')
                  },
                  1748: function (e) {
                    var t = Math.ceil,
                      n = Math.floor
                    e.exports =
                      Math.trunc ||
                      function (e) {
                        var r = +e
                        return (r > 0 ? n : t)(r)
                      }
                  },
                  8948: function (e, t, n) {
                    var r = n(5016)
                    e.exports = function (e, t) {
                      return void 0 === e
                        ? arguments.length < 2
                          ? ''
                          : t
                        : r(e)
                    }
                  },
                  9292: function (e, t, n) {
                    var r = n(3476),
                      o = n(1664),
                      i = n(8448),
                      s = n(9957),
                      a = n(1531),
                      u = n(9392),
                      c = n(8912),
                      l = n(4356),
                      d = n(5712),
                      f = Object.assign,
                      p = Object.defineProperty,
                      h = o([].concat)
                    e.exports =
                      !f ||
                      s(function () {
                        if (
                          r &&
                          1 !==
                            f(
                              { b: 1 },
                              f(
                                p({}, 'a', {
                                  enumerable: !0,
                                  get: function () {
                                    p(this, 'b', { value: 3, enumerable: !1 })
                                  }
                                }),
                                { b: 2 }
                              )
                            ).b
                        )
                          return !0
                        var e = {},
                          t = {},
                          n = Symbol('assign detection'),
                          o = 'abcdefghijklmnopqrst'
                        return (
                          (e[n] = 7),
                          o.split('').forEach(function (e) {
                            t[e] = e
                          }),
                          7 !== f({}, e)[n] || a(f({}, t)).join('') !== o
                        )
                      })
                        ? function (e, t) {
                            for (
                              var n = l(e),
                                o = arguments.length,
                                s = 1,
                                f = u.f,
                                p = c.f;
                              o > s;
                            )
                              for (
                                var m,
                                  v = d(arguments[s++]),
                                  g = f ? h(a(v), f(v)) : a(v),
                                  y = g.length,
                                  b = 0;
                                y > b;
                              )
                                ((m = g[b++]),
                                  (r && !i(p, v, m)) || (n[m] = v[m]))
                            return n
                          }
                        : f
                  },
                  9368: function (e, t, n) {
                    var r,
                      o = n(3951),
                      i = n(2056),
                      s = n(8256),
                      a = n(2560),
                      u = n(4168),
                      c = n(8168),
                      l = n(6504),
                      d = 'prototype',
                      f = 'script',
                      p = l('IE_PROTO'),
                      h = function () {},
                      m = function (e) {
                        return '<' + f + '>' + e + '</' + f + '>'
                      },
                      v = function (e) {
                        ;(e.write(m('')), e.close())
                        var t = e.parentWindow.Object
                        return ((e = null), t)
                      },
                      g = function () {
                        try {
                          r = new ActiveXObject('htmlfile')
                        } catch (i) {}
                        var e, t, n
                        g =
                          'undefined' != typeof document
                            ? document.domain && r
                              ? v(r)
                              : ((t = c('iframe')),
                                (n = 'java' + f + ':'),
                                (t.style.display = 'none'),
                                u.appendChild(t),
                                (t.src = String(n)),
                                (e = t.contentWindow.document).open(),
                                e.write(m('document.F=Object')),
                                e.close(),
                                e.F)
                            : v(r)
                        for (var o = s.length; o--; ) delete g[d][s[o]]
                        return g()
                      }
                    ;((a[p] = !0),
                      (e.exports =
                        Object.create ||
                        function (e, t) {
                          var n
                          return (
                            null !== e
                              ? ((h[d] = o(e)),
                                (n = new h()),
                                (h[d] = null),
                                (n[p] = e))
                              : (n = g()),
                            void 0 === t ? n : i.f(n, t)
                          )
                        }))
                  },
                  2056: function (e, t, n) {
                    var r = n(3476),
                      o = n(1576),
                      i = n(8352),
                      s = n(3951),
                      a = n(4096),
                      u = n(1531)
                    t.f =
                      r && !o
                        ? Object.defineProperties
                        : function (e, t) {
                            s(e)
                            for (
                              var n, r = a(t), o = u(t), c = o.length, l = 0;
                              c > l;
                            )
                              i.f(e, (n = o[l++]), r[n])
                            return e
                          }
                  },
                  8352: function (e, t, n) {
                    var r = n(3476),
                      o = n(9888),
                      i = n(1576),
                      s = n(3951),
                      a = n(88),
                      u = TypeError,
                      c = Object.defineProperty,
                      l = Object.getOwnPropertyDescriptor,
                      d = 'enumerable',
                      f = 'configurable',
                      p = 'writable'
                    t.f = r
                      ? i
                        ? function (e, t, n) {
                            if (
                              (s(e),
                              (t = a(t)),
                              s(n),
                              'function' == typeof e &&
                                'prototype' === t &&
                                'value' in n &&
                                p in n &&
                                !n[p])
                            ) {
                              var r = l(e, t)
                              r &&
                                r[p] &&
                                ((e[t] = n.value),
                                (n = {
                                  configurable: f in n ? n[f] : r[f],
                                  enumerable: d in n ? n[d] : r[d],
                                  writable: !1
                                }))
                            }
                            return c(e, t, n)
                          }
                        : c
                      : function (e, t, n) {
                          if ((s(e), (t = a(t)), s(n), o))
                            try {
                              return c(e, t, n)
                            } catch (r) {}
                          if ('get' in n || 'set' in n)
                            throw new u('Accessors not supported')
                          return ('value' in n && (e[t] = n.value), e)
                        }
                  },
                  9444: function (e, t, n) {
                    var r = n(3476),
                      o = n(8448),
                      i = n(8912),
                      s = n(9728),
                      a = n(4096),
                      u = n(88),
                      c = n(5152),
                      l = n(9888),
                      d = Object.getOwnPropertyDescriptor
                    t.f = r
                      ? d
                      : function (e, t) {
                          if (((e = a(e)), (t = u(t)), l))
                            try {
                              return d(e, t)
                            } catch (n) {}
                          if (c(e, t)) return s(!o(i.f, e, t), e[t])
                        }
                  },
                  5048: function (e, t, n) {
                    var r = n(9008),
                      o = n(8256).concat('length', 'prototype')
                    t.f =
                      Object.getOwnPropertyNames ||
                      function (e) {
                        return r(e, o)
                      }
                  },
                  9392: function (e, t) {
                    t.f = Object.getOwnPropertySymbols
                  },
                  7796: function (e, t, n) {
                    var r = n(5152),
                      o = n(4328),
                      i = n(4356),
                      s = n(6504),
                      a = n(2272),
                      u = s('IE_PROTO'),
                      c = Object,
                      l = c.prototype
                    e.exports = a
                      ? c.getPrototypeOf
                      : function (e) {
                          var t = i(e)
                          if (r(t, u)) return t[u]
                          var n = t.constructor
                          return o(n) && t instanceof n
                            ? n.prototype
                            : t instanceof c
                              ? l
                              : null
                        }
                  },
                  7e3: function (e, t, n) {
                    var r = n(1664)
                    e.exports = r({}.isPrototypeOf)
                  },
                  9008: function (e, t, n) {
                    var r = n(1664),
                      o = n(5152),
                      i = n(4096),
                      s = n(2504).indexOf,
                      a = n(2560),
                      u = r([].push)
                    e.exports = function (e, t) {
                      var n,
                        r = i(e),
                        c = 0,
                        l = []
                      for (n in r) !o(a, n) && o(r, n) && u(l, n)
                      for (; t.length > c; )
                        o(r, (n = t[c++])) && (~s(l, n) || u(l, n))
                      return l
                    }
                  },
                  1531: function (e, t, n) {
                    var r = n(9008),
                      o = n(8256)
                    e.exports =
                      Object.keys ||
                      function (e) {
                        return r(e, o)
                      }
                  },
                  8912: function (e, t) {
                    var n = {}.propertyIsEnumerable,
                      r = Object.getOwnPropertyDescriptor,
                      o = r && !n.call({ 1: 2 }, 1)
                    t.f = o
                      ? function (e) {
                          var t = r(this, e)
                          return !!t && t.enumerable
                        }
                      : n
                  },
                  4024: function (e, t, n) {
                    var r = n(5288),
                      o = n(3951),
                      i = n(2096)
                    e.exports =
                      Object.setPrototypeOf ||
                      ('__proto__' in {}
                        ? (function () {
                            var e,
                              t = !1,
                              n = {}
                            try {
                              ;((e = r(Object.prototype, '__proto__', 'set'))(
                                n,
                                []
                              ),
                                (t = n instanceof Array))
                            } catch (s) {}
                            return function (n, r) {
                              return (
                                o(n),
                                i(r),
                                t ? e(n, r) : (n.__proto__ = r),
                                n
                              )
                            }
                          })()
                        : void 0)
                  },
                  7032: function (e, t, n) {
                    var r = n(16),
                      o = n(4427)
                    e.exports = r
                      ? {}.toString
                      : function () {
                          return '[object ' + o(this) + ']'
                        }
                  },
                  2104: function (e, t, n) {
                    var r = n(8448),
                      o = n(4328),
                      i = n(1632),
                      s = TypeError
                    e.exports = function (e, t) {
                      var n, a
                      if (
                        'string' === t &&
                        o((n = e.toString)) &&
                        !i((a = r(n, e)))
                      )
                        return a
                      if (o((n = e.valueOf)) && !i((a = r(n, e)))) return a
                      if (
                        'string' !== t &&
                        o((n = e.toString)) &&
                        !i((a = r(n, e)))
                      )
                        return a
                      throw new s("Can't convert object to primitive value")
                    }
                  },
                  9252: function (e, t, n) {
                    var r = n(5232),
                      o = n(1664),
                      i = n(5048),
                      s = n(9392),
                      a = n(3951),
                      u = o([].concat)
                    e.exports =
                      r('Reflect', 'ownKeys') ||
                      function (e) {
                        var t = i.f(a(e)),
                          n = s.f
                        return n ? u(t, n(e)) : t
                      }
                  },
                  584: function (e, t, n) {
                    var r = n(8352).f
                    e.exports = function (e, t, n) {
                      n in e ||
                        r(e, n, {
                          configurable: !0,
                          get: function () {
                            return t[n]
                          },
                          set: function (e) {
                            t[n] = e
                          }
                        })
                    }
                  },
                  9092: function (e, t, n) {
                    var r = n(8448),
                      o = n(3951),
                      i = n(4328),
                      s = n(1888),
                      a = n(7680),
                      u = TypeError
                    e.exports = function (e, t) {
                      var n = e.exec
                      if (i(n)) {
                        var c = r(n, e, t)
                        return (null !== c && o(c), c)
                      }
                      if ('RegExp' === s(e)) return r(a, e, t)
                      throw new u('RegExp#exec called on incompatible receiver')
                    }
                  },
                  7680: function (e, t, n) {
                    var r,
                      o,
                      i = n(8448),
                      s = n(1664),
                      a = n(5016),
                      u = n(8872),
                      c = n(3548),
                      l = n(4696),
                      d = n(9368),
                      f = n(9104).get,
                      p = n(8e3),
                      h = n(9124),
                      m = l('native-string-replace', String.prototype.replace),
                      v = RegExp.prototype.exec,
                      g = v,
                      y = s(''.charAt),
                      b = s(''.indexOf),
                      w = s(''.replace),
                      x = s(''.slice),
                      E =
                        ((o = /b*/g),
                        i(v, (r = /a/), 'a'),
                        i(v, o, 'a'),
                        0 !== r.lastIndex || 0 !== o.lastIndex),
                      S = c.BROKEN_CARET,
                      k = void 0 !== /()??/.exec('')[1]
                    ;((E || k || S || p || h) &&
                      (g = function (e) {
                        var t,
                          n,
                          r,
                          o,
                          s,
                          c,
                          l,
                          p = this,
                          h = f(p),
                          O = a(e),
                          T = h.raw
                        if (T)
                          return (
                            (T.lastIndex = p.lastIndex),
                            (t = i(g, T, O)),
                            (p.lastIndex = T.lastIndex),
                            t
                          )
                        var _ = h.groups,
                          C = S && p.sticky,
                          I = i(u, p),
                          L = p.source,
                          A = 0,
                          N = O
                        if (
                          (C &&
                            ((I = w(I, 'y', '')),
                            -1 === b(I, 'g') && (I += 'g'),
                            (N = x(O, p.lastIndex)),
                            p.lastIndex > 0 &&
                              (!p.multiline ||
                                (p.multiline &&
                                  '\n' !== y(O, p.lastIndex - 1))) &&
                              ((L = '(?: ' + L + ')'), (N = ' ' + N), A++),
                            (n = new RegExp('^(?:' + L + ')', I))),
                          k && (n = new RegExp('^' + L + '$(?!\\s)', I)),
                          E && (r = p.lastIndex),
                          (o = i(v, C ? n : p, N)),
                          C
                            ? o
                              ? ((o.input = x(o.input, A)),
                                (o[0] = x(o[0], A)),
                                (o.index = p.lastIndex),
                                (p.lastIndex += o[0].length))
                              : (p.lastIndex = 0)
                            : E &&
                              o &&
                              (p.lastIndex = p.global
                                ? o.index + o[0].length
                                : r),
                          k &&
                            o &&
                            o.length > 1 &&
                            i(m, o[0], n, function () {
                              for (s = 1; s < arguments.length - 2; s++)
                                void 0 === arguments[s] && (o[s] = void 0)
                            }),
                          o && _)
                        )
                          for (o.groups = c = d(null), s = 0; s < _.length; s++)
                            c[(l = _[s])[0]] = o[l[1]]
                        return o
                      }),
                      (e.exports = g))
                  },
                  8872: function (e, t, n) {
                    var r = n(3951)
                    e.exports = function () {
                      var e = r(this),
                        t = ''
                      return (
                        e.hasIndices && (t += 'd'),
                        e.global && (t += 'g'),
                        e.ignoreCase && (t += 'i'),
                        e.multiline && (t += 'm'),
                        e.dotAll && (t += 's'),
                        e.unicode && (t += 'u'),
                        e.unicodeSets && (t += 'v'),
                        e.sticky && (t += 'y'),
                        t
                      )
                    }
                  },
                  3548: function (e, t, n) {
                    var r = n(9957),
                      o = n(6420).RegExp,
                      i = r(function () {
                        var e = o('a', 'y')
                        return ((e.lastIndex = 2), null !== e.exec('abcd'))
                      }),
                      s =
                        i ||
                        r(function () {
                          return !o('a', 'y').sticky
                        }),
                      a =
                        i ||
                        r(function () {
                          var e = o('^r', 'gy')
                          return ((e.lastIndex = 2), null !== e.exec('str'))
                        })
                    e.exports = {
                      BROKEN_CARET: a,
                      MISSED_STICKY: s,
                      UNSUPPORTED_Y: i
                    }
                  },
                  8e3: function (e, t, n) {
                    var r = n(9957),
                      o = n(6420).RegExp
                    e.exports = r(function () {
                      var e = o('.', 's')
                      return !(e.dotAll && e.test('\n') && 's' === e.flags)
                    })
                  },
                  9124: function (e, t, n) {
                    var r = n(9957),
                      o = n(6420).RegExp
                    e.exports = r(function () {
                      var e = o('(?<a>b)', 'g')
                      return (
                        'b' !== e.exec('b').groups.a ||
                        'bc' !== 'b'.replace(e, '$<a>c')
                      )
                    })
                  },
                  5436: function (e, t, n) {
                    var r = n(9760),
                      o = TypeError
                    e.exports = function (e) {
                      if (r(e)) throw new o("Can't call method on " + e)
                      return e
                    }
                  },
                  6504: function (e, t, n) {
                    var r = n(4696),
                      o = n(7776),
                      i = r('keys')
                    e.exports = function (e) {
                      return i[e] || (i[e] = o(e))
                    }
                  },
                  3976: function (e, t, n) {
                    var r = n(7048),
                      o = n(6420),
                      i = n(4636),
                      s = '__core-js_shared__',
                      a = (e.exports = o[s] || i(s, {}))
                    ;(a.versions || (a.versions = [])).push({
                      version: '3.36.0',
                      mode: r ? 'pure' : 'global',
                      copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
                      license:
                        'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
                      source: 'https://github.com/zloirock/core-js'
                    })
                  },
                  4696: function (e, t, n) {
                    var r = n(3976)
                    e.exports = function (e, t) {
                      return r[e] || (r[e] = t || {})
                    }
                  },
                  9764: function (e, t, n) {
                    var r = n(1664),
                      o = n(6180),
                      i = n(5016),
                      s = n(5436),
                      a = r(''.charAt),
                      u = r(''.charCodeAt),
                      c = r(''.slice),
                      l = function (e) {
                        return function (t, n) {
                          var r,
                            l,
                            d = i(s(t)),
                            f = o(n),
                            p = d.length
                          return f < 0 || f >= p
                            ? e
                              ? ''
                              : void 0
                            : (r = u(d, f)) < 55296 ||
                                r > 56319 ||
                                f + 1 === p ||
                                (l = u(d, f + 1)) < 56320 ||
                                l > 57343
                              ? e
                                ? a(d, f)
                                : r
                              : e
                                ? c(d, f, f + 2)
                                : l - 56320 + ((r - 55296) << 10) + 65536
                        }
                      }
                    e.exports = { codeAt: l(!1), charAt: l(!0) }
                  },
                  772: function (e, t, n) {
                    var r = n(8504),
                      o = n(9957),
                      i = n(6420).String
                    e.exports =
                      !!Object.getOwnPropertySymbols &&
                      !o(function () {
                        var e = Symbol('symbol detection')
                        return (
                          !i(e) ||
                          !(Object(e) instanceof Symbol) ||
                          (!Symbol.sham && r && r < 41)
                        )
                      })
                  },
                  2495: function (e, t, n) {
                    var r = n(6180),
                      o = Math.max,
                      i = Math.min
                    e.exports = function (e, t) {
                      var n = r(e)
                      return n < 0 ? o(n + t, 0) : i(n, t)
                    }
                  },
                  4096: function (e, t, n) {
                    var r = n(5712),
                      o = n(5436)
                    e.exports = function (e) {
                      return r(o(e))
                    }
                  },
                  6180: function (e, t, n) {
                    var r = n(1748)
                    e.exports = function (e) {
                      var t = +e
                      return t != t || 0 === t ? 0 : r(t)
                    }
                  },
                  7584: function (e, t, n) {
                    var r = n(6180),
                      o = Math.min
                    e.exports = function (e) {
                      var t = r(e)
                      return t > 0 ? o(t, 9007199254740991) : 0
                    }
                  },
                  4356: function (e, t, n) {
                    var r = n(5436),
                      o = Object
                    e.exports = function (e) {
                      return o(r(e))
                    }
                  },
                  7024: function (e, t, n) {
                    var r = n(8448),
                      o = n(1632),
                      i = n(7728),
                      s = n(4504),
                      a = n(2104),
                      u = n(9972),
                      c = TypeError,
                      l = u('toPrimitive')
                    e.exports = function (e, t) {
                      if (!o(e) || i(e)) return e
                      var n,
                        u = s(e, l)
                      if (u) {
                        if (
                          (void 0 === t && (t = 'default'),
                          (n = r(u, e, t)),
                          !o(n) || i(n))
                        )
                          return n
                        throw new c("Can't convert object to primitive value")
                      }
                      return (void 0 === t && (t = 'number'), a(e, t))
                    }
                  },
                  88: function (e, t, n) {
                    var r = n(7024),
                      o = n(7728)
                    e.exports = function (e) {
                      var t = r(e, 'string')
                      return o(t) ? t : t + ''
                    }
                  },
                  16: function (e, t, n) {
                    var r = {}
                    ;((r[n(9972)('toStringTag')] = 'z'),
                      (e.exports = '[object z]' === String(r)))
                  },
                  5016: function (e, t, n) {
                    var r = n(4427),
                      o = String
                    e.exports = function (e) {
                      if ('Symbol' === r(e))
                        throw new TypeError(
                          'Cannot convert a Symbol value to a string'
                        )
                      return o(e)
                    }
                  },
                  36: function (e) {
                    var t = String
                    e.exports = function (e) {
                      try {
                        return t(e)
                      } catch (n) {
                        return 'Object'
                      }
                    }
                  },
                  7776: function (e, t, n) {
                    var r = n(1664),
                      o = 0,
                      i = Math.random(),
                      s = r((1).toString)
                    e.exports = function (e) {
                      return (
                        'Symbol(' +
                        (void 0 === e ? '' : e) +
                        ')_' +
                        s(++o + i, 36)
                      )
                    }
                  },
                  6536: function (e, t, n) {
                    var r = n(772)
                    e.exports =
                      r && !Symbol.sham && 'symbol' == typeof Symbol.iterator
                  },
                  1576: function (e, t, n) {
                    var r = n(3476),
                      o = n(9957)
                    e.exports =
                      r &&
                      o(function () {
                        return (
                          42 !==
                          Object.defineProperty(function () {}, 'prototype', {
                            value: 42,
                            writable: !1
                          }).prototype
                        )
                      })
                  },
                  4288: function (e, t, n) {
                    var r = n(6420),
                      o = n(4328),
                      i = r.WeakMap
                    e.exports = o(i) && /native code/.test(String(i))
                  },
                  9972: function (e, t, n) {
                    var r = n(6420),
                      o = n(4696),
                      i = n(5152),
                      s = n(7776),
                      a = n(772),
                      u = n(6536),
                      c = r.Symbol,
                      l = o('wks'),
                      d = u ? c.for || c : (c && c.withoutSetter) || s
                    e.exports = function (e) {
                      return (
                        i(l, e) ||
                          (l[e] = a && i(c, e) ? c[e] : d('Symbol.' + e)),
                        l[e]
                      )
                    }
                  },
                  6488: function (e, t, n) {
                    var r = n(5232),
                      o = n(5152),
                      i = n(3440),
                      s = n(7e3),
                      a = n(4024),
                      u = n(9968),
                      c = n(584),
                      l = n(7512),
                      d = n(8948),
                      f = n(3480),
                      p = n(3696),
                      h = n(3476),
                      m = n(7048)
                    e.exports = function (e, t, n, v) {
                      var g = 'stackTraceLimit',
                        y = v ? 2 : 1,
                        b = e.split('.'),
                        w = b[b.length - 1],
                        x = r.apply(null, b)
                      if (x) {
                        var E = x.prototype
                        if ((!m && o(E, 'cause') && delete E.cause, !n))
                          return x
                        var S = r('Error'),
                          k = t(function (e, t) {
                            var n = d(v ? t : e, void 0),
                              r = v ? new x(e) : new x()
                            return (
                              void 0 !== n && i(r, 'message', n),
                              p(r, k, r.stack, 2),
                              this && s(E, this) && l(r, this, k),
                              arguments.length > y && f(r, arguments[y]),
                              r
                            )
                          })
                        if (
                          ((k.prototype = E),
                          'Error' !== w
                            ? a
                              ? a(k, S)
                              : u(k, S, { name: !0 })
                            : h &&
                              g in x &&
                              (c(k, x, g), c(k, x, 'prepareStackTrace')),
                          u(k, x),
                          !m)
                        )
                          try {
                            ;(E.name !== w && i(E, 'name', w),
                              (E.constructor = k))
                          } catch (O) {}
                        return k
                      }
                    }
                  },
                  7476: function (e, t, n) {
                    var r = n(9160),
                      o = n(9957),
                      i = n(1432),
                      s = n(1632),
                      a = n(4356),
                      u = n(3556),
                      c = n(4316),
                      l = n(92),
                      d = n(2568),
                      f = n(953),
                      p = n(9972),
                      h = n(8504),
                      m = p('isConcatSpreadable'),
                      v =
                        h >= 51 ||
                        !o(function () {
                          var e = []
                          return ((e[m] = !1), e.concat()[0] !== e)
                        }),
                      g = function (e) {
                        if (!s(e)) return !1
                        var t = e[m]
                        return void 0 !== t ? !!t : i(e)
                      }
                    r(
                      {
                        target: 'Array',
                        proto: !0,
                        arity: 1,
                        forced: !v || !f('concat')
                      },
                      {
                        concat: function (e) {
                          var t,
                            n,
                            r,
                            o,
                            i,
                            s = a(this),
                            f = d(s, 0),
                            p = 0
                          for (t = -1, r = arguments.length; t < r; t++)
                            if (g((i = -1 === t ? s : arguments[t])))
                              for (o = u(i), c(p + o), n = 0; n < o; n++, p++)
                                n in i && l(f, p, i[n])
                            else (c(p + 1), l(f, p++, i))
                          return ((f.length = p), f)
                        }
                      }
                    )
                  },
                  6932: function (e, t, n) {
                    var r = n(9160),
                      o = n(3364).filter
                    r(
                      { target: 'Array', proto: !0, forced: !n(953)('filter') },
                      {
                        filter: function (e) {
                          return o(
                            this,
                            e,
                            arguments.length > 1 ? arguments[1] : void 0
                          )
                        }
                      }
                    )
                  },
                  700: function (e, t, n) {
                    var r = n(9160),
                      o = n(1664),
                      i = n(5712),
                      s = n(4096),
                      a = n(1496),
                      u = o([].join)
                    r(
                      {
                        target: 'Array',
                        proto: !0,
                        forced: i !== Object || !a('join', ',')
                      },
                      {
                        join: function (e) {
                          return u(s(this), void 0 === e ? ',' : e)
                        }
                      }
                    )
                  },
                  4456: function (e, t, n) {
                    var r = n(9160),
                      o = n(3364).map
                    r(
                      { target: 'Array', proto: !0, forced: !n(953)('map') },
                      {
                        map: function (e) {
                          return o(
                            this,
                            e,
                            arguments.length > 1 ? arguments[1] : void 0
                          )
                        }
                      }
                    )
                  },
                  4728: function (e, t, n) {
                    var r = n(9160),
                      o = n(4356),
                      i = n(3556),
                      s = n(6728),
                      a = n(4316)
                    r(
                      {
                        target: 'Array',
                        proto: !0,
                        arity: 1,
                        forced:
                          n(9957)(function () {
                            return (
                              4294967297 !==
                              [].push.call({ length: 4294967296 }, 1)
                            )
                          }) ||
                          !(function () {
                            try {
                              Object.defineProperty([], 'length', {
                                writable: !1
                              }).push()
                            } catch (e) {
                              return e instanceof TypeError
                            }
                          })()
                      },
                      {
                        push: function (e) {
                          var t = o(this),
                            n = i(t),
                            r = arguments.length
                          a(n + r)
                          for (var u = 0; u < r; u++)
                            ((t[n] = arguments[u]), n++)
                          return (s(t, n), n)
                        }
                      }
                    )
                  },
                  8752: function (e, t, n) {
                    var r = n(9160),
                      o = n(6420),
                      i = n(908),
                      s = n(6488),
                      a = 'WebAssembly',
                      u = o[a],
                      c = 7 !== new Error('e', { cause: 7 }).cause,
                      l = function (e, t) {
                        var n = {}
                        ;((n[e] = s(e, t, c)),
                          r(
                            {
                              global: !0,
                              constructor: !0,
                              arity: 1,
                              forced: c
                            },
                            n
                          ))
                      },
                      d = function (e, t) {
                        if (u && u[e]) {
                          var n = {}
                          ;((n[e] = s(a + '.' + e, t, c)),
                            r(
                              {
                                target: a,
                                stat: !0,
                                constructor: !0,
                                arity: 1,
                                forced: c
                              },
                              n
                            ))
                        }
                      }
                    ;(l('Error', function (e) {
                      return function (t) {
                        return i(e, this, arguments)
                      }
                    }),
                      l('EvalError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      l('RangeError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      l('ReferenceError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      l('SyntaxError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      l('TypeError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      l('URIError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      d('CompileError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      d('LinkError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }),
                      d('RuntimeError', function (e) {
                        return function (t) {
                          return i(e, this, arguments)
                        }
                      }))
                  },
                  508: function (e, t, n) {
                    var r = n(3476),
                      o = n(6208).EXISTS,
                      i = n(1664),
                      s = n(2544),
                      a = Function.prototype,
                      u = i(a.toString),
                      c =
                        /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,
                      l = i(c.exec)
                    r &&
                      !o &&
                      s(a, 'name', {
                        configurable: !0,
                        get: function () {
                          try {
                            return l(c, u(this))[1]
                          } catch (e) {
                            return ''
                          }
                        }
                      })
                  },
                  232: function (e, t, n) {
                    var r = n(9160),
                      o = n(9292)
                    r(
                      {
                        target: 'Object',
                        stat: !0,
                        arity: 2,
                        forced: Object.assign !== o
                      },
                      { assign: o }
                    )
                  },
                  5443: function (e, t, n) {
                    var r = n(16),
                      o = n(6076),
                      i = n(7032)
                    r || o(Object.prototype, 'toString', i, { unsafe: !0 })
                  },
                  880: function (e, t, n) {
                    var r = n(9160),
                      o = n(7680)
                    r(
                      { target: 'RegExp', proto: !0, forced: /./.exec !== o },
                      { exec: o }
                    )
                  },
                  9836: function (e, t, n) {
                    var r = n(8448),
                      o = n(7176),
                      i = n(3951),
                      s = n(9760),
                      a = n(7584),
                      u = n(5016),
                      c = n(5436),
                      l = n(4504),
                      d = n(4764),
                      f = n(9092)
                    o('match', function (e, t, n) {
                      return [
                        function (t) {
                          var n = c(this),
                            o = s(t) ? void 0 : l(t, e)
                          return o ? r(o, t, n) : new RegExp(t)[e](u(n))
                        },
                        function (e) {
                          var r = i(this),
                            o = u(e),
                            s = n(t, r, o)
                          if (s.done) return s.value
                          if (!r.global) return f(r, o)
                          var c = r.unicode
                          r.lastIndex = 0
                          for (var l, p = [], h = 0; null !== (l = f(r, o)); ) {
                            var m = u(l[0])
                            ;((p[h] = m),
                              '' === m &&
                                (r.lastIndex = d(o, a(r.lastIndex), c)),
                              h++)
                          }
                          return 0 === h ? null : p
                        }
                      ]
                    })
                  },
                  3536: function (e, t, n) {
                    var r = n(9160),
                      o = n(6420),
                      i = n(6100),
                      s = n(3951),
                      a = n(4328),
                      u = n(7796),
                      c = n(2544),
                      l = n(92),
                      d = n(9957),
                      f = n(5152),
                      p = n(9972),
                      h = n(336).IteratorPrototype,
                      m = n(3476),
                      v = n(7048),
                      g = 'constructor',
                      y = 'Iterator',
                      b = p('toStringTag'),
                      w = TypeError,
                      x = o[y],
                      E =
                        v ||
                        !a(x) ||
                        x.prototype !== h ||
                        !d(function () {
                          x({})
                        }),
                      S = function () {
                        if ((i(this, h), u(this) === h))
                          throw new w(
                            'Abstract class Iterator not directly constructable'
                          )
                      },
                      k = function (e, t) {
                        m
                          ? c(h, e, {
                              configurable: !0,
                              get: function () {
                                return t
                              },
                              set: function (t) {
                                if ((s(this), this === h))
                                  throw new w(
                                    "You can't redefine this property"
                                  )
                                f(this, e) ? (this[e] = t) : l(this, e, t)
                              }
                            })
                          : (h[e] = t)
                      }
                    ;(f(h, b) || k(b, y),
                      (!E && f(h, g) && h[g] !== Object) || k(g, S),
                      (S.prototype = h),
                      r(
                        { global: !0, constructor: !0, forced: E },
                        { Iterator: S }
                      ))
                  },
                  2144: function (e, t, n) {
                    var r = n(9160),
                      o = n(8448),
                      i = n(8952),
                      s = n(3951),
                      a = n(6752),
                      u = n(9724),
                      c = n(8696),
                      l = n(7048),
                      d = u(function () {
                        for (
                          var e,
                            t,
                            n = this.iterator,
                            r = this.predicate,
                            i = this.next;
                          ;
                        ) {
                          if (((e = s(o(i, n))), (this.done = !!e.done))) return
                          if (((t = e.value), c(n, r, [t, this.counter++], !0)))
                            return t
                        }
                      })
                    r(
                      { target: 'Iterator', proto: !0, real: !0, forced: l },
                      {
                        filter: function (e) {
                          return (
                            s(this),
                            i(e),
                            new d(a(this), { predicate: e })
                          )
                        }
                      }
                    )
                  },
                  9080: function (e, t, n) {
                    var r = n(9160),
                      o = n(5792)
                    r(
                      {
                        target: 'Iterator',
                        proto: !0,
                        real: !0,
                        forced: n(7048)
                      },
                      { map: o }
                    )
                  }
                },
                t = {}
              function n(r) {
                var o = t[r]
                if (void 0 !== o) return o.exports
                var i = (t[r] = { exports: {} })
                return (e[r].call(i.exports, i, i.exports, n), i.exports)
              }
              ;((n.d = function (e, t) {
                for (var r in t)
                  n.o(t, r) &&
                    !n.o(e, r) &&
                    Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
              }),
                (n.g = (function () {
                  if ('object' == typeof globalThis) return globalThis
                  try {
                    return this || new Function('return this')()
                  } catch (e) {
                    if ('object' == typeof window) return window
                  }
                })()),
                (n.o = function (e, t) {
                  return Object.prototype.hasOwnProperty.call(e, t)
                }))
              var r = {}
              return (
                (function () {
                  ;(n.d(r, {
                    default: function () {
                      return G
                    }
                  }),
                    n(8752),
                    n(6932),
                    n(4456),
                    n(508),
                    n(232),
                    n(5443),
                    n(3536),
                    n(2144),
                    n(9080))
                  var e = function () {},
                    t = {},
                    o = [],
                    i = []
                  function s(n, r) {
                    var s,
                      a,
                      u,
                      c,
                      l = i
                    for (c = arguments.length; c-- > 2; ) o.push(arguments[c])
                    for (
                      r &&
                      null != r.children &&
                      (o.length || o.push(r.children), delete r.children);
                      o.length;
                    )
                      if ((a = o.pop()) && void 0 !== a.pop)
                        for (c = a.length; c--; ) o.push(a[c])
                      else
                        ('boolean' == typeof a && (a = null),
                          (u = 'function' != typeof n) &&
                            (null == a
                              ? (a = '')
                              : 'number' == typeof a
                                ? (a = String(a))
                                : 'string' != typeof a && (u = !1)),
                          u && s
                            ? (l[l.length - 1] += a)
                            : l === i
                              ? (l = [a])
                              : l.push(a),
                          (s = u))
                    var d = new e()
                    return (
                      (d.nodeName = n),
                      (d.children = l),
                      (d.attributes = null == r ? void 0 : r),
                      (d.key = null == r ? void 0 : r.key),
                      void 0 !== t.vnode && t.vnode(d),
                      d
                    )
                  }
                  function a(e, t) {
                    for (var n in t) e[n] = t[n]
                    return e
                  }
                  function u(e, t) {
                    e && ('function' == typeof e ? e(t) : (e.current = t))
                  }
                  var c =
                      'function' == typeof Promise
                        ? Promise.resolve().then.bind(Promise.resolve())
                        : setTimeout,
                    l =
                      /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
                    d = []
                  function f(e) {
                    !e._dirty &&
                      (e._dirty = !0) &&
                      1 == d.push(e) &&
                      (t.debounceRendering || c)(p)
                  }
                  function p() {
                    for (var e; (e = d.pop()); ) e._dirty && j(e)
                  }
                  function h(e, t, n) {
                    return 'string' == typeof t || 'number' == typeof t
                      ? void 0 !== e.splitText
                      : 'string' == typeof t.nodeName
                        ? !e._componentConstructor && m(e, t.nodeName)
                        : n || e._componentConstructor === t.nodeName
                  }
                  function m(e, t) {
                    return (
                      e.normalizedNodeName === t ||
                      e.nodeName.toLowerCase() === t.toLowerCase()
                    )
                  }
                  function v(e) {
                    var t = a({}, e.attributes)
                    t.children = e.children
                    var n = e.nodeName.defaultProps
                    if (void 0 !== n)
                      for (var r in n) void 0 === t[r] && (t[r] = n[r])
                    return t
                  }
                  function g(e) {
                    var t = e.parentNode
                    t && t.removeChild(e)
                  }
                  function y(e, t, n, r, o) {
                    if (('className' === t && (t = 'class'), 'key' === t));
                    else if ('ref' === t) (u(n, null), u(r, e))
                    else if ('class' !== t || o)
                      if ('style' === t) {
                        if (
                          ((r &&
                            'string' != typeof r &&
                            'string' != typeof n) ||
                            (e.style.cssText = r || ''),
                          r && 'object' == typeof r)
                        ) {
                          if ('string' != typeof n)
                            for (var i in n) i in r || (e.style[i] = '')
                          for (var i in r)
                            e.style[i] =
                              'number' == typeof r[i] && !1 === l.test(i)
                                ? r[i] + 'px'
                                : r[i]
                        }
                      } else if ('dangerouslySetInnerHTML' === t)
                        r && (e.innerHTML = r.__html || '')
                      else if ('o' == t[0] && 'n' == t[1]) {
                        var s = t !== (t = t.replace(/Capture$/, ''))
                        ;((t = t.toLowerCase().substring(2)),
                          r
                            ? n || e.addEventListener(t, b, s)
                            : e.removeEventListener(t, b, s),
                          ((e._listeners || (e._listeners = {}))[t] = r))
                      } else if ('list' !== t && 'type' !== t && !o && t in e) {
                        try {
                          e[t] = null == r ? '' : r
                        } catch (c) {}
                        ;(null != r && !1 !== r) ||
                          'spellcheck' == t ||
                          e.removeAttribute(t)
                      } else {
                        var a = o && t !== (t = t.replace(/^xlink:?/, ''))
                        null == r || !1 === r
                          ? a
                            ? e.removeAttributeNS(
                                'http://www.w3.org/1999/xlink',
                                t.toLowerCase()
                              )
                            : e.removeAttribute(t)
                          : 'function' != typeof r &&
                            (a
                              ? e.setAttributeNS(
                                  'http://www.w3.org/1999/xlink',
                                  t.toLowerCase(),
                                  r
                                )
                              : e.setAttribute(t, r))
                      }
                    else e.className = r || ''
                  }
                  function b(e) {
                    return this._listeners[e.type]((t.event && t.event(e)) || e)
                  }
                  var w = [],
                    x = 0,
                    E = !1,
                    S = !1
                  function k() {
                    for (var e; (e = w.shift()); )
                      (t.afterMount && t.afterMount(e),
                        e.componentDidMount && e.componentDidMount())
                  }
                  function O(e, t, n, r, o, i) {
                    x++ ||
                      ((E = null != o && void 0 !== o.ownerSVGElement),
                      (S = null != e && !('__preactattr_' in e)))
                    var s = T(e, t, n, r, i)
                    return (
                      o && s.parentNode !== o && o.appendChild(s),
                      --x || ((S = !1), i || k()),
                      s
                    )
                  }
                  function T(e, t, n, r, o) {
                    var i = e,
                      s = E
                    if (
                      ((null != t && 'boolean' != typeof t) || (t = ''),
                      'string' == typeof t || 'number' == typeof t)
                    )
                      return (
                        e &&
                        void 0 !== e.splitText &&
                        e.parentNode &&
                        (!e._component || o)
                          ? e.nodeValue != t && (e.nodeValue = t)
                          : ((i = document.createTextNode(t)),
                            e &&
                              (e.parentNode && e.parentNode.replaceChild(i, e),
                              _(e, !0))),
                        (i.__preactattr_ = !0),
                        i
                      )
                    var a,
                      u,
                      c = t.nodeName
                    if ('function' == typeof c)
                      return (function (e, t, n, r) {
                        for (
                          var o = e && e._component,
                            i = o,
                            s = e,
                            a = o && e._componentConstructor === t.nodeName,
                            u = a,
                            c = v(t);
                          o && !u && (o = o._parentComponent);
                        )
                          u = o.constructor === t.nodeName
                        return (
                          o && u && (!r || o._component)
                            ? (N(o, c, 3, n, r), (e = o.base))
                            : (i && !a && (P(i), (e = s = null)),
                              (o = L(t.nodeName, c, n)),
                              e &&
                                !o.nextBase &&
                                ((o.nextBase = e), (s = null)),
                              N(o, c, 1, n, r),
                              (e = o.base),
                              s &&
                                e !== s &&
                                ((s._component = null), _(s, !1))),
                          e
                        )
                      })(e, t, n, r)
                    if (
                      ((E = 'svg' === c || ('foreignObject' !== c && E)),
                      (c = String(c)),
                      (!e || !m(e, c)) &&
                        ((a = c),
                        ((u = E
                          ? document.createElementNS(
                              'http://www.w3.org/2000/svg',
                              a
                            )
                          : document.createElement(a)).normalizedNodeName = a),
                        (i = u),
                        e))
                    ) {
                      for (; e.firstChild; ) i.appendChild(e.firstChild)
                      ;(e.parentNode && e.parentNode.replaceChild(i, e),
                        _(e, !0))
                    }
                    var l = i.firstChild,
                      d = i.__preactattr_,
                      f = t.children
                    if (null == d) {
                      d = i.__preactattr_ = {}
                      for (var p = i.attributes, b = p.length; b--; )
                        d[p[b].name] = p[b].value
                    }
                    return (
                      !S &&
                      f &&
                      1 === f.length &&
                      'string' == typeof f[0] &&
                      null != l &&
                      void 0 !== l.splitText &&
                      null == l.nextSibling
                        ? l.nodeValue != f[0] && (l.nodeValue = f[0])
                        : ((f && f.length) || null != l) &&
                          (function (e, t, n, r, o) {
                            var i,
                              s,
                              a,
                              u,
                              c,
                              l = e.childNodes,
                              d = [],
                              f = {},
                              p = 0,
                              m = 0,
                              v = l.length,
                              y = 0,
                              b = t ? t.length : 0
                            if (0 !== v)
                              for (var w = 0; w < v; w++) {
                                var x = l[w],
                                  E = x.__preactattr_
                                null !=
                                (S =
                                  b && E
                                    ? x._component
                                      ? x._component.__key
                                      : E.key
                                    : null)
                                  ? (p++, (f[S] = x))
                                  : (E ||
                                      (void 0 !== x.splitText
                                        ? !o || x.nodeValue.trim()
                                        : o)) &&
                                    (d[y++] = x)
                              }
                            if (0 !== b)
                              for (w = 0; w < b; w++) {
                                var S
                                if (((c = null), null != (S = (u = t[w]).key)))
                                  p &&
                                    void 0 !== f[S] &&
                                    ((c = f[S]), (f[S] = void 0), p--)
                                else if (m < y)
                                  for (i = m; i < y; i++)
                                    if (
                                      void 0 !== d[i] &&
                                      h((s = d[i]), u, o)
                                    ) {
                                      ;((c = s),
                                        (d[i] = void 0),
                                        i === y - 1 && y--,
                                        i === m && m++)
                                      break
                                    }
                                ;((c = T(c, u, n, r)),
                                  (a = l[w]),
                                  c &&
                                    c !== e &&
                                    c !== a &&
                                    (null == a
                                      ? e.appendChild(c)
                                      : c === a.nextSibling
                                        ? g(a)
                                        : e.insertBefore(c, a)))
                              }
                            if (p)
                              for (var w in f) void 0 !== f[w] && _(f[w], !1)
                            for (; m <= y; ) void 0 !== (c = d[y--]) && _(c, !1)
                          })(
                            i,
                            f,
                            n,
                            r,
                            S || null != d.dangerouslySetInnerHTML
                          ),
                      (function (e, t, n) {
                        var r
                        for (r in n)
                          (t && null != t[r]) ||
                            null == n[r] ||
                            y(e, r, n[r], (n[r] = void 0), E)
                        for (r in t)
                          'children' === r ||
                            'innerHTML' === r ||
                            (r in n &&
                              t[r] ===
                                ('value' === r || 'checked' === r
                                  ? e[r]
                                  : n[r])) ||
                            y(e, r, n[r], (n[r] = t[r]), E)
                      })(i, t.attributes, d),
                      (E = s),
                      i
                    )
                  }
                  function _(e, t) {
                    var n = e._component
                    n
                      ? P(n)
                      : (null != e.__preactattr_ &&
                          u(e.__preactattr_.ref, null),
                        (!1 !== t && null != e.__preactattr_) || g(e),
                        C(e))
                  }
                  function C(e) {
                    for (e = e.lastChild; e; ) {
                      var t = e.previousSibling
                      ;(_(e, !0), (e = t))
                    }
                  }
                  var I = []
                  function L(e, t, n) {
                    var r,
                      o = I.length
                    for (
                      e.prototype && e.prototype.render
                        ? ((r = new e(t, n)), R.call(r, t, n))
                        : (((r = new R(t, n)).constructor = e), (r.render = A));
                      o--;
                    )
                      if (I[o].constructor === e)
                        return ((r.nextBase = I[o].nextBase), I.splice(o, 1), r)
                    return r
                  }
                  function A(e, t, n) {
                    return this.constructor(e, n)
                  }
                  function N(e, n, r, o, i) {
                    e._disable ||
                      ((e._disable = !0),
                      (e.__ref = n.ref),
                      (e.__key = n.key),
                      delete n.ref,
                      delete n.key,
                      void 0 === e.constructor.getDerivedStateFromProps &&
                        (!e.base || i
                          ? e.componentWillMount && e.componentWillMount()
                          : e.componentWillReceiveProps &&
                            e.componentWillReceiveProps(n, o)),
                      o &&
                        o !== e.context &&
                        (e.prevContext || (e.prevContext = e.context),
                        (e.context = o)),
                      e.prevProps || (e.prevProps = e.props),
                      (e.props = n),
                      (e._disable = !1),
                      0 !== r &&
                        (1 !== r && !1 === t.syncComponentUpdates && e.base
                          ? f(e)
                          : j(e, 1, i)),
                      u(e.__ref, e))
                  }
                  function j(e, n, r, o) {
                    if (!e._disable) {
                      var i,
                        s,
                        u,
                        c = e.props,
                        l = e.state,
                        d = e.context,
                        f = e.prevProps || c,
                        p = e.prevState || l,
                        h = e.prevContext || d,
                        m = e.base,
                        g = e.nextBase,
                        y = m || g,
                        b = e._component,
                        E = !1,
                        S = h
                      if (
                        (e.constructor.getDerivedStateFromProps &&
                          ((l = a(
                            a({}, l),
                            e.constructor.getDerivedStateFromProps(c, l)
                          )),
                          (e.state = l)),
                        m &&
                          ((e.props = f),
                          (e.state = p),
                          (e.context = h),
                          2 !== n &&
                          e.shouldComponentUpdate &&
                          !1 === e.shouldComponentUpdate(c, l, d)
                            ? (E = !0)
                            : e.componentWillUpdate &&
                              e.componentWillUpdate(c, l, d),
                          (e.props = c),
                          (e.state = l),
                          (e.context = d)),
                        (e.prevProps =
                          e.prevState =
                          e.prevContext =
                          e.nextBase =
                            null),
                        (e._dirty = !1),
                        !E)
                      ) {
                        ;((i = e.render(c, l, d)),
                          e.getChildContext &&
                            (d = a(a({}, d), e.getChildContext())),
                          m &&
                            e.getSnapshotBeforeUpdate &&
                            (S = e.getSnapshotBeforeUpdate(f, p)))
                        var T,
                          C,
                          I = i && i.nodeName
                        if ('function' == typeof I) {
                          var A = v(i)
                          ;((s = b) && s.constructor === I && A.key == s.__key
                            ? N(s, A, 1, d, !1)
                            : ((T = s),
                              (e._component = s = L(I, A, d)),
                              (s.nextBase = s.nextBase || g),
                              (s._parentComponent = e),
                              N(s, A, 0, d, !1),
                              j(s, 1, r, !0)),
                            (C = s.base))
                        } else
                          ((u = y),
                            (T = b) && (u = e._component = null),
                            (y || 1 === n) &&
                              (u && (u._component = null),
                              (C = O(u, i, d, r || !m, y && y.parentNode, !0))))
                        if (y && C !== y && s !== b) {
                          var R = y.parentNode
                          R &&
                            C !== R &&
                            (R.replaceChild(C, y),
                            T || ((y._component = null), _(y, !1)))
                        }
                        if ((T && P(T), (e.base = C), C && !o)) {
                          for (var $ = e, M = e; (M = M._parentComponent); )
                            ($ = M).base = C
                          ;((C._component = $),
                            (C._componentConstructor = $.constructor))
                        }
                      }
                      for (
                        !m || r
                          ? w.push(e)
                          : E ||
                            (e.componentDidUpdate &&
                              e.componentDidUpdate(f, p, S),
                            t.afterUpdate && t.afterUpdate(e));
                        e._renderCallbacks.length;
                      )
                        e._renderCallbacks.pop().call(e)
                      x || o || k()
                    }
                  }
                  function P(e) {
                    t.beforeUnmount && t.beforeUnmount(e)
                    var n = e.base
                    ;((e._disable = !0),
                      e.componentWillUnmount && e.componentWillUnmount(),
                      (e.base = null))
                    var r = e._component
                    ;(r
                      ? P(r)
                      : n &&
                        (null != n.__preactattr_ &&
                          u(n.__preactattr_.ref, null),
                        (e.nextBase = n),
                        g(n),
                        I.push(e),
                        C(n)),
                      u(e.__ref, null))
                  }
                  function R(e, t) {
                    ;((this._dirty = !0),
                      (this.context = t),
                      (this.props = e),
                      (this.state = this.state || {}),
                      (this._renderCallbacks = []))
                  }
                  function $(e, t, n) {
                    return O(n, e, {}, !1, t, !1)
                  }
                  function M(e, t) {
                    return (
                      (M = Object.setPrototypeOf
                        ? Object.setPrototypeOf.bind()
                        : function (e, t) {
                            return ((e.__proto__ = t), e)
                          }),
                      M(e, t)
                    )
                  }
                  ;(a(R.prototype, {
                    setState: function (e, t) {
                      ;(this.prevState || (this.prevState = this.state),
                        (this.state = a(
                          a({}, this.state),
                          'function' == typeof e ? e(this.state, this.props) : e
                        )),
                        t && this._renderCallbacks.push(t),
                        f(this))
                    },
                    forceUpdate: function (e) {
                      ;(e && this._renderCallbacks.push(e), j(this, 2))
                    },
                    render: function () {}
                  }),
                    n(700),
                    n(4728),
                    n(880),
                    n(9836),
                    n(7476))
                  var F = (function (e) {
                    var t, n
                    function r() {
                      for (
                        var t, n = arguments.length, r = new Array(n), o = 0;
                        o < n;
                        o++
                      )
                        r[o] = arguments[o]
                      return (
                        ((t = e.call.apply(e, [this].concat(r)) || this).state =
                          { bump: !1, debounced: !1 }),
                        t
                      )
                    }
                    ;((n = e),
                      ((t = r).prototype = Object.create(n.prototype)),
                      (t.prototype.constructor = t),
                      M(t, n))
                    var o = r.prototype
                    return (
                      (o.componentWillMount = function () {
                        var e,
                          t,
                          n,
                          r = this
                        this.debounceStatusUpdate =
                          ((e = function () {
                            if (!r.state.debounced) {
                              var e =
                                !r.props.isInFocus || r.props.validChoiceMade
                              r.setState(function (t) {
                                return {
                                  bump: !t.bump,
                                  debounced: !0,
                                  silenced: e
                                }
                              })
                            }
                          }),
                          (t = 1400),
                          function () {
                            var r = this,
                              o = arguments
                            ;(clearTimeout(n),
                              (n = setTimeout(function () {
                                ;((n = null), e.apply(r, o))
                              }, t)))
                          })
                      }),
                      (o.componentWillReceiveProps = function (e) {
                        ;(e.queryLength, this.setState({ debounced: !1 }))
                      }),
                      (o.render = function () {
                        var e = this.props,
                          t = e.id,
                          n = e.length,
                          r = e.queryLength,
                          o = e.minQueryLength,
                          i = e.selectedOption,
                          a = e.selectedOptionIndex,
                          u = e.tQueryTooShort,
                          c = e.tNoResults,
                          l = e.tSelectedOption,
                          d = e.tResults,
                          f = e.className,
                          p = this.state,
                          h = p.bump,
                          m = p.debounced,
                          v = p.silenced,
                          g = r < o,
                          y = 0 === n,
                          b = i ? l(i, n, a) : '',
                          w = null
                        return (
                          (w = g ? u(o) : y ? c() : d(n, b)),
                          this.debounceStatusUpdate(),
                          s(
                            'div',
                            {
                              className: f,
                              style: {
                                border: '0',
                                clip: 'rect(0 0 0 0)',
                                height: '1px',
                                marginBottom: '-1px',
                                marginRight: '-1px',
                                overflow: 'hidden',
                                padding: '0',
                                position: 'absolute',
                                whiteSpace: 'nowrap',
                                width: '1px'
                              }
                            },
                            s(
                              'div',
                              {
                                id: t + '__status--A',
                                role: 'status',
                                'aria-atomic': 'true',
                                'aria-live': 'polite'
                              },
                              !v && m && h ? w : ''
                            ),
                            s(
                              'div',
                              {
                                id: t + '__status--B',
                                role: 'status',
                                'aria-atomic': 'true',
                                'aria-live': 'polite'
                              },
                              v || !m || h ? '' : w
                            )
                          )
                        )
                      }),
                      r
                    )
                  })(R)
                  F.defaultProps = {
                    tQueryTooShort: function (e) {
                      return 'Type in ' + e + ' or more characters for results'
                    },
                    tNoResults: function () {
                      return 'No search results'
                    },
                    tSelectedOption: function (e, t, n) {
                      return e + ' ' + (n + 1) + ' of ' + t + ' is highlighted'
                    },
                    tResults: function (e, t) {
                      return (
                        e +
                        ' ' +
                        (1 === e ? 'result' : 'results') +
                        ' ' +
                        (1 === e ? 'is' : 'are') +
                        ' available. ' +
                        t
                      )
                    }
                  }
                  var Q = function (e) {
                    return s(
                      'svg',
                      {
                        version: '1.1',
                        xmlns: 'http://www.w3.org/2000/svg',
                        className: e.className,
                        focusable: 'false'
                      },
                      s(
                        'g',
                        {
                          stroke: 'none',
                          fill: 'none',
                          'fill-rule': 'evenodd'
                        },
                        s('polygon', {
                          fill: '#000000',
                          points: '0 0 22 0 11 17'
                        })
                      )
                    )
                  }
                  function D() {
                    return (
                      (D = Object.assign
                        ? Object.assign.bind()
                        : function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var n = arguments[t]
                              for (var r in n)
                                Object.prototype.hasOwnProperty.call(n, r) &&
                                  (e[r] = n[r])
                            }
                            return e
                          }),
                      D.apply(this, arguments)
                    )
                  }
                  function B(e) {
                    if (void 0 === e)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return e
                  }
                  function q(e, t) {
                    return (
                      (q = Object.setPrototypeOf
                        ? Object.setPrototypeOf.bind()
                        : function (e, t) {
                            return ((e.__proto__ = t), e)
                          }),
                      q(e, t)
                    )
                  }
                  var z = {
                    13: 'enter',
                    27: 'escape',
                    32: 'space',
                    38: 'up',
                    40: 'down'
                  }
                  function H() {
                    return (
                      'undefined' != typeof navigator &&
                      !(
                        !navigator.userAgent.match(/(iPod|iPhone|iPad)/g) ||
                        !navigator.userAgent.match(/AppleWebKit/g)
                      )
                    )
                  }
                  var V = (function (e) {
                    var t, n
                    function r(t) {
                      var n
                      return (
                        ((n = e.call(this, t) || this).elementReferences = {}),
                        (n.state = {
                          focused: null,
                          hovered: null,
                          menuOpen: !1,
                          options: t.defaultValue ? [t.defaultValue] : [],
                          query: t.defaultValue,
                          validChoiceMade: !1,
                          selected: null,
                          ariaHint: !0
                        }),
                        (n.handleComponentBlur = n.handleComponentBlur.bind(
                          B(n)
                        )),
                        (n.handleKeyDown = n.handleKeyDown.bind(B(n))),
                        (n.handleUpArrow = n.handleUpArrow.bind(B(n))),
                        (n.handleDownArrow = n.handleDownArrow.bind(B(n))),
                        (n.handleEnter = n.handleEnter.bind(B(n))),
                        (n.handlePrintableKey = n.handlePrintableKey.bind(
                          B(n)
                        )),
                        (n.handleListMouseLeave = n.handleListMouseLeave.bind(
                          B(n)
                        )),
                        (n.handleOptionBlur = n.handleOptionBlur.bind(B(n))),
                        (n.handleOptionClick = n.handleOptionClick.bind(B(n))),
                        (n.handleOptionFocus = n.handleOptionFocus.bind(B(n))),
                        (n.handleOptionMouseDown = n.handleOptionMouseDown.bind(
                          B(n)
                        )),
                        (n.handleOptionMouseEnter =
                          n.handleOptionMouseEnter.bind(B(n))),
                        (n.handleInputBlur = n.handleInputBlur.bind(B(n))),
                        (n.handleInputChange = n.handleInputChange.bind(B(n))),
                        (n.handleInputClick = n.handleInputClick.bind(B(n))),
                        (n.handleInputFocus = n.handleInputFocus.bind(B(n))),
                        (n.pollInputElement = n.pollInputElement.bind(B(n))),
                        (n.getDirectInputChanges = n.getDirectInputChanges.bind(
                          B(n)
                        )),
                        n
                      )
                    }
                    ;((n = e),
                      ((t = r).prototype = Object.create(n.prototype)),
                      (t.prototype.constructor = t),
                      q(t, n))
                    var o = r.prototype
                    return (
                      (o.isQueryAnOption = function (e, t) {
                        var n = this
                        return (
                          -1 !==
                          t
                            .map(function (e) {
                              return n.templateInputValue(e).toLowerCase()
                            })
                            .indexOf(e.toLowerCase())
                        )
                      }),
                      (o.componentDidMount = function () {
                        this.pollInputElement()
                      }),
                      (o.componentWillUnmount = function () {
                        clearTimeout(this.$pollInput)
                      }),
                      (o.pollInputElement = function () {
                        var e = this
                        ;(this.getDirectInputChanges(),
                          (this.$pollInput = setTimeout(function () {
                            e.pollInputElement()
                          }, 100)))
                      }),
                      (o.getDirectInputChanges = function () {
                        var e = this.elementReferences[-1]
                        e &&
                          e.value !== this.state.query &&
                          this.handleInputChange({ target: { value: e.value } })
                      }),
                      (o.componentDidUpdate = function (e, t) {
                        var n = this.state.focused,
                          r = null === n,
                          o = t.focused !== n
                        o && !r && this.elementReferences[n].focus()
                        var i = -1 === n,
                          s = o && null === t.focused
                        if (i && s) {
                          var a = this.elementReferences[n]
                          a.setSelectionRange(0, a.value.length)
                        }
                      }),
                      (o.hasAutoselect = function () {
                        return !H() && this.props.autoselect
                      }),
                      (o.templateInputValue = function (e) {
                        var t =
                          this.props.templates &&
                          this.props.templates.inputValue
                        return t ? t(e) : e
                      }),
                      (o.templateSuggestion = function (e) {
                        var t =
                          this.props.templates &&
                          this.props.templates.suggestion
                        return t ? t(e) : e
                      }),
                      (o.handleComponentBlur = function (e) {
                        var t,
                          n = this.state,
                          r = n.options,
                          o = n.query,
                          i = n.selected
                        ;(this.props.confirmOnBlur
                          ? ((t = e.query || o), this.props.onConfirm(r[i]))
                          : (t = o),
                          this.setState({
                            focused: null,
                            menuOpen: e.menuOpen || !1,
                            query: t,
                            selected: null,
                            validChoiceMade: this.isQueryAnOption(t, r)
                          }))
                      }),
                      (o.handleListMouseLeave = function (e) {
                        this.setState({ hovered: null })
                      }),
                      (o.handleOptionBlur = function (e, t) {
                        var n = this.state,
                          r = n.focused,
                          o = n.menuOpen,
                          i = n.options,
                          s = n.selected,
                          a = null === e.relatedTarget,
                          u = e.relatedTarget === this.elementReferences[-1],
                          c = r !== t && -1 !== r
                        if ((!c && a) || (!c && !u)) {
                          var l = o && H()
                          this.handleComponentBlur({
                            menuOpen: l,
                            query: this.templateInputValue(i[s])
                          })
                        }
                      }),
                      (o.handleInputBlur = function (e) {
                        var t = this.state,
                          n = t.focused,
                          r = t.menuOpen,
                          o = t.options,
                          i = t.query,
                          s = t.selected
                        if (-1 === n) {
                          var a = r && H(),
                            u = H() ? i : this.templateInputValue(o[s])
                          this.handleComponentBlur({ menuOpen: a, query: u })
                        }
                      }),
                      (o.handleInputChange = function (e) {
                        var t = this,
                          n = this.props,
                          r = n.minLength,
                          o = n.source,
                          i = n.showAllValues,
                          s = this.hasAutoselect(),
                          a = e.target.value,
                          u = 0 === a.length,
                          c = this.state.query !== a,
                          l = a.length >= r
                        ;(this.setState({ query: a, ariaHint: u }),
                          i || (!u && c && l)
                            ? o(a, function (e) {
                                var n = e.length > 0
                                t.setState({
                                  menuOpen: n,
                                  options: e,
                                  selected: s && n ? 0 : -1,
                                  validChoiceMade: !1
                                })
                              })
                            : (!u && l) ||
                              this.setState({ menuOpen: !1, options: [] }))
                      }),
                      (o.handleInputClick = function (e) {
                        this.handleInputChange(e)
                      }),
                      (o.handleInputFocus = function (e) {
                        var t = this.state,
                          n = t.query,
                          r = t.validChoiceMade,
                          o = t.options,
                          i = this.props.minLength,
                          s = !r && n.length >= i && o.length > 0
                        s
                          ? this.setState(function (e) {
                              var t = e.menuOpen
                              return {
                                focused: -1,
                                menuOpen: s || t,
                                selected: -1
                              }
                            })
                          : this.setState({ focused: -1 })
                      }),
                      (o.handleOptionFocus = function (e) {
                        this.setState({
                          focused: e,
                          hovered: null,
                          selected: e
                        })
                      }),
                      (o.handleOptionMouseEnter = function (e, t) {
                        H() || this.setState({ hovered: t })
                      }),
                      (o.handleOptionClick = function (e, t) {
                        var n = this.state.options[t],
                          r = this.templateInputValue(n)
                        ;(this.props.onConfirm(n),
                          this.setState({
                            focused: -1,
                            hovered: null,
                            menuOpen: !1,
                            query: r,
                            selected: -1,
                            validChoiceMade: !0
                          }),
                          this.forceUpdate())
                      }),
                      (o.handleOptionMouseDown = function (e) {
                        e.preventDefault()
                      }),
                      (o.handleUpArrow = function (e) {
                        e.preventDefault()
                        var t = this.state,
                          n = t.menuOpen,
                          r = t.selected
                        ;-1 !== r && n && this.handleOptionFocus(r - 1)
                      }),
                      (o.handleDownArrow = function (e) {
                        var t = this
                        if (
                          (e.preventDefault(),
                          this.props.showAllValues &&
                            !1 === this.state.menuOpen)
                        )
                          (e.preventDefault(),
                            this.props.source('', function (e) {
                              t.setState({
                                menuOpen: !0,
                                options: e,
                                selected: 0,
                                focused: 0,
                                hovered: null
                              })
                            }))
                        else if (!0 === this.state.menuOpen) {
                          var n = this.state,
                            r = n.menuOpen,
                            o = n.options,
                            i = n.selected
                          i !== o.length - 1 &&
                            r &&
                            this.handleOptionFocus(i + 1)
                        }
                      }),
                      (o.handleSpace = function (e) {
                        var t = this
                        ;(this.props.showAllValues &&
                          !1 === this.state.menuOpen &&
                          '' === this.state.query &&
                          (e.preventDefault(),
                          this.props.source('', function (e) {
                            t.setState({ menuOpen: !0, options: e })
                          })),
                          -1 !== this.state.focused &&
                            (e.preventDefault(),
                            this.handleOptionClick(e, this.state.focused)))
                      }),
                      (o.handleEnter = function (e) {
                        this.state.menuOpen &&
                          (e.preventDefault(),
                          this.state.selected >= 0 &&
                            this.handleOptionClick(e, this.state.selected))
                      }),
                      (o.handlePrintableKey = function (e) {
                        var t = this.elementReferences[-1]
                        e.target === t || t.focus()
                      }),
                      (o.handleKeyDown = function (e) {
                        switch (z[e.keyCode]) {
                          case 'up':
                            this.handleUpArrow(e)
                            break
                          case 'down':
                            this.handleDownArrow(e)
                            break
                          case 'space':
                            this.handleSpace(e)
                            break
                          case 'enter':
                            this.handleEnter(e)
                            break
                          case 'escape':
                            this.handleComponentBlur({
                              query: this.state.query
                            })
                            break
                          default:
                            ;(((t = e.keyCode) > 47 && t < 58) ||
                              32 === t ||
                              8 === t ||
                              (t > 64 && t < 91) ||
                              (t > 95 && t < 112) ||
                              (t > 185 && t < 193) ||
                              (t > 218 && t < 223)) &&
                              this.handlePrintableKey(e)
                        }
                        var t
                      }),
                      (o.render = function () {
                        var e,
                          t = this,
                          n = this.props,
                          r = n.cssNamespace,
                          o = n.displayMenu,
                          i = n.id,
                          a = n.minLength,
                          u = n.name,
                          c = n.placeholder,
                          l = n.required,
                          d = n.showAllValues,
                          f = n.tNoResults,
                          p = n.tStatusQueryTooShort,
                          h = n.tStatusNoResults,
                          m = n.tStatusSelectedOption,
                          v = n.tStatusResults,
                          g = n.tAssistiveHint,
                          y = n.dropdownArrow,
                          b = n.menuAttributes,
                          w = n.inputClasses,
                          x = n.hintClasses,
                          E = n.menuClasses,
                          S = this.state,
                          k = S.focused,
                          O = S.hovered,
                          T = S.menuOpen,
                          _ = S.options,
                          C = S.query,
                          I = S.selected,
                          L = S.ariaHint,
                          A = S.validChoiceMade,
                          N = this.hasAutoselect(),
                          j = -1 === k,
                          P = 0 === _.length,
                          R = 0 !== C.length,
                          $ = C.length >= a,
                          M = this.props.showNoOptionsFound && j && P && R && $,
                          Q = r + '__wrapper',
                          B = r + '__status',
                          q = r + '__dropdown-arrow-down',
                          z = -1 !== k && null !== k,
                          V = r + '__option',
                          W = r + '__hint',
                          U = this.templateInputValue(_[I]),
                          G =
                            U &&
                            0 === U.toLowerCase().indexOf(C.toLowerCase()) &&
                            N
                              ? C + U.substr(C.length)
                              : '',
                          K = i + '__assistiveHint',
                          J = {
                            'aria-describedby': L ? K : null,
                            'aria-expanded': T ? 'true' : 'false',
                            'aria-activedescendant': z
                              ? i + '__option--' + k
                              : null,
                            'aria-controls': i + '__listbox',
                            'aria-autocomplete': this.hasAutoselect()
                              ? 'both'
                              : 'list'
                          }
                        d &&
                          'string' == typeof (e = y({ className: q })) &&
                          (e = s('div', {
                            className: r + '__dropdown-arrow-down-wrapper',
                            dangerouslySetInnerHTML: { __html: e }
                          }))
                        var Y = r + '__input',
                          X = [
                            Y,
                            this.props.showAllValues
                              ? Y + '--show-all-values'
                              : Y + '--default'
                          ]
                        ;(null !== k && X.push(Y + '--focused'), w && X.push(w))
                        var Z = r + '__menu',
                          ee = [
                            Z,
                            Z + '--' + o,
                            Z + '--' + (T || M ? 'visible' : 'hidden')
                          ]
                        ;(E && ee.push(E),
                          ((null != b && b.class) ||
                            (null != b && b.className)) &&
                            ee.push(
                              (null == b ? void 0 : b.class) ||
                                (null == b ? void 0 : b.className)
                            ))
                        var te = Object.assign({ 'aria-labelledby': i }, b, {
                          id: i + '__listbox',
                          role: 'listbox',
                          className: ee.join(' '),
                          onMouseLeave: this.handleListMouseLeave
                        })
                        return (
                          delete te.class,
                          s(
                            'div',
                            { className: Q, onKeyDown: this.handleKeyDown },
                            s(F, {
                              id: i,
                              length: _.length,
                              queryLength: C.length,
                              minQueryLength: a,
                              selectedOption: this.templateInputValue(_[I]),
                              selectedOptionIndex: I,
                              validChoiceMade: A,
                              isInFocus: null !== this.state.focused,
                              tQueryTooShort: p,
                              tNoResults: h,
                              tSelectedOption: m,
                              tResults: v,
                              className: B
                            }),
                            G &&
                              s(
                                'span',
                                null,
                                s('input', {
                                  className: [W, null === x ? w : x]
                                    .filter(Boolean)
                                    .join(' '),
                                  readonly: !0,
                                  tabIndex: '-1',
                                  value: G
                                })
                              ),
                            s(
                              'input',
                              D(
                                {},
                                J,
                                {
                                  autoComplete: 'off',
                                  className: X.join(' '),
                                  id: i,
                                  onClick: this.handleInputClick,
                                  onBlur: this.handleInputBlur
                                },
                                { onInput: this.handleInputChange },
                                {
                                  onFocus: this.handleInputFocus,
                                  name: u,
                                  placeholder: c,
                                  ref: function (e) {
                                    t.elementReferences[-1] = e
                                  },
                                  type: 'text',
                                  role: 'combobox',
                                  required: l,
                                  value: C
                                }
                              )
                            ),
                            e,
                            s(
                              'ul',
                              te,
                              _.map(function (e, n) {
                                var r =
                                    (-1 === k ? I === n : k === n) && null === O
                                      ? ' ' + V + '--focused'
                                      : '',
                                  o = n % 2 ? ' ' + V + '--odd' : '',
                                  a = H()
                                    ? '<span id=' +
                                      i +
                                      '__option-suffix--' +
                                      n +
                                      ' style="border:0;clip:rect(0 0 0 0);height:1px;marginBottom:-1px;marginRight:-1px;overflow:hidden;padding:0;position:absolute;whiteSpace:nowrap;width:1px"> ' +
                                      (n + 1) +
                                      ' of ' +
                                      _.length +
                                      '</span>'
                                    : ''
                                return s('li', {
                                  'aria-selected': k === n ? 'true' : 'false',
                                  className: '' + V + r + o,
                                  dangerouslySetInnerHTML: {
                                    __html: t.templateSuggestion(e) + a
                                  },
                                  id: i + '__option--' + n,
                                  key: n,
                                  onBlur: function (e) {
                                    return t.handleOptionBlur(e, n)
                                  },
                                  onClick: function (e) {
                                    return t.handleOptionClick(e, n)
                                  },
                                  onMouseDown: t.handleOptionMouseDown,
                                  onMouseEnter: function (e) {
                                    return t.handleOptionMouseEnter(e, n)
                                  },
                                  ref: function (e) {
                                    t.elementReferences[n] = e
                                  },
                                  role: 'option',
                                  tabIndex: '-1',
                                  'aria-posinset': n + 1,
                                  'aria-setsize': _.length
                                })
                              }),
                              M &&
                                s(
                                  'li',
                                  {
                                    className: V + ' ' + V + '--no-results',
                                    role: 'option',
                                    'aria-disabled': 'true'
                                  },
                                  f()
                                )
                            ),
                            s(
                              'span',
                              { id: K, style: { display: 'none' } },
                              g()
                            )
                          )
                        )
                      }),
                      r
                    )
                  })(R)
                  function W(e) {
                    if (!e.element) throw new Error('element is not defined')
                    if (!e.id) throw new Error('id is not defined')
                    if (!e.source) throw new Error('source is not defined')
                    ;(Array.isArray(e.source) && (e.source = U(e.source)),
                      $(s(V, e), e.element))
                  }
                  V.defaultProps = {
                    autoselect: !1,
                    cssNamespace: 'autocomplete',
                    defaultValue: '',
                    displayMenu: 'inline',
                    minLength: 0,
                    name: 'input-autocomplete',
                    placeholder: '',
                    onConfirm: function () {},
                    confirmOnBlur: !0,
                    showNoOptionsFound: !0,
                    showAllValues: !1,
                    required: !1,
                    tNoResults: function () {
                      return 'No results found'
                    },
                    tAssistiveHint: function () {
                      return 'When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.'
                    },
                    dropdownArrow: Q,
                    menuAttributes: {},
                    inputClasses: null,
                    hintClasses: null,
                    menuClasses: null
                  }
                  var U = function (e) {
                    return function (t, n) {
                      n(
                        e.filter(function (e) {
                          return -1 !== e.toLowerCase().indexOf(t.toLowerCase())
                        })
                      )
                    }
                  }
                  W.enhanceSelectElement = function (e) {
                    if (!e.selectElement)
                      throw new Error('selectElement is not defined')
                    if (!e.source) {
                      var t = [].filter.call(
                        e.selectElement.options,
                        function (t) {
                          return t.value || e.preserveNullOptions
                        }
                      )
                      e.source = t.map(function (e) {
                        return e.textContent || e.innerText
                      })
                    }
                    if (
                      ((e.onConfirm =
                        e.onConfirm ||
                        function (t) {
                          var n = [].filter.call(
                            e.selectElement.options,
                            function (e) {
                              return (e.textContent || e.innerText) === t
                            }
                          )[0]
                          n && (n.selected = !0)
                        }),
                      e.selectElement.value || void 0 === e.defaultValue)
                    ) {
                      var n =
                        e.selectElement.options[
                          e.selectElement.options.selectedIndex
                        ]
                      e.defaultValue = n.textContent || n.innerText
                    }
                    ;(void 0 === e.name && (e.name = ''),
                      void 0 === e.id &&
                        (void 0 === e.selectElement.id
                          ? (e.id = '')
                          : (e.id = e.selectElement.id)),
                      void 0 === e.autoselect && (e.autoselect = !0))
                    var r = document.createElement('div')
                    ;(e.selectElement.parentNode.insertBefore(
                      r,
                      e.selectElement
                    ),
                      W(Object.assign({}, e, { element: r })),
                      (e.selectElement.style.display = 'none'),
                      (e.selectElement.id = e.selectElement.id + '-select'))
                  }
                  var G = W
                })(),
                r.default
              )
            })()))
        })(se)),
      se.exports),
    ce = q(ue),
    le = { exports: {} }
  var de =
      (ae ||
        ((ae = 1),
        (function (e, t) {
          !(function () {
            var t,
              n,
              r,
              o,
              i,
              s,
              a,
              u,
              c,
              l,
              d,
              f,
              p,
              h,
              m,
              v,
              g,
              y,
              b,
              w,
              x,
              E,
              S,
              k,
              O,
              T,
              _,
              C,
              I,
              L,
              A = function e(t) {
                var n = new e.Builder()
                return (
                  n.pipeline.add(e.trimmer, e.stopWordFilter, e.stemmer),
                  n.searchPipeline.add(e.stemmer),
                  t.call(n, n),
                  n.build()
                )
              }
            ;((A.version = '2.3.9'),
              ((A.utils = {}).warn =
                ((t = this),
                function (e) {
                  t.console && console.warn && console.warn(e)
                })),
              (A.utils.asString = function (e) {
                return null == e ? '' : e.toString()
              }),
              (A.utils.clone = function (e) {
                if (null == e) return e
                for (
                  var t = Object.create(null), n = Object.keys(e), r = 0;
                  r < n.length;
                  r++
                ) {
                  var o = n[r],
                    i = e[o]
                  if (Array.isArray(i)) t[o] = i.slice()
                  else {
                    if (
                      'string' != typeof i &&
                      'number' != typeof i &&
                      'boolean' != typeof i
                    )
                      throw new TypeError(
                        'clone is not deep and does not support nested objects'
                      )
                    t[o] = i
                  }
                }
                return t
              }),
              ((A.FieldRef = function (e, t, n) {
                ;((this.docRef = e),
                  (this.fieldName = t),
                  (this._stringValue = n))
              }).joiner = '/'),
              (A.FieldRef.fromString = function (e) {
                var t = e.indexOf(A.FieldRef.joiner)
                if (-1 === t) throw 'malformed field ref string'
                var n = e.slice(0, t),
                  r = e.slice(t + 1)
                return new A.FieldRef(r, n, e)
              }),
              (A.FieldRef.prototype.toString = function () {
                return (
                  null == this._stringValue &&
                    (this._stringValue =
                      this.fieldName + A.FieldRef.joiner + this.docRef),
                  this._stringValue
                )
              }),
              ((A.Set = function (e) {
                if (((this.elements = Object.create(null)), e)) {
                  this.length = e.length
                  for (var t = 0; t < this.length; t++) this.elements[e[t]] = !0
                } else this.length = 0
              }).complete = {
                intersect: function (e) {
                  return e
                },
                union: function () {
                  return this
                },
                contains: function () {
                  return !0
                }
              }),
              (A.Set.empty = {
                intersect: function () {
                  return this
                },
                union: function (e) {
                  return e
                },
                contains: function () {
                  return !1
                }
              }),
              (A.Set.prototype.contains = function (e) {
                return !!this.elements[e]
              }),
              (A.Set.prototype.intersect = function (e) {
                var t,
                  n,
                  r,
                  o = []
                if (e === A.Set.complete) return this
                if (e === A.Set.empty) return e
                ;(this.length < e.length
                  ? ((t = this), (n = e))
                  : ((t = e), (n = this)),
                  (r = Object.keys(t.elements)))
                for (var i = 0; i < r.length; i++) {
                  var s = r[i]
                  s in n.elements && o.push(s)
                }
                return new A.Set(o)
              }),
              (A.Set.prototype.union = function (e) {
                return e === A.Set.complete
                  ? A.Set.complete
                  : e === A.Set.empty
                    ? this
                    : new A.Set(
                        Object.keys(this.elements).concat(
                          Object.keys(e.elements)
                        )
                      )
              }),
              (A.idf = function (e, t) {
                var n = 0
                for (var r in e)
                  '_index' != r && (n += Object.keys(e[r]).length)
                var o = (t - n + 0.5) / (n + 0.5)
                return Math.log(1 + Math.abs(o))
              }),
              ((A.Token = function (e, t) {
                ;((this.str = e || ''), (this.metadata = t || {}))
              }).prototype.toString = function () {
                return this.str
              }),
              (A.Token.prototype.update = function (e) {
                return ((this.str = e(this.str, this.metadata)), this)
              }),
              (A.Token.prototype.clone = function (e) {
                return new A.Token(
                  (e =
                    e ||
                    function (e) {
                      return e
                    })(this.str, this.metadata),
                  this.metadata
                )
              }),
              ((A.tokenizer = function (e, t) {
                if (null == e || null == e) return []
                if (Array.isArray(e))
                  return e.map(function (e) {
                    return new A.Token(
                      A.utils.asString(e).toLowerCase(),
                      A.utils.clone(t)
                    )
                  })
                for (
                  var n = e.toString().toLowerCase(),
                    r = n.length,
                    o = [],
                    i = 0,
                    s = 0;
                  i <= r;
                  i++
                ) {
                  var a = i - s
                  if (n.charAt(i).match(A.tokenizer.separator) || i == r) {
                    if (a > 0) {
                      var u = A.utils.clone(t) || {}
                      ;((u.position = [s, a]),
                        (u.index = o.length),
                        o.push(new A.Token(n.slice(s, i), u)))
                    }
                    s = i + 1
                  }
                }
                return o
              }).separator = /[\s\-]+/),
              ((A.Pipeline = function () {
                this._stack = []
              }).registeredFunctions = Object.create(null)),
              (A.Pipeline.registerFunction = function (e, t) {
                ;(t in this.registeredFunctions &&
                  A.utils.warn(
                    'Overwriting existing registered function: ' + t
                  ),
                  (e.label = t),
                  (A.Pipeline.registeredFunctions[e.label] = e))
              }),
              (A.Pipeline.warnIfFunctionNotRegistered = function (e) {
                ;(e.label && e.label in this.registeredFunctions) ||
                  A.utils.warn(
                    'Function is not registered with pipeline. This may cause problems when serialising the index.\n',
                    e
                  )
              }),
              (A.Pipeline.load = function (e) {
                var t = new A.Pipeline()
                return (
                  e.forEach(function (e) {
                    var n = A.Pipeline.registeredFunctions[e]
                    if (!n)
                      throw new Error('Cannot load unregistered function: ' + e)
                    t.add(n)
                  }),
                  t
                )
              }),
              (A.Pipeline.prototype.add = function () {
                Array.prototype.slice.call(arguments).forEach(function (e) {
                  ;(A.Pipeline.warnIfFunctionNotRegistered(e),
                    this._stack.push(e))
                }, this)
              }),
              (A.Pipeline.prototype.after = function (e, t) {
                A.Pipeline.warnIfFunctionNotRegistered(t)
                var n = this._stack.indexOf(e)
                if (-1 == n) throw new Error('Cannot find existingFn')
                ;((n += 1), this._stack.splice(n, 0, t))
              }),
              (A.Pipeline.prototype.before = function (e, t) {
                A.Pipeline.warnIfFunctionNotRegistered(t)
                var n = this._stack.indexOf(e)
                if (-1 == n) throw new Error('Cannot find existingFn')
                this._stack.splice(n, 0, t)
              }),
              (A.Pipeline.prototype.remove = function (e) {
                var t = this._stack.indexOf(e)
                ;-1 != t && this._stack.splice(t, 1)
              }),
              (A.Pipeline.prototype.run = function (e) {
                for (var t = this._stack.length, n = 0; n < t; n++) {
                  for (
                    var r = this._stack[n], o = [], i = 0;
                    i < e.length;
                    i++
                  ) {
                    var s = r(e[i], i, e)
                    if (null != s && '' !== s)
                      if (Array.isArray(s))
                        for (var a = 0; a < s.length; a++) o.push(s[a])
                      else o.push(s)
                  }
                  e = o
                }
                return e
              }),
              (A.Pipeline.prototype.runString = function (e, t) {
                var n = new A.Token(e, t)
                return this.run([n]).map(function (e) {
                  return e.toString()
                })
              }),
              (A.Pipeline.prototype.reset = function () {
                this._stack = []
              }),
              (A.Pipeline.prototype.toJSON = function () {
                return this._stack.map(function (e) {
                  return (A.Pipeline.warnIfFunctionNotRegistered(e), e.label)
                })
              }),
              ((A.Vector = function (e) {
                ;((this._magnitude = 0), (this.elements = e || []))
              }).prototype.positionForIndex = function (e) {
                if (0 == this.elements.length) return 0
                for (
                  var t = 0,
                    n = this.elements.length / 2,
                    r = n - t,
                    o = Math.floor(r / 2),
                    i = this.elements[2 * o];
                  r > 1 && (i < e && (t = o), i > e && (n = o), i != e);
                )
                  ((r = n - t),
                    (o = t + Math.floor(r / 2)),
                    (i = this.elements[2 * o]))
                return i == e || i > e ? 2 * o : i < e ? 2 * (o + 1) : void 0
              }),
              (A.Vector.prototype.insert = function (e, t) {
                this.upsert(e, t, function () {
                  throw 'duplicate index'
                })
              }),
              (A.Vector.prototype.upsert = function (e, t, n) {
                this._magnitude = 0
                var r = this.positionForIndex(e)
                this.elements[r] == e
                  ? (this.elements[r + 1] = n(this.elements[r + 1], t))
                  : this.elements.splice(r, 0, e, t)
              }),
              (A.Vector.prototype.magnitude = function () {
                if (this._magnitude) return this._magnitude
                for (
                  var e = 0, t = this.elements.length, n = 1;
                  n < t;
                  n += 2
                ) {
                  var r = this.elements[n]
                  e += r * r
                }
                return (this._magnitude = Math.sqrt(e))
              }),
              (A.Vector.prototype.dot = function (e) {
                for (
                  var t = 0,
                    n = this.elements,
                    r = e.elements,
                    o = n.length,
                    i = r.length,
                    s = 0,
                    a = 0,
                    u = 0,
                    c = 0;
                  u < o && c < i;
                )
                  (s = n[u]) < (a = r[c])
                    ? (u += 2)
                    : s > a
                      ? (c += 2)
                      : s == a &&
                        ((t += n[u + 1] * r[c + 1]), (u += 2), (c += 2))
                return t
              }),
              (A.Vector.prototype.similarity = function (e) {
                return this.dot(e) / this.magnitude() || 0
              }),
              (A.Vector.prototype.toArray = function () {
                for (
                  var e = new Array(this.elements.length / 2), t = 1, n = 0;
                  t < this.elements.length;
                  t += 2, n++
                )
                  e[n] = this.elements[t]
                return e
              }),
              (A.Vector.prototype.toJSON = function () {
                return this.elements
              }),
              (A.stemmer =
                ((n = {
                  ational: 'ate',
                  tional: 'tion',
                  enci: 'ence',
                  anci: 'ance',
                  izer: 'ize',
                  bli: 'ble',
                  alli: 'al',
                  entli: 'ent',
                  eli: 'e',
                  ousli: 'ous',
                  ization: 'ize',
                  ation: 'ate',
                  ator: 'ate',
                  alism: 'al',
                  iveness: 'ive',
                  fulness: 'ful',
                  ousness: 'ous',
                  aliti: 'al',
                  iviti: 'ive',
                  biliti: 'ble',
                  logi: 'log'
                }),
                (r = {
                  icate: 'ic',
                  ative: '',
                  alize: 'al',
                  iciti: 'ic',
                  ical: 'ic',
                  ful: '',
                  ness: ''
                }),
                (a =
                  '^(' +
                  (i = '[^aeiou][^aeiouy]*') +
                  ')?' +
                  (s = (o = '[aeiouy]') + '[aeiou]*') +
                  i +
                  '(' +
                  s +
                  ')?$'),
                (u = '^(' + i + ')?' + s + i + s + i),
                (c = '^(' + i + ')?' + o),
                (l = new RegExp('^(' + i + ')?' + s + i)),
                (d = new RegExp(u)),
                (f = new RegExp(a)),
                (p = new RegExp(c)),
                (h = /^(.+?)(ss|i)es$/),
                (m = /^(.+?)([^s])s$/),
                (v = /^(.+?)eed$/),
                (g = /^(.+?)(ed|ing)$/),
                (y = /.$/),
                (b = /(at|bl|iz)$/),
                (w = new RegExp('([^aeiouylsz])\\1$')),
                (x = new RegExp('^' + i + o + '[^aeiouwxy]$')),
                (E = /^(.+?[^aeiou])y$/),
                (S =
                  /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/),
                (k = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/),
                (O =
                  /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/),
                (T = /^(.+?)(s|t)(ion)$/),
                (_ = /^(.+?)e$/),
                (C = /ll$/),
                (I = new RegExp('^' + i + o + '[^aeiouwxy]$')),
                (L = function (e) {
                  var t, o, i, s, a, u, c
                  if (e.length < 3) return e
                  if (
                    ('y' == (i = e.substr(0, 1)) &&
                      (e = i.toUpperCase() + e.substr(1)),
                    (a = m),
                    (s = h).test(e)
                      ? (e = e.replace(s, '$1$2'))
                      : a.test(e) && (e = e.replace(a, '$1$2')),
                    (a = g),
                    (s = v).test(e))
                  ) {
                    var L = s.exec(e)
                    ;(s = l).test(L[1]) && ((s = y), (e = e.replace(s, '')))
                  } else
                    a.test(e) &&
                      ((t = (L = a.exec(e))[1]),
                      (a = p).test(t) &&
                        ((u = w),
                        (c = x),
                        (a = b).test((e = t))
                          ? (e += 'e')
                          : u.test(e)
                            ? ((s = y), (e = e.replace(s, '')))
                            : c.test(e) && (e += 'e')))
                  return (
                    (s = E).test(e) && (e = (t = (L = s.exec(e))[1]) + 'i'),
                    (s = S).test(e) &&
                      ((t = (L = s.exec(e))[1]),
                      (o = L[2]),
                      (s = l).test(t) && (e = t + n[o])),
                    (s = k).test(e) &&
                      ((t = (L = s.exec(e))[1]),
                      (o = L[2]),
                      (s = l).test(t) && (e = t + r[o])),
                    (a = T),
                    (s = O).test(e)
                      ? ((t = (L = s.exec(e))[1]), (s = d).test(t) && (e = t))
                      : a.test(e) &&
                        ((t = (L = a.exec(e))[1] + L[2]),
                        (a = d).test(t) && (e = t)),
                    (s = _).test(e) &&
                      ((t = (L = s.exec(e))[1]),
                      (a = f),
                      (u = I),
                      ((s = d).test(t) || (a.test(t) && !u.test(t))) &&
                        (e = t)),
                    (a = d),
                    (s = C).test(e) &&
                      a.test(e) &&
                      ((s = y), (e = e.replace(s, ''))),
                    'y' == i && (e = i.toLowerCase() + e.substr(1)),
                    e
                  )
                }),
                function (e) {
                  return e.update(L)
                })),
              A.Pipeline.registerFunction(A.stemmer, 'stemmer'),
              (A.generateStopWordFilter = function (e) {
                var t = e.reduce(function (e, t) {
                  return ((e[t] = t), e)
                }, {})
                return function (e) {
                  if (e && t[e.toString()] !== e.toString()) return e
                }
              }),
              (A.stopWordFilter = A.generateStopWordFilter([
                'a',
                'able',
                'about',
                'across',
                'after',
                'all',
                'almost',
                'also',
                'am',
                'among',
                'an',
                'and',
                'any',
                'are',
                'as',
                'at',
                'be',
                'because',
                'been',
                'but',
                'by',
                'can',
                'cannot',
                'could',
                'dear',
                'did',
                'do',
                'does',
                'either',
                'else',
                'ever',
                'every',
                'for',
                'from',
                'get',
                'got',
                'had',
                'has',
                'have',
                'he',
                'her',
                'hers',
                'him',
                'his',
                'how',
                'however',
                'i',
                'if',
                'in',
                'into',
                'is',
                'it',
                'its',
                'just',
                'least',
                'let',
                'like',
                'likely',
                'may',
                'me',
                'might',
                'most',
                'must',
                'my',
                'neither',
                'no',
                'nor',
                'not',
                'of',
                'off',
                'often',
                'on',
                'only',
                'or',
                'other',
                'our',
                'own',
                'rather',
                'said',
                'say',
                'says',
                'she',
                'should',
                'since',
                'so',
                'some',
                'than',
                'that',
                'the',
                'their',
                'them',
                'then',
                'there',
                'these',
                'they',
                'this',
                'tis',
                'to',
                'too',
                'twas',
                'us',
                'wants',
                'was',
                'we',
                'were',
                'what',
                'when',
                'where',
                'which',
                'while',
                'who',
                'whom',
                'why',
                'will',
                'with',
                'would',
                'yet',
                'you',
                'your'
              ])),
              A.Pipeline.registerFunction(A.stopWordFilter, 'stopWordFilter'),
              (A.trimmer = function (e) {
                return e.update(function (e) {
                  return e.replace(/^\W+/, '').replace(/\W+$/, '')
                })
              }),
              A.Pipeline.registerFunction(A.trimmer, 'trimmer'),
              ((A.TokenSet = function () {
                ;((this.final = !1),
                  (this.edges = {}),
                  (this.id = A.TokenSet._nextId),
                  (A.TokenSet._nextId += 1))
              })._nextId = 1),
              (A.TokenSet.fromArray = function (e) {
                for (
                  var t = new A.TokenSet.Builder(), n = 0, r = e.length;
                  n < r;
                  n++
                )
                  t.insert(e[n])
                return (t.finish(), t.root)
              }),
              (A.TokenSet.fromClause = function (e) {
                return 'editDistance' in e
                  ? A.TokenSet.fromFuzzyString(e.term, e.editDistance)
                  : A.TokenSet.fromString(e.term)
              }),
              (A.TokenSet.fromFuzzyString = function (e, t) {
                for (
                  var n = new A.TokenSet(),
                    r = [{ node: n, editsRemaining: t, str: e }];
                  r.length;
                ) {
                  var o = r.pop()
                  if (o.str.length > 0) {
                    var i,
                      s = o.str.charAt(0)
                    ;(s in o.node.edges
                      ? (i = o.node.edges[s])
                      : ((i = new A.TokenSet()), (o.node.edges[s] = i)),
                      1 == o.str.length && (i.final = !0),
                      r.push({
                        node: i,
                        editsRemaining: o.editsRemaining,
                        str: o.str.slice(1)
                      }))
                  }
                  if (0 != o.editsRemaining) {
                    if ('*' in o.node.edges) var a = o.node.edges['*']
                    else ((a = new A.TokenSet()), (o.node.edges['*'] = a))
                    if (
                      (0 == o.str.length && (a.final = !0),
                      r.push({
                        node: a,
                        editsRemaining: o.editsRemaining - 1,
                        str: o.str
                      }),
                      o.str.length > 1 &&
                        r.push({
                          node: o.node,
                          editsRemaining: o.editsRemaining - 1,
                          str: o.str.slice(1)
                        }),
                      1 == o.str.length && (o.node.final = !0),
                      o.str.length >= 1)
                    ) {
                      if ('*' in o.node.edges) var u = o.node.edges['*']
                      else ((u = new A.TokenSet()), (o.node.edges['*'] = u))
                      ;(1 == o.str.length && (u.final = !0),
                        r.push({
                          node: u,
                          editsRemaining: o.editsRemaining - 1,
                          str: o.str.slice(1)
                        }))
                    }
                    if (o.str.length > 1) {
                      var c,
                        l = o.str.charAt(0),
                        d = o.str.charAt(1)
                      ;(d in o.node.edges
                        ? (c = o.node.edges[d])
                        : ((c = new A.TokenSet()), (o.node.edges[d] = c)),
                        1 == o.str.length && (c.final = !0),
                        r.push({
                          node: c,
                          editsRemaining: o.editsRemaining - 1,
                          str: l + o.str.slice(2)
                        }))
                    }
                  }
                }
                return n
              }),
              (A.TokenSet.fromString = function (e) {
                for (
                  var t = new A.TokenSet(), n = t, r = 0, o = e.length;
                  r < o;
                  r++
                ) {
                  var i = e[r],
                    s = r == o - 1
                  if ('*' == i) ((t.edges[i] = t), (t.final = s))
                  else {
                    var a = new A.TokenSet()
                    ;((a.final = s), (t.edges[i] = a), (t = a))
                  }
                }
                return n
              }),
              (A.TokenSet.prototype.toArray = function () {
                for (var e = [], t = [{ prefix: '', node: this }]; t.length; ) {
                  var n = t.pop(),
                    r = Object.keys(n.node.edges),
                    o = r.length
                  n.node.final && (n.prefix.charAt(0), e.push(n.prefix))
                  for (var i = 0; i < o; i++) {
                    var s = r[i]
                    t.push({
                      prefix: n.prefix.concat(s),
                      node: n.node.edges[s]
                    })
                  }
                }
                return e
              }),
              (A.TokenSet.prototype.toString = function () {
                if (this._str) return this._str
                for (
                  var e = this.final ? '1' : '0',
                    t = Object.keys(this.edges).sort(),
                    n = t.length,
                    r = 0;
                  r < n;
                  r++
                ) {
                  var o = t[r]
                  e = e + o + this.edges[o].id
                }
                return e
              }),
              (A.TokenSet.prototype.intersect = function (e) {
                for (
                  var t = new A.TokenSet(),
                    n = void 0,
                    r = [{ qNode: e, output: t, node: this }];
                  r.length;
                ) {
                  n = r.pop()
                  for (
                    var o = Object.keys(n.qNode.edges),
                      i = o.length,
                      s = Object.keys(n.node.edges),
                      a = s.length,
                      u = 0;
                    u < i;
                    u++
                  )
                    for (var c = o[u], l = 0; l < a; l++) {
                      var d = s[l]
                      if (d == c || '*' == c) {
                        var f = n.node.edges[d],
                          p = n.qNode.edges[c],
                          h = f.final && p.final,
                          m = void 0
                        ;(d in n.output.edges
                          ? ((m = n.output.edges[d]).final = m.final || h)
                          : (((m = new A.TokenSet()).final = h),
                            (n.output.edges[d] = m)),
                          r.push({ qNode: p, output: m, node: f }))
                      }
                    }
                }
                return t
              }),
              (A.TokenSet.Builder = function () {
                ;((this.previousWord = ''),
                  (this.root = new A.TokenSet()),
                  (this.uncheckedNodes = []),
                  (this.minimizedNodes = {}))
              }),
              (A.TokenSet.Builder.prototype.insert = function (e) {
                var t,
                  n = 0
                if (e < this.previousWord)
                  throw new Error('Out of order word insertion')
                for (
                  var r = 0;
                  r < e.length &&
                  r < this.previousWord.length &&
                  e[r] == this.previousWord[r];
                  r++
                )
                  n++
                for (
                  this.minimize(n),
                    t =
                      0 == this.uncheckedNodes.length
                        ? this.root
                        : this.uncheckedNodes[this.uncheckedNodes.length - 1]
                            .child,
                    r = n;
                  r < e.length;
                  r++
                ) {
                  var o = new A.TokenSet(),
                    i = e[r]
                  ;((t.edges[i] = o),
                    this.uncheckedNodes.push({ parent: t, char: i, child: o }),
                    (t = o))
                }
                ;((t.final = !0), (this.previousWord = e))
              }),
              (A.TokenSet.Builder.prototype.finish = function () {
                this.minimize(0)
              }),
              (A.TokenSet.Builder.prototype.minimize = function (e) {
                for (var t = this.uncheckedNodes.length - 1; t >= e; t--) {
                  var n = this.uncheckedNodes[t],
                    r = n.child.toString()
                  ;(r in this.minimizedNodes
                    ? (n.parent.edges[n.char] = this.minimizedNodes[r])
                    : ((n.child._str = r), (this.minimizedNodes[r] = n.child)),
                    this.uncheckedNodes.pop())
                }
              }),
              ((A.Index = function (e) {
                ;((this.invertedIndex = e.invertedIndex),
                  (this.fieldVectors = e.fieldVectors),
                  (this.tokenSet = e.tokenSet),
                  (this.fields = e.fields),
                  (this.pipeline = e.pipeline))
              }).prototype.search = function (e) {
                return this.query(function (t) {
                  new A.QueryParser(e, t).parse()
                })
              }),
              (A.Index.prototype.query = function (e) {
                for (
                  var t = new A.Query(this.fields),
                    n = Object.create(null),
                    r = Object.create(null),
                    o = Object.create(null),
                    i = Object.create(null),
                    s = Object.create(null),
                    a = 0;
                  a < this.fields.length;
                  a++
                )
                  r[this.fields[a]] = new A.Vector()
                for (e.call(t, t), a = 0; a < t.clauses.length; a++) {
                  var u = t.clauses[a],
                    c = null,
                    l = A.Set.empty
                  c = u.usePipeline
                    ? this.pipeline.runString(u.term, { fields: u.fields })
                    : [u.term]
                  for (var d = 0; d < c.length; d++) {
                    var f = c[d]
                    u.term = f
                    var p = A.TokenSet.fromClause(u),
                      h = this.tokenSet.intersect(p).toArray()
                    if (
                      0 === h.length &&
                      u.presence === A.Query.presence.REQUIRED
                    ) {
                      for (var m = 0; m < u.fields.length; m++)
                        i[(N = u.fields[m])] = A.Set.empty
                      break
                    }
                    for (var v = 0; v < h.length; v++) {
                      var g = h[v],
                        y = this.invertedIndex[g],
                        b = y._index
                      for (m = 0; m < u.fields.length; m++) {
                        var w = y[(N = u.fields[m])],
                          x = Object.keys(w),
                          E = g + '/' + N,
                          S = new A.Set(x)
                        if (
                          (u.presence == A.Query.presence.REQUIRED &&
                            ((l = l.union(S)),
                            void 0 === i[N] && (i[N] = A.Set.complete)),
                          u.presence != A.Query.presence.PROHIBITED)
                        ) {
                          if (
                            (r[N].upsert(b, u.boost, function (e, t) {
                              return e + t
                            }),
                            !o[E])
                          ) {
                            for (var k = 0; k < x.length; k++) {
                              var O,
                                T = x[k],
                                _ = new A.FieldRef(T, N),
                                C = w[T]
                              void 0 === (O = n[_])
                                ? (n[_] = new A.MatchData(g, N, C))
                                : O.add(g, N, C)
                            }
                            o[E] = !0
                          }
                        } else
                          (void 0 === s[N] && (s[N] = A.Set.empty),
                            (s[N] = s[N].union(S)))
                      }
                    }
                  }
                  if (u.presence === A.Query.presence.REQUIRED)
                    for (m = 0; m < u.fields.length; m++)
                      i[(N = u.fields[m])] = i[N].intersect(l)
                }
                var I = A.Set.complete,
                  L = A.Set.empty
                for (a = 0; a < this.fields.length; a++) {
                  var N
                  ;(i[(N = this.fields[a])] && (I = I.intersect(i[N])),
                    s[N] && (L = L.union(s[N])))
                }
                var j = Object.keys(n),
                  P = [],
                  R = Object.create(null)
                if (t.isNegated())
                  for (
                    j = Object.keys(this.fieldVectors), a = 0;
                    a < j.length;
                    a++
                  ) {
                    _ = j[a]
                    var $ = A.FieldRef.fromString(_)
                    n[_] = new A.MatchData()
                  }
                for (a = 0; a < j.length; a++) {
                  var M = ($ = A.FieldRef.fromString(j[a])).docRef
                  if (I.contains(M) && !L.contains(M)) {
                    var F,
                      Q = this.fieldVectors[$],
                      D = r[$.fieldName].similarity(Q)
                    if (void 0 !== (F = R[M]))
                      ((F.score += D), F.matchData.combine(n[$]))
                    else {
                      var B = { ref: M, score: D, matchData: n[$] }
                      ;((R[M] = B), P.push(B))
                    }
                  }
                }
                return P.sort(function (e, t) {
                  return t.score - e.score
                })
              }),
              (A.Index.prototype.toJSON = function () {
                var e = Object.keys(this.invertedIndex)
                    .sort()
                    .map(function (e) {
                      return [e, this.invertedIndex[e]]
                    }, this),
                  t = Object.keys(this.fieldVectors).map(function (e) {
                    return [e, this.fieldVectors[e].toJSON()]
                  }, this)
                return {
                  version: A.version,
                  fields: this.fields,
                  fieldVectors: t,
                  invertedIndex: e,
                  pipeline: this.pipeline.toJSON()
                }
              }),
              (A.Index.load = function (e) {
                var t = {},
                  n = {},
                  r = e.fieldVectors,
                  o = Object.create(null),
                  i = e.invertedIndex,
                  s = new A.TokenSet.Builder(),
                  a = A.Pipeline.load(e.pipeline)
                e.version != A.version &&
                  A.utils.warn(
                    "Version mismatch when loading serialised index. Current version of lunr '" +
                      A.version +
                      "' does not match serialized index '" +
                      e.version +
                      "'"
                  )
                for (var u = 0; u < r.length; u++) {
                  var c = (d = r[u])[0],
                    l = d[1]
                  n[c] = new A.Vector(l)
                }
                for (u = 0; u < i.length; u++) {
                  var d,
                    f = (d = i[u])[0],
                    p = d[1]
                  ;(s.insert(f), (o[f] = p))
                }
                return (
                  s.finish(),
                  (t.fields = e.fields),
                  (t.fieldVectors = n),
                  (t.invertedIndex = o),
                  (t.tokenSet = s.root),
                  (t.pipeline = a),
                  new A.Index(t)
                )
              }),
              ((A.Builder = function () {
                ;((this._ref = 'id'),
                  (this._fields = Object.create(null)),
                  (this._documents = Object.create(null)),
                  (this.invertedIndex = Object.create(null)),
                  (this.fieldTermFrequencies = {}),
                  (this.fieldLengths = {}),
                  (this.tokenizer = A.tokenizer),
                  (this.pipeline = new A.Pipeline()),
                  (this.searchPipeline = new A.Pipeline()),
                  (this.documentCount = 0),
                  (this._b = 0.75),
                  (this._k1 = 1.2),
                  (this.termIndex = 0),
                  (this.metadataWhitelist = []))
              }).prototype.ref = function (e) {
                this._ref = e
              }),
              (A.Builder.prototype.field = function (e, t) {
                if (/\//.test(e))
                  throw new RangeError(
                    "Field '" + e + "' contains illegal character '/'"
                  )
                this._fields[e] = t || {}
              }),
              (A.Builder.prototype.b = function (e) {
                this._b = e < 0 ? 0 : e > 1 ? 1 : e
              }),
              (A.Builder.prototype.k1 = function (e) {
                this._k1 = e
              }),
              (A.Builder.prototype.add = function (e, t) {
                var n = e[this._ref],
                  r = Object.keys(this._fields)
                ;((this._documents[n] = t || {}), (this.documentCount += 1))
                for (var o = 0; o < r.length; o++) {
                  var i = r[o],
                    s = this._fields[i].extractor,
                    a = s ? s(e) : e[i],
                    u = this.tokenizer(a, { fields: [i] }),
                    c = this.pipeline.run(u),
                    l = new A.FieldRef(n, i),
                    d = Object.create(null)
                  ;((this.fieldTermFrequencies[l] = d),
                    (this.fieldLengths[l] = 0),
                    (this.fieldLengths[l] += c.length))
                  for (var f = 0; f < c.length; f++) {
                    var p = c[f]
                    if (
                      (null == d[p] && (d[p] = 0),
                      (d[p] += 1),
                      null == this.invertedIndex[p])
                    ) {
                      var h = Object.create(null)
                      ;((h._index = this.termIndex), (this.termIndex += 1))
                      for (var m = 0; m < r.length; m++)
                        h[r[m]] = Object.create(null)
                      this.invertedIndex[p] = h
                    }
                    null == this.invertedIndex[p][i][n] &&
                      (this.invertedIndex[p][i][n] = Object.create(null))
                    for (var v = 0; v < this.metadataWhitelist.length; v++) {
                      var g = this.metadataWhitelist[v],
                        y = p.metadata[g]
                      ;(null == this.invertedIndex[p][i][n][g] &&
                        (this.invertedIndex[p][i][n][g] = []),
                        this.invertedIndex[p][i][n][g].push(y))
                    }
                  }
                }
              }),
              (A.Builder.prototype.calculateAverageFieldLengths = function () {
                for (
                  var e = Object.keys(this.fieldLengths),
                    t = e.length,
                    n = {},
                    r = {},
                    o = 0;
                  o < t;
                  o++
                ) {
                  var i = A.FieldRef.fromString(e[o]),
                    s = i.fieldName
                  ;(r[s] || (r[s] = 0),
                    (r[s] += 1),
                    n[s] || (n[s] = 0),
                    (n[s] += this.fieldLengths[i]))
                }
                var a = Object.keys(this._fields)
                for (o = 0; o < a.length; o++) {
                  var u = a[o]
                  n[u] = n[u] / r[u]
                }
                this.averageFieldLength = n
              }),
              (A.Builder.prototype.createFieldVectors = function () {
                for (
                  var e = {},
                    t = Object.keys(this.fieldTermFrequencies),
                    n = t.length,
                    r = Object.create(null),
                    o = 0;
                  o < n;
                  o++
                ) {
                  for (
                    var i = A.FieldRef.fromString(t[o]),
                      s = i.fieldName,
                      a = this.fieldLengths[i],
                      u = new A.Vector(),
                      c = this.fieldTermFrequencies[i],
                      l = Object.keys(c),
                      d = l.length,
                      f = this._fields[s].boost || 1,
                      p = this._documents[i.docRef].boost || 1,
                      h = 0;
                    h < d;
                    h++
                  ) {
                    var m,
                      v,
                      g,
                      y = l[h],
                      b = c[y],
                      w = this.invertedIndex[y]._index
                    ;(void 0 === r[y]
                      ? ((m = A.idf(this.invertedIndex[y], this.documentCount)),
                        (r[y] = m))
                      : (m = r[y]),
                      (v =
                        (m * ((this._k1 + 1) * b)) /
                        (this._k1 *
                          (1 -
                            this._b +
                            this._b * (a / this.averageFieldLength[s])) +
                          b)),
                      (v *= f),
                      (v *= p),
                      (g = Math.round(1e3 * v) / 1e3),
                      u.insert(w, g))
                  }
                  e[i] = u
                }
                this.fieldVectors = e
              }),
              (A.Builder.prototype.createTokenSet = function () {
                this.tokenSet = A.TokenSet.fromArray(
                  Object.keys(this.invertedIndex).sort()
                )
              }),
              (A.Builder.prototype.build = function () {
                return (
                  this.calculateAverageFieldLengths(),
                  this.createFieldVectors(),
                  this.createTokenSet(),
                  new A.Index({
                    invertedIndex: this.invertedIndex,
                    fieldVectors: this.fieldVectors,
                    tokenSet: this.tokenSet,
                    fields: Object.keys(this._fields),
                    pipeline: this.searchPipeline
                  })
                )
              }),
              (A.Builder.prototype.use = function (e) {
                var t = Array.prototype.slice.call(arguments, 1)
                ;(t.unshift(this), e.apply(this, t))
              }),
              ((A.MatchData = function (e, t, n) {
                for (
                  var r = Object.create(null), o = Object.keys(n || {}), i = 0;
                  i < o.length;
                  i++
                ) {
                  var s = o[i]
                  r[s] = n[s].slice()
                }
                ;((this.metadata = Object.create(null)),
                  void 0 !== e &&
                    ((this.metadata[e] = Object.create(null)),
                    (this.metadata[e][t] = r)))
              }).prototype.combine = function (e) {
                for (
                  var t = Object.keys(e.metadata), n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = t[n],
                    o = Object.keys(e.metadata[r])
                  null == this.metadata[r] &&
                    (this.metadata[r] = Object.create(null))
                  for (var i = 0; i < o.length; i++) {
                    var s = o[i],
                      a = Object.keys(e.metadata[r][s])
                    null == this.metadata[r][s] &&
                      (this.metadata[r][s] = Object.create(null))
                    for (var u = 0; u < a.length; u++) {
                      var c = a[u]
                      null == this.metadata[r][s][c]
                        ? (this.metadata[r][s][c] = e.metadata[r][s][c])
                        : (this.metadata[r][s][c] = this.metadata[r][s][
                            c
                          ].concat(e.metadata[r][s][c]))
                    }
                  }
                }
              }),
              (A.MatchData.prototype.add = function (e, t, n) {
                if (!(e in this.metadata))
                  return (
                    (this.metadata[e] = Object.create(null)),
                    void (this.metadata[e][t] = n)
                  )
                if (t in this.metadata[e])
                  for (var r = Object.keys(n), o = 0; o < r.length; o++) {
                    var i = r[o]
                    i in this.metadata[e][t]
                      ? (this.metadata[e][t][i] = this.metadata[e][t][i].concat(
                          n[i]
                        ))
                      : (this.metadata[e][t][i] = n[i])
                  }
                else this.metadata[e][t] = n
              }),
              ((A.Query = function (e) {
                ;((this.clauses = []), (this.allFields = e))
              }).wildcard = new String('*')),
              (A.Query.wildcard.NONE = 0),
              (A.Query.wildcard.LEADING = 1),
              (A.Query.wildcard.TRAILING = 2),
              (A.Query.presence = { OPTIONAL: 1, REQUIRED: 2, PROHIBITED: 3 }),
              (A.Query.prototype.clause = function (e) {
                return (
                  'fields' in e || (e.fields = this.allFields),
                  'boost' in e || (e.boost = 1),
                  'usePipeline' in e || (e.usePipeline = !0),
                  'wildcard' in e || (e.wildcard = A.Query.wildcard.NONE),
                  e.wildcard & A.Query.wildcard.LEADING &&
                    e.term.charAt(0) != A.Query.wildcard &&
                    (e.term = '*' + e.term),
                  e.wildcard & A.Query.wildcard.TRAILING &&
                    e.term.slice(-1) != A.Query.wildcard &&
                    (e.term = e.term + '*'),
                  'presence' in e || (e.presence = A.Query.presence.OPTIONAL),
                  this.clauses.push(e),
                  this
                )
              }),
              (A.Query.prototype.isNegated = function () {
                for (var e = 0; e < this.clauses.length; e++)
                  if (this.clauses[e].presence != A.Query.presence.PROHIBITED)
                    return !1
                return !0
              }),
              (A.Query.prototype.term = function (e, t) {
                if (Array.isArray(e))
                  return (
                    e.forEach(function (e) {
                      this.term(e, A.utils.clone(t))
                    }, this),
                    this
                  )
                var n = t || {}
                return ((n.term = e.toString()), this.clause(n), this)
              }),
              ((A.QueryParseError = function (e, t, n) {
                ;((this.name = 'QueryParseError'),
                  (this.message = e),
                  (this.start = t),
                  (this.end = n))
              }).prototype = new Error()),
              ((A.QueryLexer = function (e) {
                ;((this.lexemes = []),
                  (this.str = e),
                  (this.length = e.length),
                  (this.pos = 0),
                  (this.start = 0),
                  (this.escapeCharPositions = []))
              }).prototype.run = function () {
                for (var e = A.QueryLexer.lexText; e; ) e = e(this)
              }),
              (A.QueryLexer.prototype.sliceString = function () {
                for (
                  var e = [], t = this.start, n = this.pos, r = 0;
                  r < this.escapeCharPositions.length;
                  r++
                )
                  ((n = this.escapeCharPositions[r]),
                    e.push(this.str.slice(t, n)),
                    (t = n + 1))
                return (
                  e.push(this.str.slice(t, this.pos)),
                  (this.escapeCharPositions.length = 0),
                  e.join('')
                )
              }),
              (A.QueryLexer.prototype.emit = function (e) {
                ;(this.lexemes.push({
                  type: e,
                  str: this.sliceString(),
                  start: this.start,
                  end: this.pos
                }),
                  (this.start = this.pos))
              }),
              (A.QueryLexer.prototype.escapeCharacter = function () {
                ;(this.escapeCharPositions.push(this.pos - 1), (this.pos += 1))
              }),
              (A.QueryLexer.prototype.next = function () {
                if (this.pos >= this.length) return A.QueryLexer.EOS
                var e = this.str.charAt(this.pos)
                return ((this.pos += 1), e)
              }),
              (A.QueryLexer.prototype.width = function () {
                return this.pos - this.start
              }),
              (A.QueryLexer.prototype.ignore = function () {
                ;(this.start == this.pos && (this.pos += 1),
                  (this.start = this.pos))
              }),
              (A.QueryLexer.prototype.backup = function () {
                this.pos -= 1
              }),
              (A.QueryLexer.prototype.acceptDigitRun = function () {
                var e, t
                do {
                  t = (e = this.next()).charCodeAt(0)
                } while (t > 47 && t < 58)
                e != A.QueryLexer.EOS && this.backup()
              }),
              (A.QueryLexer.prototype.more = function () {
                return this.pos < this.length
              }),
              (A.QueryLexer.EOS = 'EOS'),
              (A.QueryLexer.FIELD = 'FIELD'),
              (A.QueryLexer.TERM = 'TERM'),
              (A.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE'),
              (A.QueryLexer.BOOST = 'BOOST'),
              (A.QueryLexer.PRESENCE = 'PRESENCE'),
              (A.QueryLexer.lexField = function (e) {
                return (
                  e.backup(),
                  e.emit(A.QueryLexer.FIELD),
                  e.ignore(),
                  A.QueryLexer.lexText
                )
              }),
              (A.QueryLexer.lexTerm = function (e) {
                if (
                  (e.width() > 1 && (e.backup(), e.emit(A.QueryLexer.TERM)),
                  e.ignore(),
                  e.more())
                )
                  return A.QueryLexer.lexText
              }),
              (A.QueryLexer.lexEditDistance = function (e) {
                return (
                  e.ignore(),
                  e.acceptDigitRun(),
                  e.emit(A.QueryLexer.EDIT_DISTANCE),
                  A.QueryLexer.lexText
                )
              }),
              (A.QueryLexer.lexBoost = function (e) {
                return (
                  e.ignore(),
                  e.acceptDigitRun(),
                  e.emit(A.QueryLexer.BOOST),
                  A.QueryLexer.lexText
                )
              }),
              (A.QueryLexer.lexEOS = function (e) {
                e.width() > 0 && e.emit(A.QueryLexer.TERM)
              }),
              (A.QueryLexer.termSeparator = A.tokenizer.separator),
              (A.QueryLexer.lexText = function (e) {
                for (;;) {
                  var t = e.next()
                  if (t == A.QueryLexer.EOS) return A.QueryLexer.lexEOS
                  if (92 != t.charCodeAt(0)) {
                    if (':' == t) return A.QueryLexer.lexField
                    if ('~' == t)
                      return (
                        e.backup(),
                        e.width() > 0 && e.emit(A.QueryLexer.TERM),
                        A.QueryLexer.lexEditDistance
                      )
                    if ('^' == t)
                      return (
                        e.backup(),
                        e.width() > 0 && e.emit(A.QueryLexer.TERM),
                        A.QueryLexer.lexBoost
                      )
                    if ('+' == t && 1 === e.width())
                      return (
                        e.emit(A.QueryLexer.PRESENCE),
                        A.QueryLexer.lexText
                      )
                    if ('-' == t && 1 === e.width())
                      return (
                        e.emit(A.QueryLexer.PRESENCE),
                        A.QueryLexer.lexText
                      )
                    if (t.match(A.QueryLexer.termSeparator))
                      return A.QueryLexer.lexTerm
                  } else e.escapeCharacter()
                }
              }),
              ((A.QueryParser = function (e, t) {
                ;((this.lexer = new A.QueryLexer(e)),
                  (this.query = t),
                  (this.currentClause = {}),
                  (this.lexemeIdx = 0))
              }).prototype.parse = function () {
                ;(this.lexer.run(), (this.lexemes = this.lexer.lexemes))
                for (var e = A.QueryParser.parseClause; e; ) e = e(this)
                return this.query
              }),
              (A.QueryParser.prototype.peekLexeme = function () {
                return this.lexemes[this.lexemeIdx]
              }),
              (A.QueryParser.prototype.consumeLexeme = function () {
                var e = this.peekLexeme()
                return ((this.lexemeIdx += 1), e)
              }),
              (A.QueryParser.prototype.nextClause = function () {
                var e = this.currentClause
                ;(this.query.clause(e), (this.currentClause = {}))
              }),
              (A.QueryParser.parseClause = function (e) {
                var t = e.peekLexeme()
                if (null != t)
                  switch (t.type) {
                    case A.QueryLexer.PRESENCE:
                      return A.QueryParser.parsePresence
                    case A.QueryLexer.FIELD:
                      return A.QueryParser.parseField
                    case A.QueryLexer.TERM:
                      return A.QueryParser.parseTerm
                    default:
                      var n =
                        'expected either a field or a term, found ' + t.type
                      throw (
                        t.str.length >= 1 &&
                          (n += " with value '" + t.str + "'"),
                        new A.QueryParseError(n, t.start, t.end)
                      )
                  }
              }),
              (A.QueryParser.parsePresence = function (e) {
                var t = e.consumeLexeme()
                if (null != t) {
                  switch (t.str) {
                    case '-':
                      e.currentClause.presence = A.Query.presence.PROHIBITED
                      break
                    case '+':
                      e.currentClause.presence = A.Query.presence.REQUIRED
                      break
                    default:
                      var n = "unrecognised presence operator'" + t.str + "'"
                      throw new A.QueryParseError(n, t.start, t.end)
                  }
                  var r = e.peekLexeme()
                  if (null == r)
                    throw new A.QueryParseError(
                      (n = 'expecting term or field, found nothing'),
                      t.start,
                      t.end
                    )
                  switch (r.type) {
                    case A.QueryLexer.FIELD:
                      return A.QueryParser.parseField
                    case A.QueryLexer.TERM:
                      return A.QueryParser.parseTerm
                    default:
                      throw (
                        (n = "expecting term or field, found '" + r.type + "'"),
                        new A.QueryParseError(n, r.start, r.end)
                      )
                  }
                }
              }),
              (A.QueryParser.parseField = function (e) {
                var t = e.consumeLexeme()
                if (null != t) {
                  if (-1 == e.query.allFields.indexOf(t.str)) {
                    var n = e.query.allFields
                        .map(function (e) {
                          return "'" + e + "'"
                        })
                        .join(', '),
                      r =
                        "unrecognised field '" +
                        t.str +
                        "', possible fields: " +
                        n
                    throw new A.QueryParseError(r, t.start, t.end)
                  }
                  e.currentClause.fields = [t.str]
                  var o = e.peekLexeme()
                  if (null == o)
                    throw new A.QueryParseError(
                      (r = 'expecting term, found nothing'),
                      t.start,
                      t.end
                    )
                  if (o.type === A.QueryLexer.TERM)
                    return A.QueryParser.parseTerm
                  throw (
                    (r = "expecting term, found '" + o.type + "'"),
                    new A.QueryParseError(r, o.start, o.end)
                  )
                }
              }),
              (A.QueryParser.parseTerm = function (e) {
                var t = e.consumeLexeme()
                if (null != t) {
                  ;((e.currentClause.term = t.str.toLowerCase()),
                    -1 != t.str.indexOf('*') &&
                      (e.currentClause.usePipeline = !1))
                  var n = e.peekLexeme()
                  if (null != n)
                    switch (n.type) {
                      case A.QueryLexer.TERM:
                        return (e.nextClause(), A.QueryParser.parseTerm)
                      case A.QueryLexer.FIELD:
                        return (e.nextClause(), A.QueryParser.parseField)
                      case A.QueryLexer.EDIT_DISTANCE:
                        return A.QueryParser.parseEditDistance
                      case A.QueryLexer.BOOST:
                        return A.QueryParser.parseBoost
                      case A.QueryLexer.PRESENCE:
                        return (e.nextClause(), A.QueryParser.parsePresence)
                      default:
                        var r = "Unexpected lexeme type '" + n.type + "'"
                        throw new A.QueryParseError(r, n.start, n.end)
                    }
                  else e.nextClause()
                }
              }),
              (A.QueryParser.parseEditDistance = function (e) {
                var t = e.consumeLexeme()
                if (null != t) {
                  var n = parseInt(t.str, 10)
                  if (isNaN(n))
                    throw new A.QueryParseError(
                      (o = 'edit distance must be numeric'),
                      t.start,
                      t.end
                    )
                  e.currentClause.editDistance = n
                  var r = e.peekLexeme()
                  if (null != r)
                    switch (r.type) {
                      case A.QueryLexer.TERM:
                        return (e.nextClause(), A.QueryParser.parseTerm)
                      case A.QueryLexer.FIELD:
                        return (e.nextClause(), A.QueryParser.parseField)
                      case A.QueryLexer.EDIT_DISTANCE:
                        return A.QueryParser.parseEditDistance
                      case A.QueryLexer.BOOST:
                        return A.QueryParser.parseBoost
                      case A.QueryLexer.PRESENCE:
                        return (e.nextClause(), A.QueryParser.parsePresence)
                      default:
                        var o = "Unexpected lexeme type '" + r.type + "'"
                        throw new A.QueryParseError(o, r.start, r.end)
                    }
                  else e.nextClause()
                }
              }),
              (A.QueryParser.parseBoost = function (e) {
                var t = e.consumeLexeme()
                if (null != t) {
                  var n = parseInt(t.str, 10)
                  if (isNaN(n))
                    throw new A.QueryParseError(
                      (o = 'boost must be numeric'),
                      t.start,
                      t.end
                    )
                  e.currentClause.boost = n
                  var r = e.peekLexeme()
                  if (null != r)
                    switch (r.type) {
                      case A.QueryLexer.TERM:
                        return (e.nextClause(), A.QueryParser.parseTerm)
                      case A.QueryLexer.FIELD:
                        return (e.nextClause(), A.QueryParser.parseField)
                      case A.QueryLexer.EDIT_DISTANCE:
                        return A.QueryParser.parseEditDistance
                      case A.QueryLexer.BOOST:
                        return A.QueryParser.parseBoost
                      case A.QueryLexer.PRESENCE:
                        return (e.nextClause(), A.QueryParser.parsePresence)
                      default:
                        var o = "Unexpected lexeme type '" + r.type + "'"
                        throw new A.QueryParseError(o, r.start, r.end)
                    }
                  else e.nextClause()
                }
              }),
              (e.exports = A))
          })()
        })(le)),
      le.exports),
    fe = q(de)
  let pe = null,
    he = null,
    me = null,
    ve = '',
    ge = (e) => {},
    ye = [],
    be = null
  class we extends l {
    constructor(e) {
      ;(super(e),
        ce({
          element: this.$root,
          id: 'app-site-search__input',
          cssNamespace: 'app-site-search',
          displayMenu: 'overlay',
          placeholder: 'Search Design System',
          confirmOnBlur: !1,
          autoselect: !0,
          source: this.handleSearchQuery.bind(this),
          onConfirm: this.handleOnConfirm,
          templates: {
            inputValue: this.inputValueTemplate,
            suggestion: this.resultTemplate
          },
          tNoResults: () => me
        }))
      const t = this.$root.querySelector('.app-site-search__input')
      if (!t) return this
      t.addEventListener('blur', () => {
        clearTimeout(be)
      })
      const n = this.$root.getAttribute('data-search-index')
      this.fetchSearchIndex(n, () => {
        this.renderResults()
      })
    }
    fetchSearchIndex(e, t) {
      const n = new XMLHttpRequest()
      ;(n.open('GET', e, !0),
        (n.timeout = 1e4),
        (me = 'Loading search index'),
        (n.onreadystatechange = () => {
          if (4 === n.readyState)
            if (200 === n.status) {
              const e = n.responseText,
                r = JSON.parse(e)
              ;((me = 'No results found'),
                (pe = fe.Index.load(r.index)),
                (he = r.store),
                t(r))
            } else me = 'Failed to load the search index'
        }),
        n.send())
    }
    renderResults() {
      if (!pe || !he) return void ge(ye)
      const e = pe.query((e) => {
        e.term(fe.tokenizer(ve), { wildcard: fe.Query.wildcard.TRAILING })
      })
      ;((ye = e.map((e) => he[e.ref])), ge(ye))
    }
    handleSearchQuery(e, t) {
      ;((ve = e),
        (ge = t),
        clearTimeout(be),
        (be = setTimeout(
          () => {
            !(function (e, t) {
              if (
                'DO_NOT_TRACK_ENABLED' in window &&
                window.DO_NOT_TRACK_ENABLED
              )
                return
              const n = S(e),
                r = t.length > 0,
                o = k(t, n)
              ;(E({
                event: 'site_search',
                event_data: { action: r ? 'results' : 'no result', text: n }
              }),
                E({ ecommerce: null }),
                E({ event: 'view_item_list', ecommerce: { items: o } }))
            })(ve, ye)
          },
          (() => {
            const e = window.__SITE_SEARCH_TRACKING_TIMEOUT
            return void 0 !== e ? e : 2e3
          })()
        )),
        this.renderResults())
    }
    handleOnConfirm(e) {
      const t = e.permalink
      t &&
        (!(function (e, t, n) {
          if ('DO_NOT_TRACK_ENABLED' in window && window.DO_NOT_TRACK_ENABLED)
            return
          const r = S(e),
            o = k(t, r).filter((e) => e.name === n.title)
          ;(E({
            event: 'site_search',
            event_data: { action: 'click', text: r, section: n.title }
          }),
            E({ ecommerce: null }),
            E({ event: 'select_item', ecommerce: { items: o } }))
        })(ve, ye, e),
        (window.location.href = `/${t}`))
    }
    inputValueTemplate(e) {
      if (e) return e.title
    }
    resultTemplate(e) {
      function t(e, t) {
        return e.filter(
          (e) => 0 === e.trim().toLowerCase().indexOf(t.toLowerCase())
        )
      }
      if (e) {
        const n = document.createElement('span')
        n.textContent = e.title
        if (!t(e.title.match(/\w+/g) || [], ve).length && e.aliases) {
          const r = e.aliases
            .split(', ')
            .reduce(
              (e, n) =>
                t(n.match(/\w+/g) || [], ve).length ? e.concat([n]) : e,
              []
            )
          if (r.length) {
            const e = document.createElement('span')
            ;((e.className = 'app-site-search__aliases'),
              (e.textContent = r.join(', ')),
              n.appendChild(e))
          }
        }
        const r = document.createElement('span')
        ;((r.className = 'app-site-search--section'), (r.innerHTML = e.section))
        const o = document.createElement('span')
        return (
          (o.className = 'govuk-visually-hidden'),
          (o.innerHTML = ', '),
          n.appendChild(o),
          n.appendChild(r),
          n.innerHTML
        )
      }
    }
  }
  we.moduleName = 'app-search'
  class xe extends l {
    constructor(e) {
      ;(super(e),
        (this.$mobileTabs = this.$root.querySelectorAll('.js-tabs__heading a')),
        (this.$desktopTabs = this.$root.querySelectorAll('.js-tabs__item a')),
        (this.$panels = this.$root.querySelectorAll('.js-tabs__container')),
        this.enhanceMobileTabs(),
        this.$desktopTabs.forEach((e) => {
          e.addEventListener('click', (e) => this.onClick(e))
        }),
        this.resetTabs(),
        this.$root.hasAttribute('data-open') &&
          this.openPanel(this.$panels[0].id))
    }
    onClick(e) {
      e.preventDefault()
      const t = e.target
      if (!(t instanceof HTMLElement)) return
      const n = t.getAttribute('aria-controls')
      if (!n) return
      const r = this.getPanel(n),
        o = 'true' === t.getAttribute('aria-expanded')
      if (!r) throw new Error(`Invalid example ID given: ${n}`)
      o ? this.closePanel(n) : (this.resetTabs(), this.openPanel(n))
    }
    enhanceMobileTabs() {
      ;(this.$mobileTabs.forEach((e) => {
        const t = document.createElement('button')
        ;(t.setAttribute('aria-controls', e.getAttribute('aria-controls')),
          t.setAttribute('data-track', e.getAttribute('data-track')),
          t.classList.add('app-tabs__heading-button'),
          (t.innerHTML = e.innerHTML),
          t.addEventListener('click', (e) => this.onClick(e)),
          e.parentElement.appendChild(t),
          e.parentElement.removeChild(e))
      }),
        (this.$mobileTabs = this.$root.querySelectorAll(
          '.js-tabs__heading button'
        )))
    }
    resetTabs() {
      this.$panels.forEach((e) => {
        e.classList.contains('js-tabs__container--no-tabs') ||
          this.closePanel(e.id)
      })
    }
    openPanel(e) {
      if (!e) return
      const t = this.getPanel(e)
      if (!t) return
      const n = this.getMobileTab(e),
        r = this.getDesktopTab(e)
      ;(n &&
        n.parentElement &&
        r &&
        r.parentElement &&
        (n.setAttribute('aria-expanded', 'true'),
        n.parentElement.classList.add('app-tabs__heading--current'),
        r.setAttribute('aria-expanded', 'true'),
        r.parentElement.classList.add('app-tabs__item--current')),
        t.removeAttribute('hidden'))
    }
    closePanel(e) {
      if (!e) return
      const t = this.getPanel(e)
      if (!t) return
      const n = this.getMobileTab(e),
        r = this.getDesktopTab(e)
      ;(n &&
        n.parentElement &&
        r &&
        r.parentElement &&
        (n.setAttribute('aria-expanded', 'false'),
        n.parentElement.classList.remove('app-tabs__heading--current'),
        r.setAttribute('aria-expanded', 'false'),
        r.parentElement.classList.remove('app-tabs__item--current')),
        t.setAttribute('hidden', 'hidden'))
    }
    getMobileTab(e) {
      let t = null
      return (
        this.$mobileTabs.forEach((n) => {
          n.getAttribute('aria-controls') === e && (t = n)
        }),
        t
      )
    }
    getDesktopTab(e) {
      const t = this.$root.querySelector('.app-tabs')
      return t ? t.querySelector(`[aria-controls="${e}"]`) : null
    }
    getPanel(e) {
      return document.getElementById(e)
    }
  }
  ;((xe.moduleName = 'app-tabs'), w(v), w(g), w(y), w(b), w(ne), w(D), w(B))
  const Ee = N()
  ;(Ee && j(Ee) && Ee.analytics && (x(), $()),
    w(te),
    w(xe),
    w(G),
    new (class {
      constructor() {
        const e = window.location.hash
        if (e.match('^#options-')) {
          const t = document.querySelector(e)
          if (!t) return
          const n = e.indexOf('--') > -1,
            r = n
              ? e.split('#options-')[1].split('--')[0]
              : e.split('#options-')[1]
          if (r) {
            const e = document.querySelector(`a[href="#${r}-nunjucks"]`),
              o = document.getElementById(`options-${r}-details`)
            if (
              !(
                e instanceof HTMLAnchorElement &&
                o instanceof HTMLDetailsElement
              )
            )
              return
            ;(e.setAttribute('aria-expanded', 'true'),
              (e.parentElement.className += ' app-tabs__item--current'),
              o.parentElement.removeAttribute('hidden'),
              (o.open = !0),
              window.setTimeout(() => {
                ;(e.focus(), n && t.scrollIntoView())
              }, 0))
          }
        }
      }
    })(),
    w(oe),
    w(we),
    w(O))
  const Se = document.querySelectorAll('[data-module="app-embed-card"]'),
    ke = new IntersectionObserver(function (e, t) {
      e.forEach(function (e) {
        if (e.isIntersecting)
          try {
            new K(e.target)
          } catch (t) {
            console.log(t)
          }
      })
    })
  Se.forEach(function (e) {
    ke.observe(e)
  })
  const Oe = document.querySelector('[data-cookie-category="campaign"]')
  if (Oe) {
    new MutationObserver((e, t) => {
      e.length &&
        Se.forEach(function (e) {
          ;(ke.unobserve(e), ke.observe(e))
        })
    }).observe(Oe, { attributes: !0, childList: !0, subtree: !0 })
  }
})()
//# sourceMappingURL=application-73d194447c36a6ee2c2391f2ae156c74.js.map
