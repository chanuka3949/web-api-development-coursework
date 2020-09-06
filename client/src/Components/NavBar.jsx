import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./Authentication/Auth";
import { withAuth0 } from "@auth0/auth0-react";

class NavBar extends Component {
  state = {};
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <div className="container">
        <nav className="header_header__3p7LH">
          <Link to="/">Store</Link>
          <Link
            hidden={!isAuthenticated}
            to={isAuthenticated ? `/users/${user.sub.split("|", 2)[1]}` : ``}
          >
            User Profile
          </Link>
          <Auth />
          <Link to="/cart" className="nawbarcart">
            {" "}
            <img
              src="../cart-icon.png"
              style={{ width: 20, marginRight: 6 }}
              alt="cart-icon"
            ></img>
            Cart {"("}
            {this.props.cartCount}
            {")"}
          </Link>
        </nav>
      </div>
    );
  }
}

export default withAuth0(NavBar);
