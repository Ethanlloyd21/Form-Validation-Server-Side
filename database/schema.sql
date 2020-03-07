DROP DATABASE IF EXISTS login_db;
CREATE DATABASE login_db;

USE login_db;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL,
     PRIMARY KEY (id)
  

);