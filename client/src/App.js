import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loading";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import CartHome from "./Components/Cart/CartHome";
import UserProfile from "./Components/User/UserProfile";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/User/Profile";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  return (
    <React.Fragment>
      <Profile />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={CartHome} />
        <Route exact path="/users/:id" component={UserProfile} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
