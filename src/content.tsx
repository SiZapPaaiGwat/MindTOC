import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

import { CONTAINER_ID, SEMANTIC_HEADINGS } from './types/constants'
import { searchContentRoot } from './lib/search'
import { extract } from './lib/extract'
import { type Heading } from './types'
import './styles/index.css'

function Widget({ headings }: { headings: Heading[] }): ReactElement {
  return (
    <div className="fixed top-0 left-0 w-40">
      {headings.map((heading) => (
        <div key={heading.id}>{heading.node.textContent}</div>
      ))}
    </div>
  )
}

function render() {
  let headings: Heading[] = []
  const rootNode = searchContentRoot(
    document.querySelector(SEMANTIC_HEADINGS.join(','))
  )
  if (rootNode) {
    headings = extract(rootNode)
    console.log(headings)
  }

  let div = document.querySelector(`#${CONTAINER_ID}`)
  if (!div) {
    div = document.createElement('div')
    div.setAttribute('id', CONTAINER_ID)
    document.body.appendChild(div)
  }
  const root = createRoot(div)
  root.render(<Widget headings={headings} />)
}

render()
