import React from "react"
import img from "../../assets/payments.png"
import { Container, Typography } from "@material-ui/core"

export default props => {
  return (
    <Container align="center">
      <img alt="no records" src={img} height="314" width="314"></img>
      <Typography variant="subtitle1"> {props.message}</Typography>
    </Container>
  )
}
