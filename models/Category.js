const db = require("../lib/db");

const { Model } = require("objection");

Model.knex(db);

class Categories extends Model {
  static get tableName() {
    return "Categories";
  }

  static get relationMappings() {
    const Choice = require("./Choice");

    return {
      choices: {
        relation: Model.HasManyRelation,

        modelClass: Choice,

        join: {
          from: "Categories.id",

          to: "Options.category"
        }
      }
    };
  }
}

module.exports = Categories;
