import { FETCH_USER } from '../actions/types'

const defaultState = null

export default function (state = defaultState, action) {

  switch (action.type) {
    case (FETCH_USER):
      return action.payload || false
    default:
      return state;
  }
}