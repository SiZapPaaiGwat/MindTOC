export default function offset(
  root: HTMLElement,
  heading: HTMLElement
): { top: number, left: number } {
  const { right } = root.getBoundingClientRect()
  const top = Math.max(
    200,
    // url hash will automatically scroll to target element
    heading.getBoundingClientRect().top + window.scrollY
  )
  const left = Math.min(right + 16, document.documentElement.offsetWidth - 500)
  return {
    top,
    left
  }
}
