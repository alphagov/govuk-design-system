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
