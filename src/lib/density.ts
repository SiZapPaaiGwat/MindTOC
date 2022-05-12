export function textLength(node: HTMLElement): number {
  // innerText is not supported in jsdom
  // But there are some differences between textContent and innerText
  // https://github.com/jsdom/jsdom/issues/1245
  return node.textContent?.replace(/\s/g, '').length || 0
}

/**
 * Text density = text size / tag size
 * @param element Element to compute text density
 * @returns
 */
export function textDensity(element: HTMLElement): number {
  const tagLength = element.querySelectorAll('*')?.length || 0
  return textLength(element) / (tagLength + 1)
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
  const tagLength = element.querySelectorAll('*')?.length || 0
  return linkLength / (tagLength + 1)
}

export function linkTextRatio(element: HTMLElement): number {
  const links = element.querySelectorAll('a')
  if (!links) {
    return 0
  }

  let textSize = 0
  for (let i = 0; i < links.length; i++) {
    textSize += textLength(links[i])
  }

  return textSize / textLength(element)
}
