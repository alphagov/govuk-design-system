const marked = require('marked')

const plugin = () => {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      if (!file.endsWith('njk')) {
        return
      }
      var data = files[file]
      var contents = data.contents.toString()
      const lexer = new marked.Lexer()
      let tokens = lexer.lex(contents)
      let headingsArray = []
      tokens.forEach(token => {
        if (token.type === 'heading') {
          let heading = {
            depth: token.depth,
            text: token.text,
            url: token.text.toLowerCase().replace(/[^\w]+/g, '-')
          }
          headingsArray.push(heading)
        }
      })
      data.headings = headingsArray
    })
    done()
  }
}
module.exports = plugin
