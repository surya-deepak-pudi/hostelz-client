import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Typography, Container, Button } from "@material-ui/core"
import { Spinner } from "../utilities/styledComponents"
import { fetchBalances, payRent } from "../../actions/balancesActions"
import TenentsList from "../Layouts/tennetsList"
import NoPayments from "../Layouts/NoPayments"
import Error from "../Layouts/Error"

class Balances extends Component {
  componentDidMount() {
    this.props.fetchBalances()
  }
  paidButton = tenent => {
    return (
      <Button
        onClick={() => {
          this.props.payRent(tenent._id)
        }}
        color="primary"
        variant="contained"
      >
        Paid
      </Button>
    )
  }
  render() {
    const { tenents, errors, spinner } = this.props
    console.log(tenents)
    console.log(typeof tenents)
    let records = []
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
              BALANCES
            </Typography>
            {showSpinner && <Spinner></Spinner>}
            {noRecords && (
              <NoPayments message="no payments to be recieved"></NoPayments>
            )}
            {showRecords && (
              <TenentsList
                fields={["rent", "dues"]}
                buttons={[this.paidButton]}
                tenents={tenents}
              />
            )}
          </Container>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    tenents: state.balances,
    errors: state.errors,
    spinner: state.spinner
  }
}
export default connect(mapStateToProps, {
  fetchBalances,
  payRent
})(Balances)
