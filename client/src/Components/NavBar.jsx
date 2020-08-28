import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <nav className="header_header__3p7LH">
          <Link to="/">Store</Link>
          <Link to="/about">About Us</Link>
          <Link to="/about"> Contact Us</Link>
          <Auth />
          <a href="/cart">
            {" "}
            <img
              src="cart-icon.png"
              style={{ width: 20, marginRight: 6 }}
              alt="cart-icon"
            ></img>
            Cart {"("}
            {this.props.cartCount}
            {")"}
          </a>
        </nav>
      </div>
    );
  }
}

export default NavBar;
