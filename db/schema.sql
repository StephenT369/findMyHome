DROP DATABASE homefinder_db;
CREATE DATABASE homefinder_db;
USE homefinder_db;

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR (100),
password TEXT (36),
email VARCHAR (100),
createdAt datetime,
updatedAt datetime,
	PRIMARY KEY (id)
);