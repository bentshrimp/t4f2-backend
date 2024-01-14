const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');

const RefreshToken = sequelize.define(
  'RefreshToken',
  {
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  {
    timestamps: false, // timestamps를 사용하지 않을 경우 설정
  }
);

module.exports = { RefreshToken };
