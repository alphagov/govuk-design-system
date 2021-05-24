function Analytics ($trackingId) {
  this.$trackingId = $trackingId
  console.log($trackingId)
}

Analytics.prototype.init = function () {
  var trackingId = this.$trackingId

  var gtmScriptTag = document.createElement('script')
  gtmScriptTag.type = 'text/javascript'
  gtmScriptTag.setAttribute('async', 'true')
  gtmScriptTag.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=' + trackingId)
  document.documentElement.firstChild.appendChild(gtmScriptTag)

  console.log('Analytics loaded')
}

export default Analytics
