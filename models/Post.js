const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');

const Post = sequelize.define(
  'Post',
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
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: 'modifiedAt',
  }
);

module.exports = { Post };
