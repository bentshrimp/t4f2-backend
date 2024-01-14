const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');

// User 모델
const User = sequelize.define(
  'User',
  {
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(88),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(88),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(20),
    },
  },
  {
    timestamps: true,
    createdAt: 'signedupAt',
    updatedAt: 'chagedPwdAt'
  }
);

module.exports = { User };
