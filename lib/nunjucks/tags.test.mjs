import nunjucks from 'nunjucks'

import { markdown } from './tags.js'

const nunjucksEnvironment = nunjucks.configure({
  noCache: true,
  throwOnUndefined: true
})
nunjucksEnvironment.addExtension('markdown', markdown)

describe('Tags', () => {
  describe('markdown', () => {
    it('turns markdown into HTML', () => {
      expect(
        nunjucksEnvironment.renderString(`
          {% markdown %}
            # Admin dashboard
          {% endmarkdown %}
        `)
      ).toContain('<h1 id="admin-dashboard">Admin dashboard</h1>')
    })
    it('handles indentation of Markdown without turning content into code blocks', () => {
      expect(
        nunjucksEnvironment.renderString(`
          {% markdown %}
                    # Admin dashboard
          {% endmarkdown %}
        `)
      ).toContain('<h1 id="admin-dashboard">Admin dashboard</h1>')
    })
    it('renders Nunjucks statements within it', () => {
      expect(
        nunjucksEnvironment.renderString(
          `
          {% markdown %}
            Hello, {{ username }}
          {% endmarkdown %}
        `,
          { username: 'Larry' }
        )
      ).toContain(`<p>Hello, Larry</p>`)
    })
    it('renders Nunjucks blocks within it', () => {
      expect(
        nunjucksEnvironment.renderString(`
          {% markdown %}
            {% set username %}Larry{% endset %}
            Hello, {{ username }}
          {% endmarkdown %}
        `)
      ).toContain(`<p>Hello, Larry</p>`)
    })
    it('errors if arguments passed to it', () => {
      expect(() => {
        nunjucksEnvironment.renderString(`
          {% markdown govspeak %}
            {% set username %}Larry{% endset %}
            Hello, {{ username }}
          {% endmarkdown %}
        `)
      }).toThrow('Error: markdown tag does not support arguments.')
    })
  })
})
