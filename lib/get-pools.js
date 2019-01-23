const Pool = require("../models/Pool");

const Categories = require("../models/Category");

const UserChoice = require("../models/UserChoice");

const UserPool = require("../models/UserPools");

const Users = require("../models/Users");

const Choices = require("../models/Choice");

const _ = require("lodash");

// Gets all of the open pools

const getOpenPools = async () => {
  const pools = await Pool.query()

    .where("password", "")

    .orderBy("id");

  return pools;
};

const getJoinedPools = async uid => {
  const joinedPools = await UserPool.query()

    .where("user", uid)

    .eager("pool");

  return joinedPools;
};

const joinPool = async (uid, password) => {
  // First we need to get the pool that has this password

  const pool = await Pool.query()

    .where("password", password)

    .first();

  // And then if you haven't already, you join it

  try {
    await UserPool.query().insert({
      user: uid,

      poolid: pool.id
    });
  } catch (err) {
    console.log("error", err);
  }

  return pool;
};

const isPoolClosed = date => {
  const jsDate = new Date(date);

  const now = new Date();

  return now > jsDate;
};

const getAllUserChoices = async (users, pool) => {
  const userChoices = await UserChoice.query().where("pool", pool.id);

  return userChoices;
};

// Gets all of the users who are in a pool

// And then scores them based on what categories have been

// given a winner

const getPoolUsers = async pool => {
  const users = await UserPool.query()

    .where("poolid", pool.id)

    .eager("users");

  return users;
};

const getPool = async (id, uid) => {
  const pool = await Pool.query()

    .where("id", id)

    .first();

  // Do you have access to this pool?

  if (pool.password) {
    const userJoined = await UserPool.query()

      .where("user", uid)

      .where("poolid", pool.id)

      .first();

    if (!userJoined) {
      return { error: "You aren't allowed to view this pool." };
    }
  }

  // Check if the pool is "closed"

  // Do this logic here instead of on the front end

  // for validation purposes

  const isClosed = isPoolClosed(pool.date);

  pool.closed = isClosed;

  const categories = await Categories.query()

    .where("pool", pool.id)

    .eager("choices")

    .orderBy("id");

  const choices = await UserChoice.query()

    .where("pool", pool.id)

    .where("user", uid)

    .orderBy("id");

  const scores = [];

  const tracker = {};

  if (isClosed) {
    const usersForScores = await getPoolUsers(pool);

    const usersChoices = await getAllUserChoices(usersForScores, pool);

    // Lets build our scores for each category

    await categories.forEach(category => {
      // lets loop through the users, get the scores for this category

      tracker[category.id] = { choices: [] };

      usersChoices.forEach(user => {
        const userData = _.find(usersForScores, { user: user.user });

        const value = category.winner === user.choice ? category.points : 0;

        // Is the right category?);

        if (category.id === user.category) {
          tracker[category.id].choices.push({
            user: userData.users.name,
            choice: user.choice
          });

          // Add to this users total score

          const currentScore = _.find(scores, { user: userData.users.name });

          if (!currentScore) {
            scores.push({ user: userData.users.name, score: value });
          } else {
            currentScore.score = currentScore.score + value;
          }
        }
      });
    });
  }

  // Get this users information

  const user = await getUser(uid);

  return {
    pool,
    categories,
    choices,
    scores,
    tracker,
    permissions: user.permissions
  };
};

const getUser = async uid => {
  return await Users.query()

    .where("sub", uid)

    .first();
};

const chooseWinner = async (choice, uid) => {
  const user = getUser(uid);

  // const permissions = JSON.parse(user.permissions);

  // if (permissions.winners !== true) {

  //   console.error("Invalid permissions");

  //   return { error: "Invalid permissions" }

  // }

  // await Choices.query()

  //   .patch({})

  await Categories.query()

    .patch({ winner: choice.id })

    .where("id", choice.category);

  return true;
};

const updateChoices = async (id, choices, uid) => {
  // Lets loop through these choices and figure out what to do with them

  await choices.choices.forEach(async choice => {
    const findChoice = await UserChoice.query()

      .where("id", choice.id)

      .first();

    if (findChoice) {
      // This is something that needs to be updated

      const update = await UserChoice.query()

        .patch({ choice: choice.choice })

        .where("user", uid)

        .where("id", choice.id);
    } else {
      // This is something that needs to be inserted

      const insert = await UserChoice.query().insert({
        id: choice.id,

        choice: choice.choice,

        category: choice.category,

        user: uid,

        pool: choice.pool
      });
    }
  });

  return await getPool(id, uid);
};

const updateUserDetails = async user => {
  const name = user["https://pool.cute.is/api/name"];

  const nickname = user["https://pool.cute.is/api/nickname"];

  const email = user["https://pool.cute.is/api/email"];

  let getUser = await Users.query()

    .where("sub", user.sub)

    .first();

  if (!getUser) {
    let getUser = await Users.query().insert({
      name,

      nickname,

      email,

      sub: user.sub
    });
  } else {
    // we would update details here but right now doesn't matter
  }

  return getUser;
};

module.exports = {
  getOpenPools,
  getPool,
  updateChoices,
  getJoinedPools,
  joinPool,
  updateUserDetails,
  chooseWinner
};
