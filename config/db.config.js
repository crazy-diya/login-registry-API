const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mysql = require("mysql");
const database_connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: process.env.DATABASE,
});

database_connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected Successfully!");
});

module.exports = database_connection;
