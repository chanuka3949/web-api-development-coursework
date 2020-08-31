import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { withAuth0 } from "@auth0/auth0-react";

class NavBar extends Component {
  state = {};
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <div className="container">
        <nav className="header_header__3p7LH">
          <Link to="/">Store</Link>
          <Link to="/about">About Us</Link>
          <Link to="/about"> Contact Us</Link>
          <Link
            hidden={!isAuthenticated}
            to={`/users/${user.sub.split("|", 2)[1]}`}
          >
            User Profile
          </Link>
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

export default withAuth0(NavBar);
