import { FETCH_BALANCES, PAID_RENT, NORECORDS_BALANCES } from "./actionTypes"
import backend from "../api/backendApi"

export const fetchBalances = () => dispatch => {
  backend.get("/tenents/balances").then(tenents => {
    if (tenents.data.length) {
      dispatch({ type: FETCH_BALANCES, payload: tenents.data })
    } else {
      dispatch({ type: NORECORDS_BALANCES, payload: true })
    }
  })
}

export const payRent = id => dispatch => {
  backend.put(`/tenents/${id}/pay`).then(tenents => {
    console.log(tenents)
    dispatch({ type: PAID_RENT, payload: tenents.data })
  })
}
