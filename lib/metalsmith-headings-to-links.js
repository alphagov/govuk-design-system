const marked = require('marked')
const lexer = new marked.Lexer()
const extname = require('path').extname

module.exports = function headingsToLinks () {
 return function (files, metalsmith, done) {
   Object.keys(files).forEach(function (file) {
     setImmediate(done)
     if (extname(file) !== '.njk') {
       return
     }
     var data = files[file]
     if(!data.links){
      return
     }
     var contents = data.contents.toString()
     let links = []
     let tokens = lexer.lex(contents)
     tokens.forEach(token => {
       if (token.type === 'heading' && token.depth === 2) {
         let linkItem = {
          label: token.text,
          url: token.text.toLowerCase().replace(/[^\w]+/g, '-')
         }
         links.push(linkItem)
         console.log(data.links);
       }
     })
     data.links = links;
   })
 }
}