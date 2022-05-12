import { SEMANTIC_HEADINGS, IGNORED_TAGS } from '../types/constants'
import { textDensity } from './density'

export function getMaxDensityElement(
  elements: NodeList | HTMLElement[] | HTMLCollection | null
): HTMLElement | null {
  let maxDensityIndex = -1
  let maxDensity = 0

  if (elements) {
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index] as HTMLElement
      const tag = element.tagName.toLowerCase()
      if (IGNORED_TAGS.includes(tag)) {
        continue
      } else {
        const density = textDensity(element)
        if (density > maxDensity) {
          maxDensity = density
          maxDensityIndex = index
        }
      }
    }

    if (maxDensityIndex !== -1) {
      return elements[maxDensityIndex] as HTMLElement
    }
  }

  return null
}

/**
 * Search an article in a document by direct article tag search.
 * @param doc Document to search
 * @returns
 */
export function searchArticleDirectly(doc: Document): HTMLElement | null {
  return getMaxDensityElement(doc.querySelectorAll('article'))
}

/**
 * Search an article in a document by semantic heading search.
 * @param doc Document to search
 * @returns
 */
export function searchArticleByHeading(doc: Document): HTMLElement | null {
  const heading = doc.querySelector(SEMANTIC_HEADINGS.join(','))
  if (!heading) {
    return null
  }

  let nextParent = heading.parentElement
  const ancestors = []

  while (nextParent && nextParent !== doc.body) {
    ancestors.push(nextParent)
    nextParent = nextParent.parentElement
  }

  return getMaxDensityElement(ancestors)
}

/**
 * Search an article node in the document.
 * @param doc Document to search in
 * @returns
 */
export default function searchContentRoot(doc: Document): HTMLElement | null {
  return searchArticleDirectly(doc) || searchArticleByHeading(doc)
}
