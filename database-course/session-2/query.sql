-- Active: 1677410332760@@127.0.0.1@5432@postgres@public
CREATE TABLE users (
    "userId" SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "deletedAt" TIMESTAMP
);

-- insert the users
INSERT INTO users(username,password,email)
VALUES('Sabudh Bahadur Thapa','sabudh123','tsabudh@gmail.com');
INSERT INTO users(username,password,email)
VALUES('Sailesh','sailesh123','Sailesh47@gmail.com');




CREATE TABLE tweets (
    "tweetId" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users("userId") ON DELETE CASCADE,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "likesCount" INTEGER DEFAULT 0
);

INSERT INTO tweets("userId",content,"likesCount")
VALUES(1,'its new tweet',4);

INSERT INTO tweets("userId",content,"likesCount")
VALUES(1,'its second tweet',8);


CREATE TABLE followers (
    "followerId" SERIAL PRIMARY KEY,
    follower_"userId" INTEGER REFERENCES users("userId") ON DELETE CASCADE,
    following_"userId" INTEGER REFERENCES users("userId") ON DELETE CASCADE
);



-- insert follower

INSERT INTO followers(follower_"userId",following_"userId")
VALUES(1,2);

CREATE TABLE followings(
    "userId" INT NOT NULL,
    following_id INT NOT NULL,
    Foreign Key ("userId") REFERENCES users(id) ON DELETE NO ACTION,
    Foreign Key (following_id) REFERENCES users(id) ON DELETE NO ACTION
);

-- followed by the user
INSERT INTO
    followings("userId", following_id)
VALUES
    (1, 2);


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users("userId") ON DELETE CASCADE,
    "tweetId" INTEGER REFERENCES tweets("tweetId") ON DELETE CASCADE,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "likesCount" INTEGER DEFAULT 0
);


-- comment in a tweet
INSERT INTO
    comments("tweetId", "userId", content,"likesCount")
VALUES
    (1, 2, 'this is commented by user 2',5);



CREATE TABLE hashtags (
    hashtag_id SERIAL PRIMARY KEY,
    hashtag_name VARCHAR(255) UNIQUE NOT NULL
);



CREATE TABLE tweet_hashtags (
    "tweetId" INTEGER REFERENCES tweets("tweetId") ON DELETE CASCADE,
    hashtag_id INTEGER REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
    PRIMARY KEY ("tweetId", hashtag_id)
);


CREATE TABLE trending_hashtags (
    hashtag_id INTEGER REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    num_tweets INTEGER DEFAULT 0,
    PRIMARY KEY (hashtag_id, date)
);



