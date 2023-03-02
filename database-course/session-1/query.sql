-- Active: 1677131859744@@localhost@5432@blog

CREATE TYPE "userRole" AS ENUM('admin', 'author', 'moderator');

CREATE TABLE
    "users"(
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) UNIQUE,
        "password" VARCHAR(50) NOT NULL,
        "address" VARCHAR(200),
        "role" "userRole" NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updateAt" TIMESTAMP DEFAULT NOW(),
        "deleteAt" TIMESTAMP
    );

-- posts and meta posts

CREATE TYPE "postStatus" AS ENUM('post','draft');

CREATE TABLE
    "posts"(
        "id" SERIAL NOT NULL PRIMARY KEY,
        "title" VARCHAR(250),
        "content" TEXT,
        "status" "postStatus" NOT NULL,
        "userId" INT REFERENCES users(id),
        "createdAt" TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE
    "postMetaData"(
        "id" SERIAL NOT NULL PRIMARY KEY,
        "postId" INT REFERENCES posts(id),
        "views" INTEGER DEFAULT 0,
        "isFeatured" BOOLEAN DEFAULT false
    );

drop table "postMetaData";

-- Table for comments and reply

CREATE TABLE
    "comments"(
        "id" SERIAL NOT NULL PRIMARY key,
        "commentText" TEXT,
        "userId" INT REFERENCES users(id),
        "postId" INT REFERENCES posts(id),
        "createdAt" TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE
    "replies"(
        "id" SERIAL NOT NULL PRIMARY key,
        "replyText" TEXT,
        "userId" INT REFERENCES users(id),
        "commentId" INT REFERENCES comments(id),
        "createdAt" TIMESTAMP DEFAULT NOW()
    );

-- post tag TABLE many to many relation

CREATE Table
    "tags"(
        "id" SERIAL NOT NULL PRIMARY key,
        "name" VARCHAR(150) NOT NULL UNIQUE,
        "description" Text
    );

CREATE TABLE
    "taggedPosts" (
        "postId" INTEGER REFERENCES posts(id),
        "tagId" INTEGER REFERENCES tags(id),
        PRIMARY KEY ("postId", "tagId")
    );

-- Catergories the posts

CREATE TABLE
    "categories"(
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" VARCHAR(200) UNIQUE,
        "description" TEXT
    );

CREATE Table
    "categorizedPosts"(
        "postId" INTEGER REFERENCES posts(id),
        "categoryId" INTEGER REFERENCES categories(id),
        PRIMARY KEY ("postId", "categoryId")
    );

-- 1. insert the users

INSERT INTO
    users (
        name,
        email,
        password,
        address,
        role
    )
VALUES (
        'Sabudh Bahadur Thapa',
        'tsabudh@gmail.com',
        'admin1234',
        'Baglung',
        'author'
    );

-- 2.

INSERT INTO
    users (
        name,
        email,
        password,
        address,
        role
    )
VALUES (
        'Sailesh',
        'sailesh47@gmail.com',
        'admin1234',
        'kathmandu',
        'moderator'
    );

-- 3.

INSERT INTO
    users (
        name,
        email,
        password,
        address,
        role
    )
VALUES (
        'Administrator',
        'admin@gmail.com',
        'admin1234',
        'kathmandu',
        'admin'
    );

-- 2. creating new post with draft

ALTER TABLE posts ADD COLUMN "title" VARCHAR(250) NOT NULL;

INSERT INTO
    "posts"(
        "title",
        "content",
        "status",
        "userId"
    )
VALUES (
        'What I do',
        'I watch youtube videos on current and future tech and gadgets whenever I am feeling tired. My interest being anything related to computers from microphone gadgets to quantumn computers, these videos turn my frown upside down and they are informative too. I have subscribed to various tech channels like MKBHD,  Just Josh, Gamer Meld and many more. I find videos more entertaining than musics. It is always better to be tranquilized by two senses than one. The new innovations and developments happen almost daily and new goals are achieved and another sets of goals are created. It reminds me that the world does not stop for me to get back to a good  mood. It always moves forward in a pace that is increasing rapidly. Such videos remind me what a blessing it is to be born in this era and the astronomical achievements humans have attained compared to the Stone Age where lighting up fire was deemed as magical.',
        'draft',
        1
    );

-- 3. publich new post

INSERT INTO
    "posts"(
        "title",
        "content",
        "status",
        "userId"
    )
VALUES (
        'Rest API',
        'What is a REST API? An API, or application programming interface, is a set of rules that define how applications or devices can connect to and communicate with each other. A REST API is an API that conforms to the design principles of the REST, or representational state transfer architectural style.',
        'post',
        2
    );

-- 4 add comment

INSERT INTO
    "comments"(
        "commentText",
        "userId",
        "postId"
    )
VALUES (
        'This should not be here.',
        1,
        2
    );

-- 4. add reply

INSERT INTO
    "replies"(
        "replyText",
        "userId",
        "commentId"
    )
VALUES (
        'This is actually informative. What are you talking about??!',
        2,
        1
    );

-- 5. retriving post by  categories

SELECT
    p.id,
    p.title,
    p.content
FROM posts p
    JOIN "categorizedPosts" cp ON p.id = cp."postId"
    JOIN categories c ON cp."categoryId" = c.id
WHERE c.name = 'sports';

-- 6. retriving featured post

SELECT
    posts.id,
    posts.title,
    posts.content
FROM posts
    INNER JOIN "postMetaData" ON posts.id = "postMetaData"."postId"
WHERE
    "postMetaData"."isFeatured" = true;

-- 7. trending posts with  views greater than 10

SELECT
    posts.content,
    posts.status,
    "postMetaData".views,
    "postMetaData"."isFeatured"
FROM posts
    INNER JOIN "postMetaData" ON posts.id = "postMetaData"."postId"
WHERE "postMetaData".views > 10