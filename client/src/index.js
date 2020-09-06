import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useHistory } from "react-router-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";
import Auth0ProviderWithHistory from "./Components/Authentication/Auth0Provider";



ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
    <Footer />
  </BrowserRouter>,
  document.getElementById("root")
);
