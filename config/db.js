const Sequelize = require("sequelize");
//Sequelize instance
//parameter를 전달하는 방식
//데이터베이스로의 연결을 represent
const sequelize = new Sequelize({
  dialect: "mysql",
  storage: "../mydb",
});

module.exports = sequelize;
