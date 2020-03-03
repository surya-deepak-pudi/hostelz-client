import { IS_SPINNING, NOT_SPINNING } from "./actionTypes"

export const startSpinningAction = () => dispatch => {
  console.log("spinner is called")
  dispatch({ type: IS_SPINNING, payload: true })
}

export const stopSpinningAction = () => dispatch => {
  console.log("spinner is stopped")
  dispatch({ type: NOT_SPINNING, payload: false })
}
