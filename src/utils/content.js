import {
  TEXT_DENSITZY_THRESHOLD,
  LINK_DENSITY_THRESHOLD
} from '../types/constants'
import { textDensity, linkDensity } from '../lib/density'

/**
 * A content node must contains a lot of text and a few links.
 * @param {HTMLElement} root
 * @returns
 */
export function isContentNode(root: HTMLElement | null): boolean {
  if (!root) {
    return false
  }
  const td = textDensity(root)
  const ld = linkDensity(root)
  return td > TEXT_DENSITZY_THRESHOLD && ld < LINK_DENSITY_THRESHOLD
}
