import React from "react"
import Header from "./Layouts/header"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Route, Switch } from "react-router-dom"
import Home from "./basic/home"
import Login from "./basic/login"
import Verify from "./basic/verify"
import Register from "./basic/register"
import Balance from "./basic/balance"
import Branches from "./branches/branches"
import BranchesShow from "./branches/branchesShow"
import BranchesEdit from "./branches/branchesEdit"
import BranchesCreate from "./branches/branchesCreate"
import Tenents from "./tenents/tenents"
import TenentsShow from "./tenents/tenentsShow"
import TenentsEdit from "./tenents/tenentsEdit"
import TenentsCreate from "./tenents/tenentsCreate"
import Rooms from "./rooms/rooms"
import RoomsCreate from "./rooms/roomsCreate"
import RoomsEdit from "./rooms/roomsEdit"
import PrivateRoute from "./utilities/PrivateRoute"
// "#006064"-aqaua-#e0f7fa
//"#01579b"-blue-
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#428e92",
      main: "#138496",
      dark: "#00363a",
      contrastText: "white"
    },
    secondary: {
      light: "#92ffc6",
      main: "#f64b3c",
      dark: "#1aa867",
      contrastText: "#000"
    },
    background: "#5cdb95"
  }
})
export default () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/verify/:value/:id" exact component={Verify} />
        <PrivateRoute path="/branches" exact component={Branches} />
        <PrivateRoute path="/branches/new" exact component={BranchesCreate} />
        <PrivateRoute
          path="/branches/show/:id"
          exact
          component={BranchesShow}
        />
        <PrivateRoute
          path="/branches/edit/:id"
          exact
          component={BranchesEdit}
        />
        <PrivateRoute path="/branches/:id/rooms" exact component={Rooms} />
        <PrivateRoute
          path="/branches/:id/rooms/new"
          exact
          component={RoomsCreate}
        />
        <PrivateRoute
          path="/branches/:id/rooms/edit/:rid"
          exact
          component={RoomsEdit}
        />
        <PrivateRoute path="/tenents" exact component={Tenents} />
        <PrivateRoute path="/tenents/show/:id" exact component={TenentsShow} />
        <PrivateRoute path="/tenents/new" exact component={TenentsCreate} />
        <PrivateRoute path="/tenents/edit/:id" exact component={TenentsEdit} />
        <PrivateRoute path="/balances" exact component={Balance} />
      </Switch>
    </MuiThemeProvider>
  )
}
