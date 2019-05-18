CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE auctions(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "MacbookPro", "Technology", 1500.00,100);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Kate Spade Shirt", "Clothing", 80.00,40);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Blush Plush Blanket", "Bedding", 100.00,70);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Hogwarts LEGO Castle", "Toys", 400.00,90);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Urban Decay Mascara", "Cosmetics", 35.00,40);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "The Devil Wears Prada Movie", "Entertainment", 19.99,50000);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Kate Spade Keds", "Shoes", 85.00, 65);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Apple Watch series 4", "Watches", 400.00,120);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "DeWALT Drill/Driver", "Tools", 149.00,75);

INSERT INTO Products( product_name, department_name, price, stock_quantity)
VALUES ( "Dog Bed", "Pet Supplies", 30.00,50);
