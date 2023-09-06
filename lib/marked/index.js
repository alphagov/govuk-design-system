const { Marked } = require('marked')

const extension = require('./extension')
const renderer = require('./renderer')

/**
 * Custom Marked instance
 */
class DesignSystemMarked extends Marked {
  constructor() {
    super({
      breaks: true // Enable line breaks
    })

    this.use(
      /**
       * Add Marked extensions
       */
      extension.headingIds,
      extension.highlight,
      extension.smartyPants,
      {
        /**
         * Add Marked renderers
         */
        extensions: [
          {
            name: 'code',
            renderer: renderer.code
          },
          {
            name: 'paragraph',
            renderer: renderer.image
          },
          {
            name: 'text',
            renderer: renderer.image
          }
        ]
      }
    )
  }
}

module.exports = {
  DesignSystemMarked
}
