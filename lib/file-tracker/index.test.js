const Metalsmith = require('metalsmith')

const fileTracker = require('./index.js')

describe('FileTracker', () => {
  let metalsmith
  let files
  let tracker

  beforeEach(() => {
    files = {
      'file1.txt': { contents: Buffer.from('content 1') },
      'file2.txt': { contents: Buffer.from('content 2') }
    }
    fileTracker.lastHashes.clear()
    metalsmith = Metalsmith(__dirname)

    tracker = fileTracker.updateMetadata()
    tracker(files, metalsmith)
  })

  describe('updateMetadata', () => {
    it('detects all files as changed on first build', () => {
      expect(metalsmith.metadata().changedFiles).toEqual([
        'file1.txt',
        'file2.txt'
      ])
    })

    it('detects no changed files if contents are unchanged', () => {
      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toBeNull()
    })

    it('detects changed files', () => {
      files['file2.txt'].contents = Buffer.from('new content 2')

      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toEqual(['file2.txt'])
    })

    it('detects new files as changed', () => {
      files['file3.txt'] = { contents: Buffer.from('content 3') }

      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toEqual(['file3.txt'])
    })

    it('detects multiple changed files', () => {
      files['file1.txt'].contents = Buffer.from('new content 1')
      files['file2.txt'].contents = Buffer.from('new content 2')

      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toEqual([
        'file1.txt',
        'file2.txt'
      ])
    })

    it('ignores files without contents', () => {
      files['file2.txt'].contents = null
      files['file3.txt'] = { contents: Buffer.from('content 3') }
      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toEqual(['file3.txt'])
    })

    it('handles empty files object', () => {
      files = {}

      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toBeNull()
    })

    it('handles removed files', () => {
      delete files['file1.txt']
      files['file2.txt'].contents = Buffer.from('updated content 2')

      tracker(files, metalsmith)

      expect(metalsmith.metadata().changedFiles).toEqual(['file2.txt'])
    })
  })

  describe('filterOutputFiles', () => {
    it('keeps all files when changedFiles is null', (done) => {
      // Reset to make changedFiles null (no changes)
      tracker(files, metalsmith)

      const filter = fileTracker.filterOutputFiles()
      filter(files, metalsmith, () => {
        expect(Object.keys(files)).toEqual(['file1.txt', 'file2.txt'])
        done()
      })
    })

    it('keeps only changed files when changedFiles is set', (done) => {
      files['file2.txt'].contents = Buffer.from('new content 2')
      tracker(files, metalsmith)

      const filter = fileTracker.filterOutputFiles()
      filter(files, metalsmith, () => {
        expect(Object.keys(files)).toEqual(['file2.txt'])
        done()
      })
    })

    it('keeps multiple changed files', (done) => {
      // Change both files
      files['file1.txt'].contents = Buffer.from('new content 1')
      files['file2.txt'].contents = Buffer.from('new content 2')
      files['file3.txt'] = { contents: Buffer.from('content 3') }
      tracker(files, metalsmith)

      const filter = fileTracker.filterOutputFiles()
      filter(files, metalsmith, () => {
        expect(Object.keys(files).sort()).toEqual([
          'file1.txt',
          'file2.txt',
          'file3.txt'
        ])
        done()
      })
    })

    it('removes all files when none have changed', (done) => {
      metalsmith.metadata().changedFiles = []

      const filter = fileTracker.filterOutputFiles()
      filter(files, metalsmith, () => {
        expect(Object.keys(files)).toEqual([])
        done()
      })
    })
  })

  describe('runIfPatternMatches', () => {
    let mockPlugin

    beforeEach(() => {
      mockPlugin = jest.fn((files, metalsmith, done) => done())
    })

    it('runs plugin when pattern matches changed files', (done) => {
      files['styles.scss'] = { contents: Buffer.from('body { }') }
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches('**/*.scss', mockPlugin)

      check(files, metalsmith, () => {
        expect(mockPlugin).toHaveBeenCalledWith(
          files,
          metalsmith,
          expect.any(Function)
        )
        done()
      })
    })

    it('skips plugin when pattern does not match changed files', (done) => {
      files['script.js'] = { contents: Buffer.from('console.log()') }
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches('**/*.scss', mockPlugin)

      check(files, metalsmith, () => {
        expect(mockPlugin).not.toHaveBeenCalled()
        done()
      })
    })

    it('does not run plugin when changedFiles is null', (done) => {
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches('**/*.txt', mockPlugin)

      check(files, metalsmith, () => {
        expect(mockPlugin).not.toHaveBeenCalled()
        done()
      })
    })

    it('handles multiple patterns', (done) => {
      files['styles.scss'] = { contents: Buffer.from('@import "vars";') }
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches(
        ['**/*.css', '**/*.scss'],
        mockPlugin
      )

      check(files, metalsmith, () => {
        expect(mockPlugin).toHaveBeenCalled()
        done()
      })
    })

    it('handles glob patterns with wildcards', (done) => {
      files['javascripts/application.mjs'] = {
        contents: Buffer.from('export {}')
      }
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches('**/*.{mjs,js}', mockPlugin)

      check(files, metalsmith, () => {
        expect(mockPlugin).toHaveBeenCalled()
        done()
      })
    })

    it('skips plugin when no files match any of multiple patterns', (done) => {
      files['readme.md'] = { contents: Buffer.from('# README') }
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches(
        ['**/*.css', '**/*.js'],
        mockPlugin
      )

      check(files, metalsmith, () => {
        expect(mockPlugin).not.toHaveBeenCalled()
        done()
      })
    })

    it('runs plugin when at least one changed file matches pattern', (done) => {
      files['file1.txt'].contents = Buffer.from('changed')
      files['styles.css'] = { contents: Buffer.from('body { }') }
      tracker(files, metalsmith)

      const check = fileTracker.runIfPatternMatches('**/*.css', mockPlugin)

      check(files, metalsmith, () => {
        expect(mockPlugin).toHaveBeenCalled()
        done()
      })
    })
  })
})
