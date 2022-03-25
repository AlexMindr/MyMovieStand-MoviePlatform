'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
   
    static associate({User}) {
      this.belongsTo(User,{foreignKey:'userid'});
     }


    toJSON(){
        return {...this.get(),updatedAt:undefined,userid:undefined}
      }
  }
  Notification.init({
    notificationid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    userid: {
        type:DataTypes.INTEGER,
        allowNull:false,
        onDelete:'CASCADE'
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
    },
    }, {
    sequelize,
    tableName:'notifications',
    modelName: 'Notification',
  });
  return Notification;
};