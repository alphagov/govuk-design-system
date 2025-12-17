!(function () {
  'use strict'
  function t(t) {
    const e = `--govuk-breakpoint-${t}`
    return {
      property: e,
      value:
        window.getComputedStyle(document.documentElement).getPropertyValue(e) ||
        void 0
    }
  }
  function e(t, e = {}) {
    var n
    const i = t.getAttribute('tabindex')
    function o() {
      var n
      ;(null == (n = e.onBlur) || n.call(t), i || t.removeAttribute('tabindex'))
    }
    ;(i || t.setAttribute('tabindex', '-1'),
      t.addEventListener(
        'focus',
        function () {
          t.addEventListener('blur', o, { once: !0 })
        },
        { once: !0 }
      ),
      null == (n = e.onBeforeFocus) || n.call(t),
      t.focus())
  }
  function n(t = document.body) {
    return !!t && t.classList.contains('govuk-frontend-supported')
  }
  function i(t) {
    return (
      !!t &&
      'object' == typeof t &&
      !(function (t) {
        return Array.isArray(t)
      })(t)
    )
  }
  function o(t) {
    return !!t && (t instanceof Element || t instanceof Document)
  }
  function s(t, e) {
    return `${t.moduleName}: ${e}`
  }
  class r extends Error {
    constructor(...t) {
      ;(super(...t), (this.name = 'GOVUKFrontendError'))
    }
  }
  class a extends r {
    constructor(t = document.body) {
      const e =
        'noModule' in HTMLScriptElement.prototype
          ? 'GOV.UK Frontend initialised without `<body class="govuk-frontend-supported">` from template `<script>` snippet'
          : 'GOV.UK Frontend is not supported in this browser'
      ;(super(
        t ? e : 'GOV.UK Frontend initialised without `<script type="module">`'
      ),
        (this.name = 'SupportError'))
    }
  }
  class c extends r {
    constructor(...t) {
      ;(super(...t), (this.name = 'ConfigError'))
    }
  }
  class u extends r {
    constructor(t) {
      let e = 'string' == typeof t ? t : ''
      if (i(t)) {
        const { component: n, identifier: i, element: o, expectedType: r } = t
        ;((e = i),
          (e += o
            ? ` is not of type ${null != r ? r : 'HTMLElement'}`
            : ' not found'),
          n && (e = s(n, e)))
      }
      ;(super(e), (this.name = 'ElementError'))
    }
  }
  class l extends r {
    constructor(t) {
      ;(super(
        'string' == typeof t
          ? t
          : s(t, 'Root element (`$root`) already initialised')
      ),
        (this.name = 'InitError'))
    }
  }
  class d {
    get $root() {
      return this._$root
    }
    constructor(t) {
      this._$root = void 0
      const e = this.constructor
      if ('string' != typeof e.moduleName)
        throw new l('`moduleName` not defined in component')
      if (!(t instanceof e.elementType))
        throw new u({
          element: t,
          component: e,
          identifier: 'Root element (`$root`)',
          expectedType: e.elementType.name
        })
      ;((this._$root = t), e.checkSupport(), this.checkInitialised())
      const n = e.moduleName
      this.$root.setAttribute(`data-${n}-init`, '')
    }
    checkInitialised() {
      const t = this.constructor,
        e = t.moduleName
      if (
        e &&
        (function (t, e) {
          return t instanceof HTMLElement && t.hasAttribute(`data-${e}-init`)
        })(this.$root, e)
      )
        throw new l(t)
    }
    static checkSupport() {
      if (!n()) throw new a()
    }
  }
  d.elementType = HTMLElement
  const h = Symbol.for('configOverride')
  class m extends d {
    [h](t) {
      return {}
    }
    get config() {
      return this._config
    }
    constructor(t, e) {
      ;(super(t), (this._config = void 0))
      const n = this.constructor
      if (!i(n.defaults))
        throw new c(
          s(
            n,
            'Config passed as parameter into constructor but no defaults defined'
          )
        )
      const o = (function (t, e) {
        if (!i(t.schema))
          throw new c(
            s(
              t,
              'Config passed as parameter into constructor but no schema defined'
            )
          )
        const n = {},
          o = Object.entries(t.schema.properties)
        for (const i of o) {
          const [o, s] = i,
            r = o.toString()
          ;(r in e && (n[r] = p(e[r], s)),
            'object' === (null == s ? void 0 : s.type) &&
              (n[r] = v(t.schema, e, o)))
        }
        return n
      })(n, this._$root.dataset)
      this._config = g(n.defaults, null != e ? e : {}, this[h](o), o)
    }
  }
  function p(t, e) {
    const n = t ? t.trim() : ''
    let i,
      o = null == e ? void 0 : e.type
    switch (
      (o ||
        (['true', 'false'].includes(n) && (o = 'boolean'),
        n.length > 0 && isFinite(Number(n)) && (o = 'number')),
      o)
    ) {
      case 'boolean':
        i = 'true' === n
        break
      case 'number':
        i = Number(n)
        break
      default:
        i = t
    }
    return i
  }
  function f(t) {
    let e,
      n = document
    if (i(t)) {
      const i = t
      ;((o(i.scope) || null === i.scope) && (n = i.scope),
        'function' == typeof i.onError && (e = i.onError))
    }
    return (
      o(t)
        ? (n = t)
        : null === t
          ? (n = null)
          : 'function' == typeof t && (e = t),
      { scope: n, onError: e }
    )
  }
  function g(...t) {
    const e = {}
    for (const n of t)
      for (const t of Object.keys(n)) {
        const o = e[t],
          s = n[t]
        i(o) && i(s) ? (e[t] = g(o, s)) : (e[t] = s)
      }
    return e
  }
  function v(t, e, n) {
    const o = t.properties[n]
    if ('object' !== (null == o ? void 0 : o.type)) return
    const s = { [n]: {} }
    for (const [r, a] of Object.entries(e)) {
      let t = s
      const e = r.split('.')
      for (const [o, s] of e.entries())
        i(t) &&
          (o < e.length - 1
            ? (i(t[s]) || (t[s] = {}), (t = t[s]))
            : r !== n && (t[s] = p(a)))
    }
    return s[n]
  }
  class b {
    constructor(t = {}, e = {}) {
      var n
      ;((this.translations = void 0),
        (this.locale = void 0),
        (this.translations = t),
        (this.locale =
          null != (n = e.locale) ? n : document.documentElement.lang || 'en'))
    }
    t(t, e) {
      if (!t) throw new Error('i18n: lookup key missing')
      let n = this.translations[t]
      if ('number' == typeof (null == e ? void 0 : e.count) && i(n)) {
        const i = n[this.getPluralSuffix(t, e.count)]
        i && (n = i)
      }
      if ('string' == typeof n) {
        if (n.match(/%{(.\S+)}/)) {
          if (!e)
            throw new Error(
              'i18n: cannot replace placeholders in string if no option data provided'
            )
          return this.replacePlaceholders(n, e)
        }
        return n
      }
      return t
    }
    replacePlaceholders(t, e) {
      const n = Intl.NumberFormat.supportedLocalesOf(this.locale).length
        ? new Intl.NumberFormat(this.locale)
        : void 0
      return t.replace(/%{(.\S+)}/g, function (t, i) {
        if (Object.prototype.hasOwnProperty.call(e, i)) {
          const t = e[i]
          return !1 === t || ('number' != typeof t && 'string' != typeof t)
            ? ''
            : 'number' == typeof t
              ? n
                ? n.format(t)
                : `${t}`
              : t
        }
        throw new Error(
          `i18n: no data found to replace ${t} placeholder in string`
        )
      })
    }
    hasIntlPluralRulesSupport() {
      return Boolean(
        'PluralRules' in window.Intl &&
        Intl.PluralRules.supportedLocalesOf(this.locale).length
      )
    }
    getPluralSuffix(t, e) {
      if (((e = Number(e)), !isFinite(e))) return 'other'
      const n = this.translations[t],
        o = this.hasIntlPluralRulesSupport()
          ? new Intl.PluralRules(this.locale).select(e)
          : 'other'
      if (i(n)) {
        if (o in n) return o
        if ('other' in n)
          return (
            console.warn(
              `i18n: Missing plural form ".${o}" for "${this.locale}" locale. Falling back to ".other".`
            ),
            'other'
          )
      }
      throw new Error(
        `i18n: Plural form ".other" is required for "${this.locale}" locale`
      )
    }
  }
  class w extends m {
    constructor(t, e = {}) {
      ;(super(t, e),
        (this.i18n = void 0),
        (this.controlsClass = 'govuk-accordion__controls'),
        (this.showAllClass = 'govuk-accordion__show-all'),
        (this.showAllTextClass = 'govuk-accordion__show-all-text'),
        (this.sectionClass = 'govuk-accordion__section'),
        (this.sectionExpandedClass = 'govuk-accordion__section--expanded'),
        (this.sectionButtonClass = 'govuk-accordion__section-button'),
        (this.sectionHeaderClass = 'govuk-accordion__section-header'),
        (this.sectionHeadingClass = 'govuk-accordion__section-heading'),
        (this.sectionHeadingDividerClass =
          'govuk-accordion__section-heading-divider'),
        (this.sectionHeadingTextClass =
          'govuk-accordion__section-heading-text'),
        (this.sectionHeadingTextFocusClass =
          'govuk-accordion__section-heading-text-focus'),
        (this.sectionShowHideToggleClass = 'govuk-accordion__section-toggle'),
        (this.sectionShowHideToggleFocusClass =
          'govuk-accordion__section-toggle-focus'),
        (this.sectionShowHideTextClass =
          'govuk-accordion__section-toggle-text'),
        (this.upChevronIconClass = 'govuk-accordion-nav__chevron'),
        (this.downChevronIconClass = 'govuk-accordion-nav__chevron--down'),
        (this.sectionSummaryClass = 'govuk-accordion__section-summary'),
        (this.sectionSummaryFocusClass =
          'govuk-accordion__section-summary-focus'),
        (this.sectionContentClass = 'govuk-accordion__section-content'),
        (this.$sections = void 0),
        (this.$showAllButton = null),
        (this.$showAllIcon = null),
        (this.$showAllText = null),
        (this.i18n = new b(this.config.i18n)))
      const n = this.$root.querySelectorAll(`.${this.sectionClass}`)
      if (!n.length)
        throw new u({
          component: w,
          identifier: `Sections (\`<div class="${this.sectionClass}">\`)`
        })
      ;((this.$sections = n),
        this.initControls(),
        this.initSectionHeaders(),
        this.updateShowAllButton(this.areAllSectionsOpen()))
    }
    initControls() {
      ;((this.$showAllButton = document.createElement('button')),
        this.$showAllButton.setAttribute('type', 'button'),
        this.$showAllButton.setAttribute('class', this.showAllClass),
        this.$showAllButton.setAttribute('aria-expanded', 'false'),
        (this.$showAllIcon = document.createElement('span')),
        this.$showAllIcon.classList.add(this.upChevronIconClass),
        this.$showAllButton.appendChild(this.$showAllIcon))
      const t = document.createElement('div')
      ;(t.setAttribute('class', this.controlsClass),
        t.appendChild(this.$showAllButton),
        this.$root.insertBefore(t, this.$root.firstChild),
        (this.$showAllText = document.createElement('span')),
        this.$showAllText.classList.add(this.showAllTextClass),
        this.$showAllButton.appendChild(this.$showAllText),
        this.$showAllButton.addEventListener('click', () =>
          this.onShowOrHideAllToggle()
        ),
        'onbeforematch' in document &&
          document.addEventListener('beforematch', (t) =>
            this.onBeforeMatch(t)
          ))
    }
    initSectionHeaders() {
      this.$sections.forEach((t, e) => {
        const n = t.querySelector(`.${this.sectionHeaderClass}`)
        if (!n)
          throw new u({
            component: w,
            identifier: `Section headers (\`<div class="${this.sectionHeaderClass}">\`)`
          })
        ;(this.constructHeaderMarkup(n, e),
          this.setExpanded(this.isExpanded(t), t),
          n.addEventListener('click', () => this.onSectionToggle(t)),
          this.setInitialState(t))
      })
    }
    constructHeaderMarkup(t, e) {
      const n = t.querySelector(`.${this.sectionButtonClass}`),
        i = t.querySelector(`.${this.sectionHeadingClass}`),
        o = t.querySelector(`.${this.sectionSummaryClass}`)
      if (!i)
        throw new u({
          component: w,
          identifier: `Section heading (\`.${this.sectionHeadingClass}\`)`
        })
      if (!n)
        throw new u({
          component: w,
          identifier: `Section button placeholder (\`<span class="${this.sectionButtonClass}">\`)`
        })
      const s = document.createElement('button')
      ;(s.setAttribute('type', 'button'),
        s.setAttribute('aria-controls', `${this.$root.id}-content-${e + 1}`))
      for (const u of Array.from(n.attributes))
        'id' !== u.name && s.setAttribute(u.name, u.value)
      const r = document.createElement('span')
      ;(r.classList.add(this.sectionHeadingTextClass), (r.id = n.id))
      const a = document.createElement('span')
      ;(a.classList.add(this.sectionHeadingTextFocusClass),
        r.appendChild(a),
        Array.from(n.childNodes).forEach((t) => a.appendChild(t)))
      const c = document.createElement('span')
      ;(c.classList.add(this.sectionShowHideToggleClass),
        c.setAttribute('data-nosnippet', ''))
      const l = document.createElement('span')
      ;(l.classList.add(this.sectionShowHideToggleFocusClass), c.appendChild(l))
      const d = document.createElement('span'),
        h = document.createElement('span')
      if (
        (h.classList.add(this.upChevronIconClass),
        l.appendChild(h),
        d.classList.add(this.sectionShowHideTextClass),
        l.appendChild(d),
        s.appendChild(r),
        s.appendChild(this.getButtonPunctuationEl()),
        o)
      ) {
        const t = document.createElement('span'),
          e = document.createElement('span')
        ;(e.classList.add(this.sectionSummaryFocusClass), t.appendChild(e))
        for (const n of Array.from(o.attributes))
          t.setAttribute(n.name, n.value)
        ;(Array.from(o.childNodes).forEach((t) => e.appendChild(t)),
          o.remove(),
          s.appendChild(t),
          s.appendChild(this.getButtonPunctuationEl()))
      }
      ;(s.appendChild(c), i.removeChild(n), i.appendChild(s))
    }
    onBeforeMatch(t) {
      const e = t.target
      if (!(e instanceof Element)) return
      const n = e.closest(`.${this.sectionClass}`)
      n && this.setExpanded(!0, n)
    }
    onSectionToggle(t) {
      const e = !this.isExpanded(t)
      ;(this.setExpanded(e, t), this.storeState(t, e))
    }
    onShowOrHideAllToggle() {
      const t = !this.areAllSectionsOpen()
      ;(this.$sections.forEach((e) => {
        ;(this.setExpanded(t, e), this.storeState(e, t))
      }),
        this.updateShowAllButton(t))
    }
    setExpanded(t, e) {
      const n = e.querySelector(`.${this.upChevronIconClass}`),
        i = e.querySelector(`.${this.sectionShowHideTextClass}`),
        o = e.querySelector(`.${this.sectionButtonClass}`),
        s = e.querySelector(`.${this.sectionContentClass}`)
      if (!s)
        throw new u({
          component: w,
          identifier: `Section content (\`<div class="${this.sectionContentClass}">\`)`
        })
      if (!n || !i || !o) return
      const r = t ? this.i18n.t('hideSection') : this.i18n.t('showSection')
      ;((i.textContent = r), o.setAttribute('aria-expanded', `${t}`))
      const a = [],
        c = e.querySelector(`.${this.sectionHeadingTextClass}`)
      c && a.push(c.textContent.trim())
      const l = e.querySelector(`.${this.sectionSummaryClass}`)
      l && a.push(l.textContent.trim())
      const d = t
        ? this.i18n.t('hideSectionAriaLabel')
        : this.i18n.t('showSectionAriaLabel')
      ;(a.push(d),
        o.setAttribute('aria-label', a.join(' , ')),
        t
          ? (s.removeAttribute('hidden'),
            e.classList.add(this.sectionExpandedClass),
            n.classList.remove(this.downChevronIconClass))
          : (s.setAttribute('hidden', 'until-found'),
            e.classList.remove(this.sectionExpandedClass),
            n.classList.add(this.downChevronIconClass)),
        this.updateShowAllButton(this.areAllSectionsOpen()))
    }
    isExpanded(t) {
      return t.classList.contains(this.sectionExpandedClass)
    }
    areAllSectionsOpen() {
      return Array.from(this.$sections).every((t) => this.isExpanded(t))
    }
    updateShowAllButton(t) {
      this.$showAllButton &&
        this.$showAllText &&
        this.$showAllIcon &&
        (this.$showAllButton.setAttribute('aria-expanded', t.toString()),
        (this.$showAllText.textContent = t
          ? this.i18n.t('hideAllSections')
          : this.i18n.t('showAllSections')),
        this.$showAllIcon.classList.toggle(this.downChevronIconClass, !t))
    }
    getIdentifier(t) {
      const e = t.querySelector(`.${this.sectionButtonClass}`)
      return null == e ? void 0 : e.getAttribute('aria-controls')
    }
    storeState(t, e) {
      if (!this.config.rememberExpanded) return
      const n = this.getIdentifier(t)
      if (n)
        try {
          window.sessionStorage.setItem(n, e.toString())
        } catch (i) {}
    }
    setInitialState(t) {
      if (!this.config.rememberExpanded) return
      const e = this.getIdentifier(t)
      if (e)
        try {
          const n = window.sessionStorage.getItem(e)
          null !== n && this.setExpanded('true' === n, t)
        } catch (n) {}
    }
    getButtonPunctuationEl() {
      const t = document.createElement('span')
      return (
        t.classList.add(
          'govuk-visually-hidden',
          this.sectionHeadingDividerClass
        ),
        (t.textContent = ', '),
        t
      )
    }
  }
  ;((w.moduleName = 'govuk-accordion'),
    (w.defaults = Object.freeze({
      i18n: {
        hideAllSections: 'Hide all sections',
        hideSection: 'Hide',
        hideSectionAriaLabel: 'Hide this section',
        showAllSections: 'Show all sections',
        showSection: 'Show',
        showSectionAriaLabel: 'Show this section'
      },
      rememberExpanded: !0
    })),
    (w.schema = Object.freeze({
      properties: {
        i18n: { type: 'object' },
        rememberExpanded: { type: 'boolean' }
      }
    })))
  class y extends m {
    constructor(t, e = {}) {
      ;(super(t, e),
        (this.debounceFormSubmitTimer = null),
        this.$root.addEventListener('keydown', (t) => this.handleKeyDown(t)),
        this.$root.addEventListener('click', (t) => this.debounce(t)))
    }
    handleKeyDown(t) {
      const e = t.target
      ' ' === t.key &&
        e instanceof HTMLElement &&
        'button' === e.getAttribute('role') &&
        (t.preventDefault(), e.click())
    }
    debounce(t) {
      if (this.config.preventDoubleClick)
        return this.debounceFormSubmitTimer
          ? (t.preventDefault(), !1)
          : void (this.debounceFormSubmitTimer = window.setTimeout(() => {
              this.debounceFormSubmitTimer = null
            }, 1e3))
    }
  }
  function $(t, e) {
    const n = t.closest(`[${e}]`)
    return n ? n.getAttribute(e) : null
  }
  ;((y.moduleName = 'govuk-button'),
    (y.defaults = Object.freeze({ preventDoubleClick: !1 })),
    (y.schema = Object.freeze({
      properties: { preventDoubleClick: { type: 'boolean' } }
    })))
  class k extends m {
    [h](t) {
      let e = {}
      return (
        ('maxwords' in t || 'maxlength' in t) &&
          (e = { maxlength: void 0, maxwords: void 0 }),
        e
      )
    }
    constructor(t, e = {}) {
      var n, i
      ;(super(t, e),
        (this.$textarea = void 0),
        (this.$visibleCountMessage = void 0),
        (this.$screenReaderCountMessage = void 0),
        (this.lastInputTimestamp = null),
        (this.lastInputValue = ''),
        (this.valueChecker = null),
        (this.i18n = void 0),
        (this.maxLength = void 0))
      const o = this.$root.querySelector('.govuk-js-character-count')
      if (!(o instanceof HTMLTextAreaElement || o instanceof HTMLInputElement))
        throw new u({
          component: k,
          element: o,
          expectedType: 'HTMLTextareaElement or HTMLInputElement',
          identifier: 'Form field (`.govuk-js-character-count`)'
        })
      const r = (function (t, e) {
        const n = []
        for (const [i, o] of Object.entries(t)) {
          const t = []
          if (Array.isArray(o)) {
            for (const { required: n, errorMessage: i } of o)
              n.every((t) => !!e[t]) || t.push(i)
            'anyOf' !== i || o.length - t.length >= 1 || n.push(...t)
          }
        }
        return n
      })(k.schema, this.config)
      if (r[0]) throw new c(s(k, r[0]))
      ;((this.i18n = new b(this.config.i18n, {
        locale: $(this.$root, 'lang')
      })),
        (this.maxLength =
          null !=
          (n = null != (i = this.config.maxwords) ? i : this.config.maxlength)
            ? n
            : 1 / 0),
        (this.$textarea = o))
      const a = `${this.$textarea.id}-info`,
        l = document.getElementById(a)
      if (!l)
        throw new u({
          component: k,
          element: l,
          identifier: `Count message (\`id="${a}"\`)`
        })
      ;((this.$errorMessage = this.$root.querySelector('.govuk-error-message')),
        l.textContent.match(/^\s*$/) &&
          (l.textContent = this.i18n.t('textareaDescription', {
            count: this.maxLength
          })),
        this.$textarea.insertAdjacentElement('afterend', l))
      const d = document.createElement('div')
      ;((d.className =
        'govuk-character-count__sr-status govuk-visually-hidden'),
        d.setAttribute('aria-live', 'polite'),
        (this.$screenReaderCountMessage = d),
        l.insertAdjacentElement('afterend', d))
      const h = document.createElement('div')
      ;((h.className = l.className),
        h.classList.add('govuk-character-count__status'),
        h.setAttribute('aria-hidden', 'true'),
        (this.$visibleCountMessage = h),
        l.insertAdjacentElement('afterend', h),
        l.classList.add('govuk-visually-hidden'),
        this.$textarea.removeAttribute('maxlength'),
        this.bindChangeEvents(),
        window.addEventListener('pageshow', () => this.updateCountMessage()),
        this.updateCountMessage())
    }
    bindChangeEvents() {
      ;(this.$textarea.addEventListener('keyup', () => this.handleKeyUp()),
        this.$textarea.addEventListener('focus', () => this.handleFocus()),
        this.$textarea.addEventListener('blur', () => this.handleBlur()))
    }
    handleKeyUp() {
      ;(this.updateVisibleCountMessage(),
        (this.lastInputTimestamp = Date.now()))
    }
    handleFocus() {
      this.valueChecker = window.setInterval(() => {
        ;(!this.lastInputTimestamp ||
          Date.now() - 500 >= this.lastInputTimestamp) &&
          this.updateIfValueChanged()
      }, 1e3)
    }
    handleBlur() {
      this.valueChecker && window.clearInterval(this.valueChecker)
    }
    updateIfValueChanged() {
      this.$textarea.value !== this.lastInputValue &&
        ((this.lastInputValue = this.$textarea.value),
        this.updateCountMessage())
    }
    updateCountMessage() {
      ;(this.updateVisibleCountMessage(), this.updateScreenReaderCountMessage())
    }
    updateVisibleCountMessage() {
      const t = this.maxLength - this.count(this.$textarea.value) < 0
      ;(this.$visibleCountMessage.classList.toggle(
        'govuk-character-count__message--disabled',
        !this.isOverThreshold()
      ),
        this.$errorMessage ||
          this.$textarea.classList.toggle('govuk-textarea--error', t),
        this.$visibleCountMessage.classList.toggle('govuk-error-message', t),
        this.$visibleCountMessage.classList.toggle('govuk-hint', !t),
        (this.$visibleCountMessage.textContent = this.getCountMessage()))
    }
    updateScreenReaderCountMessage() {
      ;(this.isOverThreshold()
        ? this.$screenReaderCountMessage.removeAttribute('aria-hidden')
        : this.$screenReaderCountMessage.setAttribute('aria-hidden', 'true'),
        (this.$screenReaderCountMessage.textContent = this.getCountMessage()))
    }
    count(t) {
      if (this.config.maxwords) {
        var e
        return (null != (e = t.match(/\S+/g)) ? e : []).length
      }
      return t.length
    }
    getCountMessage() {
      const t = this.maxLength - this.count(this.$textarea.value),
        e = this.config.maxwords ? 'words' : 'characters'
      return this.formatCountMessage(t, e)
    }
    formatCountMessage(t, e) {
      if (0 === t) return this.i18n.t(`${e}AtLimit`)
      const n = t < 0 ? 'OverLimit' : 'UnderLimit'
      return this.i18n.t(`${e}${n}`, { count: Math.abs(t) })
    }
    isOverThreshold() {
      if (!this.config.threshold) return !0
      const t = this.count(this.$textarea.value)
      return (this.maxLength * this.config.threshold) / 100 <= t
    }
  }
  ;((k.moduleName = 'govuk-character-count'),
    (k.defaults = Object.freeze({
      threshold: 0,
      i18n: {
        charactersUnderLimit: {
          one: 'You have %{count} character remaining',
          other: 'You have %{count} characters remaining'
        },
        charactersAtLimit: 'You have 0 characters remaining',
        charactersOverLimit: {
          one: 'You have %{count} character too many',
          other: 'You have %{count} characters too many'
        },
        wordsUnderLimit: {
          one: 'You have %{count} word remaining',
          other: 'You have %{count} words remaining'
        },
        wordsAtLimit: 'You have 0 words remaining',
        wordsOverLimit: {
          one: 'You have %{count} word too many',
          other: 'You have %{count} words too many'
        },
        textareaDescription: { other: '' }
      }
    })),
    (k.schema = Object.freeze({
      properties: {
        i18n: { type: 'object' },
        maxwords: { type: 'number' },
        maxlength: { type: 'number' },
        threshold: { type: 'number' }
      },
      anyOf: [
        {
          required: ['maxwords'],
          errorMessage: 'Either "maxlength" or "maxwords" must be provided'
        },
        {
          required: ['maxlength'],
          errorMessage: 'Either "maxlength" or "maxwords" must be provided'
        }
      ]
    })))
  class C extends d {
    constructor(t) {
      ;(super(t), (this.$inputs = void 0))
      const e = this.$root.querySelectorAll('input[type="checkbox"]')
      if (!e.length)
        throw new u({
          component: C,
          identifier: 'Form inputs (`<input type="checkbox">`)'
        })
      ;((this.$inputs = e),
        this.$inputs.forEach((t) => {
          const e = t.getAttribute('data-aria-controls')
          if (e) {
            if (!document.getElementById(e))
              throw new u({
                component: C,
                identifier: `Conditional reveal (\`id="${e}"\`)`
              })
            ;(t.setAttribute('aria-controls', e),
              t.removeAttribute('data-aria-controls'))
          }
        }),
        window.addEventListener('pageshow', () =>
          this.syncAllConditionalReveals()
        ),
        this.syncAllConditionalReveals(),
        this.$root.addEventListener('click', (t) => this.handleClick(t)))
    }
    syncAllConditionalReveals() {
      this.$inputs.forEach((t) => this.syncConditionalRevealWithInputState(t))
    }
    syncConditionalRevealWithInputState(t) {
      const e = t.getAttribute('aria-controls')
      if (!e) return
      const n = document.getElementById(e)
      if (null != n && n.classList.contains('govuk-checkboxes__conditional')) {
        const e = t.checked
        ;(t.setAttribute('aria-expanded', e.toString()),
          n.classList.toggle('govuk-checkboxes__conditional--hidden', !e))
      }
    }
    unCheckAllInputsExcept(t) {
      document
        .querySelectorAll(`input[type="checkbox"][name="${t.name}"]`)
        .forEach((e) => {
          t.form === e.form &&
            e !== t &&
            ((e.checked = !1), this.syncConditionalRevealWithInputState(e))
        })
    }
    unCheckExclusiveInputs(t) {
      document
        .querySelectorAll(
          `input[data-behaviour="exclusive"][type="checkbox"][name="${t.name}"]`
        )
        .forEach((e) => {
          t.form === e.form &&
            ((e.checked = !1), this.syncConditionalRevealWithInputState(e))
        })
    }
    handleClick(t) {
      const e = t.target
      if (!(e instanceof HTMLInputElement) || 'checkbox' !== e.type) return
      if (
        (e.getAttribute('aria-controls') &&
          this.syncConditionalRevealWithInputState(e),
        !e.checked)
      )
        return
      'exclusive' === e.getAttribute('data-behaviour')
        ? this.unCheckAllInputsExcept(e)
        : this.unCheckExclusiveInputs(e)
    }
  }
  C.moduleName = 'govuk-checkboxes'
  class E extends m {
    constructor(t, n = {}) {
      ;(super(t, n),
        this.config.disableAutoFocus || e(this.$root),
        this.$root.addEventListener('click', (t) => this.handleClick(t)))
    }
    handleClick(t) {
      const e = t.target
      e && this.focusTarget(e) && t.preventDefault()
    }
    focusTarget(t) {
      if (!(t instanceof HTMLAnchorElement)) return !1
      const e = t.hash.replace('#', '')
      if (!e) return !1
      const n = document.getElementById(e)
      if (!n) return !1
      const i = this.getAssociatedLegendOrLabel(n)
      return !!i && (i.scrollIntoView(), n.focus({ preventScroll: !0 }), !0)
    }
    getAssociatedLegendOrLabel(t) {
      var e
      const n = t.closest('fieldset')
      if (n) {
        const e = n.getElementsByTagName('legend')
        if (e.length) {
          const n = e[0]
          if (
            t instanceof HTMLInputElement &&
            ('checkbox' === t.type || 'radio' === t.type)
          )
            return n
          const i = n.getBoundingClientRect().top,
            o = t.getBoundingClientRect()
          if (o.height && window.innerHeight) {
            if (o.top + o.height - i < window.innerHeight / 2) return n
          }
        }
      }
      return null !=
        (e = document.querySelector(`label[for='${t.getAttribute('id')}']`))
        ? e
        : t.closest('label')
    }
  }
  ;((E.moduleName = 'govuk-error-summary'),
    (E.defaults = Object.freeze({ disableAutoFocus: !1 })),
    (E.schema = Object.freeze({
      properties: { disableAutoFocus: { type: 'boolean' } }
    })))
  class A extends m {
    constructor(t, e = {}) {
      ;(super(t, e),
        (this.i18n = void 0),
        (this.$button = void 0),
        (this.$skiplinkButton = null),
        (this.$updateSpan = null),
        (this.$indicatorContainer = null),
        (this.$overlay = null),
        (this.keypressCounter = 0),
        (this.lastKeyWasModified = !1),
        (this.timeoutTime = 5e3),
        (this.keypressTimeoutId = null),
        (this.timeoutMessageId = null))
      const n = this.$root.querySelector('.govuk-exit-this-page__button')
      if (!(n instanceof HTMLAnchorElement))
        throw new u({
          component: A,
          element: n,
          expectedType: 'HTMLAnchorElement',
          identifier: 'Button (`.govuk-exit-this-page__button`)'
        })
      ;((this.i18n = new b(this.config.i18n)), (this.$button = n))
      const i = document.querySelector('.govuk-js-exit-this-page-skiplink')
      ;(i instanceof HTMLAnchorElement && (this.$skiplinkButton = i),
        this.buildIndicator(),
        this.initUpdateSpan(),
        this.initButtonClickHandler(),
        'govukFrontendExitThisPageKeypress' in document.body.dataset ||
          (document.addEventListener(
            'keyup',
            this.handleKeypress.bind(this),
            !0
          ),
          (document.body.dataset.govukFrontendExitThisPageKeypress = 'true')),
        window.addEventListener('pageshow', this.resetPage.bind(this)))
    }
    initUpdateSpan() {
      ;((this.$updateSpan = document.createElement('span')),
        this.$updateSpan.setAttribute('role', 'status'),
        (this.$updateSpan.className = 'govuk-visually-hidden'),
        this.$root.appendChild(this.$updateSpan))
    }
    initButtonClickHandler() {
      ;(this.$button.addEventListener('click', this.handleClick.bind(this)),
        this.$skiplinkButton &&
          this.$skiplinkButton.addEventListener(
            'click',
            this.handleClick.bind(this)
          ))
    }
    buildIndicator() {
      ;((this.$indicatorContainer = document.createElement('div')),
        (this.$indicatorContainer.className =
          'govuk-exit-this-page__indicator'),
        this.$indicatorContainer.setAttribute('aria-hidden', 'true'))
      for (let t = 0; t < 3; t++) {
        const t = document.createElement('div')
        ;((t.className = 'govuk-exit-this-page__indicator-light'),
          this.$indicatorContainer.appendChild(t))
      }
      this.$button.appendChild(this.$indicatorContainer)
    }
    updateIndicator() {
      if (!this.$indicatorContainer) return
      this.$indicatorContainer.classList.toggle(
        'govuk-exit-this-page__indicator--visible',
        this.keypressCounter > 0
      )
      this.$indicatorContainer
        .querySelectorAll('.govuk-exit-this-page__indicator-light')
        .forEach((t, e) => {
          t.classList.toggle(
            'govuk-exit-this-page__indicator-light--on',
            e < this.keypressCounter
          )
        })
    }
    exitPage() {
      this.$updateSpan &&
        ((this.$updateSpan.textContent = ''),
        document.body.classList.add('govuk-exit-this-page-hide-content'),
        (this.$overlay = document.createElement('div')),
        (this.$overlay.className = 'govuk-exit-this-page-overlay'),
        this.$overlay.setAttribute('role', 'alert'),
        document.body.appendChild(this.$overlay),
        (this.$overlay.textContent = this.i18n.t('activated')),
        (window.location.href = this.$button.href))
    }
    handleClick(t) {
      ;(t.preventDefault(), this.exitPage())
    }
    handleKeypress(t) {
      this.$updateSpan &&
        ('Shift' !== t.key || this.lastKeyWasModified
          ? this.keypressTimeoutId && this.resetKeypressTimer()
          : ((this.keypressCounter += 1),
            this.updateIndicator(),
            this.timeoutMessageId &&
              (window.clearTimeout(this.timeoutMessageId),
              (this.timeoutMessageId = null)),
            this.keypressCounter >= 3
              ? ((this.keypressCounter = 0),
                this.keypressTimeoutId &&
                  (window.clearTimeout(this.keypressTimeoutId),
                  (this.keypressTimeoutId = null)),
                this.exitPage())
              : 1 === this.keypressCounter
                ? (this.$updateSpan.textContent =
                    this.i18n.t('pressTwoMoreTimes'))
                : (this.$updateSpan.textContent =
                    this.i18n.t('pressOneMoreTime')),
            this.setKeypressTimer()),
        (this.lastKeyWasModified = t.shiftKey))
    }
    setKeypressTimer() {
      ;(this.keypressTimeoutId && window.clearTimeout(this.keypressTimeoutId),
        (this.keypressTimeoutId = window.setTimeout(
          this.resetKeypressTimer.bind(this),
          this.timeoutTime
        )))
    }
    resetKeypressTimer() {
      if (!this.$updateSpan) return
      this.keypressTimeoutId &&
        (window.clearTimeout(this.keypressTimeoutId),
        (this.keypressTimeoutId = null))
      const t = this.$updateSpan
      ;((this.keypressCounter = 0),
        (t.textContent = this.i18n.t('timedOut')),
        (this.timeoutMessageId = window.setTimeout(() => {
          t.textContent = ''
        }, this.timeoutTime)),
        this.updateIndicator())
    }
    resetPage() {
      ;(document.body.classList.remove('govuk-exit-this-page-hide-content'),
        this.$overlay && (this.$overlay.remove(), (this.$overlay = null)),
        this.$updateSpan &&
          (this.$updateSpan.setAttribute('role', 'status'),
          (this.$updateSpan.textContent = '')),
        this.updateIndicator(),
        this.keypressTimeoutId && window.clearTimeout(this.keypressTimeoutId),
        this.timeoutMessageId && window.clearTimeout(this.timeoutMessageId))
    }
  }
  ;((A.moduleName = 'govuk-exit-this-page'),
    (A.defaults = Object.freeze({
      i18n: {
        activated: 'Loading.',
        timedOut: 'Exit this page expired.',
        pressTwoMoreTimes: 'Shift, press 2 more times to exit.',
        pressOneMoreTime: 'Shift, press 1 more time to exit.'
      }
    })),
    (A.schema = Object.freeze({ properties: { i18n: { type: 'object' } } })))
  class T extends m {
    constructor(t, e = {}) {
      ;(super(t, e),
        (this.$input = void 0),
        (this.$button = void 0),
        (this.$status = void 0),
        (this.i18n = void 0),
        (this.id = void 0),
        (this.$announcements = void 0),
        (this.enteredAnotherElement = void 0))
      const n = this.$root.querySelector('input')
      if (null === n)
        throw new u({
          component: T,
          identifier: 'File inputs (`<input type="file">`)'
        })
      if ('file' !== n.type)
        throw new u(
          s(
            T,
            'File input (`<input type="file">`) attribute (`type`) is not `file`'
          )
        )
      if (((this.$input = n), !this.$input.id))
        throw new u({
          component: T,
          identifier: 'File input (`<input type="file">`) attribute (`id`)'
        })
      ;((this.id = this.$input.id),
        (this.i18n = new b(this.config.i18n, {
          locale: $(this.$root, 'lang')
        })))
      const i = this.findLabel()
      ;(i.id || (i.id = `${this.id}-label`),
        (this.$input.id = `${this.id}-input`),
        this.$input.setAttribute('hidden', 'true'))
      const o = document.createElement('button')
      ;(o.classList.add('govuk-file-upload-button'),
        (o.type = 'button'),
        (o.id = this.id),
        o.classList.add('govuk-file-upload-button--empty'))
      const r = this.$input.getAttribute('aria-describedby')
      r && o.setAttribute('aria-describedby', r)
      const a = document.createElement('span')
      ;((a.className = 'govuk-body govuk-file-upload-button__status'),
        a.setAttribute('aria-live', 'polite'),
        (a.innerText = this.i18n.t('noFileChosen')),
        o.appendChild(a))
      const c = document.createElement('span')
      ;((c.className = 'govuk-visually-hidden'),
        (c.innerText = ', '),
        (c.id = `${this.id}-comma`),
        o.appendChild(c))
      const l = document.createElement('span')
      l.className = 'govuk-file-upload-button__pseudo-button-container'
      const d = document.createElement('span')
      ;((d.className =
        'govuk-button govuk-button--secondary govuk-file-upload-button__pseudo-button'),
        (d.innerText = this.i18n.t('chooseFilesButton')),
        l.appendChild(d),
        l.insertAdjacentText('beforeend', ' '))
      const h = document.createElement('span')
      ;((h.className = 'govuk-body govuk-file-upload-button__instruction'),
        (h.innerText = this.i18n.t('dropInstruction')),
        l.appendChild(h),
        o.appendChild(l),
        o.setAttribute('aria-labelledby', `${i.id} ${c.id} ${o.id}`),
        o.addEventListener('click', this.onClick.bind(this)),
        o.addEventListener('dragover', (t) => {
          t.preventDefault()
        }),
        this.$root.insertAdjacentElement('afterbegin', o),
        this.$input.setAttribute('tabindex', '-1'),
        this.$input.setAttribute('aria-hidden', 'true'),
        (this.$button = o),
        (this.$status = a),
        this.$input.addEventListener('change', this.onChange.bind(this)),
        this.updateDisabledState(),
        this.observeDisabledState(),
        (this.$announcements = document.createElement('span')),
        this.$announcements.classList.add('govuk-file-upload-announcements'),
        this.$announcements.classList.add('govuk-visually-hidden'),
        this.$announcements.setAttribute('aria-live', 'assertive'),
        this.$root.insertAdjacentElement('afterend', this.$announcements),
        this.$button.addEventListener('drop', this.onDrop.bind(this)),
        document.addEventListener(
          'dragenter',
          this.updateDropzoneVisibility.bind(this)
        ),
        document.addEventListener('dragenter', () => {
          this.enteredAnotherElement = !0
        }),
        document.addEventListener('dragleave', () => {
          ;(this.enteredAnotherElement ||
            this.$button.disabled ||
            (this.hideDraggingState(),
            (this.$announcements.innerText = this.i18n.t('leftDropZone'))),
            (this.enteredAnotherElement = !1))
        }))
    }
    updateDropzoneVisibility(t) {
      this.$button.disabled ||
        (t.target instanceof Node &&
          (this.$root.contains(t.target)
            ? t.dataTransfer &&
              this.canDrop(t.dataTransfer) &&
              (this.$button.classList.contains(
                'govuk-file-upload-button--dragging'
              ) ||
                (this.showDraggingState(),
                (this.$announcements.innerText =
                  this.i18n.t('enteredDropZone'))))
            : this.$button.classList.contains(
                'govuk-file-upload-button--dragging'
              ) &&
              (this.hideDraggingState(),
              (this.$announcements.innerText = this.i18n.t('leftDropZone')))))
    }
    showDraggingState() {
      this.$button.classList.add('govuk-file-upload-button--dragging')
    }
    hideDraggingState() {
      this.$button.classList.remove('govuk-file-upload-button--dragging')
    }
    onDrop(t) {
      ;(t.preventDefault(),
        t.dataTransfer &&
          this.canFillInput(t.dataTransfer) &&
          ((this.$input.files = t.dataTransfer.files),
          this.$input.dispatchEvent(new CustomEvent('change')),
          this.hideDraggingState()))
    }
    canFillInput(t) {
      return this.matchesInputCapacity(t.files.length)
    }
    canDrop(t) {
      return t.items.length
        ? this.matchesInputCapacity(
            (function (t) {
              let e = 0
              for (let n = 0; n < t.length; n++) 'file' === t[n].kind && e++
              return e
            })(t.items)
          )
        : !t.types.length || t.types.includes('Files')
    }
    matchesInputCapacity(t) {
      return this.$input.multiple ? t > 0 : 1 === t
    }
    onChange() {
      const t = this.$input.files.length
      0 === t
        ? ((this.$status.innerText = this.i18n.t('noFileChosen')),
          this.$button.classList.add('govuk-file-upload-button--empty'))
        : ((this.$status.innerText =
            1 === t
              ? this.$input.files[0].name
              : this.i18n.t('multipleFilesChosen', { count: t })),
          this.$button.classList.remove('govuk-file-upload-button--empty'))
    }
    findLabel() {
      const t = document.querySelector(`label[for="${this.$input.id}"]`)
      if (!t)
        throw new u({
          component: T,
          identifier: `Field label (\`<label for=${this.$input.id}>\`)`
        })
      return t
    }
    onClick() {
      this.$input.click()
    }
    observeDisabledState() {
      new MutationObserver((t) => {
        for (const e of t)
          'attributes' === e.type &&
            'disabled' === e.attributeName &&
            this.updateDisabledState()
      }).observe(this.$input, { attributes: !0 })
    }
    updateDisabledState() {
      ;((this.$button.disabled = this.$input.disabled),
        this.$root.classList.toggle(
          'govuk-drop-zone--disabled',
          this.$button.disabled
        ))
    }
  }
  ;((T.moduleName = 'govuk-file-upload'),
    (T.defaults = Object.freeze({
      i18n: {
        chooseFilesButton: 'Choose file',
        dropInstruction: 'or drop file',
        noFileChosen: 'No file chosen',
        multipleFilesChosen: {
          one: '%{count} file chosen',
          other: '%{count} files chosen'
        },
        enteredDropZone: 'Entered drop zone',
        leftDropZone: 'Left drop zone'
      }
    })),
    (T.schema = Object.freeze({ properties: { i18n: { type: 'object' } } })))
  class S extends d {
    constructor(t) {
      ;(super(t),
        (this.$menuButton = void 0),
        (this.$menu = void 0),
        (this.menuIsOpen = !1),
        (this.mql = null))
      const e = this.$root.querySelector('.govuk-js-header-toggle')
      if (!e) return this
      this.$root.classList.add('govuk-header--with-js-navigation')
      const n = e.getAttribute('aria-controls')
      if (!n)
        throw new u({
          component: S,
          identifier:
            'Navigation button (`<button class="govuk-js-header-toggle">`) attribute (`aria-controls`)'
        })
      const i = document.getElementById(n)
      if (!i)
        throw new u({
          component: S,
          element: i,
          identifier: `Navigation (\`<ul id="${n}">\`)`
        })
      ;((this.$menu = i),
        (this.$menuButton = e),
        this.setupResponsiveChecks(),
        this.$menuButton.addEventListener('click', () =>
          this.handleMenuButtonClick()
        ))
    }
    setupResponsiveChecks() {
      const e = t('desktop')
      if (!e.value)
        throw new u({
          component: S,
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
  S.moduleName = 'govuk-header'
  class x extends m {
    constructor(t, n = {}) {
      ;(super(t, n),
        'alert' !== this.$root.getAttribute('role') ||
          this.config.disableAutoFocus ||
          e(this.$root))
    }
  }
  ;((x.moduleName = 'govuk-notification-banner'),
    (x.defaults = Object.freeze({ disableAutoFocus: !1 })),
    (x.schema = Object.freeze({
      properties: { disableAutoFocus: { type: 'boolean' } }
    })))
  class L extends m {
    constructor(t, e = {}) {
      ;(super(t, e),
        (this.i18n = void 0),
        (this.$input = void 0),
        (this.$showHideButton = void 0),
        (this.$screenReaderStatusMessage = void 0))
      const n = this.$root.querySelector('.govuk-js-password-input-input')
      if (!(n instanceof HTMLInputElement))
        throw new u({
          component: L,
          element: n,
          expectedType: 'HTMLInputElement',
          identifier: 'Form field (`.govuk-js-password-input-input`)'
        })
      if ('password' !== n.type)
        throw new u(
          'Password input: Form field (`.govuk-js-password-input-input`) must be of type `password`.'
        )
      const i = this.$root.querySelector('.govuk-js-password-input-toggle')
      if (!(i instanceof HTMLButtonElement))
        throw new u({
          component: L,
          element: i,
          expectedType: 'HTMLButtonElement',
          identifier: 'Button (`.govuk-js-password-input-toggle`)'
        })
      if ('button' !== i.type)
        throw new u(
          'Password input: Button (`.govuk-js-password-input-toggle`) must be of type `button`.'
        )
      ;((this.$input = n),
        (this.$showHideButton = i),
        (this.i18n = new b(this.config.i18n, {
          locale: $(this.$root, 'lang')
        })),
        this.$showHideButton.removeAttribute('hidden'))
      const o = document.createElement('div')
      ;((o.className = 'govuk-password-input__sr-status govuk-visually-hidden'),
        o.setAttribute('aria-live', 'polite'),
        (this.$screenReaderStatusMessage = o),
        this.$input.insertAdjacentElement('afterend', o),
        this.$showHideButton.addEventListener('click', this.toggle.bind(this)),
        this.$input.form &&
          this.$input.form.addEventListener('submit', () => this.hide()),
        window.addEventListener('pageshow', (t) => {
          t.persisted && 'password' !== this.$input.type && this.hide()
        }),
        this.hide())
    }
    toggle(t) {
      ;(t.preventDefault(),
        'password' !== this.$input.type ? this.hide() : this.show())
    }
    show() {
      this.setType('text')
    }
    hide() {
      this.setType('password')
    }
    setType(t) {
      if (t === this.$input.type) return
      this.$input.setAttribute('type', t)
      const e = 'password' === t,
        n = e ? 'show' : 'hide',
        i = e ? 'passwordHidden' : 'passwordShown'
      ;((this.$showHideButton.innerText = this.i18n.t(`${n}Password`)),
        this.$showHideButton.setAttribute(
          'aria-label',
          this.i18n.t(`${n}PasswordAriaLabel`)
        ),
        (this.$screenReaderStatusMessage.innerText = this.i18n.t(
          `${i}Announcement`
        )))
    }
  }
  ;((L.moduleName = 'govuk-password-input'),
    (L.defaults = Object.freeze({
      i18n: {
        showPassword: 'Show',
        hidePassword: 'Hide',
        showPasswordAriaLabel: 'Show password',
        hidePasswordAriaLabel: 'Hide password',
        passwordShownAnnouncement: 'Your password is visible',
        passwordHiddenAnnouncement: 'Your password is hidden'
      }
    })),
    (L.schema = Object.freeze({ properties: { i18n: { type: 'object' } } })))
  class I extends d {
    constructor(t) {
      ;(super(t), (this.$inputs = void 0))
      const e = this.$root.querySelectorAll('input[type="radio"]')
      if (!e.length)
        throw new u({
          component: I,
          identifier: 'Form inputs (`<input type="radio">`)'
        })
      ;((this.$inputs = e),
        this.$inputs.forEach((t) => {
          const e = t.getAttribute('data-aria-controls')
          if (e) {
            if (!document.getElementById(e))
              throw new u({
                component: I,
                identifier: `Conditional reveal (\`id="${e}"\`)`
              })
            ;(t.setAttribute('aria-controls', e),
              t.removeAttribute('data-aria-controls'))
          }
        }),
        window.addEventListener('pageshow', () =>
          this.syncAllConditionalReveals()
        ),
        this.syncAllConditionalReveals(),
        this.$root.addEventListener('click', (t) => this.handleClick(t)))
    }
    syncAllConditionalReveals() {
      this.$inputs.forEach((t) => this.syncConditionalRevealWithInputState(t))
    }
    syncConditionalRevealWithInputState(t) {
      const e = t.getAttribute('aria-controls')
      if (!e) return
      const n = document.getElementById(e)
      if (null != n && n.classList.contains('govuk-radios__conditional')) {
        const e = t.checked
        ;(t.setAttribute('aria-expanded', e.toString()),
          n.classList.toggle('govuk-radios__conditional--hidden', !e))
      }
    }
    handleClick(t) {
      const e = t.target
      if (!(e instanceof HTMLInputElement) || 'radio' !== e.type) return
      const n = document.querySelectorAll('input[type="radio"][aria-controls]'),
        i = e.form,
        o = e.name
      n.forEach((t) => {
        const e = t.form === i
        t.name === o && e && this.syncConditionalRevealWithInputState(t)
      })
    }
  }
  I.moduleName = 'govuk-radios'
  class M extends d {
    constructor(t) {
      ;(super(t),
        (this.$menuButton = void 0),
        (this.$menu = void 0),
        (this.menuIsOpen = !1),
        (this.mql = null))
      const e = this.$root.querySelector('.govuk-js-service-navigation-toggle')
      if (!e) return this
      const n = e.getAttribute('aria-controls')
      if (!n)
        throw new u({
          component: M,
          identifier:
            'Navigation button (`<button class="govuk-js-service-navigation-toggle">`) attribute (`aria-controls`)'
        })
      const i = document.getElementById(n)
      if (!i)
        throw new u({
          component: M,
          element: i,
          identifier: `Navigation (\`<ul id="${n}">\`)`
        })
      ;((this.$menu = i),
        (this.$menuButton = e),
        this.setupResponsiveChecks(),
        this.$menuButton.addEventListener('click', () =>
          this.handleMenuButtonClick()
        ))
    }
    setupResponsiveChecks() {
      const e = t('tablet')
      if (!e.value)
        throw new u({
          component: M,
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
  M.moduleName = 'govuk-service-navigation'
  class _ extends d {
    constructor(t) {
      var n
      super(t)
      const i = this.$root.hash,
        o = null != (n = this.$root.getAttribute('href')) ? n : ''
      if (
        this.$root.origin !== window.location.origin ||
        this.$root.pathname !== window.location.pathname
      )
        return
      const s = i.replace('#', '')
      if (!s)
        throw new u(
          `Skip link: Target link (\`href="${o}"\`) has no hash fragment`
        )
      const r = document.getElementById(s)
      if (!r)
        throw new u({
          component: _,
          element: r,
          identifier: `Target content (\`id="${s}"\`)`
        })
      this.$root.addEventListener('click', () =>
        e(r, {
          onBeforeFocus() {
            r.classList.add('govuk-skip-link-focused-element')
          },
          onBlur() {
            r.classList.remove('govuk-skip-link-focused-element')
          }
        })
      )
    }
  }
  ;((_.elementType = HTMLAnchorElement), (_.moduleName = 'govuk-skip-link'))
  class O extends d {
    constructor(t) {
      ;(super(t),
        (this.$tabs = void 0),
        (this.$tabList = void 0),
        (this.$tabListItems = void 0),
        (this.jsHiddenClass = 'govuk-tabs__panel--hidden'),
        (this.changingHash = !1),
        (this.boundTabClick = void 0),
        (this.boundTabKeydown = void 0),
        (this.boundOnHashChange = void 0),
        (this.mql = null))
      const e = this.$root.querySelectorAll('a.govuk-tabs__tab')
      if (!e.length)
        throw new u({
          component: O,
          identifier: 'Links (`<a class="govuk-tabs__tab">`)'
        })
      ;((this.$tabs = e),
        (this.boundTabClick = this.onTabClick.bind(this)),
        (this.boundTabKeydown = this.onTabKeydown.bind(this)),
        (this.boundOnHashChange = this.onHashChange.bind(this)))
      const n = this.$root.querySelector('.govuk-tabs__list'),
        i = this.$root.querySelectorAll('li.govuk-tabs__list-item')
      if (!n)
        throw new u({
          component: O,
          identifier: 'List (`<ul class="govuk-tabs__list">`)'
        })
      if (!i.length)
        throw new u({
          component: O,
          identifier: 'List items (`<li class="govuk-tabs__list-item">`)'
        })
      ;((this.$tabList = n),
        (this.$tabListItems = i),
        this.setupResponsiveChecks())
    }
    setupResponsiveChecks() {
      const e = t('tablet')
      if (!e.value)
        throw new u({
          component: O,
          identifier: `CSS custom property (\`${e.property}\`) on pseudo-class \`:root\``
        })
      ;((this.mql = window.matchMedia(`(min-width: ${e.value})`)),
        'addEventListener' in this.mql
          ? this.mql.addEventListener('change', () => this.checkMode())
          : this.mql.addListener(() => this.checkMode()),
        this.checkMode())
    }
    checkMode() {
      var t
      null != (t = this.mql) && t.matches ? this.setup() : this.teardown()
    }
    setup() {
      var t
      ;(this.$tabList.setAttribute('role', 'tablist'),
        this.$tabListItems.forEach((t) => {
          t.setAttribute('role', 'presentation')
        }),
        this.$tabs.forEach((t) => {
          ;(this.setAttributes(t),
            t.addEventListener('click', this.boundTabClick, !0),
            t.addEventListener('keydown', this.boundTabKeydown, !0),
            this.hideTab(t))
        }))
      const e =
        null != (t = this.getTab(window.location.hash)) ? t : this.$tabs[0]
      ;(this.showTab(e),
        window.addEventListener('hashchange', this.boundOnHashChange, !0))
    }
    teardown() {
      ;(this.$tabList.removeAttribute('role'),
        this.$tabListItems.forEach((t) => {
          t.removeAttribute('role')
        }),
        this.$tabs.forEach((t) => {
          ;(t.removeEventListener('click', this.boundTabClick, !0),
            t.removeEventListener('keydown', this.boundTabKeydown, !0),
            this.unsetAttributes(t))
        }),
        window.removeEventListener('hashchange', this.boundOnHashChange, !0))
    }
    onHashChange() {
      const t = window.location.hash,
        e = this.getTab(t)
      if (!e) return
      if (this.changingHash) return void (this.changingHash = !1)
      const n = this.getCurrentTab()
      n && (this.hideTab(n), this.showTab(e), e.focus())
    }
    hideTab(t) {
      ;(this.unhighlightTab(t), this.hidePanel(t))
    }
    showTab(t) {
      ;(this.highlightTab(t), this.showPanel(t))
    }
    getTab(t) {
      return this.$root.querySelector(`a.govuk-tabs__tab[href="${t}"]`)
    }
    setAttributes(t) {
      const e = t.hash.replace('#', '')
      if (!e) return
      ;(t.setAttribute('id', `tab_${e}`),
        t.setAttribute('role', 'tab'),
        t.setAttribute('aria-controls', e),
        t.setAttribute('aria-selected', 'false'),
        t.setAttribute('tabindex', '-1'))
      const n = this.getPanel(t)
      n &&
        (n.setAttribute('role', 'tabpanel'),
        n.setAttribute('aria-labelledby', t.id),
        n.classList.add(this.jsHiddenClass))
    }
    unsetAttributes(t) {
      ;(t.removeAttribute('id'),
        t.removeAttribute('role'),
        t.removeAttribute('aria-controls'),
        t.removeAttribute('aria-selected'),
        t.removeAttribute('tabindex'))
      const e = this.getPanel(t)
      e &&
        (e.removeAttribute('role'),
        e.removeAttribute('aria-labelledby'),
        e.classList.remove(this.jsHiddenClass))
    }
    onTabClick(t) {
      const e = this.getCurrentTab(),
        n = t.currentTarget
      e &&
        n instanceof HTMLAnchorElement &&
        (t.preventDefault(),
        this.hideTab(e),
        this.showTab(n),
        this.createHistoryEntry(n))
    }
    createHistoryEntry(t) {
      const e = this.getPanel(t)
      if (!e) return
      const n = e.id
      ;((e.id = ''),
        (this.changingHash = !0),
        (window.location.hash = n),
        (e.id = n))
    }
    onTabKeydown(t) {
      switch (t.key) {
        case 'ArrowLeft':
        case 'Left':
          ;(this.activatePreviousTab(), t.preventDefault())
          break
        case 'ArrowRight':
        case 'Right':
          ;(this.activateNextTab(), t.preventDefault())
      }
    }
    activateNextTab() {
      const t = this.getCurrentTab()
      if (null == t || !t.parentElement) return
      const e = t.parentElement.nextElementSibling
      if (!e) return
      const n = e.querySelector('a.govuk-tabs__tab')
      n &&
        (this.hideTab(t),
        this.showTab(n),
        n.focus(),
        this.createHistoryEntry(n))
    }
    activatePreviousTab() {
      const t = this.getCurrentTab()
      if (null == t || !t.parentElement) return
      const e = t.parentElement.previousElementSibling
      if (!e) return
      const n = e.querySelector('a.govuk-tabs__tab')
      n &&
        (this.hideTab(t),
        this.showTab(n),
        n.focus(),
        this.createHistoryEntry(n))
    }
    getPanel(t) {
      const e = t.hash.replace('#', '')
      return e ? this.$root.querySelector(`#${e}`) : null
    }
    showPanel(t) {
      const e = this.getPanel(t)
      e && e.classList.remove(this.jsHiddenClass)
    }
    hidePanel(t) {
      const e = this.getPanel(t)
      e && e.classList.add(this.jsHiddenClass)
    }
    unhighlightTab(t) {
      t.parentElement &&
        (t.setAttribute('aria-selected', 'false'),
        t.parentElement.classList.remove('govuk-tabs__list-item--selected'),
        t.setAttribute('tabindex', '-1'))
    }
    highlightTab(t) {
      t.parentElement &&
        (t.setAttribute('aria-selected', 'true'),
        t.parentElement.classList.add('govuk-tabs__list-item--selected'),
        t.setAttribute('tabindex', '0'))
    }
    getCurrentTab() {
      return this.$root.querySelector(
        '.govuk-tabs__list-item--selected a.govuk-tabs__tab'
      )
    }
  }
  O.moduleName = 'govuk-tabs'
  var H,
    B,
    N = { exports: {} }
  H ||
    ((H = 1),
    (B = N),
    (function (t) {
      if ('undefined' != typeof window) {
        var e = !0,
          n = 10,
          i = '',
          o = 0,
          s = '',
          r = null,
          a = '',
          c = !1,
          u = { resize: 1, click: 1 },
          l = 128,
          d = !0,
          h = 1,
          m = 'bodyOffset',
          p = m,
          f = !0,
          g = '',
          v = {},
          b = 32,
          w = null,
          y = !1,
          $ = !1,
          k = '[iFrameSizer]',
          C = k.length,
          E = '',
          A = { max: 1, min: 1, bodyScroll: 1, documentElementScroll: 1 },
          T = 'child',
          S = window.parent,
          x = '*',
          L = 0,
          I = !1,
          M = null,
          _ = 16,
          O = 1,
          H = 'scroll',
          N = H,
          q = window,
          F = function () {
            rt('onMessage function not defined')
          },
          j = function () {},
          R = function () {},
          D = {
            height: function () {
              return (
                rt('Custom height calculation function not defined'),
                document.documentElement.offsetHeight
              )
            },
            width: function () {
              return (
                rt('Custom width calculation function not defined'),
                document.body.scrollWidth
              )
            }
          },
          P = {},
          z = !1
        try {
          var K = Object.create(
            {},
            {
              passive: {
                get: function () {
                  z = !0
                }
              }
            }
          )
          ;(window.addEventListener('test', et, K),
            window.removeEventListener('test', et, K))
        } catch (It) {}
        var V,
          W,
          U,
          Y,
          G,
          J,
          Z,
          X = {
            bodyOffset: function () {
              return (
                document.body.offsetHeight +
                vt('marginTop') +
                vt('marginBottom')
              )
            },
            offset: function () {
              return X.bodyOffset()
            },
            bodyScroll: function () {
              return document.body.scrollHeight
            },
            custom: function () {
              return D.height()
            },
            documentElementOffset: function () {
              return document.documentElement.offsetHeight
            },
            documentElementScroll: function () {
              return document.documentElement.scrollHeight
            },
            max: function () {
              return Math.max.apply(null, wt(X))
            },
            min: function () {
              return Math.min.apply(null, wt(X))
            },
            grow: function () {
              return X.max()
            },
            lowestElement: function () {
              return Math.max(
                X.bodyOffset() || X.documentElementOffset(),
                bt('bottom', $t())
              )
            },
            taggedElement: function () {
              return yt('bottom', 'data-iframe-height')
            }
          },
          Q = {
            bodyScroll: function () {
              return document.body.scrollWidth
            },
            bodyOffset: function () {
              return document.body.offsetWidth
            },
            custom: function () {
              return D.width()
            },
            documentElementScroll: function () {
              return document.documentElement.scrollWidth
            },
            documentElementOffset: function () {
              return document.documentElement.offsetWidth
            },
            scroll: function () {
              return Math.max(Q.bodyScroll(), Q.documentElementScroll())
            },
            max: function () {
              return Math.max.apply(null, wt(Q))
            },
            min: function () {
              return Math.min.apply(null, wt(Q))
            },
            rightMostElement: function () {
              return bt('right', $t())
            },
            taggedElement: function () {
              return yt('right', 'data-iframe-width')
            }
          },
          tt =
            ((V = kt),
            (G = null),
            (J = 0),
            (Z = function () {
              ;((J = Date.now()),
                (G = null),
                (Y = V.apply(W, U)),
                G || (W = U = null))
            }),
            function () {
              var t = Date.now()
              J || (J = t)
              var e = _ - (t - J)
              return (
                (W = this),
                (U = arguments),
                e <= 0 || e > _
                  ? (G && (clearTimeout(G), (G = null)),
                    (J = t),
                    (Y = V.apply(W, U)),
                    G || (W = U = null))
                  : G || (G = setTimeout(Z, e)),
                Y
              )
            })
        'iframeResizer' in window ||
          ((window.iframeChildListener = function (t) {
            xt({ data: t })
          }),
          nt(window, 'message', xt),
          nt(window, 'readystatechange', Lt),
          Lt())
      }
      function et() {}
      function nt(t, e, n, i) {
        t.addEventListener(e, n, !!z && (i || {}))
      }
      function it(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
      }
      function ot(t) {
        return k + '[' + E + '] ' + t
      }
      function st(t) {
        y && 'object' == typeof window.console && console.log(ot(t))
      }
      function rt(t) {
        'object' == typeof window.console && console.warn(ot(t))
      }
      function at() {
        var n, u, d
        ;(!(function () {
          function n(t) {
            return 'true' === t
          }
          var r = g.slice(C).split(':')
          ;((E = r[0]),
            (o = t === r[1] ? o : Number(r[1])),
            (c = t === r[2] ? c : n(r[2])),
            (y = t === r[3] ? y : n(r[3])),
            (b = t === r[4] ? b : Number(r[4])),
            (e = t === r[6] ? e : n(r[6])),
            (s = r[7]),
            (p = t === r[8] ? p : r[8]),
            (i = r[9]),
            (a = r[10]),
            (L = t === r[11] ? L : Number(r[11])),
            (v.enable = t !== r[12] && n(r[12])),
            (T = t === r[13] ? T : r[13]),
            (N = t === r[14] ? N : r[14]),
            ($ = t === r[15] ? $ : n(r[15])))
        })(),
          st('Initialising iFrame (' + window.location.href + ')'),
          (function () {
            function t() {
              var t = window.iFrameResizer
              ;(st('Reading data from page: ' + JSON.stringify(t)),
                Object.keys(t).forEach(ct, t),
                (F = 'onMessage' in t ? t.onMessage : F),
                (j = 'onReady' in t ? t.onReady : j),
                (x = 'targetOrigin' in t ? t.targetOrigin : x),
                (p =
                  'heightCalculationMethod' in t
                    ? t.heightCalculationMethod
                    : p),
                (N =
                  'widthCalculationMethod' in t ? t.widthCalculationMethod : N))
            }
            function e(t, e) {
              return (
                'function' == typeof t &&
                  (st('Setup custom ' + e + 'CalcMethod'),
                  (D[e] = t),
                  (t = 'custom')),
                t
              )
            }
            ;('iFrameResizer' in window &&
              Object === window.iFrameResizer.constructor &&
              (t(), (p = e(p, 'height')), (N = e(N, 'width'))),
              st('TargetOrigin for parent set to: ' + x))
          })(),
          t === s && (s = o + 'px'),
          ut(
            'margin',
            ((u = 'margin'),
            -1 !== (d = s).indexOf('-') &&
              (rt('Negative CSS value ignored for ' + u), (d = '')),
            d)
          ),
          ut('background', i),
          ut('padding', a),
          ((n = document.createElement('div')).style.clear = 'both'),
          (n.style.display = 'block'),
          (n.style.height = '0'),
          document.body.appendChild(n),
          mt(),
          pt(),
          (document.documentElement.style.height = ''),
          (document.body.style.height = ''),
          st('HTML & body height set to "auto"'),
          st('Enable public methods'),
          (q.parentIFrame = {
            autoResize: function (t) {
              return (
                !0 === t && !1 === e
                  ? ((e = !0), ft())
                  : !1 === t &&
                    !0 === e &&
                    ((e = !1),
                    dt('remove'),
                    null !== r && r.disconnect(),
                    clearInterval(w)),
                St(0, 0, 'autoResize', JSON.stringify(e)),
                e
              )
            },
            close: function () {
              St(0, 0, 'close')
            },
            getId: function () {
              return E
            },
            getPageInfo: function (t) {
              'function' == typeof t
                ? ((R = t), St(0, 0, 'pageInfo'))
                : ((R = function () {}), St(0, 0, 'pageInfoStop'))
            },
            moveToAnchor: function (t) {
              v.findTarget(t)
            },
            reset: function () {
              Tt('parentIFrame.reset')
            },
            scrollTo: function (t, e) {
              St(e, t, 'scrollTo')
            },
            scrollToOffset: function (t, e) {
              St(e, t, 'scrollToOffset')
            },
            sendMessage: function (t, e) {
              St(0, 0, 'message', JSON.stringify(t), e)
            },
            setHeightCalculationMethod: function (t) {
              ;((p = t), mt())
            },
            setWidthCalculationMethod: function (t) {
              ;((N = t), pt())
            },
            setTargetOrigin: function (t) {
              ;(st('Set targetOrigin: ' + t), (x = t))
            },
            size: function (t, e) {
              Ct(
                'size',
                'parentIFrame.size(' + (t || '') + (e ? ',' + e : '') + ')',
                t,
                e
              )
            }
          }),
          (function () {
            function t(t) {
              St(0, 0, t.type, t.screenY + ':' + t.screenX)
            }
            function e(e, n) {
              ;(st('Add event listener: ' + n), nt(window.document, e, t))
            }
            !0 === $ &&
              (e('mouseenter', 'Mouse Enter'), e('mouseleave', 'Mouse Leave'))
          })(),
          ft(),
          (v = (function () {
            function e() {
              return {
                x:
                  window.pageXOffset === t
                    ? document.documentElement.scrollLeft
                    : window.pageXOffset,
                y:
                  window.pageYOffset === t
                    ? document.documentElement.scrollTop
                    : window.pageYOffset
              }
            }
            function n(t) {
              var n = t.getBoundingClientRect(),
                i = e()
              return {
                x: parseInt(n.left, 10) + parseInt(i.x, 10),
                y: parseInt(n.top, 10) + parseInt(i.y, 10)
              }
            }
            function i(e) {
              function i(t) {
                var e = n(t)
                ;(st(
                  'Moving to in page link (#' +
                    o +
                    ') at x: ' +
                    e.x +
                    ' y: ' +
                    e.y
                ),
                  St(e.y, e.x, 'scrollToOffset'))
              }
              var o = e.split('#')[1] || e,
                s = decodeURIComponent(o),
                r =
                  document.getElementById(s) || document.getElementsByName(s)[0]
              t === r
                ? (st(
                    'In page link (#' +
                      o +
                      ') not found in iFrame, so sending to parent'
                  ),
                  St(0, 0, 'inPageLink', '#' + o))
                : i(r)
            }
            function o() {
              var t = window.location.hash,
                e = window.location.href
              '' !== t && '#' !== t && i(e)
            }
            function s() {
              function t(t) {
                function e(t) {
                  ;(t.preventDefault(), i(this.getAttribute('href')))
                }
                '#' !== t.getAttribute('href') && nt(t, 'click', e)
              }
              Array.prototype.forEach.call(
                document.querySelectorAll('a[href^="#"]'),
                t
              )
            }
            function r() {
              nt(window, 'hashchange', o)
            }
            function a() {
              setTimeout(o, l)
            }
            function c() {
              Array.prototype.forEach && document.querySelectorAll
                ? (st('Setting up location.hash handlers'), s(), r(), a())
                : rt(
                    'In page linking not fully supported in this browser! (See README.md for IE8 workaround)'
                  )
            }
            return (
              v.enable ? c() : st('In page linking not enabled'),
              { findTarget: i }
            )
          })()),
          Ct('init', 'Init message from host page'),
          j())
      }
      function ct(t) {
        var e = t.split('Callback')
        if (2 === e.length) {
          var n = 'on' + e[0].charAt(0).toUpperCase() + e[0].slice(1)
          ;((this[n] = this[t]),
            delete this[t],
            rt(
              "Deprecated: '" +
                t +
                "' has been renamed '" +
                n +
                "'. The old method will be removed in the next major version."
            ))
        }
      }
      function ut(e, n) {
        t !== n &&
          '' !== n &&
          'null' !== n &&
          ((document.body.style[e] = n),
          st('Body ' + e + ' set to "' + n + '"'))
      }
      function lt(t) {
        var e = {
          add: function (e) {
            function n() {
              Ct(t.eventName, t.eventType)
            }
            ;((P[e] = n), nt(window, e, n, { passive: !0 }))
          },
          remove: function (t) {
            var e,
              n,
              i,
              o = P[t]
            ;(delete P[t],
              (e = window),
              (n = t),
              (i = o),
              e.removeEventListener(n, i, !1))
          }
        }
        ;(t.eventNames && Array.prototype.map
          ? ((t.eventName = t.eventNames[0]), t.eventNames.map(e[t.method]))
          : e[t.method](t.eventName),
          st(it(t.method) + ' event listener: ' + t.eventType))
      }
      function dt(t) {
        ;(lt({
          method: t,
          eventType: 'Animation Start',
          eventNames: ['animationstart', 'webkitAnimationStart']
        }),
          lt({
            method: t,
            eventType: 'Animation Iteration',
            eventNames: ['animationiteration', 'webkitAnimationIteration']
          }),
          lt({
            method: t,
            eventType: 'Animation End',
            eventNames: ['animationend', 'webkitAnimationEnd']
          }),
          lt({ method: t, eventType: 'Input', eventName: 'input' }),
          lt({ method: t, eventType: 'Mouse Up', eventName: 'mouseup' }),
          lt({ method: t, eventType: 'Mouse Down', eventName: 'mousedown' }),
          lt({
            method: t,
            eventType: 'Orientation Change',
            eventName: 'orientationchange'
          }),
          lt({
            method: t,
            eventType: 'Print',
            eventNames: ['afterprint', 'beforeprint']
          }),
          lt({
            method: t,
            eventType: 'Ready State Change',
            eventName: 'readystatechange'
          }),
          lt({ method: t, eventType: 'Touch Start', eventName: 'touchstart' }),
          lt({ method: t, eventType: 'Touch End', eventName: 'touchend' }),
          lt({
            method: t,
            eventType: 'Touch Cancel',
            eventName: 'touchcancel'
          }),
          lt({
            method: t,
            eventType: 'Transition Start',
            eventNames: [
              'transitionstart',
              'webkitTransitionStart',
              'MSTransitionStart',
              'oTransitionStart',
              'otransitionstart'
            ]
          }),
          lt({
            method: t,
            eventType: 'Transition Iteration',
            eventNames: [
              'transitioniteration',
              'webkitTransitionIteration',
              'MSTransitionIteration',
              'oTransitionIteration',
              'otransitioniteration'
            ]
          }),
          lt({
            method: t,
            eventType: 'Transition End',
            eventNames: [
              'transitionend',
              'webkitTransitionEnd',
              'MSTransitionEnd',
              'oTransitionEnd',
              'otransitionend'
            ]
          }),
          'child' === T &&
            lt({ method: t, eventType: 'IFrame Resized', eventName: 'resize' }))
      }
      function ht(t, e, n, i) {
        return (
          e !== t &&
            (t in n ||
              (rt(t + ' is not a valid option for ' + i + 'CalculationMethod.'),
              (t = e)),
            st(i + ' calculation method set to "' + t + '"')),
          t
        )
      }
      function mt() {
        p = ht(p, m, X, 'height')
      }
      function pt() {
        N = ht(N, H, Q, 'width')
      }
      function ft() {
        var t
        !0 === e
          ? (dt('add'),
            (t = 0 > b),
            window.MutationObserver || window.WebKitMutationObserver
              ? t
                ? gt()
                : (r = (function () {
                    function t(t) {
                      function e(t) {
                        !1 === t.complete &&
                          (st('Attach listeners to ' + t.src),
                          t.addEventListener('load', o, !1),
                          t.addEventListener('error', s, !1),
                          c.push(t))
                      }
                      'attributes' === t.type && 'src' === t.attributeName
                        ? e(t.target)
                        : 'childList' === t.type &&
                          Array.prototype.forEach.call(
                            t.target.querySelectorAll('img'),
                            e
                          )
                    }
                    function e(t) {
                      c.splice(c.indexOf(t), 1)
                    }
                    function n(t) {
                      ;(st('Remove listeners from ' + t.src),
                        t.removeEventListener('load', o, !1),
                        t.removeEventListener('error', s, !1),
                        e(t))
                    }
                    function i(t, e, i) {
                      ;(n(t.target), Ct(e, i + ': ' + t.target.src))
                    }
                    function o(t) {
                      i(t, 'imageLoad', 'Image loaded')
                    }
                    function s(t) {
                      i(t, 'imageLoadFailed', 'Image load failed')
                    }
                    function r(e) {
                      ;(Ct(
                        'mutationObserver',
                        'mutationObserver: ' + e[0].target + ' ' + e[0].type
                      ),
                        e.forEach(t))
                    }
                    function a() {
                      var t = document.querySelector('body'),
                        e = {
                          attributes: !0,
                          attributeOldValue: !1,
                          characterData: !0,
                          characterDataOldValue: !1,
                          childList: !0,
                          subtree: !0
                        }
                      return (
                        (l = new u(r)),
                        st('Create body MutationObserver'),
                        l.observe(t, e),
                        l
                      )
                    }
                    var c = [],
                      u =
                        window.MutationObserver ||
                        window.WebKitMutationObserver,
                      l = a()
                    return {
                      disconnect: function () {
                        'disconnect' in l &&
                          (st('Disconnect body MutationObserver'),
                          l.disconnect(),
                          c.forEach(n))
                      }
                    }
                  })())
              : (st('MutationObserver not supported in this browser!'), gt()))
          : st('Auto Resize disabled')
      }
      function gt() {
        0 !== b &&
          (st('setInterval: ' + b + 'ms'),
          (w = setInterval(function () {
            Ct('interval', 'setInterval: ' + b)
          }, Math.abs(b))))
      }
      function vt(t, e) {
        var i = 0
        return (
          (e = e || document.body),
          (i =
            null === (i = document.defaultView.getComputedStyle(e, null))
              ? 0
              : i[t]),
          parseInt(i, n)
        )
      }
      function bt(t, e) {
        for (
          var n = e.length, i = 0, o = 0, s = it(t), r = Date.now(), a = 0;
          a < n;
          a++
        )
          (i = e[a].getBoundingClientRect()[t] + vt('margin' + s, e[a])) > o &&
            (o = i)
        return (
          (r = Date.now() - r),
          st('Parsed ' + n + ' HTML elements'),
          st('Element position calculated in ' + r + 'ms'),
          (function (t) {
            t > _ / 2 && st('Event throttle increased to ' + (_ = 2 * t) + 'ms')
          })(r),
          o
        )
      }
      function wt(t) {
        return [
          t.bodyOffset(),
          t.bodyScroll(),
          t.documentElementOffset(),
          t.documentElementScroll()
        ]
      }
      function yt(t, e) {
        var n = document.querySelectorAll('[' + e + ']')
        return (
          0 === n.length &&
            (rt('No tagged elements (' + e + ') found on page'),
            document.querySelectorAll('body *')),
          bt(t, n)
        )
      }
      function $t() {
        return document.querySelectorAll('body *')
      }
      function kt(e, n, i, o) {
        var s, r
        !(function () {
          function e(t, e) {
            return !(Math.abs(t - e) <= L)
          }
          return (
            (s = t === i ? X[p]() : i),
            (r = t === o ? Q[N]() : o),
            e(h, s) || (c && e(O, r))
          )
        })() && 'init' !== e
          ? !(e in { init: 1, interval: 1, size: 1 }) &&
            (p in A || (c && N in A))
            ? Tt(n)
            : e in { interval: 1 } || st('No change in size detected')
          : (Et(), St((h = s), (O = r), e))
      }
      function Ct(t, e, n, i) {
        I && t in u
          ? st('Trigger event cancelled: ' + t)
          : (t in { reset: 1, resetPage: 1, init: 1 } ||
              st('Trigger event: ' + e),
            'init' === t ? kt(t, e, n, i) : tt(t, e, n, i))
      }
      function Et() {
        ;(I || ((I = !0), st('Trigger event lock on')),
          clearTimeout(M),
          (M = setTimeout(function () {
            ;((I = !1), st('Trigger event lock off'), st('--'))
          }, l)))
      }
      function At(t) {
        ;((h = X[p]()), (O = Q[N]()), St(h, O, t))
      }
      function Tt(t) {
        var e = p
        ;((p = m), st('Reset trigger event: ' + t), Et(), At('reset'), (p = e))
      }
      function St(e, n, i, o, s) {
        var r
        ;(t === s ? (s = x) : st('Message targetOrigin: ' + s),
          st(
            'Sending message to host page (' +
              (r = E + ':' + e + ':' + n + ':' + i + (t === o ? '' : ':' + o)) +
              ')'
          ),
          S.postMessage(k + r, s))
      }
      function xt(e) {
        var n = {
          init: function () {
            ;((g = e.data),
              (S = e.source),
              at(),
              (d = !1),
              setTimeout(function () {
                f = !1
              }, l))
          },
          reset: function () {
            f
              ? st('Page reset ignored by init')
              : (st('Page size reset by host page'), At('resetPage'))
          },
          resize: function () {
            Ct('resizeParent', 'Parent window requested size check')
          },
          moveToAnchor: function () {
            v.findTarget(o())
          },
          inPageLink: function () {
            this.moveToAnchor()
          },
          pageInfo: function () {
            var t = o()
            ;(st('PageInfoFromParent called from parent: ' + t),
              R(JSON.parse(t)),
              st(' --'))
          },
          message: function () {
            var t = o()
            ;(st('onMessage called from parent: ' + t),
              F(JSON.parse(t)),
              st(' --'))
          }
        }
        function i() {
          return e.data.split(']')[1].split(':')[0]
        }
        function o() {
          return e.data.slice(e.data.indexOf(':') + 1)
        }
        function s() {
          return e.data.split(':')[2] in { true: 1, false: 1 }
        }
        function r() {
          var o = i()
          o in n
            ? n[o]()
            : (!B.exports && 'iFrameResize' in window) ||
              (window.jQuery !== t &&
                'iFrameResize' in window.jQuery.prototype) ||
              s() ||
              rt('Unexpected message (' + e.data + ')')
        }
        k === ('' + e.data).slice(0, C) &&
          (!1 === d
            ? r()
            : s()
              ? n.init()
              : st(
                  'Ignored message of type "' +
                    i() +
                    '". Received before initialization.'
                ))
      }
      function Lt() {
        'loading' !== document.readyState &&
          window.parent.postMessage('[iFrameResizerChild]Ready', '*')
      }
    })())
  ;(!(function (t = {}) {
    const e = i(t) ? t : {},
      o = f(t)
    try {
      if (!n()) throw new a()
      if (null === o.scope)
        throw new u({
          element: o.scope,
          identifier: 'GOV.UK Frontend scope element (`$scope`)'
        })
    } catch (s) {
      return void (o.onError ? o.onError(s, { config: e }) : console.log(s))
    }
    ;[
      [w, e.accordion],
      [y, e.button],
      [k, e.characterCount],
      [C],
      [E, e.errorSummary],
      [A, e.exitThisPage],
      [T, e.fileUpload],
      [S],
      [x, e.notificationBanner],
      [L, e.passwordInput],
      [I],
      [M],
      [_],
      [O]
    ].forEach(([t, e]) => {
      !(function (t, e, i) {
        let o
        const r = f(i)
        try {
          var c
          if (!n()) throw new a()
          if (null === r.scope)
            throw new u({
              element: r.scope,
              component: t,
              identifier: 'Scope element (`$scope`)'
            })
          o =
            null == (c = r.scope)
              ? void 0
              : c.querySelectorAll(`[data-module="${t.moduleName}"]`)
        } catch (s) {
          return (
            r.onError
              ? r.onError(s, { component: t, config: e })
              : console.log(s),
            []
          )
        }
        Array.from(null != o ? o : [])
          .map((n) => {
            try {
              return void 0 !== e ? new t(n, e) : new t(n)
            } catch (s) {
              return (
                r.onError
                  ? r.onError(s, { element: n, component: t, config: e })
                  : console.log(s),
                null
              )
            }
          })
          .filter(Boolean)
      })(t, e, o)
    })
  })({
    errorSummary: { disableAutoFocus: !0 },
    notificationBanner: { disableAutoFocus: !0 }
  }),
    new (class {
      constructor(t) {
        if (
          !(
            t instanceof Document &&
            document.body.classList.contains('govuk-frontend-supported')
          )
        )
          return this
        this.$module = t
        const e = this.$module.querySelector('form[action="/form-handler"]')
        this.preventFormSubmission(e)
      }
      preventFormSubmission(t) {
        if (!t) return !1
        t.addEventListener('submit', (t) => {
          t.preventDefault()
        })
      }
    })(document))
})()
//# sourceMappingURL=application-example-df1b1846e6ebb2eca45a9e21924dfbd8.js.map
