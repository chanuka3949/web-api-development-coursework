import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
import App from "./App";
import "./index.css";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import CartHome from "./Components/CartHome";
import Footer from "./Components/Footer";

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
