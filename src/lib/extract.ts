import { SEMANTIC_HEADINGS, IGNORED_TAGS } from '../types/constants'
import { type Heading } from '../types'
import { isContentNode } from '../utils/content'

export function extract(root: HTMLElement) {
  let id = 0
  const headings: Heading[] = []
  const treeWalker = document.createTreeWalker(
    root as Node,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function (node: HTMLElement) {
        const tag = node.tagName.toLowerCase()
        if (IGNORED_TAGS.includes(tag)) {
          return NodeFilter.FILTER_REJECT
        } else if (SEMANTIC_HEADINGS.includes(tag)) {
          /**
           * NOTE some pages may wrapper with a redundant tag
           */
          return isContentNode(node.parentElement)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT
        } else {
          return NodeFilter.FILTER_SKIP
        }
      }
    }
  )

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
