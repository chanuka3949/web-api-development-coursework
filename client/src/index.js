import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Components/Home";
import Cart from "./Components/Cart";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
