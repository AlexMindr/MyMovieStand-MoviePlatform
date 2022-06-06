"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLike extends Model {
    static associate({ User, Review }) {
      this.belongsTo(User, {
        foreignKey: { name: "userid", allowNull: false },
      });
      this.belongsTo(Review, {
        foreignKey: { name: "reviewid", allowNull: false },
      });
    }
  }
  UserLike.init(
    {
      ulid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      liked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "userlikes",
      modelName: "UserLike",
    }
  );
  return UserLike;
};
