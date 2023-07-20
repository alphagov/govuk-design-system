import iFrameResize from 'iframe-resizer/js/iframeResizer.js'

/**
 * Example component
 *
 * This allows automatic resizing of the iFrame pages contained within Example
 * template wrappers.
 *
 * @param {Element} $module - HTML element to use for example
 */
function Example($module) {
  if (!($module instanceof HTMLIFrameElement)) {
    return
  }
  this.$module = $module
}

Example.prototype.init = function () {
  const $module = this.$module
  if (!$module) {
    return
  }

  // Initialise asap for eager iframes or browsers which don't support lazy loading
  if (!('loading' in $module) || $module.loading !== 'lazy') {
    return iFrameResize({ scrolling: 'omit' }, $module)
  }

  $module.addEventListener('load', function () {
    try {
      iFrameResize({ scrolling: 'omit' }, $module)
    } catch (err) {
      if (err) {
        console.error(err.message)
      }
    }
  })
}

export default Example
