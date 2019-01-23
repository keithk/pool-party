import React, { Component } from "react";

import _ from "lodash";

import styled from "@emotion/styled";

import uid from "uid";

import { css } from "emotion";

import api from "../lib/api";

import moment from "moment";

import id from "uid";

import Message from "../components/message";

import CoolText from "../components/cooltext";

import colors from "../colors";

import { isFunction } from "util";

const announced = css`
  border-top: 10px solid ${colors.green};
`;

const selected = css`
  border-top: 10px solid ${colors.green};
`;

const baseCard = css`
  padding: 16px;

  border-radius: 2px;

  border-top: 10px solid ${colors.primary};

  display: flex;

  color: black;

  flex-direction: column;

  position: relative;

  top: 0;

  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  transition: border-top 1s ease;
`;

const PoolCardChoices = styled("div")`
  margin: 0 auto 20px;

  padding: 0px;

  color: black;

  background: white;
`;

const PoolCardHeader = styled("h2")`
  font-family: Rubik;

  font-weight: 700;

  font-size: 24px;

  margin: 10px 0;

  color: black;

  text-align: center;

  border-bottom: 2px solid ${colors.primary};

  padding-bottom: 5px;

  color: #000000;

  letter-spacing: 1.6px;
`;

const PoolCardSub = styled("span")`
  font-family: Rubik;

  font-weight: 100;

  font-size: 16px;

  letter-spacing: 1.6px;

  color: 9b9b9b;
`;

const PoolCardUl = styled("ul")`
  list-style: none;

  color: black;

  padding: 0px;
`;

const FixedBottomProgress = styled("nav")`
  position: fixed;

  bottom: 0;

  height: 3.25rem;

  background-color: white;

  z-index: 30;

  width: 100%;

  left: 0;

  right: 0;

  padding: 15px 15px 15px 15px;
`;

