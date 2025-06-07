const fs = require('fs')

const Metalsmith = require('metalsmith')

const plugin = require('./index.js')

describe('metalsmith-cache plugin', () => {
  const cacheDir = 'lib/metalsmith-cache/fixtures/.cache'
  let callCount = 0
  const dummyPlugin = (files, metalsmith, done) => {
    callCount++
    done()
  }

  it('runs plugin on first build and creates a cache marker', () => {
    callCount = 0
    fs.rmSync(cacheDir, { recursive: true, force: true })

    Metalsmith('lib/metalsmith-cache/fixtures')
      .use(plugin('initial-test', '**/*.md', dummyPlugin, { cacheDir }))
      .build((err) => {
        if (err) {
          throw err
        }
        expect(callCount).toBe(1)

        const cached = fs.readdirSync(cacheDir)
        expect(cached).toHaveLength(1)
      })
  })
})
