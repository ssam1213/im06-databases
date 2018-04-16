CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255),
  text VARCHAR(255), 
  roomname VARCHAR(255),
  date DATETIME,
  PRIMARY KEY(id)
);

INSERT INTO messages  (username, text, roomname, date)
VALUES ('WONBOK', "HI", "room1", now());

SELECT * FROM messages;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

