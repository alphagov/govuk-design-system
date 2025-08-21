const fs = require('fs')
const path = require('path')

const hljs = require('highlight.js')

const nunjucksHighlight = require('../index')

hljs.registerLanguage('nunjucks', nunjucksHighlight)

const fixturesPath = path.join(__dirname, 'fixtures.njk')
const fixturesContent = fs.readFileSync(fixturesPath, 'utf8')

let result

describe('Nunjucks syntax', () => {
  beforeAll(() => {
    const highlightedFixtures = hljs.highlight(fixturesContent, {
      language: 'nunjucks'
    })

    result = highlightedFixtures.value
  })

  describe('comments', () => {
    it('should highlight block comments', () => {
      expect(result).toContain(
        '<span class="hljs-comment">{% comment %}This is a comment{% endcomment %}</span>'
      )
    })

    it('should highlight line comments', () => {
      expect(result).toContain(
        '<span class="hljs-comment">{# This is a line comment #}</span>'
      )
    })
  })

  describe('template variables', () => {
    it('should highlight simple variables', () => {
      expect(result).toContain(
        '<span class="hljs-tag">{{ <span class="hljs-name">variable</span> }}</span>'
      )
    })

    it('should highlight variables with filters', () => {
      expect(result).toContain(
        '{{ <span class="hljs-name">variable</span> <span class="hljs-operator">|</span> <span class="hljs-name">filter</span> }}'
      )
    })

    it('should highlight filter arguments', () => {
      expect(result).toContain(
        '<span class="hljs-operator">|</span> <span class="hljs-name">filter</span> }}</span>'
      )
    })

    it('should highlight function calls', () => {
      expect(result).toContain(
        '<span class="hljs-tag">{{ <span class="hljs-title">super</span>() }}</span>'
      )
    })

    it('should highlight JavaScript in function parameters', () => {
      expect(result).toContain(
        '<span class="hljs-tag">{{ <span class="hljs-title">govukComponent</span><span class="language-javascript">('
      )
    })

    it('should highlight quoted strings', () => {
      expect(result).toContain(
        '<span class="hljs-string">&quot;hello world&quot;</span>'
      )
    })
  })

  describe('template tags', () => {
    it('should highlight control flow keywords', () => {
      expect(result).toContain(
        '<span class="hljs-keyword">if</span> <span class="hljs-variable">happy</span> <span class="hljs-variable">and</span> <span class="hljs-variable">hungry</span> %}</span>'
      )
      expect(result).toContain(
        '<span class="hljs-keyword">elif</span> <span class="hljs-variable">happy</span> <span class="hljs-variable">or</span> <span class="hljs-variable">hungry</span> %}</span>'
      )
      expect(result).toContain('<span class="hljs-keyword">endif</span>')
    })

    it('should highlight loop keywords', () => {
      expect(result).toContain(
        '<span class="hljs-keyword">for</span> <span class="hljs-variable">item</span> <span class="hljs-variable">in</span> <span class="hljs-variable">items</span>'
      )
    })

    it('should highlight block tags', () => {
      expect(result).toContain(
        '<span class="hljs-keyword">block</span> <span class="hljs-variable">content</span>'
      )
      expect(result).toContain('<span class="hljs-keyword">endblock</span>')
    })

    it('should highlight include and extends', () => {
      expect(result).toContain(
        '<span class="hljs-keyword">extends</span> <span class="hljs-string">&quot;base.html&quot;</span> %}'
      )
      expect(result).toContain(
        `<span class="hljs-keyword">include</span> <span class="hljs-string">&#x27;standardModalData.html&#x27;</span> %}`
      )
    })

    it('should highlight set tags', () => {
      expect(result).toContain(
        '<span class="hljs-keyword">set</span> <span class="hljs-variable">username</span> = <span class="hljs-string">&quot;joe&quot;</span> %}'
      )
      expect(result).toContain(
        '<span class="hljs-keyword">set</span> <span class="hljs-variable">standardModal</span> %}'
      )
      expect(result).toContain('<span class="hljs-keyword">endset</span>')
    })

    it('should highlight macro definitions', () => {
      expect(result).toContain(
        '<span class="hljs-keyword">macro</span> <span class="hljs-variable">field</span>(<span class="hljs-variable">name</span>, <span class="hljs-variable">value</span>=<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-variable">type</span>=<span class="hljs-string">&#x27;text&#x27;</span>) %}'
      )
      expect(result).toContain('<span class="hljs-keyword">endmacro</span>')
    })

    it('should handle parentheses correctly', () => {
      expect(result).toContain(
        '<span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Address line 2 (optional)&quot;</span>'
      )
      expect(result).toContain(
        '<span class="hljs-attr">id</span>: <span class="hljs-string">&quot;address-line-2&quot;</span>'
      )
    })
  })
})
