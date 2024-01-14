const { DataTypes } = require('sequelize');
const { sequelize } = require('./utils');

const Music = sequelize.define('Music', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = { Music };
