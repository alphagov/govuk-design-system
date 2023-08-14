const { marked } = require('marked')

const plugin = () => {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      if (!file.endsWith('.njk') && !file.endsWith('.md')) {
        return
      }
      const data = files[file]
      const contents = data.contents.toString()
      const lexer = new marked.Lexer()
      const tokens = lexer.lex(contents)
      const headingsArray = []
      tokens.forEach((token) => {
        if (token.type !== 'heading') {
          return
        }

        let aliases = null
        if (data.headingAliases) {
          aliases = Object.entries(data.headingAliases)
            .filter(([text]) => {
              return text === token.text
            })
            .map(([text, alias]) => {
              return alias
            })
            .join()
        }

        const heading = {
          depth: token.depth,
          text: token.text,
          url: token.text.toLowerCase().replace(/[^\w]+/g, '-'),
          aliases
        }
        headingsArray.push(heading)
      })
      data.headings = headingsArray
    })
    done()
  }
}
module.exports = plugin
