const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    music_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: 'modifiedAt',
  }
);

module.exports = { Comment };
