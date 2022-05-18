import React, {
  ReactElement,
  useCallback,
  useReducer,
  useEffect,
  useRef
} from 'react'
import { createRoot } from 'react-dom/client'
import { useHash } from 'react-use'
import Color from 'color'

import { CONTAINER_ID, SEMANTIC_HEADINGS } from './types/constants'
import searchContentRoot from './lib/search'
import { extract } from './lib/extract'
import getInitialPosition from './utils/offset'
import reducer, { defaultState, Actions } from './reducer'

import './styles/index.css'

let host = document.querySelector(`#${CONTAINER_ID}`)
if (!host) {
  host = document.createElement('div')
  host.setAttribute('id', CONTAINER_ID)
  document.body.appendChild(host)
}
const root = createRoot(host)
root.render(<Widget />)

function Widget(): ReactElement {
  const [hash] = useHash()
  const selectedRef = useRef<HTMLDivElement | null>(null)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const { headings, top, left, selectedIndex, visible } = state
  const onItemClick = useCallback((e: React.SyntheticEvent<HTMLElement>) => {
    dispatch({
      type: Actions.SELECT_ITEM,
      payload: parseFloat(e.currentTarget?.dataset.id as string)
    })
  }, [])
  const onDrag = useCallback((e: React.DragEvent<HTMLElement>) => {
    dispatch({
      type: Actions.HANDLE_DRAG,
      payload: {
        x: e.clientX,
        y: e.clientY
      }
    })
    // Hide component on drag
    if (e.type === 'dragstart') {
      setTimeout(() => {
        dispatch({
          type: Actions.CHANGE_STATUS,
          payload: false
        })
      }, 0)
    }
  }, [])
  const render = useCallback(() => {
    const rootNode = searchContentRoot(document)
    const titleNode = document.querySelector(SEMANTIC_HEADINGS.join(','))
    console.log({ rootNode })
    if (rootNode) {
      const offset = getInitialPosition(rootNode, titleNode)
      const headings = extract(rootNode)
      console.log({ headings })
      if (headings.length) {
        /**
         * User may change theme at any time
         * matchMedia('(prefers-color-scheme: dark)').matches does not work in content.js
         */
        const isDark = Color(
          getComputedStyle(
            document.querySelector('#' + headings[0].anchor) as HTMLElement
          ).color
        ).isDark()
        if (!isDark) {
          document.documentElement.classList.add('dark')
        }

        dispatch({
          type: Actions.INIT,
          payload: {
            headings,
            ...offset
          }
        })
        return
      }
    }

    dispatch({
      type: Actions.CHANGE_STATUS,
      payload: false
    })
  }, [])

  /**
   * When location changed by pushState or replaceState, we need to re-render
   */
  useEffect(() => {
    function renderAndSendReseponse(
      request: object,
      sender: chrome.runtime.MessageSender,
      respond: (response: object) => void
    ) {
      render()
      respond({ message: 'rendered' })
    }
    render()
    chrome.runtime.onMessage.addListener(renderAndSendReseponse)

    return () => chrome.runtime.onMessage.removeListener(renderAndSendReseponse)
  }, [render])

  /**
   * When use interacts with original anchors, automatically scrolls to widget heading
   */
  useEffect(() => {
    const index = headings.findIndex((i) => '#' + i.anchor === hash)
    dispatch({
      type: Actions.SELECT_ITEM,
      payload: index
    })
    selectedRef.current?.scrollIntoView()
  }, [hash, headings])

  useEffect(() => {
    function preventDefault(e: Event) {
      e.preventDefault()
    }
    // disable dragend animation
    document.addEventListener('dragover', preventDefault)
    return () => document.removeEventListener('dragover', preventDefault)
  }, [])

  return (
    <div
      className={`content_wrapper ${visible ? '' : 'hidden'}`}
      style={{ top: top + 'px', left: left + 'px' }}
      draggable="true"
      onDragStart={onDrag}
      onDragEnd={onDrag}
    >
      <div className="content_title">Table of Contents</div>
      <div className="content_list">
        {headings.map((heading) => (
          <div
            ref={'#' + heading.anchor === hash ? selectedRef : null}
            key={heading.id}
            data-level={heading.indentLevel}
            data-id={heading.id}
            data-selected={selectedIndex === heading.id}
            className="content_list_item"
            onClick={onItemClick}
          >
            <a href={`#${heading.anchor}`}>{heading.text}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
