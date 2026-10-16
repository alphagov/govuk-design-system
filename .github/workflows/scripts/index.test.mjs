import fs from 'fs'

import outdent from 'outdent'

import {
  getFilesFromDiff,
  getFilesWithUnchangedSiblings,
  prepareCommentBody
} from './index.mjs'

jest.mock('fs')

// Mock list of files for testing
const mockFilesList = [
  'src/components/breadcrumbs/index.md',
  'src/components/breadcrumbs/changelog.yml',
  'src/components/button/index.md',
  'src/components/back-link/index.md'
]

// Mock parent directory and file system to enable mocking `fs` functions
const mockParentDir = 'mock-files/govuk-design-system'
// Pass in all the files from `mockFileList` plus a Button changelog which we
// use when testing `getFilesWithUnchangedSiblings`
const mockFilesystem = [
  `${mockParentDir}/${mockFilesList[0]}`,
  `${mockParentDir}/${mockFilesList[1]}`,
  `${mockParentDir}/${mockFilesList[2]}`,
  `${mockParentDir}/${mockFilesList[3]}`,
  `${mockParentDir}/src/components/button/changelog.yml`
]

describe('Github action helpers', () => {
  describe('getFilesFromDiff', () => {
    beforeEach(() => {
      // Realistic depiction of a name status diff, split by the equivalent of
      // a tabs whitespace character ('\t').
      // Uses the breadcrumbs index and changelog from the mock files list
      jest.mocked(fs.readFileSync).mockReturnValue(`
        M       ${mockFilesList[0]}
        M       ${mockFilesList[1]}
      `)
    })

    it('gets files from a name status diff based on a pattern and a status letter', () => {
      expect(getFilesFromDiff(/.+/, 'M')).toEqual([
        mockFilesList[0],
        mockFilesList[1]
      ])
    })

    it('returns `false` if none of the files match the passed status letter', () => {
      expect(getFilesFromDiff(/.+/, 'D')).toEqual(false)
    })

    it('returns `false` if none of the files match the regex pattern', () => {
      expect(getFilesFromDiff(/pizza/, 'D')).toEqual(false)
    })
  })

  describe('getFilesWithUnchangedSiblings', () => {
    beforeEach(() => {
      jest
        .mocked(fs.existsSync)
        .mockImplementation(
          (file) => !!mockFilesystem.find((mockFile) => mockFile === file)
        )
    })

    it('returns any files that have siblings which exist but are not in the list of changed files', () => {
      // This test covers 3 cases:
      //
      // - Breadcrumbs have an existing changelog, but that file is also in the
      //   files list so it isn't unchanged, therefore no discrepancy
      // - Back link doesn't have a changelog sibling in the filesystem, no discrepancy
      // - Button has an existing changelog but it's not in the files list, discrepancy!
      //
      // Therefore, this test should skip over Breadcrumbs and Back link and return the Button file
      expect(
        getFilesWithUnchangedSiblings(
          mockFilesList,
          mockParentDir,
          'index.md',
          'changelog.yml'
        )
      ).toEqual([mockFilesList[2]])
    })
  })

  describe('prepareCommentBody', () => {
    it('generates markdown text from an intro, outro and list of files', () => {
      expect(prepareCommentBody('My intro', mockFilesList, 'My outro'))
        .toEqual(outdent`
        My intro

        - ${mockFilesList[0]}
        - ${mockFilesList[1]}
        - ${mockFilesList[2]}
        - ${mockFilesList[3]}

        My outro
      `)
    })
  })
})
