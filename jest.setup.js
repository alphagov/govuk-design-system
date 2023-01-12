/* eslint-env jest */

const { toHaveNoViolations } = require('jest-axe')

jest.setTimeout(10000)
jest.retryTimes(3, { logErrorsBeforeRetry: true })

expect.extend(toHaveNoViolations)
