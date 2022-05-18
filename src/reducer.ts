import { type Heading } from './types'

export enum Actions {
  INIT,
  SELECT_ITEM,
  CHANGE_STATUS,
  HANDLE_DRAG
}

export type InitPayload = {
  headings?: Heading[]
  top?: number
  left?: number
}

export type DragPayload = {
  x: number
  y: number
}

export type ActionValue = {
  type: Actions
  payload: InitPayload | DragPayload | number | boolean
}

export type State = {
  top: number
  left: number
  headings: Heading[]
  selectedIndex: number
  visible: boolean
  isDragging: boolean
  x: number
  y: number
}

export const defaultState: State = {
  top: 0,
  left: 0,
  headings: [],
  selectedIndex: -1,
  visible: false,
  isDragging: false,
  x: 0,
  y: 0
}

export default function reducer(state: State, action: ActionValue): State {
  if (action.type === Actions.INIT) {
    return {
      ...state,
      visible: true,
      ...(action.payload as InitPayload)
    }
  } else if (action.type === Actions.SELECT_ITEM) {
    return {
      ...state,
      selectedIndex: action.payload as number
    }
  } else if (action.type === Actions.CHANGE_STATUS) {
    return {
      ...state,
      visible: action.payload as boolean
    }
  } else if (action.type === Actions.HANDLE_DRAG) {
    const { x, y } = action.payload as DragPayload
    if (!state.isDragging) {
      return {
        ...state,
        isDragging: true,
        x,
        y
      }
    }

    const deltaX = x - state.x
    const deltaY = y - state.y
    return {
      ...state,
      x: 0,
      y: 0,
      isDragging: false,
      visible: true,
      top: state.top + deltaY,
      left: state.left + deltaX
    }
  } else {
    return state
  }
}
