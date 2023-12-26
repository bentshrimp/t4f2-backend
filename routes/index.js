var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "IsDead1!",
  database: "mydb",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.connect();
  connection.query("SELECT * from user", (error, rows, fields) => {
    if (error) throw error;
    console.log("User info is: ", rows);
  });

  connection.end();
  res.render("index", { title: "Express" });
});

module.exports = router;
