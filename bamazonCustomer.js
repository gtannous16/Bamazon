var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();
var figlet = require('figlet');
var chalk = require('chalk');

console.log("\x1b[33m");
(figlet('Welcome to Bamazon!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
}));

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
  
    port: 3306,
    
    user: process.env.DB_USER,
  
    password: process.env.DB_PASS,
    database: "Bamazon_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

