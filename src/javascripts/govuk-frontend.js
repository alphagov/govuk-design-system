import { initAll } from 'govuk-frontend'
initAll({
  // auto focusing the error summary and notification banner is not useful
  // when used in examples, and causes the viewport to scroll
  errorSummary: {
    disableAutoFocus: true
  },
  notificationBanner: {
    disableAutoFocus: true
  }
})
