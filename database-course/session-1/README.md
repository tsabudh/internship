Database design for Blog application  

In this assignment, you will design the database schema for a blog application that allows users to create posts, comment on posts, and categorize them and add tags to posts.
The application should have the following features:  

User Authentication: The application should allow users to register and log in with different roles such as author, moderator, and admin. Each role should have different permissions and access to different parts of the application.  

Posts: Users should be able to create new blog posts with a title, content, and metadata such as views, featured, etc. Each post should be associated with a user who created it.  
Author - can create post as a draft and can’t allow to publish it  
Moderator or admin - can create and publish the post  

Categories: Users should be able to categorize their posts with one or more categories. Each category should have a unique name and description.  

Tags: Users should be able to add tags to their posts, which can be used to classify them based on their content. Each tag should have a unique name and description.  

Comments and Replies: Users should be able to comment on posts and reply to other users' comments. Each comment should be associated with a user who created it and the post it belongs to.  

Post Metadata: Each post can have additional metadata attributes such as views, featured, or any other attribute that the application may require in the future.  

Your assignment is to design the database schema using PostgreSQL for this blog application, including the tables, columns, and relationships. You should also include any additional information such as data types, constraints, and indexes that may be necessary.  

Once you have designed the schema, you should create sample queries to test your database design, such as  
Inserting new users  
Creating new posts with draft  
Publish post by  
Adding comments / reply  
Retrieving posts by category or tag.  
Retrieving featured posts  
Retrieving popular posts  
