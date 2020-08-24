import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

class NavBar extends Component {
  state = {
  };
  render() {
    return (
      <div className="container">
           <nav className="header_header__3p7LH">
        <Link to="/">Store</Link>
        <Link to="/about">About Us</Link>
        <Link to="/about"> Contact Us</Link>
        <Auth />
        <a href="/cart">
          <i className="fas fa-cart-plus"></i>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="" />
          </svg>{" "}
          Cart {"("}{this.props.cartCount}{")"}
        </a>
      </nav>
      </div>
    )}
}

export default NavBar;
