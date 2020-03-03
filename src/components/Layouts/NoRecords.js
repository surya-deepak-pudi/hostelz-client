import React from "react"
import { Container, Typography } from "@material-ui/core"
import img from "../../assets/nodata.png"

export default props => {
  return (
    <Container align="center">
      <img alt="no rooms added" src={img} height="314" width="314"></img>
      <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
        {props.message}
      </Typography>
    </Container>
  )
}
