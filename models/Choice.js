const db = require("../lib/db");

const { Model } = require("objection");

Model.knex(db);

class Choices extends Model {
  static get tableName() {
    return "Options";
  }
}

module.exports = Choices;
