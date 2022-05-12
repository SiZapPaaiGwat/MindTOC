import { isInternalAnchor, isTocNode } from './content'

test('isInternalAnchor', () => {
  document.body.innerHTML =
    '<a href="https://example.com">example</a><a href="#2">example 2</a>'
  const list = document.querySelectorAll('a')
  expect(isInternalAnchor(list[0])).toBe(false)
  expect(isInternalAnchor(list[1])).toBe(true)
})

test('isTocNode', () => {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  const html = `
  <aside class="document-toc-container"><section class="document-toc"><header><h2 class="document-toc-heading">In this article</h2></header><ul class="document-toc-list" id="toc-entries"><li class="document-toc-item "><a class="document-toc-link" href="#main_root" aria-current="true">Main root</a></li><li class="document-toc-item "><a class="document-toc-link" href="#document_metadata">Document metadata</a></li><li class="document-toc-item "><a class="document-toc-link" href="#sectioning_root">Sectioning root</a></li><li class="document-toc-item "><a class="document-toc-link" href="#content_sectioning">Content sectioning</a></li><li class="document-toc-item "><a class="document-toc-link" href="#text_content">Text content</a></li><li class="document-toc-item "><a class="document-toc-link" href="#inline_text_semantics">Inline text semantics</a></li><li class="document-toc-item "><a class="document-toc-link" href="#image_and_multimedia">Image and multimedia</a></li><li class="document-toc-item "><a class="document-toc-link" href="#embedded_content">Embedded content</a></li><li class="document-toc-item "><a class="document-toc-link" href="#svg_and_mathml">SVG and MathML</a></li><li class="document-toc-item "><a class="document-toc-link" href="#scripting">Scripting</a></li><li class="document-toc-item "><a class="document-toc-link" href="#demarcating_edits">Demarcating edits</a></li><li class="document-toc-item "><a class="document-toc-link" href="#table_content">Table content</a></li><li class="document-toc-item "><a class="document-toc-link" href="#forms">Forms</a></li><li class="document-toc-item "><a class="document-toc-link" href="#interactive_elements">Interactive elements</a></li><li class="document-toc-item "><a class="document-toc-link" href="#web_components">Web Components</a></li><li class="document-toc-item "><a class="document-toc-link" href="#obsolete_and_deprecated_elements">Obsolete and deprecated elements</a></li></ul></section></aside>
  `
  const div = document.createElement('div')
  div.innerHTML = html
  expect(isTocNode(div)).toBe(true)
})
