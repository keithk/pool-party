const { Model } = require("objection");

const Knex = require("knex");

// Initialize knex.

const knex = Knex({
  client: "mysql",

  connection: {
    host: "pool-party.ca0q7ccltecf.us-east-1.rds.amazonaws.com",

    database: "poolparty",

    user: "poolparty",

    password: "kN2k9mJUsoij"
  }
});

module.exports = knex;
