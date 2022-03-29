'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
   
    static associate({User,Movie}) {
      this.belongsTo(User,{foreignKey:{name:'userid',allowNull:false}});
      this.belongsTo(Movie,{foreignKey:{name:'movieid',allowNull:false}});
    }
  }
  Watchlist.init({
    wlid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    /*UserUserid: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    MovieMovieid: {
        type: DataTypes.INTEGER,
        allowNull:false   
    },*/
    rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10 
        },
    },
    status: DataTypes.STRING,
    episodes: {
      type: DataTypes.INTEGER.UNSIGNED,

    },
  }, {
    sequelize,
    tableName:'watchlists',
    modelName: 'Watchlist',
  });
  return Watchlist;
};