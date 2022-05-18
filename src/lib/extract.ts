import { SEMANTIC_HEADINGS, IGNORED_TAGS } from '../types/constants'
import { type Heading } from '../types'
import {
  containExternalLinks,
  isVisible,
  isArticleNode
} from '../utils/content'

const ignoreHiddenHeadingTags = false
const headingTagMinimum = 2
// if heading contains external links, it's not a heading
// TODO fix exception: wikipedia's heading contains external links to edit pages
const ignoreExternalLinkHeadings = false
// TODO parent node may be a giant
const checkParentTextDensity = false

function getTagNumber(tag: string): number {
  return parseInt(tag.toLowerCase().replace('h', ''))
}

function acceptNode(node: HTMLElement) {
  const tag = node.tagName.toLowerCase()

  if (IGNORED_TAGS.includes(tag)) {
    return NodeFilter.FILTER_REJECT
  }

  if (SEMANTIC_HEADINGS.includes(tag)) {
    if (ignoreHiddenHeadingTags && !isVisible(node)) {
      return NodeFilter.FILTER_REJECT
    }

    if (ignoreExternalLinkHeadings && containExternalLinks(node)) {
      return NodeFilter.FILTER_REJECT
    }

    if (checkParentTextDensity && !isArticleNode(node)) {
      return NodeFilter.FILTER_REJECT
    }

    return NodeFilter.FILTER_ACCEPT
  }

  return NodeFilter.FILTER_SKIP
}

// export function parseHeadings(headings: NodeList) {
//   const group = {}

//   headings.forEach((heading, index) => {
//     const { left } = (heading as Element).getBoundingClientRect()
//     if (!group[left]) {
//       group[left] = []
//     }
//     group[left].push(index)
//   })

//   const target: number[] = Object.values(group).sort(
//     (a, b) => b.length - a.length
//   )[0]
//   return target.map((index) => headings[index] as Element)
// }

/**
 * Extract heading details from an article node
 * @param root Root element to extract heading tags
 * @returns
 */
export function extract(root: HTMLElement): Heading[] {
  let id = 0
  const headings: Heading[] = []
  const treeWalker = document.createTreeWalker(
    root as Node,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode
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
      /**
       * TODO sanitize heading text
       * Some website like wikipedia, heading text contains functional links, it should be removed
       * We can sanitize them by comparing with its toc texts
       */
      text: currentNode.innerText.replace(/(^\s?#)|(#\s?$)/, ''),
      indentLevel: tagNum,
      anchor
    }
    /**
     * Compute current level from prev tag number
     */
    if (prevTagNum) {
      const gap = tagNum - prevTagNum
      if (gap > 0) {
        node.indentLevel = headings[id - 1].indentLevel + 1
      } else if (gap === 0) {
        node.indentLevel = headings[id - 1].indentLevel
      } else if (gap < 0) {
        node.indentLevel = Math.max(headings[id - 1].indentLevel - 1, 1)
      }
    } else {
      // First heading starts from 1, no matter what tag number it is.
      node.indentLevel = 1
    }

    headings.push(node)

    prevNode = currentNode
    minLevel = Math.min(minLevel, node.indentLevel)
    id += 1
  }

  const step = minLevel - 1
  if (step > 0) {
    headings.forEach((heading) => {
      heading.indentLevel -= step
    })
  }

  if (headings.length < headingTagMinimum) {
    return []
  }

  return headings
}
