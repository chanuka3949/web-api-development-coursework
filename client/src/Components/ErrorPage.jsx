import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="jumbotron text-center">
      <h1 className="align-self-center">Error Page</h1>
      <p>Oops... This page doesn't exist</p>
      <Link to="/">Go Back To Home</Link>
    </div>
  );
};

export default ErrorPage;
