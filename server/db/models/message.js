'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate({ User, Dialog }) {
      this.belongsTo(Dialog, { foreignKey: 'dialogId'});
      this.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
      this.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });
    }
  }
  Message.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    receiverId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    dialogId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Dialogs',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'Message',
  });
  return Message;
};