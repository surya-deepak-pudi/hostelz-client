import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Container, Typography, Grid, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Spinner } from "../utilities/styledComponents"
import { fetchBranches, deleteBranches } from "../../actions/branchesActions"
import RenderCard from "../Layouts/branchCard"

class Branches extends Component {
  componentDidMount() {
    this.props.fetchBranches(["_id", "image", "address", "name"])
  }
  render() {
    let branches = Object.values(this.props.branches)
    return (
      <Fragment>
        <Container maxWidth="md">
          <Typography
            // color="primary"
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Branches
          </Typography>

          <Fragment>
            {!(this.props.errors.noRecords || branches.length) && (
              <Spinner></Spinner>
            )}
            {this.props.errors.noRecords && (
              <Container align="center">
                <Typography
                  component="h1"
                  variant="h3"
                  style={{ marginTop: "150px" }}
                >
                  NO TENENTS EXISTS
                </Typography>
              </Container>
            )}
            {branches.length && (
              <Grid container alignItems="center" spacing={2}>
                {branches.map(branch => {
                  return (
                    <Grid item key={branches._id} xs={12} sm={3} md={4}>
                      <RenderCard
                        branch={branch}
                        deleteMethod={this.props.deleteBranches}
                      ></RenderCard>
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </Fragment>
          <Link
            to="/branches/new"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              color="primary"
              size="large"
              variant="contained"
              style={{ marginTop: "30px" }}
            >
              Create New
            </Button>
          </Link>
        </Container>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return { branches: state.branches, errors: state.errors }
}
export default connect(mapStateToProps, { fetchBranches, deleteBranches })(
  Branches
)
