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
  
  var displayInventory = function(){
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
      inquirerForUpdates();
    });
  };

  displayInventory();
  
function inquirerForUpdates(){
	inquirer.prompt([{
		name:"action",
		type: "list",
		message: "Choose an option below to manage current inventory:",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
	}]).then(function(answers){
		switch(answers.action){
			case 'Restock Inventory':
				restockRequest();
				break;
			case 'Add New Product':
				addRequest();
				break;
			case 'Remove An Existing Product':
				removeRequest();
				break;		
		}
	});
};


});
