"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    static associate({ User, Movie }) {
      this.belongsTo(User, {
        foreignKey: { name: "userid", allowNull: false },
      });
      this.belongsTo(Movie, {
        foreignKey: { name: "movieid", allowNull: false },
      });
    }
  }
  Watchlist.init(
    {
      wlid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10,
        },
      },
      status: DataTypes.STRING,
      favourite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "watchlists",
      modelName: "Watchlist",
    }
  );
  return Watchlist;
};
