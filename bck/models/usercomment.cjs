'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserComment extends Model {
   
    static associate({User,Post}) {
      this.belongsTo(User,{foreignKey:{name:'userid',allowNull:false}});
      this.belongsTo(Post,{foreignKey:{name:'postid',allowNull:false}});
    }
  }
  UserComment.init({
    ucid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    comment_content:{
        type: DataTypes.JSON,
      },
    
  }, {
    sequelize,
    tableName:'usercomments',
    modelName: 'UserComment',
  });
  return UserComment;
};