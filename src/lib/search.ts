import { TEXT_DENSITZY_THRESHOLD } from '../types/constants'
import { type NodeItem } from '../types'

/**
 * Compute element's text density
 * text length / tag length
 */
function density(element: NodeItem): number {
  const text = element?.innerText.replace(/\s+/g, '')
  const textLength = text?.length || 0
  const tagLength =
    element?.querySelectorAll('p')?.length ||
    element?.querySelectorAll('*')?.length ||
    1
  return textLength / tagLength
}

/**
 * Search the content node based on text density
 * @param heading Heading element
 * @returns Root element of the heading
 */
export function searchContentRoot(heading: NodeItem): NodeItem {
  const body = document.body
  if (!heading) {
    return null
  }

  let nextParent: NodeItem = heading.parentElement
  let root: NodeItem = null

  while (nextParent && nextParent !== body) {
    const nextDensity = density(nextParent)
    if (nextDensity > TEXT_DENSITZY_THRESHOLD) {
      root = nextParent
      /**
       * In future, maybe we need a list to find most suitable root
       */
      break
    } else {
      nextParent = nextParent.parentElement
    }
  }

  return root
}
