import { FETCH_BALANCES, PAID_RENT, ERROR } from "./actionTypes"
import { startSpinningAction, stopSpinningAction } from "./spinActions"
import backend from "../api/backendApi"

export const fetchBalances = () => dispatch => {
  startSpinningAction()
  backend
    .get("/tenents/balances")
    .then(tenents => {
      dispatch({ type: FETCH_BALANCES, payload: tenents.data })
      stopSpinningAction()
    })
    .catch(err => {
      if (err) {
        dispatch({ type: ERROR, payload: true })
        stopSpinningAction()
      }
    })
}

export const payRent = id => dispatch => {
  startSpinningAction()
  backend
    .put(`/tenents/${id}/pay`)
    .then(tenents => {
      dispatch({ type: PAID_RENT, payload: tenents.data })
      startSpinningAction()
    })
    .catch(err => {
      if (err) {
        dispatch({ type: ERROR, payload: true })
        stopSpinningAction()
      }
    })
}
