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
})
