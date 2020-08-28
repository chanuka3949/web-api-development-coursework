import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Auth = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <Profile />
        <Link to="" onClick={() => logout()}>
          Log Out
        </Link>
      </>
    );
  } else {
    return (
      <Link to="" onClick={() => loginWithRedirect()}>
        Log In
      </Link>
    );
  }
};

export default Auth;
