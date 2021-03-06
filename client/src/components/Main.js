import { Component } from "react";
import AddItem from "./AddItem";
import Home from "./Home";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cart from "./Cart";
import Orders from "./Order";
import Wishlist from "./Wishlist";
import User from "./User";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/items">
            <AddItem />
          </Route>
          <Route path="/users">
            <User />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/wishlist">
            <Wishlist />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(Main));
