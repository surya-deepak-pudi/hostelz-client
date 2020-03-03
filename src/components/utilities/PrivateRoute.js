import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

class PrivateRoute extends Component {
  render() {
    const { component: Component, auth, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props => {
          return auth.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login", redirect: true }} />
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, {})(PrivateRoute)
