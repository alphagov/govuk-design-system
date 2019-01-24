const marked = require('marked')

let renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  return `
    <h${level} class="app-content-heading" id="${escapedText}">
      <a class="app-content-heading__anchor" href="#${escapedText}" role="presentation" tabindex="-1">
        <svg height="25" width="25" viewBox="0 0 512 512" class="app-content-heading__icon" aria-hidden="true">
          <use xlink:href="#app-icon-link" href="#app-icon-link" />
        </svg>${text}
      </a>
    </h${level}>
  `
}

module.exports = renderer
