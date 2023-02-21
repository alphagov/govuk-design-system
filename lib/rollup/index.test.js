const { normalize } = require('path')

const metalsmith = require('metalsmith')
const outdent = require('outdent')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

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
      .use(rollup({
        input: 'javascripts/entry.js',
        output: {
          legacy: true,
          format: 'iife',
          name: 'entry',
          sourcemap: true
        },
        plugins: [
          resolve(),
          commonjs()
        ]
      }))

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
    expect(output[normalize('javascripts/entry.js')])
      .toMatchObject({ contents: expect.any(Buffer) })

    expect(output[normalize('javascripts/example.js')])
      .toMatchObject({ contents: expect.any(Buffer) })
  })

  it('bundles ESM modules to single IIFE file (minified)', () => {
    expect(output[normalize('javascripts/entry.js')].contents.toString())
      .toEqual(outdent`
        var entry=function(){"use strict";return()=>"example"}();
        //# sourceMappingURL=entry.js.map
      `)
  })
})
