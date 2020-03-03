import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import _ from "lodash"
import { Typography, Container, Button } from "@material-ui/core"
import { YellowButton } from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"
import { fetchTenents, deleteTenents } from "../../actions/TenentsActions"
import { fetchBranches } from "../../actions/branchesActions"
import TenentsList from "../Layouts/tennetsList"
import NoRecords from "../Layouts/NoRecords"
import Error from "../Layouts/Error"
import { Spinner } from "../utilities/styledComponents"

class Tenents extends Component {
  componentDidMount() {
    this.props.fetchTenents(this.props.history)
    if (_.isEmpty(this.props.branches)) {
      this.props.fetchBranches(["_id", "name"])
    }
  }
  editButton = tenent => {
    return (
      <Link
        to={`/tenents/edit/${tenent._id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <YellowButton>Edit</YellowButton>
      </Link>
    )
  }
  deleteButton = tenent => {
    return (
      <DeleteButton
        onClickMethod={() => {
          this.props.deleteTenents(tenent._id)
        }}
      ></DeleteButton>
    )
  }
  handleClick(offset) {
    this.setState({ offset })
  }
  render() {
    let buttonArray = []
    buttonArray.push(this.editButton)
    buttonArray.push(this.deleteButton)
    const { tenents, errors, spinner } = this.props
    let records = Object.values(tenents)
    let showSpinner = !errors.error && spinner && records.length === 0
    let showRecords = !errors.error && !spinner && records.length > 0
    let noRecords = !errors.error && !spinner && records.length === 0
    let showErrors = errors.error
    return (
      <Fragment>
        {showErrors && <Error></Error>}
        {!showErrors && (
          <Container maxWidth="md" align="center">
            <Typography
              // color="primary"
              variant="h4"
              component="h3"
              style={{ marginTop: "20px", marginBottom: "5px" }}
            >
              Tenants
            </Typography>
            {showSpinner && <Spinner></Spinner>}
            {showRecords && (
              <Fragment>
                <TenentsList
                  tenents={this.props.tenents}
                  branches={this.props.branches}
                  buttons={buttonArray}
                ></TenentsList>
              </Fragment>
            )}
            {noRecords && <NoRecords message="no tenants exist"></NoRecords>}
            {!spinner && (
              <Link
                to="/tenents/new"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: "30px" }}
                >
                  Add tenant
                </Button>
              </Link>
            )}
          </Container>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    branches: state.branches,
    tenents: state.tenents,
    errors: state.errors,
    spinner: state.spinner
  }
}
export default connect(mapStateToProps, {
  fetchTenents,
  deleteTenents,
  fetchBranches
})(Tenents)
