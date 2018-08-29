const highlightjs = require('highlight.js')

module.exports = (code, language) => {
  const languages = language ? [language] : false
  return highlightjs.highlightAuto(code.trim(), languages).value
}
