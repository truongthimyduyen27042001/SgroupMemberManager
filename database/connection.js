const mysql = require("mysql");

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DIALECT,
  port: DB_PORT,
});

module.exports = connection;