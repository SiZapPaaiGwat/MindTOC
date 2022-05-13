export default function offset(
  root: HTMLElement,
  heading: Element | null
): { top: number; left: number } {
  const { right } = root.getBoundingClientRect()
  const top = Math.min(
    200,
    // url hash will automatically scroll to target element
    Math.max(
      heading ? heading.getBoundingClientRect().top + window.scrollY : 0,
      200
    )
  )
  const left = Math.min(right + 16, document.documentElement.offsetWidth - 500)
  return {
    top,
    left
  }
}
