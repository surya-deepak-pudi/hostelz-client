import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Typography, Container, Button } from "@material-ui/core"
import { Spinner } from "../utilities/styledComponents"
import { fetchBalances, payRent } from "../../actions/balancesActions"
import TenentsList from "../Layouts/tennetsList"

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
    return (
      <Container maxWidth="md" align="center">
        <Typography
          // color="primary"
          variant="h4"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          BALANCES
        </Typography>
        {!_.isEmpty(this.props.state) && (
          <TenentsList
            fields={["rent", "dues"]}
            buttons={[this.paidButton]}
            tenents={this.props.tenents}
          />
        )}
        {!this.props.spinner.isSpinning && _.isEmpty(this.props.state) && (
          <Fragment>
            <Typography
              component="h1"
              variant="h3"
              style={{ marginTop: "150px", marginBottom: "150px" }}
            >
              {"NO PAYMENTS TO BE RECIEVED"}
            </Typography>
          </Fragment>
        )}
        {this.props.spinner.isSpinner && <Spinner></Spinner>}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    tenents: state.balances,
    errors: state.errors.balances,
    spinner: state.spinner
  }
}
export default connect(mapStateToProps, {
  fetchBalances,
  payRent
})(Balances)
