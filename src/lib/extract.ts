import { SEMANTIC_HEADINGS, IGNORED_TAGS } from '../types/constants'
import { type Heading } from '../types'

function getTagNumber(tag: string): number {
  return parseInt(tag.toLowerCase().replace('h', ''))
}

/**
 * Extract heading details from an article node
 * @param root Root element to extract heading tags
 * @returns
 */
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
        }

        if (SEMANTIC_HEADINGS.includes(tag)) {
          return NodeFilter.FILTER_ACCEPT
        }

        return NodeFilter.FILTER_SKIP
      }
    }
  )

  let prevNode: HTMLElement | null = null
  let minLevel = 7

  while (treeWalker.nextNode()) {
    const currentNode = treeWalker.currentNode as HTMLElement
    const tagNum = getTagNumber(currentNode.tagName)
    const prevTagNum = prevNode ? getTagNumber(prevNode.tagName) : 0
    let anchor: string = currentNode.getAttribute('id') || ''
    if (!anchor) {
      anchor = `mindtoc-heading-${id}`
      currentNode.setAttribute('id', anchor)
    }

    const node = {
      id,
      node: currentNode,
      indentLevel: tagNum,
      anchor
    }
    // If a h4 comes after h2, its level is 3
    if (tagNum - prevTagNum > 1) {
      node.indentLevel = prevTagNum + 1
    }
    headings.push(node)
    id += 1

    prevNode = currentNode
    minLevel = Math.min(minLevel, node.indentLevel)
  }

  const step = minLevel - 1
  if (step > 0) {
    headings.forEach((heading) => {
      heading.indentLevel -= step
    })
  }

  return headings
}
