const db = require("../lib/db");

const { Model } = require("objection");

Model.knex(db);

class UserPool extends Model {
  static get tableName() {
    return "UserPools";
  }

  static get relationMappings() {
    const Pool = require("./Pool");

    const User = require("./Users");

    return {
      pool: {
        relation: Model.HasOneRelation,

        modelClass: Pool,

        join: {
          from: "Pools.id",

          to: "UserPools.poolid"
        }
      },

      users: {
        relation: Model.HasOneRelation,

        modelClass: User,

        join: {
          from: "UserPools.user",

          to: "Users.sub"
        }
      }
    };
  }
}

module.exports = UserPool;
