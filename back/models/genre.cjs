"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate({ Movie, Moviegenre }) {
      this.belongsToMany(Movie, {
        through: Moviegenre,
        foreignKey: { name: "genreid", allowNull: false },
      });
      this.hasMany(Moviegenre, {
        foreignKey: { name: "genreid", allowNull: false },
      });
    }
  }
  Genre.init(
    {
      genreid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "genres",
      modelName: "Genre",
    }
  );
  return Genre;
};
