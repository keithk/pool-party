import fetch from "isomorphic-fetch";

import React, { Component } from "react";

import { Link } from "react-router-dom";

import Button from "../components/button";

import api from "../lib/api";

const PoolList = props => {
  if (props.pool.length <= 0) return null;

  const poolList = props.pool.map(pool => {
    // If this is a hidden pool the data will be in pool.pool

    pool = pool.name ? pool : pool.pool;

    return (
      <Link
        to={`/pool/${pool.id}`}
        className="panel-block is-active"
        key={pool.id}
      >
        <span className="panel-icon" role="img" aria-label="medal emoji">
          🏆
        </span>

        {pool.name}
      </Link>
    );
  });

  return (
    <section className="section">
      <h3 className="title is-3">{props.title}</h3>

      <nav className="panel">{poolList}</nav>
    </section>
  );
};

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pw: ""
    };
  }

  async componentDidMount() {
    const { getAccessToken } = this.props.auth;

    try {
      const response = await fetch(`${api.url}/pools`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });

      const data = await response.json();

      this.setState({
        openPools: data.openPools,
        joinedPools: data.joinedPools
      });
    } catch (err) {
      console.error(err);
    }

    this.props.auth.getProfile(user => {
      console.log("user", user);
    });
  }

  joinPool = async () => {
    const password = this.state.pw;

    const token = await this.props.auth.getAccessToken();

    console.log("password", password);

    try {
      const response = await fetch(`${api.url}/pools`, {
        method: "post",

        mode: "cors",

        body: JSON.stringify({ password }),

        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + token
        }
      });

      const data = await response.json();

      this.props.history.replace(`/pool/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (!this.state.openPools) return <div>Loading..</div>;

    return (
      <div>
        <PoolList pool={this.state.joinedPools} title="Your Joined Pools" />

        <PoolList pool={this.state.openPools} title="Open Pools" />

        <section className="section">
          <h3 className="title is-3">Join New Pool</h3>

          <p>
            You're here because you have the{" "}
            <strong>
              <span role="img" aria-label="medal emoji">
                ✨
              </span>{" "}
              top secret password{" "}
              <span role="img" aria-label="medal emoji">
                ✨
              </span>
            </strong>{" "}
            to join a pool. Input that below:
          </p>

          <div className="field">
            <div className="control">
              <input
                type="text"
                name="pool"
                className="input"
                onChange={e => {
                  this.setState({ pw: e.target.value });
                }}
                placeholder="top secret password"
              />
            </div>
          </div>

          <p>
            <Button primary onClick={this.joinPool}>
              join pool
            </Button>
          </p>
        </section>
      </div>
    );
  }
}
