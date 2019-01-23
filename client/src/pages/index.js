import React from "react";

const Home = props => {
  const { isAuthenticated } = props.auth;

  if (isAuthenticated()) props.history.replace(`/pools/`);

  return (
    <section className="hero is-medium is-warning is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <span role="img" aria-label="Medal emoji">
              🏆
            </span>{" "}
            Pool Prty{" "}
            <span role="img" aria-label="Medal emoji">
              🏆
            </span>
          </h1>

          <h2 className="subtitle">
            Login to join a pool{" "}
            <span role="img" aria-label="Wave emoji">
              {" "}
              👋🏼
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Home;
