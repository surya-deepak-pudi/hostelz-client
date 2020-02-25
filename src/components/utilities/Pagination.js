import React, { Component, Fragment } from "react"
import { Button, Grid, Container } from "@material-ui/core"
import {
  FirstPage,
  LastPage,
  NavigateNext,
  NavigateBefore
} from "@material-ui/icons"

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: this.props.currentPage
    }
    console.table(this.state)
  }
  renderButtons = (start, end) => {
    let arr = Array.from(Array(end - start + 1), (x, index) => index + start)
    return (
      <Fragment>
        {arr.map(a => {
          return (
            <Button
              color={this.props.currentPage === a ? "secondary" : "primary"}
              onClick={e => {
                this.props.buttonClicked(a)
                this.setState({ currentPage: a })
              }}
            >
              {a}
            </Button>
          )
        })}
      </Fragment>
    )
  }
  pagesRender = () => {
    if (this.props.totalPages <= 3) {
      return (
        <Fragment>{this.renderButtons(1, this.props.totalPages)}</Fragment>
        //all pages
      )
    } else {
      console.log(this.state.currentPage)
      if (this.state.currentPage <= 2) {
        console.log("im in blabla")
        //butttons first later dots
        return (
          <Fragment>
            {this.renderButtons(1, 3)}
            <Button color="primary">. . .</Button>
          </Fragment>
        )
      } else if (this.state.currentPage >= this.props.totalPages - 1) {
        //dots first buttons later
        return (
          <Fragment>
            <Button color="primary">. . .</Button>
            {this.renderButtons(
              this.props.totalPages - 2,
              this.props.totalPages
            )}
          </Fragment>
        )
      } else {
        //dots pages dots
        return (
          <Fragment>
            <Button color="primary">. . .</Button>
            {this.renderButtons(
              this.state.currentPage - 1,
              this.state.currentPage + 1
            )}
            <Button color="primary">. . .</Button>
          </Fragment>
        )
      }
    }
  }
  render() {
    console.log(this.props.totalRecords)
    return (
      <Container maxWidth="md" align="center">
        <Grid container>
          <Grid item>
            <Button
              color="primary"
              onClick={e => {
                this.props.buttonClicked(1)
              }}
            >
              <FirstPage />
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              onClick={e => {
                if (this.props.currentPage !== 1) {
                  this.props.buttonClicked(this.props.currentPage - 1)
                  this.setState({ currentPage: this.props.currentPage - 1 })
                }
              }}
            >
              <NavigateBefore />
            </Button>
          </Grid>
          {this.pagesRender()}
          <Grid item>
            <Button
              color="primary"
              onClick={e => {
                if (this.props.currentPage !== this.props.totalPages) {
                  this.props.buttonClicked(this.props.currentPage + 1)
                  this.setState({ currentPage: this.props.currentPage + 1 })
                }
              }}
            >
              <NavigateNext />
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              onClick={e => {
                this.props.buttonClicked(this.props.totalPages)
                this.setState({ currentPage: this.props.totalPages })
              }}
            >
              <LastPage />
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Pagination
