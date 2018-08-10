DROP TABLE messages;
DROP TABLE users;

CREATE TABLE users (
  id serial primary key,
  username text unique
);

CREATE TABLE messages (
  id int references users(id),
  roomid text,
  messageid serial primary key,
  message text
);