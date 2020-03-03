import { GET_ERRORS, ERROR } from "../actions/actionTypes"

const errorReducer = (
  state = {
    error: false
  },
  action
) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, ...action.payload }
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default errorReducer
