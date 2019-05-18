var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();
var figlet = require('figlet');
var chalk = require('chalk');
var Table = require('cli-table');

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
  
  connection.connect(function(err){
  
    if(err)throw err;
  
  var displayProducts = function(){
    var query = "Select * FROM Products";
    connection.query(query, function(err, res){
      if(err) throw err;
      var displayTable = new Table ({
        head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
        colWidths: [10,35,35,10,14]
      });
      for(var i = 0; i < res.length; i++){
        displayTable.push(
          [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
          );
      }
      console.log('\n')
      console.log(displayTable.toString());
      
    });
  }
  
  displayProducts();
  
  function purchasePrompt(){
    inquirer.prompt([
    {
      name: "ID",
      type: "input",
      message:"Please enter the Item ID you would like to purchase.\n",
      filter:Number
    },
    {
      name:"Quantity",
      type:"input",
      message:"How many items would you like to purchase?",
      filter:Number
    },
  
   ]).then(function(answers){
     var quantityNeeded = answers.Quantity;
     var IDrequested = answers.ID;
    purchaseOrder(IDrequested, quantityNeeded); 
   });
  };
  
  purchasePrompt();
  
  function purchaseOrder(ID, amtNeeded){
    connection.query('Select * FROM Products WHERE item_id = ' + ID, function(err,res){
      if(err){console.log(err)};
      if(amtNeeded <= res[0].stock_quantity){
        var totalCost = res[0].price * amtNeeded;
        console.log(chalk.yellow("Good news your order is in stock!"));
        console.log(chalk.yellow("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you for your Order!"));
  
        connection.query("UPDATE Products SET stock_quantity = stock_quantity - " + amtNeeded + " WHERE item_id = " + ID);
      } else{
        console.log(chalk.red("Insufficient quantity, I'm sorry we don't have enough " + res[0].product_name + "'s to complete your order. Please purchase a different item or change the amount of the item you need!"));
      };
      displayProducts();
      purchasePrompt();
    });
  };
  });