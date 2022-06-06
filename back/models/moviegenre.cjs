"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Moviegenre extends Model {
    static associate({ Movie, Genre }) {
      this.belongsTo(Movie, {
        foreignKey: { name: "movieid", allowNull: false },
      });
      this.belongsTo(Genre, {
        foreignKey: { name: "genreid", allowNull: false },
      });
    }
  }
  Moviegenre.init(
    {
      mgid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: "moviegenres",
      modelName: "Moviegenre",
    }
  );
  return Moviegenre;
};
