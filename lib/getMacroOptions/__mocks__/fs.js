/* eslint-env jest */

const fs = jest.genMockFromModule('fs')

let mockedData

fs.__setMockData = data => {
  mockedData = JSON.stringify(data)
}
fs.readFileSync = () => mockedData

module.exports = fs
