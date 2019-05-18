USE users_db;

CREATE TABLE tasks
(
    task_number int AUTO_INCREMENT, 
    id int NOT NULL, 
    category varchar(10),
    task varchar(50),
    PRIMARY KEY (task_number)
);