import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Container, Typography, Button, Grid } from "@material-ui/core"
import _ from "lodash"
import {
  createRoomsAction,
  deleteRoomsAction
} from "../../actions/roomsActions"
import { showBranches } from "../../actions/branchesActions"
import RoomForm from "../Layouts/roomForm"
import { GreyPaper, YellowButton } from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"
import img from "../../nodata.png"

//  rooms Create

class RoomsCreate extends Component {
  //didmount
  componentDidMount() {
    this.props.showBranches(this.props.match.params.id)
  }

  //rendering list of added rooms
  renderList() {
    let rooms = Object.keys(this.props.rooms)

    //adding rooms
    if (rooms.length) {
      return (
        <Container maxWidth="xl" align="center">
          {/* heading */}
          <Typography
            // color="primary"
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "5px" }}
          >
            Added Rooms
          </Typography>

          {/* List of rooms */}
          <ul style={{ listStyle: "none" }}>
            {rooms.map(room => {
              room = this.props.rooms[room]
              return (
                <li key={room._id}>
                  <GreyPaper>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          //  color="primary"
                          variant="subtitle1"
                        >
                          <b>room number:</b>
                          {room.number}
                          <b style={{ marginLeft: "30px" }}>floor:</b>
                          {room.floor}
                          <b style={{ marginLeft: "30px" }}>beds:</b>
                          {room.beds}
                          <b style={{ marginLeft: "30px" }}>rent:</b>
                          {room.fee}
                          <b style={{ marginLeft: "30px" }}>A/C:</b>
                          {room.AC ? "available" : "not available"}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link
                          to={`/branches/${this.props.match.params.id}/rooms/edit/${room._id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <YellowButton variant="contained" size="small">
                            Edit
                          </YellowButton>
                        </Link>
                        <DeleteButton
                          onClickMethod={() => {
                            this.props.deleteRoomsAction(
                              this.props.match.params.id,
                              room._id
                            )
                          }}
                        >
                          Delete
                        </DeleteButton>
                      </Grid>
                    </Grid>
                  </GreyPaper>
                </li>
              )
            })}
          </ul>
        </Container>
      )
    } else {
      return (
        <Container align="center">
          <img alt="no rooms added" src={img}></img>
          <Typography
            //  color="primary"
            variant="subtitle1"
          >
            No rooms are added yet
          </Typography>
        </Container>
      )
    }
  }
  renderDone = () => {
    if (!_.isEmpty(this.props.branches)) {
      if (
        this.props.branches[this.props.match.params.id].rooms.length ||
        !_.isEmpty(this.props.rooms)
      ) {
        return (
          <Link
            to="/branches"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button size="large" color="primary" variant="contained">
              Done!
            </Button>
          </Link>
        )
      } else {
        return null
      }
    }
  }
  render() {
    console.log(this.props)
    return (
      <Fragment>
        {this.renderList()}
        <Container maxWidth="xl" align="center">
          <br></br>
          <RoomForm
            onSubmit={this.props.createRoomsAction}
            id={this.props.match.params.id}
          ></RoomForm>
          <br></br>
          {this.renderDone()}
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    branches: state.branches,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, {
  showBranches,
  createRoomsAction,
  deleteRoomsAction
})(RoomsCreate)
