function textLength(node: HTMLElement): number {
  return node.innerText.replace(/\s/g, '').length
}

/**
 * Text density = text size / tag size
 * @param element Element to compute text density
 * @returns
 */
export function textDensity(element: HTMLElement): number {
  const tagLength = element?.querySelectorAll('*')?.length || 1
  return textLength(element) / tagLength
}

/**
 * Link density = link size / tag size
 * @param element Element to compute link density
 * @returns
 */
export function linkDensity(element: HTMLElement): number {
  const links = element.querySelectorAll('a')
  const pageUrl = new URL(element.baseURI)
  let linkLength = links?.length || 0
  /**
   * Do not count links that are internal to current page
   */
  for (let i = 0; i < links.length; i++) {
    const { pathname, host } = links[i]
    if (pathname === pageUrl.pathname && host === pageUrl.host) {
      linkLength -= 1
    }
  }
  const tagLength = element.querySelectorAll('*')?.length || 1
  return linkLength / tagLength
}
