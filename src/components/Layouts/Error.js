import React from "react"
import { Container, Typography } from "@material-ui/core"
import img from "../../assets/maintainence.png"

export default props => {
  return (
    <Container align="center">
      <img alt="no records" src={img}></img>
      <Typography variant="subtitle1"> {props.messsag}</Typography>
    </Container>
  )
}