const ChoiceList = props => {
  const { category, choices, closed, changeChoices } = props;

  const disabled = closed === true;

  return (
    <div>
      {category.choices.map(choice => {
        const chosen = _.find(choices, {
          choice: choice.id,
          category: category.id
        })
          ? "checked"
          : false;

        return (
          <div key={uid()} className="control">
            <label className="radio">
              <input
                name={category.id}
                id={`${category.id}-${choice.id}`}
                value={choice.id}
                type="radio"
                onChange={changeChoices}
                defaultChecked={chosen}
                disabled={disabled}
              />{" "}
              {choice.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

const scoreList = scores => {
  scores = scores.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <div style={{ width: "400px" }}>
      <h1 className="is-size-2">Score List</h1>
      {scores.map((score, index) => {
        let medal;

        if (index === 0) {
          medal = "🥇";
        }

        if (index === 1) {
          medal = "🥈";
        }

        if (index === 2) {
          medal = "🥉";
        }

        return (
          <div
            key={score.user}
            style={{ borderBottom: "1px solid #ccc", paddingBottom: "5px" }}
            className="columns"
          >
            <div className="column">
              {score.user} {medal}
            </div>

            <div className="column has-text-right">{score.score}</div>
          </div>
        );
      })}
    </div>
  );
};

const ClosedList = props => {
  const { category, tracker, permissions, chooseWinner } = props;

  const trackedCategory = tracker[category.id];

  return (
    <div>
      {category.choices.map(choice => {
        const isWinner = choice.id === category.winner ? true : false;

        const title = isWinner === true ? `🏆 ${choice.name} 🏆` : choice.name;

        if (!permissions) {
          const permissions = {};
        }

        const chooseWinnerClick =
          permissions.winners === true ? (
            <a className="" onClick={() => chooseWinner(choice)}>
              Choose Winner
            </a>
          ) : (
            ""
          );

        const color = isWinner === true ? colors.green : colors.cream;

        return (
          <div key={choice.name}>
            <h2
              className="is-size-5"
              style={{ borderBottom: `3px solid ${color}`, margin: "15px 0" }}
            >
              {title}
            </h2>

            {chooseWinnerClick}

            <ul>
              {trackedCategory.choices.map(trackedChoice => {
                if (choice.id === trackedChoice.choice) {
                  const colorUser =
                    isWinner === true ? colors.green : colors.black;

                  return (
                    <li key={trackedChoice.user} style={{ color: colorUser }}>
                      {trackedChoice.user}
                    </li>
                  );
                }

                return "";
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default class Pool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choices: {},

      buttonText: "Change Choices",

      changedCategory: null
    };
  }

  async componentDidMount() {
    await this.props.auth.getProfile(user => {});

    await this.getPool(this.props.match.params.id);
  }

  getPool = async id => {
    const userProfile = await this.props.auth;

    try {
      const response = await fetch(`${api.url}/pool/${id}`, {
        headers: {
          Authorization: "Bearer " + (await userProfile.getAccessToken())
        }
      });

      const data = await response.json();

      data.permissions = JSON.parse(data.permissions);

      this.setState({ ...data });
    } catch (err) {
      console.error(err);
    }
  };

  changeChoices = e => {
    const category = parseInt(e.target.name, 10);

    const newChoice = parseInt(e.target.value, 10);

    let choices = this.state.choices;

    const choice = choices.findIndex(choice => {
      return choice.category === category;
    });

    if (choice !== -1) {
      choices = choices.map(choice => {
        if (choice.category !== category) return choice;

        choice.choice = newChoice;

        return choice;
      });
    } else {
      choices.push({
        id: id(),
        category,
        choice: newChoice,
        pool: parseInt(this.props.match.params.id, 10)
      });
    }

    this.setState({ choices, changedCategory: category });

    this.submitChoices();

    setTimeout(() => {
      this.setState({ changedCategory: null });
    }, 1000);
  };

  submitChoices = async () => {
    try {
      this.setState({ buttonText: "Updating..." });

      await fetch(`${api.url}/pool/${this.props.match.params.id}`, {
        method: "post",

        mode: "cors",

        body: JSON.stringify({ choices: this.state.choices }),

        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + (await this.props.auth.getAccessToken())
        }
      });

      this.setState({ buttonText: "Changed!" });

      setTimeout(() => {
        this.setState({ buttonText: "Change Choices" });
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  chooseWinner = async choice => {
    await fetch(`${api.url}/pool/${choice.category}/${choice.id}/`, {
      method: "post",

      mode: "cors",

      body: JSON.stringify(choice),

      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + (await this.props.auth.getAccessToken())
      }
    });

    await this.getPool(this.props.match.params.id);
  };

  buildCounter() {
    const categories = this.state.categories.length;

    const totalChoices = this.state.choices.length;

    let type = "is-danger";

    if (totalChoices > 7) type = "is-warning";

    if (totalChoices > 15) type = "is-info";

    if (totalChoices === categories) type = "is-link";

    return (
      <FixedBottomProgress>
        <progress
          className={`progress is-warning ${type}`}
          value={totalChoices}
          max={categories}
        />
      </FixedBottomProgress>
    );
  }

  render() {
    if (this.state.error)
      return <Message title="Error" body="You can't access this pool!" />;

    if (!this.state.pool) return <div>Loading...</div>;

    const pool = this.state.pool;

    const choices = this.state.choices;

    const categories = this.state.categories.map(category => {
      // extra styling

      const justChanged =
        this.state.changedCategory === category.id ? selected : null;

      const beenAnnounced = category.winner ? announced : "";

      return (
        <div
          key={category.id}
          className={css`${baseCard} ${justChanged} ${beenAnnounced}`}
        >
          <PoolCardChoices>
            <PoolCardHeader>
              {category.name} <PoolCardSub>({category.points})</PoolCardSub>
            </PoolCardHeader>

            <PoolCardUl>
              {pool.closed === true && (
                <ClosedList
                  category={category}
                  tracker={this.state.tracker}
                  permissions={this.state.permissions}
                  chooseWinner={this.chooseWinner}
                />
              )}

              {pool.closed === false && (
                <ChoiceList
                  changeChoices={this.changeChoices}
                  category={category}
                  choices={choices}
                  closed={pool.closed}
                />
              )}
            </PoolCardUl>
          </PoolCardChoices>
        </div>
      );
    });

    return (
      <div>
        <section
          className="hero is-black is-large"
          style={{
            backgroundImage: "url(/oscars2018.jpg)",
            backgroundSize: "cover"
          }}
        >
          <div className="hero-body">
            <CoolText>
              {pool.name}

              <br />
              {pool.closed === true && (
                <span className="has-text-danger has-text-weight-bold is-uppercase">
                  Closed!
                </span>
              )}

              {pool.closed === false && (
                <span>
                  Closes on {moment(pool.date).format("MMMM Do YYYY")}{" "}
                </span>
              )}
            </CoolText>
          </div>
        </section>

        <section className="section">
          {pool.closed === true && <div>{scoreList(this.state.scores)}</div>}

          {pool.closed === false && (
            <div>
              When this pool closes, the scores will start displaying here, with
              everyone who has entered! Make your choices below for each
              category, they'll update automatically.
            </div>
          )}
        </section>

        <div className="cards" style={{ marginBottom: "100px" }}>
          {categories}
        </div>

        {pool.closed === false && this.buildCounter()}
      </div>
    );
  }
}
