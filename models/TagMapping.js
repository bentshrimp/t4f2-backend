const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');

const TagMapping = sequelize.define(
  'TagMapping',
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { TagMapping };
