DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS gencodes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chat_messages;


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

CREATE TABLE friendships (
     id SERIAL PRIMARY KEY,
     sender_id INT REFERENCES users(id) NOT NULL,
     recipient_id INT REFERENCES users(id) NOT NULL,
     accepted BOOLEAN DEFAULT false
);

CREATE TABLE chat_messages (
     id SERIAL PRIMARY KEY,
     sender_id INT REFERENCES users(id) NOT NULL,
     text TEXT,
     created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);