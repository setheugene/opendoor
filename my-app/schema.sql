-- DROP DATABASE IF EXISTS opendoor_db;
-- CREATE DATABASE opendoor_db;

-- USE opendoor_db;
-- CREATE TABLE userlist(
-- 	id INT NOT NULL AUTO_INCREMENT,
--     user VARCHAR(255) NOT NULL,
--     administrator BOOLEAN default FALSE,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE tenant_data(
-- 	id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(255) NOT NULL,
--     rent_status BOOLEAN DEFAULT FALSE,
--     rent_amount INT(10) NOT NULL,
--     unit VARCHAR(255) NOT NULL,
--     userID INT,
--     PRIMARY KEY(id),
--     FOREIGN KEY(userID) REFERENCES userlist(id)
-- );

-- CREATE TABLE messageboard(
-- 	id INT NOT NULL AUTO_INCREMENT,
--     message VARCHAR(255) NOT NULL,
--     date TIMESTAMP,
--     userID INT,
--     PRIMARY KEY(id),
--     FOREIGN KEY(userID) REFERENCES userlist(id)
-- );