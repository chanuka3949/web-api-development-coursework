import React, { Component } from "react";
import Cart from "./Cart";
import CartPage from "./CartPage";
//import NavBar from "./NavBar";
import Cartsearch from "./CartSearch";

class CartParent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Cartsearch />
          <div className="row">
            <div className="col">
              <CartPage />
            </div>
            <div className="col">
              <CartPage />
            </div>
            <div className="col">
              <CartPage />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CartParent;
