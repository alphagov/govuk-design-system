/* eslint-env jest */

const fs = jest.genMockFromModule('fs')

let mockedData

fs.__setMockData = (data) => {
  mockedData = data
}
fs.readFileSync = (filename) => {
  if (mockedData[filename]) {
    return JSON.stringify(mockedData[filename])
  }
  return '[]'
}

module.exports = fs
