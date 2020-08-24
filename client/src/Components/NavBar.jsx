import React, { Component } from "react";

class NavBar extends Component {
  state = {
  };
  render() {
    return (
      <div className="container">
        <header className="header_header__3p7LH">
          <a href="/">Store</a>
          <a href="/about">About Us</a>
          <a href="/about"> Contact Us</a>
          <a href="/">Sign Up</a>
          <a href="/">Sign In</a>
          <a href="/cart">
            <i className="fas fa-cart-plus"></i>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="" />
            </svg>{" "}
            
    Cart {"("}{this.props.cartCount}{")"}
          </a>
        </header>
      </div>
    );
  }
}

export default NavBar;
