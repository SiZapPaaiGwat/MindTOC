import { SEMANTIC_HEADINGS } from '../types/constants'
import { type Heading } from '../types'

export function extract(root: HTMLElement) {
  let id = 0
  const headings: Heading[] = []
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: function (node: HTMLElement) {
      if (SEMANTIC_HEADINGS.includes(node.tagName.toLowerCase())) {
        return NodeFilter.FILTER_ACCEPT
      } else {
        return NodeFilter.FILTER_SKIP
      }
    }
  })

  while (treeWalker.nextNode()) {
    const currentNode = treeWalker.currentNode as HTMLElement
    let anchor: string = currentNode.getAttribute('id') || ''
    if (!anchor) {
      anchor = `mindtoc-heading-${id}`
      currentNode.setAttribute('id', anchor)
    }
    headings.push({
      id,
      node: currentNode,
      anchor
    })
    id += 1
  }

  return headings
}
