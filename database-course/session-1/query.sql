CREATE DATABASE blog;
CREATE TYPE user_role AS ENUM('author', 'admin','moderator');

CREATE TABLE users(
        "userId" SERIAL  NOT NULL PRIMARY KEY,
        "name" VARCHAR(30) NOT NULL,
        "email" VARCHAR(100) NOT NULL UNIQUE,
        "password" VARCHAR(16) NOT NULL,
        "address" VARCHAR(100),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL,
        "deletedAt" TIMESTAMP DEFAULT NULL,
        "role" user_role NOT NULL
    );

CREATE TYPE post_status AS ENUM('draft','post');

CREATE TABLE post(
    'id' SERIAL NOT NULL PRIMARY KEY,
    'content' TEXT,
    'status' post_status NOT NULL,
    'userId' INT REFERENCES user(id),
    'createdAt' TIMESTAMP DEFAULT NOW()
);
CREATE TABLE postMetaData(
    id SERIAL NOT NULL PRIMARY KEY,
    post_id INT REFERENCES posts(id),
    views INTEGER DEFAULT 0,
);
CREATE TABLE comment (
    'comment_id':INT NOT NULL SERIAL PRIMARY KEY,
    'status':''

)
