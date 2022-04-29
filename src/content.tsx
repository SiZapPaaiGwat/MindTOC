import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

import { CONTAINER_ID } from './types/constants'

function Widget(): ReactElement {
  return <div className="w-12">Hello world!</div>
}

function render() {
  let div = document.querySelector(`#${CONTAINER_ID}`)
  if (!div) {
    div = document.createElement('div')
    div.setAttribute('id', CONTAINER_ID)
    document.body.appendChild(div)
  }
  const root = createRoot(div)
  root.render(<Widget />)
}

render()
