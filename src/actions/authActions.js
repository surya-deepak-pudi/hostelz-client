import jwt_decode from "jwt-decode"
import { GET_ERRORS, SET_USER, LOG_OUT, ERROR } from "./actionTypes"
import backend from "../api/backendApi"
import { startSpinningAction, stopSpinningAction } from "./spinActions"
import setAuthToken from "../api/setAuthToken"

export const registerUser = (values, history) => dispatch => {
  startSpinningAction()
  backend
    .post("/register", values)
    .then(res => {
      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      setAuthToken(token)
      const decodedToken = jwt_decode(token)
      dispatch(setCurrentUser(decodedToken))
      stopSpinningAction()
      history.push("/")
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch({ type: GET_ERRORS, payload: err.response.data })
      stopSpinningAction()
    })
}

export const loginUser = (values, history) => dispatch => {
  startSpinningAction()
  backend
    .post("/login", values)
    .then(res => {
      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      setAuthToken(token)
      const decodedToken = jwt_decode(token)
      dispatch(setCurrentUser(decodedToken))
      stopSpinningAction()
      history.push("/")
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data })
      stopSpinningAction()
    })
}

export const verifyAccount = value => dispatch => {
  startSpinningAction()
  backend
    .post("/verify", value)
    .then(res => {
      if (res.data.verified) {
        localStorage.removeItem("jwtToken")
        setAuthToken(false)
        dispatch(setCurrentUser({}))
      }
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: true })
      stopSpinningAction()
    })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken")
  setAuthToken(false)
  dispatch({ type: LOG_OUT, payload: null })
  history.push("/")
}
