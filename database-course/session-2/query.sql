-- Active: 1677131859744@@localhost@5432@twitter

CREATE DATABASE twitter;

CREATE TABLE
    "users" (
        "userId" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    "tweets" (
        "tweetId" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "tweetText" VARCHAR(280) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY ("userId") REFERENCES users("userId")
    );

CREATE TABLE
    "followers" (
        "followerId" INTEGER NOT NULL,
        "userId" INTEGER NOT NULL,
        FOREIGN KEY ("followerId") REFERENCES users("userId"),
        FOREIGN KEY ("userId") REFERENCES users("userId"),
        PRIMARY KEY("followerId","userId")
    );

CREATE TABLE
    "likes" (
        "likeId" SERIAL ,
        "userId" INTEGER NOT NULL,
        "tweetId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY ("userId") REFERENCES "users"("userId"),
        FOREIGN KEY ("tweetId") REFERENCES "tweets"("tweetId"),
        CONSTRAINT "likeId"  PRIMARY KEY ("userId","tweetId")
    );

CREATE TABLE
    "comments" (
        "commentId" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "tweetId" INTEGER NOT NULL,
        "commentText" VARCHAR(280) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY ("userId") REFERENCES users("userId"),
        FOREIGN KEY ("tweetId") REFERENCES "tweets"("tweetId")
    );

CREATE TABLE
    "hashtags" (
        "hashtagId" SERIAL PRIMARY KEY,
        "hashtagText" VARCHAR(255) UNIQUE NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    "tweetHashtags" (
        "tweetId" INTEGER NOT NULL,
        "hashtagId" INTEGER NOT NULL,
        PRIMARY KEY ("tweetId", "hashtagId"),
        FOREIGN KEY ("tweetId") REFERENCES "tweets"("tweetId"),
        FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("hashtagId")
    );

CREATE TABLE
    "tredingHashtags" (
        "trendingHashtagId" SERIAL PRIMARY KEY,
        "hashtagId" INTEGER NOT NULL,
        "count" INTEGER NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("hashtagId")
    );

--INSERTING NEW USER

INSERT INTO
    users (
        "username",
        "email",
        "password"
    )
VALUES (
        'Sabudh',
        'tsabudh@gmail.com',
        'admin1234'
    ), (
        'prithivi',
        'prithivi@gmail.com',
        'pass'
    ), (
        'ramesh',
        'ramesh@gmail.com',
        'pass'
    );

--login user

SELECT "username"
from "users"
WHERE
    "username" = 'Sabudh'
    AND "password" = 'admin1234';

--create tweet

INSERT INTO
    "tweets"("userId", "tweetText")
VALUES (
        1,
        'Nepali politics is dirtier than a rag dropped in sewer yet everybody wants to chew on it!'
    );

INSERT INTO
    "tweets"("userId", "tweetText")
VALUES (
        2,
        'IT industry is about to hit a massive boost in Nepal.'
    );

INSERT INTO
    "tweets"("userId", "tweetText")
VALUES (
        3,
        'Nepal will win the cricket match against Bangladesh.'
    );
    
    INSERT INTO
    "tweets"("userId", "tweetText")
VALUES (
        2,
        'No matter what anyone says, there is always a way.'
    );

--follow users

INSERT INTO
    "followers" ("followerId", "userId")
VALUES (1, 2), (1, 3), (2, 1), (2, 3) ;

--list of "followers" done

SELECT
    "users"."username",
    "users"."email"
FROM "followers"
    JOIN "users" ON "followerId" = "users"."userId"
WHERE "followers"."userId" = 3;

-- like a tweet, one user can like only once

INSERT INTO "likes" ("userId", "tweetId") VALUES (1, 5) , (2 , 14);


-- creeating hashtags
INSERT INTO
    hashtags ("hashtagText")
VALUES ('nepal'), ('politics'), ('game');

--adding a hashtags to a tweet
INSERT INTO
    "tweetHashtags" ("tweetId", "hashtagId")
VALUES (5, 1),(5, 2), (14, 2);

INSERT into
    "tredingHashtags" ("hashtagId", "count")
VALUES (1, 224), (2, 10), (3, 255);

--query to get trending hashtags

SELECT
    h."hashtagText",
    "count"(*) as "count"
FROM hashtags AS h
    JOIN "tweetHashtags" AS th ON h."hashtagId" = th."hashtagId"
    JOIN "tweets" AS t ON th."tweetId" = t."tweetId"
WHERE
    t."createdAt" > NOW() - INTERVAL '24 HOURS'
GROUP BY h."hashtagText"
ORDER BY "count" DESC
LIMIT 5;

SELECT *
FROM "tweets"
WHERE
    "createdAt" > NOW() - INTERVAL '24 HOURS';