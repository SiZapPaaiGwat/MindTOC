import { linkDensity, textDensity, linkTextRatio } from './density'

test('compute text density', () => {
  const text = 'Hello world!'
  const count = text.replace(/\s/g, '').length
  const element = document.createElement('div')
  element.innerHTML = `<p>${text}<span>${text}</span></p>`
  expect(textDensity(element)).toBe((count * 2) / 3)
  element.innerHTML = ''
  expect(textDensity(element)).toBe(0)
  element.innerHTML = text
  expect(textDensity(element)).toBe(count / 1)
})

test('compute link density', () => {
  const element = document.createElement('div')
  element.innerHTML = '<p><a>Link 1</a><a>Link 2</a><a>Link 3</a></p>'
  expect(linkDensity(element)).toBe(3 / 5)
  element.innerHTML = ''
  expect(linkDensity(element)).toBe(0)
  element.innerHTML = '<p></p>'
  expect(linkDensity(element)).toBe(0)
})

test('will exclude internal links when computing link density', () => {
  const element = document.createElement('div')
  // element.baseURI is http://localhost/
  element.innerHTML =
    '<p><a href="#1">Link 1</a><a href="https://example.com/">External link</a></p>'
  expect(linkDensity(element)).toBe(1 / 4)
})

test('compute text density for links in an element', () => {
  const text = 'Hello world!'
  const element = document.createElement('div')
  element.innerHTML = `<a>${text}</a>${text}`
  expect(linkTextRatio(element)).toBe(0.5)
})
