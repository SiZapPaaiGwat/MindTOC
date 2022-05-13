import { type Heading } from './types'

export enum Actions {
  INIT,
  SELECT_ITEM,
  CHANGE_STATUS
}

export type ActionValue = {
  type: Actions
  payload: object | number | boolean
}

export type State = {
  top: number
  left: number
  headings: Heading[]
  selectedIndex: number
  visible: boolean
}

export const defaultState: State = {
  top: 0,
  left: 0,
  headings: [],
  selectedIndex: -1,
  visible: false
}

export default function reducer(state: State, action: ActionValue): State {
  if (action.type === Actions.INIT) {
    return {
      ...state,
      visible: true,
      ...(action.payload as object)
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
  } else {
    return state
  }
}
