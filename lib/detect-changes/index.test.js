// lib/detect-changes/index.test.js
const { existsSync, rmSync } = require('fs')
const { join } = require('path')

const Metalsmith = require('metalsmith')

const detectChanges = require('./index.js')

const CACHE_DIR = '.cache'
const CACHE_FILE = join(CACHE_DIR, 'file-hashes.json')

describe('detect-changes plugin', () => {
  const fixturesDir = join(__dirname, 'fixtures')
  const source = './src'
  const destination = './build'

  // Clean up cache before and after tests
  beforeEach(() => {
    if (existsSync(CACHE_FILE)) {
      rmSync(CACHE_FILE)
    }
  })

  afterAll(() => {
    if (existsSync(CACHE_FILE)) {
      rmSync(CACHE_FILE)
    }
  })

  describe('production mode', () => {
    it('does not create a cache file', (done) => {
      Metalsmith(fixturesDir)
        .source(source)
        .destination(destination)
        .use(detectChanges(true))
        .build((err) => {
          if (err) return done(err)

          expect(existsSync(CACHE_FILE)).toBe(false)
          done()
        })
    })

    it('does not set changedFiles in metadata', (done) => {
      Metalsmith(fixturesDir)
        .source(source)
        .destination(destination)
        .use(detectChanges(true))
        .use((files, metalsmith, done) => {
          expect(metalsmith.metadata().changedFiles).toBeUndefined()
          done()
        })
        .build(done)
    })
  })

  describe('watch mode', () => {
    let metalsmith

    beforeEach(() => {
      metalsmith = Metalsmith(fixturesDir)
        .source(source)
        .destination(destination)
        .watch([source])
    })

    it('detects no changes when files are unchanged', (done) => {
      // First build to establish baseline
      metalsmith.use(detectChanges()).build((err) => {
        if (err) return done(err)

        // Second build with no changes
        metalsmith
          .use(detectChanges())
          .use((files, metalsmith, done) => {
            const changedFiles = metalsmith.metadata().changedFiles
            expect(changedFiles).toEqual([])
            done()
          })
          .build(done)
      })
    })

    it('detects when a file content changes', (done) => {
      // First build to establish baseline
      metalsmith.use(detectChanges()).build((err) => {
        if (err) return done(err)

        // Second build with modified file
        metalsmith
          .use((files) => {
            files['example.md'].contents = Buffer.from('# Modified content')
          })
          .use(detectChanges())
          .use((files, metalsmith, done) => {
            const changedFiles = metalsmith.metadata().changedFiles
            expect(changedFiles).toContain('example.md')
            done()
          })
          .build(done)
      })
    })

    it('detects when a new file is added', (done) => {
      // First build
      metalsmith.use(detectChanges()).build((err) => {
        if (err) return done(err)

        // Second build with new file
        metalsmith
          .use((files) => {
            files['new-file.md'] = {
              contents: Buffer.from('# New file')
            }
          })
          .use(detectChanges())
          .use((files, metalsmith, done) => {
            const changedFiles = metalsmith.metadata().changedFiles
            expect(changedFiles).toContain('new-file.md')
            done()
          })
          .build(done)
      })
    })

    it('tracks multiple changed files', (done) => {
      // First build
      metalsmith.use(detectChanges()).build((err) => {
        if (err) return done(err)

        // Second build with multiple changes
        metalsmith
          .use((files) => {
            files['example.md'].contents = Buffer.from('# Modified 1')
            files['another.md'] = {
              contents: Buffer.from('# New file')
            }
          })
          .use(detectChanges())
          .use((files, metalsmith, done) => {
            const changedFiles = metalsmith.metadata().changedFiles
            expect(changedFiles).toContain('example.md')
            expect(changedFiles).toContain('another.md')
            expect(changedFiles.length).toBeGreaterThanOrEqual(2)
            done()
          })
          .build(done)
      })
    })

    it('does not detect unchanged files', (done) => {
      // First build
      metalsmith.use(detectChanges()).build((err) => {
        if (err) return done(err)

        // Second build with one change
        metalsmith
          .use((files) => {
            files['example.md'].contents = Buffer.from('# Modified')
            // unchanged-file.md remains the same
          })
          .use(detectChanges())
          .use((files, metalsmith, done) => {
            const changedFiles = metalsmith.metadata().changedFiles
            expect(changedFiles).toContain('example.md')
            expect(changedFiles).not.toContain('unchanged-file.md')
            done()
          })
          .build(done)
      })
    })
  })
})
