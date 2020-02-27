import {
  GET_ERRORS,
  UNAUTHORIZED,
  NORECORDS,
  NORECORDS_BALANCES
} from "../actions/actionTypes"

const errorReducer = (
  state = {
    balances: { noRecords: false },
    branches: { noRecords: false },
    tenents: { noRecords: false }
  },
  action
) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, ...action.payload }
    case UNAUTHORIZED:
      return { ...state, unauthorized: true }
    case NORECORDS:
      return { ...state, noRecords: true }
    case NORECORDS_BALANCES:
      return { ...state, balances: { noRecords: true } }
    default:
      return state
  }
}

export default errorReducer
