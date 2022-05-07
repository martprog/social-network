DROP TABLE IF EXISTS users;


CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL CHECK (first != ''),
     last VARCHAR NOT NULL CHECK (last != ''),
     email VARCHAR(50) NOT NULL UNIQUE,
     password_hash   VARCHAR NOT NULL,
     created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
