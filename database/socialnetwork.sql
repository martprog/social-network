DROP TABLE IF EXISTS users;


CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL CHECK (first != ''),
     last VARCHAR NOT NULL CHECK (last != ''),
     email VARCHAR(50) NOT NULL UNIQUE,
     profile_picture_url VARCHAR,
     bio TEXT,
     password_hash   VARCHAR NOT NULL,
     created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE gencodes (
     id SERIAL PRIMARY KEY,
     email VARCHAR(50) NOT NULL,
     code VARCHAR(6) NOT NULL,
     created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);