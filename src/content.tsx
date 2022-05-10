import React, { ReactElement, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { CONTAINER_ID, SEMANTIC_HEADINGS } from './types/constants'
import { searchContentRoot } from './lib/search'
import { extract } from './lib/extract'
import getInitialPosition from './utils/offset'
import { type Heading } from './types'
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
  const [selected, setSelected] = useState<number>(-1)
  const onItemClick = useCallback((e: React.SyntheticEvent<HTMLElement>) => {
    setSelected(parseFloat(e.currentTarget?.dataset.id as string))
  }, [])

  return (
    <div
      className="content_wrapper"
      style={{ top: top + 'px', left: left + 'px' }}
    >
      <div className="content_title">Table of Contents</div>
      <div className="content_list">
        {headings.map((heading) => (
          <div
            key={heading.id}
            data-tag={heading.node.tagName.toLowerCase()}
            data-id={heading.id}
            data-selected={selected === heading.id}
            className="content_list_item"
            onClick={onItemClick}
          >
            <a href={`#${heading.anchor}`}>{heading.node.textContent}</a>
          </div>
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
  const heading = document.querySelector(SEMANTIC_HEADINGS.join(','))
  if (heading) {
    const rootNode = searchContentRoot(heading as HTMLElement)
    const titleNode = document.querySelector('h1') || heading
    const offset = getInitialPosition(rootNode, titleNode as HTMLElement)
    const headings = extract(rootNode)
    if (headings.length) {
      root.render(<Widget headings={headings} {...offset} />)
    }
  }
}

render()
