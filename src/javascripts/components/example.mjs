import iFrameResize from 'iframe-resizer/js/iframeResizer.js'

/**
 * Example component
 *
 * This allows automatic resizing of the iFrame pages contained within Example
 * template wrappers.
 *
 * @param {Element} $module - HTML element to use for example
 */
function Example ($module) {
  if (!($module instanceof HTMLIFrameElement)) {
    return
  }
  this.$module = $module
}

Example.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }

  var options = {
    // Initial resize only, no event listeners
    autoResize: false,

    // Calculate height from `data-iframe-height` only
    heightCalculationMethod: 'taggedElement',

    // Calculate height from iframe contents only
    resizeFrom: 'child',

    // Skip iframe `scrolling` attribute
    scrolling: 'omit'
  }

  // Initialise asap for eager iframes or browsers which don't support lazy loading
  if (!('loading' in $module) || $module.loading !== 'lazy') {
    return iFrameResize(options, $module)
  }

  $module.addEventListener('load', function () {
    try {
      iFrameResize(options, $module)
    } catch (err) {
      if (err) {
        console.error(err.message)
      }
    }
  })
}

export default Example
