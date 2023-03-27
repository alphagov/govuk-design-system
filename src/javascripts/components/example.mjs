import iFrameResize from 'iframe-resizer/js/iframeResizer'

function Example ($module) {
  this.$module = $module
}

Example.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }
  this.resize()
}
Example.prototype.resize = function () {
  var $module = this.$module

  try {
    // Example iframe; set the height equal to the body height
    iFrameResize({ scrolling: 'auto' }, $module)
  } catch (err) {
    if (err) {
      console.error(err.message)
    }
  }
}

export default Example
