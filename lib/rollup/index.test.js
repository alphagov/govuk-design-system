const { normalize } = require('path')

const metalsmith = require('metalsmith')
const outdent = require('outdent')

const rollup = require('./index.js')

describe('Rollup plugin', () => {
  const source = './fixtures/src'
  const destination = './fixtures/build'

  let output

  beforeAll((done) => {
    metalsmith(__dirname)

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
    expect(output[normalize('javascripts/entry.mjs')])
      .toMatchObject({ contents: expect.any(Buffer) })

    expect(output[normalize('javascripts/example.mjs')])
      .toMatchObject({ contents: expect.any(Buffer) })
  })

  it('bundles ESM modules to single IIFE file (minified)', () => {
    expect(output[normalize('javascripts/entry.mjs')].contents.toString())
      .toEqual(outdent`
        var entry=function(){"use strict";return()=>"example"}();
        //# sourceMappingURL=entry.mjs.map
      `)
  })
})
