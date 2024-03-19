'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dialog extends Model {

    static associate({ User, Message }) {
    this.belongsTo(User, { foreignKey: 'userId1', as: 'User1' });
    this.belongsTo(User, { foreignKey: 'userId2', as: 'User2' });
    this.hasMany(Message, { foreignKey: 'dialogId'});
    }
  }
  Dialog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId1: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    userId2: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Dialog',
  });
  return Dialog;
};