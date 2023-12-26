const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "IsDead1!",
  database: "mydb",
});

function createPost(title, content) {
  connection.connect();
  
  connection.end();
}

function readPost(id) {
  connection.connect();
  connection.end();
}

function updatePost(id, title, content) {
  connection.connect();
  connection.end();
}

function deletePost(id) {
  connection.connect();
  connection.end();
}