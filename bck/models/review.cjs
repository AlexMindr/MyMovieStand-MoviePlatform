'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
   
    static associate({Movie,User,UserLike}) {

      this.belongsTo(User,{foreignKey:{name:'userid',allowNull:false}});
      this.belongsTo(Movie,{foreignKey:{name:'movieid',allowNull:false}});

      this.belongsToMany(User,{through:UserLike, foreignKey:{name:'reviewid',allowNull:false}})
      this.hasMany(UserLike,{foreignKey:{name:'reviewid',allowNull:false}});


    }

    toJSON(){
      return {...this.get(),userid:undefined}
    }
  }
  Review.init({
    reviewid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    content: {
      type: DataTypes.JSON,
    },
  }, {
    sequelize,
    tableName:'reviews',
    modelName: 'Review',
  });
  return Review;
};