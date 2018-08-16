// The iframe-resizer module seems to export it's methods in an odd way
// So we use an underscore here.
import _ from 'iframe-resizer'

var Example = {
  init: function (selector) {
    try {
      // Example iframe; set the height equal to the body height
      _.iframeResizer({ scrolling: 'auto', autoResize: true }, selector)
    } catch (err) {
      if (err) {
        console.error(err.message)
      }
    }
  }
}

export default Example
