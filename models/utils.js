const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config.json');

const db = dbConfig.test;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});

module.exports = { sequelize };
