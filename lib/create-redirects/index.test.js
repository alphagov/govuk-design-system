/* eslint-env jest */

const metalsmith = require('metalsmith')
const plugin = require('./index.js')

describe('create-redirects plugin', () => {
  it('redirect at the root creates a single file', (done) => {
    metalsmith('lib/create-redirects/fixtures/single-file')
      .use(plugin())
      .build((err, files) => {
        if (err) {
          throw err
        }
        const redirectFile = files['page-that-needs-redirecting.md.njk']
        expect(redirectFile).toBeDefined()
        const contents = redirectFile.contents.toString()
        expect(contents).toContain(`
# Page has moved

The web address has moved to [/home/](/home/).
`)
        done()
      })
  })
  it('redirect within a folder creates a nested folder', (done) => {
    metalsmith('lib/create-redirects/fixtures/nested-folder')
      .use(plugin())
      .build((err, files) => {
        if (err) {
          throw err
        }
        const redirectFile = files['nested/page-that-needs-redirecting/index.md.njk']
        expect(redirectFile).toBeDefined()
        const contents = redirectFile.contents.toString()
        expect(contents).toContain(`
# Page has moved

The web address has moved to [/home/](/home/).
`)
        done()
      })
  })
  it('redirect without a forward slash should fail', (done) => {
    metalsmith('lib/create-redirects/fixtures/incorrect-redirect')
      .use(plugin())
      .build((err, files) => {
        expect(err).toEqual(new Error("Redirect 'incorrect-slug' to '/index/' needs to start and end with '/'"))
        done()
      })
  })
  it('redirect to existing file should fail', (done) => {
    metalsmith('lib/create-redirects/fixtures/redirect-to-existing-file')
      .use(plugin())
      .build((err, files) => {
        expect(err).toEqual(new Error("Cannot create redirect from '/existing/' to '/home/' as the page already exists"))
        done()
      })
  })
})
