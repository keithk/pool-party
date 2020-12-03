const { Model } = require("objection");

const Knex = require("knex");

// Initialize knex.

const knex = Knex({
  client: "mysql",

  connection: {
    host: process.env.DB_HOST,

    database: process.env.DB_DB,

    user: process.env.DB_USER,

    password: process.env.DB_PASS
  }
});

module.exports = knex;
