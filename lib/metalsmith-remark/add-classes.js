const visit = require('unist-util-visit')

function setClassName (node, className) {
  node.data = node.data || {}
  node.data.hProperties = node.data.hProperties || {}
  let currentClassName = node.data.hProperties.className
  className = currentClassName ? currentClassName + ' ' + className : className
  node.data.hProperties.className = className
  return node
}

module.exports = ({ classNames }) => {
  return (ast, file, next) => {
    Object.keys(classNames).forEach(type => {
      visit(ast, type, node => {
        let item = classNames[type]
        let classNamesToSet = (typeof item === 'function') ? item(node) : item
        // We want to get the '<pre>' for code.
        node = (type === 'code') ? node.position : node
        setClassName(node, classNamesToSet.join(' '))
      })
    })
    next()
  }
}
