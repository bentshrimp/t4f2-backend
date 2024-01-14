const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');
// Emotion 모델
const Emotion = sequelize.define(
  'Emotion',
  {
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false
  }
);

module.exports = { Emotion };
