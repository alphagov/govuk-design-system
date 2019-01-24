const marked = require('marked')

let renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  return `
    <h${level} class="app-content-heading" id="${escapedText}">
      <a class="app-content-heading__anchor" href="#${escapedText}" role="presentation" tabindex="-1">
        <span class="app-content-heading__icon" aria-hidden="true">
          #
        </span>${text}
      </a>
    </h${level}>
  `
}

module.exports = renderer
