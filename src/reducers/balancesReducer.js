import _ from "lodash"
import { FETCH_BALANCES, PAID_RENT } from "../actions/actionTypes"

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BALANCES:
      return { ...state, ..._.mapKeys(action.payload, "_id") }
    case PAID_RENT:
      return _.omit(state, action.payload._id)
    default:
      return state
  }
}
