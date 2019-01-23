import React, { Component } from "react";

import "./index.css";

import Helmet from "react-helmet";

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Helmet>
          <title>Pool Prty</title>

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link
            href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i"
            rel="stylesheet"
          />
        </Helmet>

        <div
          className="navbar is-black"
          id="navbar"
          role="navigation"
          aria-label="main navigation"
          style={{ marginBottom: "5px" }}
        >
          <div className="navbar-brand">
            <a onClick={this.goTo.bind(this, "home")} className="navbar-item">
              <img alt="logo" src="/logo.png" />
            </a>
          </div>

          <div className="navbar-menu is-active">
            {!isAuthenticated() && (
              <div className="navbar-end">
                <a className="navbar-item" onClick={this.login.bind(this)}>
                  Log In / Register
                </a>
              </div>
            )}

            {isAuthenticated() && (
              <div className="navbar-end">
                <a
                  className="navbar-item"
                  onClick={this.goTo.bind(this, "pools")}
                >
                  Pools
                </a>

                <a className="navbar-item" onClick={this.login.bind(this)}>
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>

        {!isAuthenticated() && (
          <section className="hero is-medium is-warning is-bold">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Pool Prty</h1>

                <h2 className="subtitle">Login to join a pool</h2>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default App;
