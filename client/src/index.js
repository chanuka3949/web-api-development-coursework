import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import StorePage from "./Components/StorePage";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import Cart from "./Components/Cart";

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/" component={StorePage} />
  </BrowserRouter>,
  document.getElementById("root")
);
