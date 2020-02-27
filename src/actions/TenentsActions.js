import {
  FETCH_TENENTS,
  SHOW_TENENTS,
  DELETE_TENENTS,
  EDIT_TENENTS,
  CREATE_TENENTS,
  NORECORDS
} from "../actions/actionTypes"
import backend from "../api/backendApi"

export const fetchTenents = () => dispatch => {
  backend.get("/tenents").then(tenents => {
    if (tenents.data.length) {
      //console.log(tenents.data)
      dispatch({ type: FETCH_TENENTS, payload: tenents.data })
    } else {
      dispatch({ type: NORECORDS, payload: true })
    }
  })
}
export const showTenents = id => dispatch => {
  backend.get(`/tenents/${id}`).then(tenents => {
    let date = tenents.data.date
    date = date.slice(0, 10)
    dispatch({
      type: SHOW_TENENTS,
      payload: { ...tenents.data, date: date }
    })
  })
}
export const updateTenents = (values, history, id) => dispatch => {
  backend.put(`/tenents/${id}`, values).then(branches => {
    console.log(branches.data)
    dispatch({ type: EDIT_TENENTS, payload: branches.data })
    history.push("/tenents/" + id)
  })
}
export const deleteTenents = id => dispatch => {
  backend.delete("/tenents/" + id).then(tenents => {
    dispatch({ type: DELETE_TENENTS, payload: tenents.data })
  })
}
export const createTenents = (values, history) => dispatch => {
  console.log(values)
  backend.post("/tenents", values).then(branches => {
    dispatch({ type: CREATE_TENENTS, payload: branches.data })
    history.goBack()
  })
}
