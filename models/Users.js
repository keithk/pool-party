const db = require("../lib/db");

const { Model } = require("objection");

Model.knex(db);

class Users extends Model {
  static get tableName() {
    return "Users";
  }
}

module.exports = Users;
