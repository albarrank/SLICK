CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users
(
    id int AUTO_INCREMENT, 
    user_name varchar(30) NOT NULL, 
    email varchar(25),
    password char(64),
    online TINYINT unsigned NOTNULL,
    PRIMARY KEY (id)
);