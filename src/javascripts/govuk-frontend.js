import { initAll } from 'govuk-frontend'
initAll({
  errorSummary: {
    // auto focusing the error summary is not useful when used in examples,
    // and causes the viewport to scroll
    disableAutoFocus: true
  }
})
