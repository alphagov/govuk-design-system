const plugin = require('.')

describe('metalsmith-title-checker plugin', () => {
  it('should not throw an error when all titles are unique', () => {
    const files = {
      'page1.md': { title: 'Unique Title' },
      'page2.md': { title: 'Another Unique Title' },
      '/default/index.njk': { title: 'Component' }
    }
    expect(() => {
      plugin()(files, {})
    }).not.toThrow()
  })

  it('should throw an error when duplicate titles are found', () => {
    const files = {
      'page1.md': { title: 'Duplicate Title' },
      'page2.md': { title: 'Duplicate Title' }
    }
    expect(() => {
      plugin()(files, {})
    }).toThrow(/duplicate/)
  })

  it('should throw an error when a page has no title', () => {
    const files = {
      'page1.md': {},
      'page2.md': { title: 'Duplicate Title' }
    }
    expect(() => {
      plugin()(files, {})
    }).toThrow(`The following file(s) do not have titles:\n\n- page1.md`)
  })

  it('should ignore default example title', () => {
    const files = {
      'component.md': { title: 'Component' },
      '/default/example.njk': { title: 'Component' }
    }
    expect(() => {
      plugin()(files, {})
    }).not.toThrow()
  })
})
