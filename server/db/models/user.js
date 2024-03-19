"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Post,
      Comment,
      PostLike,
      CommentLike,
      Follower,
      Dialog,
      Message,
      Favorite,
    }) {
      this.hasMany(Post, { foreignKey: "userId" });
      this.hasMany(Comment, { foreignKey: "userId" });
      this.hasMany(PostLike, { foreignKey: "userId" });
      this.hasMany(CommentLike, { foreignKey: "userId" });
      this.hasMany(Favorite, { foreignKey: "userId" });
      this.hasMany(Follower, { foreignKey: "followerId", as: "Follower" });
      this.hasMany(Follower, { foreignKey: "followedId", as: "Followed" });
      this.hasMany(Dialog, { foreignKey: "userId1", as: "DialogsUser1" });
      this.hasMany(Dialog, { foreignKey: "userId2", as: "DialogsUser2" });
      this.hasMany(Message, { foreignKey: "senderId", as: "SentMessages" });
      this.hasMany(Message, {
        foreignKey: "receiverId",
        as: "ReceivedMessages",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      img: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      backgroundImg: {
        type: DataTypes.TEXT,
      },
      isAdmin: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      city: {
        type: DataTypes.TEXT,
      },
      contact: {
        type: DataTypes.TEXT,
      },
      birthDate: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
