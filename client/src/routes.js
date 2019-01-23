import React from "react";

import { Router, Route } from "react-router-dom";

// Auth

import Callback from "./Callback/Callback";

import Auth from "./Auth/Auth";

import history from "./history";

// Pages

import Home from "./pages/index";

import Pools from "./pages/pools";

import Pool from "./pages/pool";

import App from "./App";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div className="container">
        <Route path="/" render={props => <App auth={auth} {...props} />} />

        <Route path="/home" render={props => <Home auth={auth} {...props} />} />

        <Route
          path="/pools"
          render={props => <Pools auth={auth} {...props} />}
        />

        <Route
          path="/pool/:id"
          render={props => <Pool auth={auth} {...props} />}
        />

        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);

            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};

export default App;
