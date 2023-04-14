const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "27042001",
  database: "Test",
  port: 3306,
});

module.exports = connection;