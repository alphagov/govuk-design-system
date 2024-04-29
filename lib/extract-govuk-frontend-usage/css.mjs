import { matches } from 'hast-util-select'
import { visit } from 'unist-util-visit'

export const usage = new Set()

export function gatherUsage() {
  return (tree) => {
    visit(tree, (element) => {
      if (matches('[class*="govuk-"]', element)) {
        for (const className of element.properties.className) {
          if (
            className.includes('--') ||
            className.includes('__') ||
            !className.startsWith('govuk-')
          ) {
            continue
          }

          usage.add(className)
        }
      }
    })
  }
}

export function resetUsage() {
  usage.clear()
}
