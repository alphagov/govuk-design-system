import { matches } from 'hast-util-select'
import { visit } from 'unist-util-visit'

export const usage = new Set()

export function gatherUsage() {
  return (tree) => {
    visit(tree, (element) => {
      if (matches('[data-module]', element)) {
        usage.add(element.properties.dataModule)
      }
    })
  }
}

export function resetUsage() {
  usage.clear()
}
