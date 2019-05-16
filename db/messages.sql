USE users_db;

CREATE TABLE chatrooms
(
    id int AUTO_INCREMENT, 
    room_name varchar(30) NOT NULL, 
    user1 varchar(30) NOT NULL, 
    user2 varchar(30) NOT NULL,
    PRIMARY KEY (id)
);