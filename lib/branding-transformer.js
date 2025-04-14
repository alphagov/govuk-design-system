// eslint-disable-next-line n/no-extraneous-require
const jstransformer = require('jstransformer')
const nunjucks = jstransformer(require('jstransformer-nunjucks'))

module.exports = {
  name: 'branding-transformer',
  inputFormats: ['njk'],
  outputFormat: 'html',

  render(contents, options) {
    // Header
    let brandedContents = contents.replace(
      /(\{\{\s*govukHeader\(\s*\{)([\s\S]*?)(\}\s*\)\s*\}\})/g,
      (match, start, body, end) => {
        // If rebrand: true is already present, do nothing
        if (/rebrand\s*:\s*true/.test(body)) {
          return match
        }

        // Trim trailing whitespace from the object body
        const trimmedBody = body.replace(/\s+$/, '')
        // Determine whether to prepend a comma (if body isn't empty)
        const separator = trimmedBody.length > 0 ? ',' : ''
        return `${start}${trimmedBody}${separator} rebrand: true${end}`
      }
    )
    brandedContents = brandedContents.replace(
      /(\{\{\s*govukFooter\(\s*\{)([\s\S]*?)(\}\s*\)\s*\}\})/g,
      (match, start, body, end) => {
        // If rebrand: true is already present, do nothing
        if (/rebrand\s*:\s*true/.test(body)) {
          return match
        }

        // Trim trailing whitespace from the object body
        const trimmedBody = body.replace(/\s+$/, '')
        // Determine whether to prepend a comma (if body isn't empty)
        const separator = trimmedBody.length > 0 ? ',' : ''
        return `${start}${trimmedBody}${separator} rebrand: true${end}`
      }
    )
    const rendered = nunjucks.render(brandedContents.toString(), options)
    return rendered
  },

  renderAsync(contents, options) {
    return Promise.resolve(this.render(contents, options))
  }
}
