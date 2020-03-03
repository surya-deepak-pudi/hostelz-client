import {
  FETCH_BRANCH,
  SHOW_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
  CREATE_BRANCH,
  ERROR,
  IS_SPINNING,
  NOT_SPINNING
} from "./actionTypes"
// import { createRoomsAction } from "./roomsActions"
import { startSpinningAction, stopSpinningAction } from "./spinActions"
import backend from "../api/backendApi"
import history from "../history"
import { urlEncoder } from "../utilities"

export const fetchBranches = (fields = {}) => dispatch => {
  dispatch({ type: IS_SPINNING, payload: true })
  let str = urlEncoder(fields)
  backend
    .get("/branches" + str)
    .then(branches => {
      dispatch({ type: FETCH_BRANCH, payload: branches.data })
      dispatch({ type: NOT_SPINNING, payload: false })
    })
    .catch(err => {
      if (err) {
        dispatch({ type: ERROR, payload: true })
        dispatch({ type: NOT_SPINNING, payload: false })
      }
    })
}

export const showBranches = (id, fields = {}) => dispatch => {
  startSpinningAction()
  let str = urlEncoder(fields)
  backend
    .get(`/branches/${id}/${str}`)
    .then(branches => {
      dispatch({ type: SHOW_BRANCH, payload: branches.data })
      stopSpinningAction()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const updateBranches = (id, values) => dispatch => {
  startSpinningAction()
  backend
    .put(`/branches/${id}`, values)
    .then(branches => {
      dispatch({ type: UPDATE_BRANCH, payload: branches.data })
      stopSpinningAction()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const deleteBranches = id => dispatch => {
  startSpinningAction()
  backend
    .delete("/branches/" + id)
    .then(branches => {
      dispatch({ type: DELETE_BRANCH, payload: branches.data })
      stopSpinningAction()
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
export const createBranches = (id, values) => dispatch => {
  startSpinningAction()
  backend
    .post("/branches", values)
    .then(branches => {
      dispatch({ type: CREATE_BRANCH, payload: branches.data })
      stopSpinningAction()
      history.push(`/branches/${branches.data._id}/rooms/new`)
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}
