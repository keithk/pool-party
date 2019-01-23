const db = require("../lib/db");

const { Model } = require("objection");

Model.knex(db);

class Choices extends Model {
  static get tableName() {
    return "UserSelections";
  }

  static get relationMappings() {
    const Category = require("./Category");

    return {
      categories: {
        relation: Model.HasOneRelation,

        modelClass: Category,

        join: {
          from: "UserSelections.category",

          to: "Categories.id"
        }
      }
    };
  }
}

module.exports = Choices;
