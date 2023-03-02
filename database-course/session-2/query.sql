-- Active: 1677410332760@@127.0.0.1@5432@postgres@public
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

-- insert the users
INSERT INTO users(username,password,email)
VALUES('Sabudh Bahadur Thapa','sabudh123','tsabudh@gmail.com');
INSERT INTO users(username,password,email)
VALUES('Sailesh','sailesh123','Sailesh47@gmail.com');




CREATE TABLE tweets (
    tweet_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    num_likes INTEGER DEFAULT 0
);

INSERT INTO tweets(user_id,content,num_likes)
VALUES(1,'its new tweet',4);

INSERT INTO tweets(user_id,content,num_likes)
VALUES(1,'its second tweet',8);


CREATE TABLE followers (
    follower_id SERIAL PRIMARY KEY,
    follower_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    following_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);



-- insert follower

INSERT INTO followers(follower_user_id,following_user_id)
VALUES(1,2);

CREATE TABLE followings(
    user_id INT NOT NULL,
    following_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    Foreign Key (following_id) REFERENCES users(id) ON DELETE NO ACTION
);

-- followed by the user
INSERT INTO
    followings(user_id, following_id)
VALUES
    (1, 2);


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    tweet_id INTEGER REFERENCES tweets(tweet_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    num_likes INTEGER DEFAULT 0
);


-- comment in a tweet
INSERT INTO
    comments(tweet_id, user_id, content,num_likes)
VALUES
    (1, 2, 'this is commented by user 2',5);



CREATE TABLE hashtags (
    hashtag_id SERIAL PRIMARY KEY,
    hashtag_name VARCHAR(255) UNIQUE NOT NULL
);



CREATE TABLE tweet_hashtags (
    tweet_id INTEGER REFERENCES tweets(tweet_id) ON DELETE CASCADE,
    hashtag_id INTEGER REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
    PRIMARY KEY (tweet_id, hashtag_id)
);


CREATE TABLE trending_hashtags (
    hashtag_id INTEGER REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    num_tweets INTEGER DEFAULT 0,
    PRIMARY KEY (hashtag_id, date)
);



