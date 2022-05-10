import { TEXT_DENSITZY_THRESHOLD } from '../types/constants'
import { textDensity } from './density'

/**
 * Search the content node based on text density
 * @param heading Heading element
 * @returns Root element of the heading
 */
export function searchContentRoot(heading: HTMLElement): HTMLElement {
  const body = document.body
  let nextParent = heading.parentElement

  while (nextParent && nextParent !== body) {
    const nextDensity = textDensity(nextParent)
    if (nextDensity > TEXT_DENSITZY_THRESHOLD) {
      /**
       * In future, maybe we need a list to find most suitable root
       */
      break
    } else {
      nextParent = nextParent.parentElement
    }
  }

  return nextParent as HTMLElement
}
