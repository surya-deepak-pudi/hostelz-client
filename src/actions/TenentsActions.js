import {
  FETCH_TENENTS,
  SHOW_TENENTS,
  DELETE_TENENTS,
  EDIT_TENENTS,
  CREATE_TENENTS,
  ERROR
} from "./actionTypes"
import { startSpinningAction, stopSpinningAction } from "./spinActions"
import backend from "../api/backendApi"

export const fetchTenents = () => dispatch => {
  startSpinningAction()
  backend
    .get("/tenents")
    .then(tenents => {
      dispatch({ type: FETCH_TENENTS, payload: tenents.data })
      stopSpinningAction()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const showTenents = id => dispatch => {
  startSpinningAction()
  backend
    .get(`/tenents/${id}`)
    .then(tenents => {
      let date = tenents.data.date
      date = date.slice(0, 10)
      dispatch({
        type: SHOW_TENENTS,
        payload: { ...tenents.data, date: date }
      })
      stopSpinningAction()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const updateTenents = (values, history, id) => dispatch => {
  startSpinningAction()
  backend
    .put(`/tenents/${id}`, values)
    .then(branches => {
      dispatch({ type: EDIT_TENENTS, payload: branches.data })
      stopSpinningAction()
      history.push("/tenents/" + id)
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const deleteTenents = id => dispatch => {
  startSpinningAction()
  backend
    .delete("/tenents/" + id)
    .then(tenents => {
      dispatch({ type: DELETE_TENENTS, payload: tenents.data })
      stopSpinningAction()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const createTenents = (values, history) => dispatch => {
  startSpinningAction()
  backend
    .post("/tenents", values)
    .then(branches => {
      dispatch({ type: CREATE_TENENTS, payload: branches.data })
      stopSpinningAction()
      history.goBack()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
