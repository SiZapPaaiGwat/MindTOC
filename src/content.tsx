import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

import { CONTAINER_ID, SEMANTIC_HEADINGS } from './types/constants'
import { searchContentRoot } from './lib/search'
import { extract } from './lib/extract'
import { type Heading, type Offset, type NodeItem } from './types'
import './styles/index.css'

function Widget({
  headings,
  top,
  left
}: {
  headings: Heading[]
  top: number
  left: number
}): ReactElement {
  return (
    <div
      className="fixed w-[375px] z-[99999] border border-solid border-gray-400 bottom-4 "
      style={{ top: top + 'px', left: left + 'px' }}
    >
      <div className="absolute top-0 left-0 right-0 text-blue-500 text-center cursor-move font-bold text-xl">
        Toolbar
      </div>
      <div className="absolute top-8 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto px-4 py-2">
        {headings.map((heading) => (
          <div key={heading.id}>{heading.node.textContent}</div>
        ))}
      </div>
    </div>
  )
}

let div = document.querySelector(`#${CONTAINER_ID}`)
if (!div) {
  div = document.createElement('div')
  div.setAttribute('id', CONTAINER_ID)
  document.body.appendChild(div)
}
const root = createRoot(div)

function render() {
  let headings: Heading[] = []
  const offset: Offset = {
    top: 0,
    left: 0
  }
  const heading = document.querySelector(SEMANTIC_HEADINGS.join(','))
  const rootNode = searchContentRoot(heading as NodeItem)
  if (heading && rootNode) {
    headings = extract(rootNode)
    const { left, width } = rootNode.getBoundingClientRect()
    // url hash will automatically scroll to target element
    offset.top = heading.getBoundingClientRect().top + window.scrollY
    offset.left = left + width + 16
  }

  root.render(<Widget headings={headings} {...offset} />)
}

render()
