'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate({Movie,User,UserComment}) {

      this.belongsTo(User,{foreignKey:{name:'userid',allowNull:false}});
      this.belongsTo(Movie,{foreignKey:{name:'movieid',allowNull:false}});

      this.belongsToMany(User,{through:UserComment, foreignKey:{name:'postid',allowNull:false}})
      this.hasMany(UserComment,{foreignKey:{name:'postid',allowNull:false}});


    }

    toJSON(){
      return {...this.get(),updatedAt:undefined,}
    }
  }
  Post.init({
    postid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    content: {
      type: DataTypes.JSON,
    },
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'Post',
  });
  return Post;
};