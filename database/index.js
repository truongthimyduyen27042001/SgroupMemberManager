// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "TestNodejs",
//   port: 3306,
// });

// // connection.query(`Insert into Item(name, quantity, category) values("Chan vay ngan", 2, 1)`, (error, result) => {
// //   console.log('error: ', error)
// //   console.log('data: ', result)
// // })

// //using `${item} to pass params to data`
// //using (?, ?, ?) to pass params to data
// //connect sql without injection
// //mysql parameterized query

// connection.query("select * from Item", (error, result) => {
//   console.log('error: ', error)
//   console.log("data: ", result)
// })

// module.exports = connection


// //Tao thu muc database => 
// //1. connection
// //2. init => file nay tao db / table user 
// // => dua tren bai tap buoi truoc

const connection = require('./connection')
connection.query(`drop table Student`)
connection.query(`CREATE TABLE Student (
  id int NOT NULL AUTO_INCREMENT,
  fullName varchar(255) NOT NULL,
  gender boolean,
  age int,
  PRIMARY KEY (id)
)`)

//create some student in table Student;
connection.query(`insert into Student(fullName, gender, age) values(?,?,?)`, ['Truong Thi My Duyen', false, 20])
connection.query(`insert into Student(fullName, gender, age) values(?,?,?)`, ['Le Tuan 1', false, 30])
connection.query(`insert into Student(fullName, gender, age) values(?,?,?)`, ['Le Tuan 2', false, 25])
connection.query(`insert into Student(fullName, gender, age) values(?,?,?)`, ['Truong Thi My Duyen 2', false, 21])
connection.query(`insert into Student(fullName, gender, age) values(?,?,?)`, ['Truong Thi My Duyen 5', false, 21])
connection.query(`insert into Student(fullName, gender, age) values(?,?,?)`, ['Truong Thi My Duyen 9', false, 21])


console.log('done')