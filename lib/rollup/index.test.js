const { normalize } = require('path')

const Metalsmith = require('metalsmith')
const outdent = require('outdent')

const rollup = require('./index.js')

describe('Rollup plugin', () => {
  const source = './fixtures/src'
  const destination = './fixtures/build'

  let output

  beforeAll((done) => {
    Metalsmith(__dirname)
      // Use test fixtures
      .source(source)
      .destination(destination)

      // Rollup example
      .use(rollup('javascripts/entry.mjs', 'entry'))

      // Build
      .build((err, files) => {
        if (err) {
          return done(err)
        }

        output = files
        done()
      })
  })

  it('compiles JavaScript to Metalsmith files', () => {
    expect(output[normalize('javascripts/entry.js')]).toMatchObject({
      contents: expect.any(Buffer)
    })

    // Source `*.mjs` entry removed
    expect(output['javascripts/entry.mjs']).toBeUndefined()
  })

  it('bundles ESM modules to single IIFE file (minified)', () => {
    expect(output[normalize('javascripts/entry.js')].contents.toString())
      .toEqual(outdent({ trimTrailingNewline: false })`
        var entry=function(){"use strict";return()=>"example"}();
        //# sourceMappingURL=entry.js.map
      `)
  })
})
