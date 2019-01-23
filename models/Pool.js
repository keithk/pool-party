const db = require("../lib/db");

const { Model } = require("objection");

Model.knex(db);

class Pool extends Model {
  static get tableName() {
    return "Pools";
  }

  static get relationMappings() {
    const Category = require("./Category");

    const UserChoices = require("./UserChoice");

    return {
      categories: {
        relation: Model.HasManyRelation,

        modelClass: Category,

        join: {
          from: "Pools.id",

          to: "Categories.pool"
        }
      },

      userChoices: {
        relation: Model.HasManyRelation,

        modelClass: UserChoices,

        join: {
          from: "Pools.id",

          to: "UserSelections.pool"
        }
      }
    };
  }
}

module.exports = Pool;
