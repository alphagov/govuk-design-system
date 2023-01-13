/* eslint-env jest */

const { toHaveNoViolations } = require('jest-axe')

jest.setTimeout(10000)

expect.extend(toHaveNoViolations)
