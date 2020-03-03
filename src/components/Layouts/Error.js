import React from "react"
import { Container, Typography } from "@material-ui/core"
import img from "../../assets/maintainence.png"

export default props => {
  return (
    <Container align="center">
      <img alt="no rooms added" src={img}></img>
      <Typography component="h1" variant="h3" style={{ marginTop: "10px" }}>
        {props.message}
      </Typography>
    </Container>
  )
}
