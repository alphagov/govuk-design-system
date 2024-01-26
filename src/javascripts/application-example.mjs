import { initAll } from 'govuk-frontend'

import ExamplePage from './components/example-page.mjs'

// Initialise GOV.UK Frontend
initAll({
  // Auto focusing the error summary and notification banner is not useful
  // when used in examples, and causes the viewport to scroll
  errorSummary: { disableAutoFocus: true },
  notificationBanner: { disableAutoFocus: true }
})

// eslint-disable-next-line no-new
new ExamplePage(document)
