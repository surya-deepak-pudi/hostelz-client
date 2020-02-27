import React from "react"
import { Link } from "react-router-dom"
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core"
import { YellowButton } from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"

class RenderCard extends React.Component {
  render() {
    const { deleteMethod, branch } = this.props
    return (
      <Card maxWidth="350">
        <Link
          to={`/branches/show/${branch._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea>
            <CardMedia
              image={branch.image}
              title={branch.name}
              component="img"
              height="170"
            />
            <CardContent>
              <Typography
                // color="primary"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {branch.name}
              </Typography>
              <Typography
                //  color="primary"
                variant="body2"
                component="p"
              >
                {branch.address}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Link
            to={`/branches/edit/${branch._id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <YellowButton size="small">Edit</YellowButton>
          </Link>
          <DeleteButton
            size="small"
            onClickMethod={() => {
              deleteMethod(branch._id)
            }}
          >
            Learn More
          </DeleteButton>
        </CardActions>
      </Card>
    )
  }
}

export default RenderCard
