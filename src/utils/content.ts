import {
  TEXT_DENSITZY_THRESHOLD,
  IGNORED_TAGS,
  TOC_NODE_TEXT_DENSITY_THRESHOLD,
  LONG_ARTICLE_THERESHOLD,
  LINK_TEXT_THERESHOLD,
  HEADING_TEXT_THERESHOLD
} from '../types/constants'
import { textDensity, textLength, getTextRatioByTags } from '../lib/density'
import { SEMANTIC_HEADINGS } from '../types/constants'

/**
 * A content node contains a lot of text and its tag should be semantic
 *
 * @param {HTMLElement} root
 * @returns
 */
export function isArticleNode(root: HTMLElement): boolean {
  const tag = root.tagName.toLowerCase()
  if (IGNORED_TAGS.includes(tag)) {
    return false
  }

  const td = textDensity(root)
  const tl = textLength(root)
  /**
   * If text content are mostly from heading tags and links, discard it.
   */
  const ratio = getTextRatioByTags(root, SEMANTIC_HEADINGS.join(',') + ',a')
  if (ratio > Math.max(LINK_TEXT_THERESHOLD, HEADING_TEXT_THERESHOLD)) {
    return false
  }

  return tl > LONG_ARTICLE_THERESHOLD
    ? td > TEXT_DENSITZY_THRESHOLD.LONG_TEXT
    : td > TEXT_DENSITZY_THRESHOLD.SHORT_TEXT
}

export function isInternalAnchor(anchor: HTMLAnchorElement): boolean {
  const { pathname, host } = new URL(anchor.baseURI)
  return anchor.hash
    ? anchor.host === host && anchor.pathname === pathname
    : false
}

/**
 * A toc node contains some text and many anchors which are link to internal content
 * @param {HTMLElement} root
 * @returns
 */
export function isTocNode(root: HTMLElement): boolean {
  const anchorTags = root.querySelectorAll('a')
  if (!anchorTags) {
    return false
  }

  const totalTextSize = textLength(root)
  let anchorTextSize = 0
  for (let index = 0; index < anchorTags.length; index++) {
    const element = anchorTags[index]
    if (isInternalAnchor(element)) {
      anchorTextSize += textLength(element)
    }
  }
  return anchorTextSize / totalTextSize > TOC_NODE_TEXT_DENSITY_THRESHOLD
}
