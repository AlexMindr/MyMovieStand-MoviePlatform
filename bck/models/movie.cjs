'use strict';
/*
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.Genre,{through:{model:models.Moviegenre, unique: false, foreignKey:'custom',onDelete:"RESTRICT" }})
  };
  return Movie;
};
*/
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    
    static associate({Genre,User,Watchlist,Moviegenre}) {
      this.belongsToMany(Genre,{through:Moviegenre, /*foreignKey:{name:'movieid'} , targetKey: 'genreid',sourceKey:'movieid',unique:false*/});
      this.hasMany(Moviegenre,/*{foreignKey:{name:'movieid'}}*/);
    
      this.belongsToMany(User,{through:Watchlist,/* unique: false, foreignKey: 'movieid', otherKey: 'userid'*/ });  
      this.hasMany(Watchlist);
      }
    toJSON(){
      return {...this.get(),createdAt:undefined,updatedAt:undefined}
    }
  }
  Movie.init({
    movieid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adult: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    language: DataTypes.STRING(1234),
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
        type:DataTypes.DECIMAL(10,1),
        validate: { min: 1.0, max: 10.0 }
    },
    /*episodes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    }*/
  }, {
    sequelize,
    tableName:'movies',
    modelName: 'Movie',
  });
  return Movie;
};