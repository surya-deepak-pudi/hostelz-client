import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import branchesReducer from "./branchesReducer"
import roomReducer from "./roomReducer"
import tenentsReducer from "./tenentsReducer"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import balancesReducer from "./balancesReducer"
import { LOG_OUT } from "../actions/actionTypes"
import spinnerReducer from "./spinnerReducer"

const appReducer = combineReducers({
  form: formReducer,
  branches: branchesReducer,
  rooms: roomReducer,
  tenents: tenentsReducer,
  errors: errorReducer,
  auth: authReducer,
  blances: balancesReducer,
  spinner: spinnerReducer
})

const initialState = {
  form: {},
  branches: {},
  rooms: {},
  tenents: {},
  errors: {
    balances: {
      noRecords: false
    },
    branches: {
      noRecords: false
    },
    tenents: {
      noRecords: false
    }
  },
  auth: {
    isAuthenticated: false,
    user: {},
    isVerified: true
  },
  blances: {},
  spinner: { isSpinning: false }
}

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = initialState
  }
  return appReducer(state, action)
}

export default rootReducer
