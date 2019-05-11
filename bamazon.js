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