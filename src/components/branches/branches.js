import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Container, Typography, Grid, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Spinner } from "../utilities/styledComponents"
import { fetchBranches, deleteBranches } from "../../actions/branchesActions"
import RenderCard from "../Layouts/branchCard"
import NoRecords from "../Layouts/NoRecords"
import Error from "../Layouts/Error"

class Branches extends Component {
  componentDidMount() {
    this.props.fetchBranches()
  }
  render() {
    const { deleteBranches, branches, errors, spinner } = this.props
    let branchesValues = Object.values(branches)
    let isLoading = !errors.error && spinner && branchesValues.length === 0
    let showRecords = !errors.error && !spinner && branchesValues.length > 0
    let noRecords = !errors.error && !spinner && branchesValues.length === 0
    let showErrors = errors.error
    return (
      <Fragment>
        {!showErrors && (
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
                {isLoading && <Spinner></Spinner>}
                {noRecords && (
                  <NoRecords message="No branches exist"></NoRecords>
                )}
                {showRecords && (
                  <Fragment>
                    <Grid container alignItems="center" spacing={2}>
                      {branchesValues.map(branch => {
                        return (
                          <Grid item key={branches._id} xs={12} sm={3} md={4}>
                            <RenderCard
                              branch={branch}
                              deleteMethod={deleteBranches}
                            ></RenderCard>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Fragment>
                )}
              </Fragment>
              {!spinner && (
                <Link
                  to="/branches/new"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    style={{ postion: "fixed", top: "20px", bottom: "0" }}
                  >
                    Create New
                  </Button>
                </Link>
              )}
            </Container>
          </Fragment>
        )}
        {showErrors && <Error></Error>}
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    branches: state.branches,
    errors: state.errors,
    spinner: state.spinner
  }
}
export default connect(mapStateToProps, { fetchBranches, deleteBranches })(
  Branches
)
