-- CREATE DATABASE slick_db;

USE slick_db;

CREATE TABLE Users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255),
  user_password VARCHAR (255),
  user_email VARCHAR(255)
);

INSERT INTO Users(id, user_name, user_password, user_email)
VALUES(1, 'testUser', 'testPassword', 'test@testemail.com');

CREATE TABLE Task(
  id INT NOT NULL,
  Tasks VARCHAR(255)
);

INSERT INTO Task(id, Tasks)
VALUES(1, 'test task');