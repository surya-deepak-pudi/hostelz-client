import React from "react"
import { Paper, Typography } from "@material-ui/core"

export default props => {
  return (
    <Paper
      style={{
        color: "black",
        backgroundColor: "#ffcdd2",
        width: "420px",
        marginRight: "7px",
        marginBottom: "20px",
        padding: "5px"
      }}
    >
      <Typography variant="subtitle1" component="h3">
        {props.data}
      </Typography>
    </Paper>
  )
}
