use mydb;

CREATE TABLE userLists (
  id int(10) not null,
  password varchar(60) not null,
  primary key (id)
);

INSERT INTO userLists VALUES (
  123,
  'root'
);