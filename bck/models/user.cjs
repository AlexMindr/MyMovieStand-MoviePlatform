'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate({Movie,Watchlist,Notification}) {
      this.belongsToMany(Movie,{through:Watchlist, foreignKey:{name:'userid',allowNull:false}})
      this.hasMany(Watchlist,{foreignKey:{name:'userid',allowNull:false}});

      this.hasMany(Notification,{foreignKey:'userid'});
    }

    toJSON(){
      return {...this.get(),createdAt:undefined,updatedAt:undefined,userid:undefined}
    }
  }
  User.init({
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    useruuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique:true, 
      allowNull:false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING,
    },
    dateofbirth: {
      type:DataTypes.DATE
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    changecode: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING(1200),
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};