const marked = require('marked')

let renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  return `
    <h${level} class="app-content-heading" id="${escapedText}">
      ${text}
      <a class="app-content-heading__anchor" href="#${escapedText}" aria-label="Link to '${text}' heading">
        <svg height="25" width="25" viewBox="0 0 512 512" class="app-content-heading__icon">
          <path d="M220.1 317.9a26 26 0 0 1-18.4-7.6 122.1 122.1 0 0 1 0-172.6l96-96C320.7 18.7 351.4 6 384 6s63.2 12.7 86.3 35.7a122.1 122.1 0 0 1 0 172.6l-44 43.8a26 26 0 1 1-36.7-36.7l43.9-43.9a70 70 0 0 0-99-99l-96 96a70 70 0 0 0 0 99 26 26 0 0 1-18.4 44.4z"/>
          <path d="M128 506a122.1 122.1 0 0 1-86.3-208.3l44-43.8a26 26 0 0 1 36.7 36.7l-43.9 43.9a70 70 0 0 0 99 99l96-96a70 70 0 0 0 0-99 26 26 0 0 1 36.8-36.8 122.1 122.1 0 0 1 0 172.6l-96 96c-23 23-53.7 35.7-86.3 35.7z"/>
        </svg>
      </a>
    </h${level}>
  `
}

module.exports = renderer
