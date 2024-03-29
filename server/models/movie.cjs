"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate({ Genre, User, Watchlist, Moviegenre, Review, Post }) {
      this.belongsToMany(Genre, {
        through: Moviegenre,
        foreignKey: { name: "movieid", allowNull: false },
      });
      this.hasMany(Moviegenre, {
        foreignKey: { name: "movieid", allowNull: false },
      });

      this.belongsToMany(User, {
        through: Watchlist,
        foreignKey: { name: "movieid", allowNull: false },
        otherKey: "userid",
      });
      this.hasMany(Watchlist, {
        foreignKey: { name: "movieid", allowNull: false },
      });

      this.belongsToMany(User, {
        through: Review,
        foreignKey: { name: "movieid", allowNull: false },
        otherKey: "userid",
      });
      this.hasMany(Review, {
        foreignKey: { name: "movieid", allowNull: false },
      });

      this.belongsToMany(User, {
        through: Post,
        foreignKey: { name: "movieid", allowNull: false },
        otherKey: "userid",
      });
      this.hasMany(Post, { foreignKey: { name: "movieid", allowNull: false } });
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  Movie.init(
    {
      movieid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      adult: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      backdrop_path: {
        type: DataTypes.STRING,
      },
      budget: {
        type: DataTypes.BIGINT(16).UNSIGNED,
      },
      homepage: {
        type: DataTypes.STRING,
      },
      imdb_id: DataTypes.STRING,
      tmdb_id: DataTypes.INTEGER,
      language: DataTypes.STRING(1000),
      original_title: DataTypes.STRING,
      overview: DataTypes.TEXT,
      poster_path: DataTypes.STRING,
      release_date: DataTypes.DATE,
      revenue: DataTypes.BIGINT(16).UNSIGNED,
      duration: DataTypes.STRING,
      status: DataTypes.STRING,
      title: DataTypes.STRING,
      trailer: DataTypes.STRING,
      keywords: DataTypes.STRING(5000),
      popularity: DataTypes.INTEGER.UNSIGNED,
      uscertification: DataTypes.STRING,
      rating: {
        type: DataTypes.DECIMAL(10, 1),
        validate: { min: 1.0, max: 10.0 },
      },
    },
    {
      sequelize,
      tableName: "movies",
      modelName: "Movie",
    }
  );
  return Movie;
};
