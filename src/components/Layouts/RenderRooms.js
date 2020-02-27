import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { Typography, Divider, Grid } from "@material-ui/core"
import {
  GreyPaper,
  Repeator,
  YellowButton
} from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"

const RoomRender = props => {
  const { rooms } = props
  if (rooms.length > 1 && Array.isArray(rooms)) {
    return (
      <ul style={{ listStyle: "none" }}>
        {rooms.map(room => {
          return (
            <Fragment>
              {room && typeof room === "object" && room.constructor === Object && (
                <li key={room.number}>
                  <GreyPaper>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="baseline"
                        >
                          <Grid item>
                            <Typography
                              //  color="primary"
                              variant="subtitle1"
                            >
                              <b>room number:</b>
                              {room.number}
                              <b style={{ marginLeft: "30px" }}>rent:</b>
                              {room.fee}
                              <b style={{ marginLeft: "30px" }}>A/C:</b>
                              {room.AC ? "available" : "not available"}
                              <b
                                style={{
                                  marginLeft: "30px",
                                  marginRight: "10px"
                                }}
                              >
                                beds:
                              </b>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Repeator
                              number={room.beds}
                              vacancies={room.vacancies}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Link
                          to={`/branches/${props.id}/rooms/edit/${room._id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <YellowButton variant="contained" size="small">
                            Edit
                          </YellowButton>
                        </Link>

                        <DeleteButton
                          onClickMethod={() => {
                            this.props.delete(this.props.id, room._id)
                            window.location.reload(false)
                          }}
                        >
                          Delete
                        </DeleteButton>
                      </Grid>
                    </Grid>
                  </GreyPaper>
                </li>
              )}
            </Fragment>
          )
        })}
      </ul>
    )
  } else {
    return (
      <GreyPaper>
        <b>
          <Typography component="p" variant="h6">
            NO ROOMS ADDED
          </Typography>
        </b>
      </GreyPaper>
    )
  }
}

class RenderRooms extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.rooms && (
          <Fragment>
            <Typography
              // color="primary"
              variant="h5"
              component="h3"
              style={{
                marginTop: "20px",
                marginBottom: "30px",
                textTransform: "capitalize"
              }}
            >
              Rooms:
            </Typography>
            {this.props.rooms.map(rooms => {
              return (
                <div>
                  <Typography
                    // color="primary"
                    variant="h6"
                    component="h4"
                    style={{
                      marginTop: "20px",
                      marginBottom: "30px",
                      textTransform: "capitalize"
                    }}
                  >
                    {`Floor ${rooms[0]}:`}
                  </Typography>
                  <RoomRender rooms={rooms} id={this.props.id}></RoomRender>
                  <Divider />
                </div>
              )
            })}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default RenderRooms
