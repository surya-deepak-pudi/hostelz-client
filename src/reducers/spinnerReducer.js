import { IS_SPINNING, NOT_SPINNING } from "../actions/actionTypes"

export default (state = false, action) => {
  switch (action.type) {
    case IS_SPINNING:
      console.log("spinner started")
      return action.payload
    case NOT_SPINNING:
      console.log("spinner stopped")
      return action.payload
    default:
      return state
  }
}
