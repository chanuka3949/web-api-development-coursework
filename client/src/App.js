import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loading";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import CartHome from "./Components/CartHome";
import UserProfile from "./Components/UserProfile";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/Profile";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <Profile />
      <ToastContainer />
      <Route path="/users/:id" component={UserProfile} />
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={CartHome} />
    </React.Fragment>
  );
}

export default App;
