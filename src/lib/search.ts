import { SEMANTIC_HEADINGS, IGNORED_TAGS } from '../types/constants'
import { textDensity } from './density'
import { isContentNode } from '../utils/content'

function getAncestors(el: HTMLElement): HTMLElement[] {
  let nextParent = el.parentElement
  const body = el.ownerDocument.body
  const ancestors: HTMLElement[] = []

  while (nextParent && nextParent !== body) {
    ancestors.push(nextParent as HTMLElement)
    nextParent = nextParent.parentElement
  }

  return ancestors
}

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
  const article = getMaxDensityElement(doc.querySelectorAll('article'))
  return article && isContentNode(article) ? article : null
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

  const article = getMaxDensityElement(getAncestors(heading as HTMLElement))
  return article && isContentNode(article) ? article : null
}

/**
 * Search an article from the paragraph tag which has max density.
 * @param doc Document to search
 * @returns
 */
export function searchArticleByParagraph(doc: Document): HTMLElement | null {
  const paragraphs = doc.querySelectorAll('p')
  const paragraph = getMaxDensityElement(paragraphs)
  if (!paragraph) {
    return null
  }

  const article = getMaxDensityElement(getAncestors(paragraph))
  return article && isContentNode(article) ? article : null
}

/**
 * Search an article node in the document.
 * @param doc Document to search in
 * @returns
 */
export default function searchContentRoot(doc: Document): HTMLElement | null {
  return (
    searchArticleDirectly(doc) ||
    searchArticleByHeading(doc) ||
    searchArticleByParagraph(doc)
  )
}
