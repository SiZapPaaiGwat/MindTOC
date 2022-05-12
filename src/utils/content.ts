import {
  TEXT_DENSITZY_THRESHOLD,
  IGNORED_TAGS,
  TOC_NODE_TEXT_DENSITY_THRESHOLD
} from '../types/constants'
import { textDensity, textLength } from '../lib/density'

/**
 * A content node contains a lot of text and its tag should be semantic
 *
 * @param {HTMLElement} root
 * @returns
 */
export function isContentNode(root: HTMLElement): boolean {
  const tag = root.tagName.toLowerCase()
  if (IGNORED_TAGS.includes(tag)) {
    return false
  }

  const td = textDensity(root)
  return td > TEXT_DENSITZY_THRESHOLD
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
