const permalinks = require('@metalsmith/permalinks')
const Metalsmith = require('metalsmith')

const redirects = require('./index.js')

describe('Hash fingerprints plugin', () => {
  const source = './fixtures/src'
  const destination = './fixtures/build'

  let output

  beforeAll((done) => {
    Metalsmith(__dirname)
      // Use test fixtures
      .source(source)
      .destination(destination)

      // Redirects plugin requires permalinks to work
      .use(permalinks())

      // The redirects plugin under test
      .use(redirects)

      // Build
      .build((err, files) => {
        if (err) {
          return done(err)
        }

        output = files
        done()
      })
  })

  it('creates a _redirects file', () => {
    expect(output).toHaveProperty('_redirects')
  })

  it('does not includes live pages in the _redirects file', () => {
    expect(output._redirects.contents.toString()).not.toContain('/live')
  })

  it('includes archived pages in the _redirects file with a 410 status', () => {
    expect(output._redirects.contents.toString()).toContain(
      '/archived\t/archived\t410!'
    )
  })
})
