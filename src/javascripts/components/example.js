// The iframe-resizer module seems to export it's methods in an odd way
// So we use an underscore here.
import _ from 'iframe-resizer'

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
    _.iframeResizer({ scrolling: 'auto', autoResize: true }, $module)
  } catch (err) {
    if (err) {
      console.error(err.message)
    }
  }
}

export default Example
