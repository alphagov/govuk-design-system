import { writeFile } from 'node:fs/promises'

import { matches } from 'hast-util-select'
import { visit, EXIT } from 'unist-util-visit'

const classes = new Set()

export default {
  plugins: [
    () => async (tree) => {
      visit(tree, (element, index, parent) => {
        if (matches('.app-example-page__wrapper', element)) {
          return EXIT
        }
        if (matches('[class*="govuk-"]', element)) {
          for (const className of element.properties.className) {
            if (
              className.includes('--') ||
              className.includes('__') ||
              !className.startsWith('govuk-')
            ) {
              continue
            }

            classes.add(className)
          }
        }
      })

      const classesArray = Array.from(classes)
      classesArray.sort()

      await writeFile('classes.log', classesArray.join('\n'))
    }
  ]
}
